const NM='C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules';
const QRCode = require(NM+'/qrcode');
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';

const SITE  = 'https://p4eminentglobal.com';
const PHONE = '(347) 812-9270';
const EMAIL = 'samuel.jumbo@gmail.com';
const WEB   = 'p4eminentglobal.com';
const AREA  = 'Houston, TX';
const AREA_LONG = 'Houston, TX & surrounding areas';

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;

const CSS = `
:root{--navy:#0F2233;--navy2:#17324A;--navy3:#0A1826;--amber:#F5A623;--amber-d:#D98A0B;
      --steel:#5B6B7C;--off:#F7F9FB;--ink:#101922;--ink2:#4A5865;--line:#E3E9EF}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',Arial,sans-serif;display:flex;justify-content:center;background:#2a3340}
.f{width:794px;height:1123px;position:relative;overflow:hidden;background:#fff}
.disp{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;line-height:1.02;letter-spacing:.005em}
.stripe{position:absolute;left:0;right:0;height:8px;background:repeating-linear-gradient(90deg,var(--amber) 0 30px,var(--navy3) 30px 60px)}
.logo{display:flex;align-items:center;gap:11px}
.mark{width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,var(--amber),var(--amber-d));
      display:grid;place-items:center;font-family:'Barlow Condensed';font-weight:900;color:var(--navy3);font-size:24px}
.lname{font-family:'Barlow Condensed';font-weight:800;font-size:25px;letter-spacing:.03em;line-height:1}
.lsub{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--amber);font-weight:600;margin-top:3px}
.qr{background:#fff;border-radius:10px;padding:7px;display:inline-block}
.qr img{width:104px;height:104px;display:block}
.qr .cap{font-size:8px;font-weight:800;color:var(--navy);text-align:center;margin-top:2px}
.cta-bar{position:absolute;left:0;right:0;bottom:0;background:var(--navy3);color:#fff;padding:18px 46px;
         display:flex;align-items:center;justify-content:space-between;gap:16px}
.cta-bar .web{font-family:'Barlow Condensed';font-weight:800;font-size:22px;color:#fff}
.cta-bar .c{font-size:13px;font-weight:600;line-height:1.55}
.cta-bar .c b{color:var(--amber)}
.cta-bar .area{font-size:12px;color:var(--amber);font-weight:700;margin-top:2px}
.pill{display:inline-block;background:rgba(245,166,35,.15);border:1px solid var(--amber);color:var(--amber);
      font-size:12px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;padding:7px 15px;border-radius:30px}
.geo{display:inline-block;background:var(--amber);color:var(--navy3);font-size:12px;font-weight:800;
     letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border-radius:30px}
`;

const page = (body, extra='') => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">${FONTS}
<style>${CSS}${extra}</style></head><body>${body}</body></html>`;

const ctaBar = (line) => `
<div class="cta-bar">
  <div>
    <div class="web">${WEB}</div>
    <div class="c">${line}</div>
    <div class="area">📍 Serving ${AREA_LONG}</div>
  </div>
  <div class="qr"><img src="qr-site.svg" alt="Scan"><div class="cap">SCAN FOR QUOTE</div></div>
