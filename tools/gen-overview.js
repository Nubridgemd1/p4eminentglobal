/* Builds the shareable platform-overview PDF. Run then render-overview.js */
const fs = require('fs');
const OUT = __dirname.replace(/\\/g,'/') + '/overview.html';

const PHONE='(347) 812-9270', EMAIL='p4eminentglobal@gmail.com', WEB='p4eminentglobal.com';
const AREA='Houston, TX & surrounding areas';
const PREVIEW='nubridgemd1.github.io/p4eminentglobal';

const SERVICES = [
  ['🛠️','Handyman &amp; Repairs','Doors · drywall · mounting · assembly · fixtures','75'],
  ['❄️','HVAC Services','AC repair · heating · thermostats · ducts · servicing','95'],
  ['🎨','Painting — Interior &amp; Exterior','Walls · ceilings · siding · trim · cabinets · staining','150'],
  ['💦','Power Washing','Walls · siding · driveways · decks · fences · gutters','120'],
  ['🔌','Electronics Repair','TVs · laptops · audio · power supplies','60'],
  ['🧰','Appliance Restoration','Washers · dryers · microwaves · fridges · cookers','90'],
  ['⚙️','Equipment Servicing','Generators · power tools · pumps · motors','120'],
];

const TABS = [
  ['Dashboard','Live counts of total jobs, new enquiries, bookings and completed value, plus a recent-jobs feed and a setup checklist.'],
  ['Bookings &amp; Jobs','Log every enquiry and move it New → Booked → Completed. Records customer, phone, service, date, quoted value and fault notes. Filter by status; delete jobs.'],
  ['Services &amp; Pricing','Add, edit and remove service lines. Controls the name, description, icon, “quotes from” price and the included-items list shown publicly.'],
  ['Job Specification','Edits the four published blocks — scope of work, pricing &amp; terms, what we need from you, and our commitment.'],
  ['Marketing Kit','8 flyers (PNG + print PDF) and 8 vertical videos. Download, print, or share to WhatsApp. Includes site-share, copy-link, review link and ask-for-a-review.'],
  ['Settings','Phone, booking email, service area, opening hours, Google review link and the admin PIN.'],
];

const page = (n, total, body) => `
<div class="pg">
  <div class="stripe" style="top:0"></div>
  ${body}
  <div class="foot">
    <div><b>P4 Eminent Global</b> · Platform Overview</div>
    <div>${WEB} · Page ${n} of ${total}</div>
  </div>
</div>`;

const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--navy:#0F2233;--navy2:#17324A;--navy3:#0A1826;--amber:#F5A623;--amber-d:#D98A0B;
      --steel:#5B6B7C;--off:#F7F9FB;--ink:#101922;--ink2:#4A5865;--line:#E3E9EF;--green:#1E9E5A}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',Arial,sans-serif;color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased}
.pg{width:794px;height:1123px;position:relative;overflow:hidden;background:#fff;page-break-after:always}
.pg:last-child{page-break-after:auto}
.disp{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;line-height:1.03}
.stripe{position:absolute;left:0;right:0;height:8px;background:repeating-linear-gradient(90deg,var(--amber) 0 30px,var(--navy3) 30px 60px);z-index:5}
.mark{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,var(--amber),var(--amber-d));
      display:grid;place-items:center;font-family:'Barlow Condensed';font-weight:900;color:var(--navy3);font-size:23px}
.logo{display:flex;align-items:center;gap:11px}
.lname{font-family:'Barlow Condensed';font-weight:800;font-size:24px;letter-spacing:.03em;line-height:1}
.lsub{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--amber);font-weight:600;margin-top:3px}
.body{padding:44px 48px 0}
.kick{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--amber-d);
      display:flex;align-items:center;gap:10px;margin:17px 0 9px}
.kick::after{content:"";flex:1;height:2px;background:var(--line)}
h2{font-size:34px;color:var(--navy)}
p.lead{font-size:14px;line-height:1.6;color:var(--ink2)}
.foot{position:absolute;left:0;right:0;bottom:0;height:44px;background:var(--navy3);color:#8FA3B6;
      display:flex;align-items:center;justify-content:space-between;padding:0 48px;font-size:11px}
.foot b{color:#fff}
table{width:100%;border-collapse:collapse;font-size:12.5px}
th{text-align:left;font-size:9.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink2);
   font-weight:800;padding:0 8px 8px;border-bottom:2px solid var(--line)}
td{padding:9px 8px;border-bottom:1px solid var(--line);vertical-align:top}
.from{font-family:'Barlow Condensed';font-weight:800;font-size:20px;color:var(--navy)}
.chip{display:inline-block;background:var(--amber);color:var(--navy3);font-size:10px;font-weight:800;
      letter-spacing:.1em;text-transform:uppercase;padding:5px 12px;border-radius:20px}
