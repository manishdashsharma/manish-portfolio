# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your portfolio contact form. All form submissions will be automatically saved to a Google Sheet using Google Apps Script.

## 📋 Prerequisites

- Google account
- Access to Google Sheets and Google Apps Script
- Basic understanding of copying/pasting code

## 🚀 Step-by-Step Setup

### Step 1: Create Google Sheet

1. **Open Google Sheets**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Click "Blank" to create a new spreadsheet

2. **Set up the Sheet**
   - Rename the sheet to "Portfolio Contact Submissions"
   - In row 1, add these headers (A1 to E1):
     ```
     A1: Name
     B1: Email  
     C1: Phone
     D1: Message
     E1: Timestamp
     ```

3. **Get Sheet ID**
   - From your Google Sheet URL, copy the sheet ID:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part (it's a long string of letters and numbers)
   - Save this ID - you'll need it in Step 3

### Step 2: Create Google Apps Script

1. **Open Google Apps Script**
   - Go to [script.google.com](https://script.google.com)
   - Click "New Project"

2. **Replace Default Code**
   - Delete all existing code
   - Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Replace with your actual Google Sheet ID from Step 1
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add data to sheet with timestamp
    const timestamp = new Date();
    sheet.appendRow([
      data.name,
      data.email || '',
      data.phone || '',
      data.message,
      timestamp
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Message sent successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error sending message. Please try again.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify the script works
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'running',
      message: 'Portfolio Contact Form API is active'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. **Update the Sheet ID**
   - Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID from Step 1
   - Save the project (Ctrl+S or Cmd+S)

4. **Name Your Project**
   - Click "Untitled project" at the top
   - Rename to "Portfolio Contact Form API"

### Step 3: Deploy the Script

1. **Start Deployment**
   - Click "Deploy" button (top right)
   - Select "New deployment"

2. **Configure Deployment**
   - Type: Select "Web app"
   - Description: "Portfolio Contact Form Handler"
   - Execute as: "Me (your-email@gmail.com)"
   - Who has access: "Anyone"

3. **Authorize the Script**
   - Click "Deploy"
   - You'll see an authorization screen
   - Click "Review permissions"
   - Choose your Google account
   - Click "Advanced" → "Go to Portfolio Contact Form API (unsafe)"
   - Click "Allow"

4. **Copy the Web App URL**
   - After deployment, you'll get a Web App URL
   - It looks like: `https://script.google.com/macros/s/SCRIPT_ID_HERE/exec`
   - **Copy this entire URL** - you'll need it for Step 4

### Step 4: Update Your Portfolio Code

1. **Open Contact Component**
   - Navigate to `/src/components/Contact.tsx`
   - Find line 23 (around the `GOOGLE_SCRIPT_URL` variable)

2. **Replace the URL**
   ```typescript
   // Replace this line:
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   
   // With your actual Web App URL from Step 3:
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```

3. **Save the File**
   - Save the Contact.tsx file
   - Restart your development server if needed

## ✅ Testing the Integration

### Test the Apps Script
1. Open your Apps Script project
2. Click "Run" on the `doGet` function
3. Check the execution log for any errors

### Test the Contact Form
1. Open your portfolio website
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your Google Sheet - a new row should appear with:
   - Your test name
   - Your test email
   - Your test message
   - Current timestamp

## 🔧 Troubleshooting

### Common Issues

**Error: "Script function not found"**
- Make sure you saved the Apps Script project
- Verify the `doPost` function exists and is spelled correctly

**Form submits but no data in sheet**
- Double-check the Sheet ID in your Apps Script
- Ensure the Web App URL is correctly set in Contact.tsx
- Check Apps Script execution logs for errors

**Authorization errors**
- Re-run the authorization process in Step 3
- Make sure "Anyone" has access to the Web App

**CORS errors in browser**
- This is normal due to `no-cors` mode
- The form should still work despite console warnings

### Viewing Execution Logs
1. In Google Apps Script, click "Executions" (left sidebar)
2. View recent executions and any error messages
3. Click on individual executions to see detailed logs

## 📊 Managing Your Data

### Viewing Submissions
- All form submissions appear in your Google Sheet
- Data includes: Name, Email, Phone, Message, and Timestamp
- Sort by timestamp to see newest submissions first

### Exporting Data
- File → Download → Excel (.xlsx) or CSV
- Use Google Sheets built-in sharing and collaboration features

### Setting Up Notifications (Optional)
1. In your Google Sheet, go to Tools → Notification settings
2. Set up email notifications for when the sheet is edited
3. You'll get an email every time someone submits the form

## 🔐 Security Notes

- The Apps Script runs under your Google account
- Form data is stored in your private Google Sheet
- Only you have access to the submissions
- The Web App URL can be regenerated if needed (Deploy → Manage deployments)

## 🎉 You're All Set!

Your portfolio contact form is now connected to Google Sheets. Every submission will be automatically saved with a timestamp, making it easy to track and respond to inquiries.

---

**Need Help?** 
- Check the Google Apps Script documentation: [developers.google.com/apps-script](https://developers.google.com/apps-script)
- Review the troubleshooting section above
- Ensure all URLs and IDs are correctly copied