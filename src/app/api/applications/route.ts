import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/googleSheets';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const sheets = await getGoogleSheetsClient();
    
    // Full Application Data
    const row = [
      new Date().toLocaleString(), // Timestamp
      data.firstName || '',
      data.lastName || '',
      data.nic || '',
      data.email || '',
      data.whatsapp || '',
      data.primaryGoal || '',
      data.biggestHurdle || '',
      data.timeCommitment || '',
      data.currentStage || '',
      data.alYear || '',
      data.alStream || '',
      data.universityOrInstitute || '',
      data.javaInstituteBatch || '',
      data.customInstituteName || '',
      data.currentProfessionField || '',
      data.whySelectYou || '',
      data.submissionLanguage || 'en',
      'Fully Submitted' // Status
    ];

    if (data.rowNumber) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Sheet1!A${data.rowNumber}:S${data.rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      });
    } else {
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!A:S', // Adjusted range for more columns
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      });
    }

    return NextResponse.json({ success: true, message: "Application saved to Google Sheets" }, { status: 201 });
  } catch (error: any) {
    console.error("Error saving application:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
