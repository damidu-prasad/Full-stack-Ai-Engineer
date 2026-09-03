import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const sheets = await getGoogleSheetsClient();
    
    // Prepare row data mapping to your exact 16 columns
    const row = [
      new Date().toLocaleString(), // 1. No (Using Date/Time as unique ID)
      data.nic || '', // 2. NIC
      data.fullName || '', // 3. Full Name
      data.email || '', // 4. Email Address
      data.contactNumber || '', // 5. Contact Number
      data.cityDistrict || '', // 6. City / District
      data.currentStatus || '', // 7. Current Status
      
      // 8. If After A/L: Year & Stream
      data.currentStatus === 'After A/L' ? `${data.afterALYear || ''} - ${data.afterALStream || ''}` : '',
      
      // 9. If Undergraduate: Degree & University
      data.currentStatus === 'Undergraduate' ? `${data.undergradDegree || ''} from ${data.undergradUniversity || ''}` : '',
      
      // 10. If Degree: Degree & University
      data.currentStatus === 'After Degree' ? `${data.degreeName || ''} from ${data.degreeUniversity || ''}` : '',
      
      // 11. If Java Institute: Batch
      data.javaInstituteBatch ? `Batch: ${data.javaInstituteBatch}` : '',
      
      // 12. If Career Change: Previous Field & Reason
      data.currentStatus === 'Career Change' ? `Field: ${data.careerChangePreviousField || ''} | Reason: ${data.careerChangeReason || ''}` : '',
      
      // 13. Do you have Programing Knowladge 
      data.hasProgrammingKnowledge || '',
      
      // 14. If YES :Web Dev Frameworks Knowledge
      data.webDevFrameworks?.join(', ') || '',
      
      // 15. Do you have AI/ML Knowledge (Including details if any)
      data.hasAIMLKnowledge === 'YES' ? `YES - ${data.aimlDetails || ''}` : 'NO',
      
      // 16. CV / Resume Link
      data.cvResumeLink || '',
    ];

    // Append dynamic answers (Column 17 onwards)
    if (data.dynamicAnswers) {
      Object.values(data.dynamicAnswers).forEach(answer => {
        row.push((answer as string) || '');
      });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:ZZ', // Extended range to accommodate dynamic columns
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true, message: "Added to Google Sheets" }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:P',
    });
    
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }
    
    // Using your exact 16 headers for the GET request
    const headers = [
      'no', 'nic', 'fullName', 'email', 'contactNumber', 'cityDistrict', 'currentStatus',
      'afterAL', 'undergraduate', 'degree', 'javaInstitute', 'careerChange', 
      'hasProgrammingKnowledge', 'webDevFrameworks', 'hasAIMLKnowledge', 'cvResumeLink'
    ]; 
    
    const hasHeaderRow = rows[0][0]?.toLowerCase().includes('no') || rows[0][1]?.toLowerCase().includes('nic');
    const dataRows = hasHeaderRow ? rows.slice(1) : rows;

    const data = dataRows.map((row, index) => {
      const obj: any = { _id: index.toString() };
      headers.forEach((header: string, i: number) => {
        obj[header] = row[i] || '';
      });
      return obj;
    });

    // Return the newest items first
    return NextResponse.json({ success: true, data: data.reverse() });
  } catch (error: any) {
    console.error("Error reading application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