.card{border:1px solid var(--line);border-radius:12px;padding:13px 15px;background:#fff}
.card h3{font-size:16px;color:var(--navy);font-family:'Inter';font-weight:800}
.card p{font-size:12px;color:var(--ink2);margin-top:4px;line-height:1.45}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.flow{display:flex;gap:8px}
.st{flex:1;background:var(--off);border:1px solid var(--line);border-radius:10px;padding:12px}
.st .n{width:24px;height:24px;border-radius:7px;background:var(--navy);color:var(--amber);display:grid;place-items:center;
       font-family:'Barlow Condensed';font-weight:800;font-size:14px}
.st h4{font-size:13px;color:var(--navy);margin-top:7px;font-weight:800}
.st p{font-size:11px;color:var(--ink2);margin-top:3px;line-height:1.4}
.note{background:#FFF6E5;border:1px solid var(--amber);border-left:4px solid var(--amber-d);border-radius:9px;
      padding:10px 13px;font-size:11.5px;color:#7a5200;line-height:1.5}
.ok{background:#EFFaf3;border:1px solid #CDE7D6;border-left:4px solid var(--green);border-radius:9px;
    padding:10px 13px;font-size:11.5px;color:#14663c;line-height:1.5}
.tick{color:var(--green);font-weight:900}
</style></head><body>

${page(1,3,`
<div style="background:var(--navy);color:#fff;padding:40px 48px 34px;position:relative;overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(600px 380px at 85% 0%,rgba(245,166,35,.24),transparent 62%)"></div>
  <div style="position:relative">
    <div class="logo"><div class="mark">P4</div><div>
      <div class="lname" style="color:#fff">EMINENT GLOBAL</div><div class="lsub">Fix • Restore • Maintain</div></div></div>
    <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#9DB4CC;font-weight:700;margin-top:26px">Platform Overview</div>
    <div class="disp" style="font-size:52px;margin-top:8px">SERVICES, SITE &amp;<br><span style="color:var(--amber)">ADMIN PORTAL</span></div>
    <div style="font-size:14px;color:#BCCBD9;margin-top:12px;max-width:56ch;line-height:1.55">
      What we offer, how the website works end to end, and what the admin portal controls.</div>
    <div style="display:flex;gap:26px;margin-top:24px;flex-wrap:wrap;font-size:12px">
      <div><div style="color:#7FA3C4;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700">Domain</div>
           <div style="font-weight:700;margin-top:2px">${WEB}</div></div>
      <div><div style="color:#7FA3C4;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700">Service area</div>
           <div style="font-weight:700;margin-top:2px">${AREA}</div></div>
      <div><div style="color:#7FA3C4;font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;font-weight:700">Contact</div>
           <div style="font-weight:700;margin-top:2px">${PHONE} · ${EMAIL}</div></div>
    </div>
  </div>
</div>

<div class="body" style="padding-top:26px">
  <div style="background:var(--navy2);color:#fff;border-radius:12px;padding:18px 22px">
    <div class="disp" style="font-size:26px">INSTEAD OF BUYING A NEW ONE, <span style="color:var(--amber)">WE FIX IT FOR YOU.</span></div>
    <div style="font-size:12.5px;color:#BCCBD9;margin-top:5px">Free, no-obligation quotes. We only recommend replacement when repair genuinely isn't worth it.</div>
  </div>

  <div class="kick">Services provided</div>
  <table>
    <thead><tr><th style="width:34%">Service line</th><th>What it covers</th><th style="width:14%;text-align:right">Quotes from</th></tr></thead>
    <tbody>
      ${SERVICES.map(([i,n,d,f])=>`<tr>
        <td><span style="font-size:15px">${i}</span> <b style="color:var(--navy)">${n}</b></td>
        <td style="color:var(--ink2)">${d}</td>
        <td style="text-align:right"><span class="from">$${f}</span></td></tr>`).join('')}
    </tbody>
  </table>
  <p class="lead" style="margin-top:10px;font-size:11.5px">
    Prices are indicative starting points shown publicly as “quotes from”. Every price, service and description is
    editable in the admin portal, and services can be added or removed at any time.</p>
</div>`)}

${page(2,3,`
<div class="body">
  <div class="logo"><div class="mark">P4</div><div>
    <div class="lname" style="color:var(--navy)">EMINENT GLOBAL</div>
    <div class="lsub" style="color:var(--amber-d)">Fix • Restore • Maintain</div></div></div>

  <div class="kick">The website, end to end</div>
  <h2>From stranger to booked job</h2>
  <p class="lead" style="margin-top:8px">Every page is built around one action: get the customer to send you a job.</p>

  <div class="flow" style="margin-top:16px">
    ${[['1','Discover','Finds you via flyer QR, a shared video, search or word of mouth.'],
       ['2','Quote','Sends the fault in seconds — quick-quote form or the full booking form.'],
       ['3','Book','Picks a date and time window; the request lands with you instantly.'],
       ['4','Fixed','You diagnose, quote honestly and repair. Job tracked in the portal.'],
       ['5','Review','Prompted to leave a review, which brings the next customer.']]
      .map(([n,h,d])=>`<div class="st"><div class="n">${n}</div><h4>${h}</h4><p>${d}</p></div>`).join('')}
  </div>

  <div class="kick">What's on the site</div>
  <div class="g2">
    ${[['Hero &amp; promise','Leads with “Don\'t buy a new one. We fix it for you.” and a quick-quote form the visitor can fill without scrolling.'],
       ['Service lines','Every service with its description, included items and “quotes from” price — all driven by the admin list.'],
       ['How it works','Four steps from broken to fixed, so expectations are set before contact.'],
       ['Job specification','Scope of work, pricing &amp; terms, what you need from them, and your commitments — published openly.'],
       ['Booking form','Name, phone, email, service, preferred date &amp; time window, address and fault description.'],
       ['Two-way delivery','Booking sends by <b>email</b> or <b>WhatsApp</b> — the customer chooses, both reach you.'],
       ['Reviews','A one-tap review request. Collects by email today; switches to Google the moment a review link is added.'],
       ['Mobile &amp; QR','Fully responsive with no sideways scroll, and every flyer carries a QR straight to the site.']]
      .map(([h,d])=>`<div class="card"><h3>${h}</h3><p>${d}</p></div>`).join('')}
  </div>

  <div class="kick">How a booking reaches you</div>
  <div class="ok">
    <b>Bookings are delivered directly to you.</b> The form composes a complete message — name, phone, service,
    preferred date/time, address and the fault — and sends it to <b>${EMAIL}</b>, or opens WhatsApp to
    <b>${PHONE}</b>. Nothing sits in a queue waiting to be checked.
  </div>
  <div class="note" style="margin-top:10px">
    <b>Worth knowing:</b> the site is a fast static site with no server database. Bookings therefore arrive in your
    inbox/WhatsApp rather than appearing automatically inside the portal — you log them under
    <b>Bookings &amp; Jobs</b> to track them. Admin data is stored in the browser you use. A small backend can be
    added later if you want bookings to land in the portal automatically across devices.
  </div>
</div>`)}

${page(3,3,`
<div class="body">
  <div class="logo"><div class="mark">P4</div><div>
    <div class="lname" style="color:var(--navy)">EMINENT GLOBAL</div>
    <div class="lsub" style="color:var(--amber-d)">Fix • Restore • Maintain</div></div></div>

  <div class="kick">Admin portal — access &amp; roles</div>
  <h2>Who can get in, and what they control</h2>

  <div class="g2" style="margin-top:14px">
    <div class="card" style="border-left:4px solid var(--amber)">
      <h3>Access</h3>
      <p><b>URL:</b> ${WEB}/admin<br>
         <b>Sign-in:</b> PIN (default <b>4321</b> — change it in Settings)<br>
         <b>Session:</b> stays signed in for the browser session; “Sign out” ends it<br>
         <b>Visibility:</b> not linked from the public site navigation and marked no-index</p>
    </div>
    <div class="card" style="border-left:4px solid var(--navy)">
      <h3>Roles today</h3>
      <p>The portal has a <b>single Administrator role</b> protected by one shared PIN. There are no separate
         staff logins or per-person permissions yet — anyone with the PIN has full access to everything below.
         Multi-user roles can be added if you take on staff.</p>
    </div>
  </div>

  <div class="kick">What the Administrator can do</div>
  <table>
    <thead><tr><th style="width:26%">Area</th><th>Rights &amp; features</th></tr></thead>
    <tbody>
      ${TABS.map(([t,d])=>`<tr><td><b style="color:var(--navy)">${t}</b></td>
        <td style="color:var(--ink2)">${d}</td></tr>`).join('')}
    </tbody>
  </table>

  <div class="kick">Marketing kit included</div>
  <div class="g2">
    <div class="card"><h3>8 flyers</h3>
      <p><span class="tick">✓</span> Don't Replace It · Services Menu · Before You Buy New · Same-Week Booking · Free Quote<br>
         <span class="tick">✓</span> Plus one per new line: HVAC, Painting, Power Washing<br>
         Each as a social PNG and a print-ready PDF, with your phone, email, service area and a QR to the site.</p></div>
    <div class="card"><h3>8 videos</h3>
      <p><span class="tick">✓</span> Don't Replace It · What We Fix · How It Works · Free Quote · Book Today<br>
         <span class="tick">✓</span> Plus HVAC, Painting and Power Washing<br>
         Vertical 1080×1920, ~10–14 seconds — sized for WhatsApp status, Reels, TikTok and Shorts.</p></div>
  </div>

  <div class="kick">Security notes</div>
  <div class="note">
    The PIN is the only barrier to the portal — keep it private and change it from the default. Because admin data
    lives in the browser, signing in from a different device or clearing site data starts from the saved defaults.
    Nothing sensitive about customers is stored in the portal beyond what you type into a job record.
  </div>
</div>`)}

</body></html>`;

fs.writeFileSync(OUT, html);
console.log('wrote overview.html');
