/**
 * P4 Eminent Global — bookings inbox (Google Apps Script)
 * ------------------------------------------------------
 * Receives bookings from p4eminentglobal.com, stores them in this spreadsheet,
 * emails you a copy, and lets the admin portal read them back.
 *
 * SETUP — about 4 minutes, one time:
 *  1. Go to sheets.new  →  name it "P4 Bookings".
 *  2. Extensions → Apps Script.  Delete anything there and paste this whole file.
 *  3. Change SECRET below to your own private word (any text, no spaces).
 *  4. Click Deploy → New deployment → gear icon → Web app.
 *       Execute as:        Me
 *       Who has access:    Anyone            <-- required, the website is anonymous
 *     Deploy → Authorize access → allow.
 *  5. Copy the Web app URL (ends in /exec).
 *  6. Paste it into the admin portal → Settings → Bookings endpoint,
 *     and put the same SECRET in the Bookings secret field. Save.
 *
 * Re-deploying after edits: Deploy → Manage deployments → edit (pencil) →
 * Version: New version → Deploy. The URL stays the same.
 */

// ⚠️ CHANGE THIS to your own private word, then use the same value in admin Settings.
var SECRET = 'CHANGE-ME-p4-secret';

var SHEET = 'Bookings';
var HEADERS = ['id','receivedAt','name','phone','email','service','date','time','address','notes','source','status'];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(HEADERS);
    sh.getRange(1,1,1,HEADERS.length).setFontWeight('bold').setBackground('#0F2233').setFontColor('#ffffff');
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/** Website posts a booking here. */
function doPost(e) {
  try {
    var body = {};
    try { body = JSON.parse(e.postData.contents); } catch (err) { body = e.parameter || {}; }
    if (String(body.secret || '') !== SECRET) return json_({ ok:false, error:'unauthorized' });

    var sh = sheet_();
    var id = 'b' + Date.now();
    var now = new Date();
    sh.appendRow([
      id, now,
      body.name||'', body.phone||'', body.email||'', body.service||'',
      body.date||'', body.time||'', body.address||'', body.notes||'',
      body.source||'website', 'new'
    ]);

    // email a copy so nothing is missed even if the portal isn't open
    try {
      MailApp.sendEmail({
        to: Session.getEffectiveUser().getEmail(),
        subject: 'New booking — ' + (body.service||'enquiry') + ' — ' + (body.name||''),
        body: [
          'New booking from p4eminentglobal.com','',
          'Name:     ' + (body.name||''),
          'Phone:    ' + (body.phone||''),
          'Email:    ' + (body.email||''),
          'Service:  ' + (body.service||''),
          'When:     ' + (body.date||'') + ' ' + (body.time||''),
          'Address:  ' + (body.address||''),
          '','Fault:', (body.notes||''),
          '','It is also in your P4 Bookings sheet and the admin portal.'
        ].join('\n')
      });
    } catch (mailErr) { /* never fail the booking because email failed */ }

    return json_({ ok:true, id:id });
  } catch (err) {
    return json_({ ok:false, error:String(err) });
  }
}

/** Admin portal reads bookings here:  ?secret=...   (optional &status=new) */
function doGet(e) {
  var p = e.parameter || {};
  if (String(p.secret||'') !== SECRET) return json_({ ok:false, error:'unauthorized' });

  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return json_({ ok:true, bookings:[] });

  var values = sh.getRange(2,1,last-1,HEADERS.length).getValues();
  var out = values.map(function(r){
    var o = {};
    HEADERS.forEach(function(h,i){ o[h] = r[i]; });
    if (o.receivedAt instanceof Date) o.receivedAt = o.receivedAt.toISOString();
    if (o.date instanceof Date) o.date = Utilities.formatDate(o.date, Session.getScriptTimeZone(), 'yyyy-MM-dd');
    return o;
  }).filter(function(o){ return o.id; });

  if (p.status) out = out.filter(function(o){ return o.status === p.status; });
  out.reverse(); // newest first
  return json_({ ok:true, bookings: out });
}