</div>`;

const contactLine = `📞 <b>${PHONE}</b> &nbsp;·&nbsp; ✉️ ${EMAIL}`;

/* 1. hero */
const f1 = page(`
<div class="f" style="background:var(--navy)">
  <div style="position:absolute;inset:0;background:radial-gradient(700px 460px at 80% 8%,rgba(245,166,35,.22),transparent 62%)"></div>
  <div class="stripe" style="top:0"></div>
  <div style="position:absolute;left:46px;right:46px;top:52px;color:#fff">
    <div class="logo"><div class="mark">P4</div><div><div class="lname" style="color:#fff">EMINENT GLOBAL</div><div class="lsub">Fix • Restore • Maintain</div></div></div>
    <div style="margin-top:40px;display:flex;gap:10px;flex-wrap:wrap">
      <span class="pill">Handyman · Electronics · Equipment</span>
      <span class="geo">📍 ${AREA}</span>
    </div>
    <div class="disp" style="font-size:100px;margin-top:22px;color:#fff">DON'T BUY<br>A NEW ONE.</div>
    <div class="disp" style="font-size:100px;color:var(--amber);margin-top:2px">WE FIX IT<br>FOR YOU.</div>
    <div style="font-size:19px;color:#BCCBD9;margin-top:24px;max-width:44ch;line-height:1.5">
      Repairs and restoration for your home, office and equipment — done properly,
      at a fraction of replacement cost.</div>
    <div style="margin-top:28px;display:inline-block;background:var(--amber);color:var(--navy3);
                font-family:'Barlow Condensed';font-weight:800;font-size:30px;padding:15px 34px;border-radius:10px">
      GET OUR QUOTES — FREE</div>
  </div>
  ${ctaBar(contactLine)}
</div>`);

/* 2. services */
const svc = [
  ['🛠️','HANDYMAN &amp; REPAIRS','Doors · drywall · mounting · assembly · fixtures','75'],
  ['🔌','ELECTRONICS REPAIR','TVs · laptops · audio · power supplies','60'],
  ['🧰','APPLIANCE RESTORATION','Washers · dryers · microwaves · cookers','90'],
  ['⚙️','EQUIPMENT SERVICING','Generators · power tools · pumps · motors','120'],
];
const f2 = page(`
<div class="f" style="background:var(--off)">
  <div style="background:var(--navy);padding:32px 46px 28px;color:#fff;position:relative">
    <div class="logo"><div class="mark">P4</div><div><div class="lname" style="color:#fff">EMINENT GLOBAL</div><div class="lsub">Fix • Restore • Maintain</div></div></div>
    <div style="display:flex;align-items:center;gap:12px;margin-top:22px;flex-wrap:wrap">
      <div class="disp" style="font-size:54px">WHAT WE FIX</div><span class="geo">📍 ${AREA}</span></div>
    <div style="font-size:16px;color:#BCCBD9;margin-top:4px">Instead of buying a new one — we fix it for you.</div>
    <div class="stripe" style="bottom:0"></div>
  </div>
  <div style="padding:26px 46px 0">
    ${svc.map(([i,n,d,p])=>`
      <div style="background:#fff;border:1px solid var(--line);border-left:5px solid var(--amber);border-radius:12px;
                  padding:18px 22px;margin-bottom:13px;display:flex;align-items:center;gap:18px">
        <div style="font-size:34px">${i}</div>
        <div style="flex:1">
          <div class="disp" style="font-size:29px;color:var(--navy)">${n}</div>
          <div style="font-size:13.5px;color:var(--ink2);margin-top:3px">${d}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:var(--ink2);text-transform:uppercase;letter-spacing:.08em;font-weight:700">From</div>
          <div class="disp" style="font-size:34px;color:var(--navy)">$${p}</div>
        </div>
      </div>`).join('')}
    <div style="text-align:center;font-size:15px;color:var(--ink2);margin-top:4px">
      Free, no-obligation quotes · We only recommend replacing when repair isn't worth it.</div>
  </div>
  ${ctaBar(contactLine)}
