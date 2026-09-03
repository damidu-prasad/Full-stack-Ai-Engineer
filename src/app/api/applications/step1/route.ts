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

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:F', // Adjust range if needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true, message: "Lead captured to Google Sheets" }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving lead:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
