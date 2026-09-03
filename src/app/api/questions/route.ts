import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheetsClient } from '@/lib/googleSheets';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

export async function GET() {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Questions!A:A',
    });
    
    const rows = response.data.values || [];
    // Filter empty rows if any
    const data = rows.filter(row => row.length > 0 && row[0].trim() !== '');
    
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Error fetching questions:", error);
    return NextResponse.json({ success: false, data: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ success: false }, { status: 400 });

    const sheets = await getGoogleSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Questions!A:A',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[question]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving question:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