</div>`);

/* 3. comparison */
const f3 = page(`
<div class="f" style="background:#fff">
  <div class="stripe" style="top:0"></div>
  <div style="padding:54px 46px 0">
    <div class="logo"><div class="mark">P4</div><div><div class="lname" style="color:var(--navy)">EMINENT GLOBAL</div><div class="lsub" style="color:var(--amber-d)">Fix • Restore • Maintain</div></div></div>
    <div class="disp" style="font-size:60px;color:var(--navy);margin-top:32px">BEFORE YOU BUY<br>A NEW ONE…</div>
    <div style="font-size:17px;color:var(--ink2);margin-top:10px;max-width:50ch">Most things people replace could have been repaired for less. Here's the honest maths.</div>

    <div style="display:flex;gap:16px;margin-top:28px">
      <div style="flex:1;border:2px solid var(--line);border-radius:14px;padding:22px;background:var(--off)">
        <div style="font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--ink2);text-transform:uppercase">Buying new</div>
        <div class="disp" style="font-size:52px;color:var(--steel);margin-top:8px">$$$$</div>
        <div style="margin-top:14px;font-size:14px;color:var(--ink2);line-height:1.9">
          ✗ Full replacement cost<br>✗ Delivery &amp; setup wait<br>✗ Old unit to landfill<br>✗ Learning a new machine</div>
      </div>
      <div style="flex:1;border:2px solid var(--amber);border-radius:14px;padding:22px;background:#FFF9EF;position:relative">
        <div style="position:absolute;top:-12px;right:16px;background:var(--amber);color:var(--navy3);font-size:10.5px;
                    font-weight:800;letter-spacing:.1em;padding:4px 11px;border-radius:20px">SMARTER</div>
        <div style="font-size:11px;font-weight:800;letter-spacing:.12em;color:var(--amber-d);text-transform:uppercase">Fixing it</div>
        <div class="disp" style="font-size:52px;color:var(--navy);margin-top:8px">$</div>
        <div style="margin-top:14px;font-size:14px;color:var(--ink);line-height:1.9">
          ✓ A fraction of the price<br>✓ Often same-week<br>✓ Keeps it out of landfill<br>✓ Keep what you know</div>
      </div>
    </div>

    <div style="margin-top:26px;background:var(--navy);color:#fff;border-radius:14px;padding:22px 26px">
      <div class="disp" style="font-size:33px">INSTEAD OF BUYING A NEW ONE,<br><span style="color:var(--amber)">WE FIX IT FOR YOU.</span></div>
      <div style="font-size:14.5px;color:#BCCBD9;margin-top:7px">Free quote first. If repair isn't worth it, we'll say so. Serving ${AREA_LONG}.</div>
    </div>
  </div>
  ${ctaBar(contactLine)}
</div>`);

/* 4. booking */
const f4 = page(`
<div class="f" style="background:var(--navy2)">
  <div style="position:absolute;inset:0;background:radial-gradient(600px 400px at 15% 85%,rgba(245,166,35,.2),transparent 60%)"></div>
  <div class="stripe" style="top:0"></div>
  <div style="position:absolute;left:46px;right:46px;top:52px;color:#fff">
    <div class="logo"><div class="mark">P4</div><div><div class="lname" style="color:#fff">EMINENT GLOBAL</div><div class="lsub">Fix • Restore • Maintain</div></div></div>
    <div style="margin-top:36px;display:flex;gap:10px;flex-wrap:wrap">
      <span class="pill">📅 Same-week appointments</span><span class="geo">📍 ${AREA}</span></div>
    <div class="disp" style="font-size:80px;margin-top:18px">BOOK YOUR<br><span style="color:var(--amber)">REPAIR TODAY</span></div>
    <div style="font-size:18px;color:#BCCBD9;margin-top:14px;max-width:46ch">Broken today, booked this week. Tell us what's wrong and pick a time that suits you.</div>

    <div style="margin-top:30px;display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[['1','TELL US','Send a photo and what\'s wrong'],['2','GET A QUOTE','Free, honest, no obligation'],
         ['3','WE FIX IT','Booked in and repaired properly'],['4','BACK IN USE','Keep it — and keep your money']]
        .map(([n,h,d])=>`
        <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:16px">
          <div style="width:30px;height:30px;border-radius:8px;background:var(--amber);color:var(--navy3);
                      display:grid;place-items:center;font-family:'Barlow Condensed';font-weight:800;font-size:17px">${n}</div>
          <div class="disp" style="font-size:23px;margin-top:8px">${h}</div>
          <div style="font-size:12.5px;color:#A9BDD1;margin-top:3px">${d}</div>
        </div>`).join('')}
    </div>

    <div style="margin-top:26px;background:var(--amber);color:var(--navy3);border-radius:12px;padding:17px 22px;
                display:flex;align-items:center;justify-content:space-between;gap:14px">
      <div>
        <div class="disp" style="font-size:29px">CALL OR WHATSAPP</div>
        <div style="font-size:13px;font-weight:600">Mon–Sat, 8:00 AM – 6:00 PM</div>
      </div>
      <div class="disp" style="font-size:35px">${PHONE}</div>
    </div>
  </div>
  ${ctaBar(`✉️ ${EMAIL}`)}
