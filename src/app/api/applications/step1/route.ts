import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const sheets = await getGoogleSheetsClient();
    
    // Minimal Lead Capture Data
    const row = [
      new Date().toLocaleString(), // Timestamp
      data.firstName || '',
      data.lastName || '',
      data.nic || '',
      data.email || '',
      data.whatsapp || ''
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:F', // Adjust range if needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    const updatedRange = response.data?.updates?.updatedRange;
    const rowMatch = updatedRange ? updatedRange.match(/[0-9]+$/) : null;
    const rowNumber = rowMatch ? rowMatch[0] : null;

    return NextResponse.json({ success: true, rowNumber, message: "Lead captured to Google Sheets" }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
