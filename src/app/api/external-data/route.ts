import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/googleSheets';

export async function GET(req: NextRequest) {
  try {
    // Basic API Key authentication
    const authHeader = req.headers.get('authorization');
    const validApiKey = process.env.EXTERNAL_API_KEY;
    
    // If EXTERNAL_API_KEY is defined in .env, enforce it. Otherwise, leave it open for now.
    if (validApiKey && authHeader !== `Bearer ${validApiKey}`) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Please provide a valid Bearer token.' }, { status: 401 });
    }

    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Submissions!A:Y',
    });
    
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }
    
    const headers = [
      'createdAt', 'fullName', 'nic', 'email', 'contactNumber', 'cityDistrict', 'currentStatus',
      'afterALYear', 'afterALStream', 'undergradDegree', 'undergradUniversity', 'degreeName', 
      'degreeUniversity', 'javaInstituteBatch', 'javaInstituteSemester', 'careerChangePreviousField',
      'careerChangeReason', 'hasProgrammingKnowledge', 'webDevFrameworks', 'customFrameworks',
      'hasAIMLKnowledge', 'aimlDetails', 'cvResumeLink', 'whyJoin', 'status'
    ]; 
    
    const hasHeaderRow = rows[0][0]?.toLowerCase().includes('time') || rows[0][0]?.includes('created');
    const dataRows = hasHeaderRow ? rows.slice(1) : rows;

    const data = dataRows.map((row, index) => {
      const obj: any = { id: index.toString() };
      headers.forEach((header: string, i: number) => {
        obj[header] = row[i] || '';
      });
      return obj;
    });

    return NextResponse.json({ success: true, count: data.length, data: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