</div>`);

/* 5. quote */
const f5 = page(`
<div class="f" style="background:#fff">
  <div class="stripe" style="top:0"></div>
  <div style="padding:56px 46px 0;text-align:center">
    <div class="logo" style="justify-content:center"><div class="mark">P4</div><div style="text-align:left"><div class="lname" style="color:var(--navy)">EMINENT GLOBAL</div><div class="lsub" style="color:var(--amber-d)">Fix • Restore • Maintain</div></div></div>

    <div style="margin-top:36px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <span style="display:inline-block;background:var(--navy);color:var(--amber);font-size:12px;font-weight:800;
                letter-spacing:.16em;text-transform:uppercase;padding:8px 18px;border-radius:30px">Free · No obligation</span>
      <span class="geo">📍 ${AREA}</span>
    </div>

    <div class="disp" style="font-size:94px;color:var(--navy);margin-top:18px">GET OUR<br><span style="color:var(--amber-d)">QUOTE</span></div>
    <div style="font-size:19px;color:var(--ink2);margin-top:12px;max-width:44ch;margin-inline:auto;line-height:1.5">
      Tell us what's broken. We'll tell you what it costs to fix — and we'll be honest if it isn't worth it.</div>

    <div style="margin-top:30px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
      ${['🛠️ Handyman','🔌 Electronics','🧰 Appliances','⚙️ Equipment'].map(t=>`
        <span style="border:1.5px solid var(--line);border-radius:30px;padding:9px 18px;font-size:14.5px;font-weight:600;color:var(--ink)">${t}</span>`).join('')}
    </div>

    <div style="margin-top:34px;background:var(--off);border:1px solid var(--line);border-radius:16px;padding:26px;
                display:flex;align-items:center;gap:26px;text-align:left">
      <div class="qr" style="border:1px solid var(--line)"><img src="qr-site.svg" alt="Scan"><div class="cap">SCAN TO GET A QUOTE</div></div>
      <div style="flex:1">
        <div class="disp" style="font-size:31px;color:var(--navy)">SCAN · CALL · EMAIL</div>
        <div style="font-size:16px;color:var(--ink);margin-top:9px;line-height:1.8">
          📞 <b>${PHONE}</b><br>✉️ ${EMAIL}<br>🌐 ${WEB}</div>
      </div>
    </div>

    <div class="disp" style="font-size:29px;color:var(--navy);margin-top:28px">
      INSTEAD OF BUYING A NEW ONE, <span style="color:var(--amber-d)">WE FIX IT FOR YOU.</span></div>
  </div>
  ${ctaBar(`Mon–Sat, 8:00 AM – 6:00 PM · Free quotes`)}
</div>`);

(async () => {
  const svgQR = await QRCode.toString(SITE, { type:'svg', errorCorrectionLevel:'M', margin:1, width:300,
                                              color:{ dark:'#0F2233', light:'#FFFFFF' } });
  fs.writeFileSync(D+'qr-site.svg', svgQR);
  const files = { 'flyer1.html':f1, 'flyer2.html':f2, 'flyer3.html':f3, 'flyer4.html':f4, 'flyer5.html':f5 };
  Object.entries(files).forEach(([n,c]) => fs.writeFileSync(D+n, c));
  console.log('wrote qr + 5 flyer html (Houston, TX)');
})();
