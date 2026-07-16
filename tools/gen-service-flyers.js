/* Per-service flyers: HVAC, Painting, Power Washing.
   Run AFTER gen-flyers.js (it writes qr-site.svg), then run render-flyers.js. */
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';

const PHONE='(347) 812-9270', EMAIL='samuel.jumbo@gmail.com', WEB='p4eminentglobal.com';
const AREA='Houston, TX', AREA_LONG='Houston, TX & surrounding areas';

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`;
const CSS = `
:root{--navy:#0F2233;--navy2:#17324A;--navy3:#0A1826;--amber:#F5A623;--amber-d:#D98A0B;
      --steel:#5B6B7C;--off:#F7F9FB;--ink:#101922;--ink2:#4A5865;--line:#E3E9EF}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',Arial,sans-serif;display:flex;justify-content:center;background:#2a3340}
.f{width:794px;height:1123px;position:relative;overflow:hidden}
.disp{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;line-height:1.02}
.stripe{position:absolute;left:0;right:0;height:8px;background:repeating-linear-gradient(90deg,var(--amber) 0 30px,var(--navy3) 30px 60px)}
.logo{display:flex;align-items:center;gap:11px}
.mark{width:46px;height:46px;border-radius:10px;background:linear-gradient(135deg,var(--amber),var(--amber-d));
      display:grid;place-items:center;font-family:'Barlow Condensed';font-weight:900;color:var(--navy3);font-size:24px}
.lname{font-family:'Barlow Condensed';font-weight:800;font-size:25px;letter-spacing:.03em;line-height:1}
.lsub{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--amber);font-weight:600;margin-top:3px}
.geo{display:inline-block;background:var(--amber);color:var(--navy3);font-size:12px;font-weight:800;
     letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border-radius:30px}
.pill{display:inline-block;background:rgba(245,166,35,.15);border:1px solid var(--amber);color:var(--amber);
      font-size:12px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;padding:7px 15px;border-radius:30px}
.qr{background:#fff;border-radius:10px;padding:7px;display:inline-block}
.qr img{width:104px;height:104px;display:block}
.qr .cap{font-size:8px;font-weight:800;color:var(--navy);text-align:center;margin-top:2px}
.cta-bar{position:absolute;left:0;right:0;bottom:0;background:var(--navy3);color:#fff;padding:18px 46px;
         display:flex;align-items:center;justify-content:space-between;gap:16px}
.cta-bar .web{font-family:'Barlow Condensed';font-weight:800;font-size:22px;color:#fff}
.cta-bar .c{font-size:13px;font-weight:600;line-height:1.55}
.cta-bar .c b{color:var(--amber)}
.cta-bar .area{font-size:12px;color:var(--amber);font-weight:700;margin-top:2px}
.item{display:flex;align-items:center;gap:14px;padding:13px 0;border-bottom:1px dashed rgba(255,255,255,.16);font-size:19px;font-weight:600}
.item .tick{width:26px;height:26px;border-radius:7px;background:var(--amber);color:var(--navy3);flex-shrink:0;
            display:grid;place-items:center;font-weight:900;font-size:14px}
.item.dark{border-bottom-color:var(--line);color:var(--ink)}
`;

const ctaBar = `
<div class="cta-bar">
  <div>
    <div class="web">${WEB}</div>
    <div class="c">📞 <b>${PHONE}</b> &nbsp;·&nbsp; ✉️ ${EMAIL}</div>
    <div class="area">📍 Serving ${AREA_LONG}</div>
  </div>
  <div class="qr"><img src="qr-site.svg" alt="Scan"><div class="cap">SCAN FOR QUOTE</div></div>
</div>`;

/* one template, three services */
function flyer({ icon, kicker, h1a, h1b, blurb, items, from, dark, accentNote }) {
  const bg   = dark ? 'var(--navy)' : '#fff';
  const fg   = dark ? '#fff' : 'var(--navy)';
  const body = dark ? '#BCCBD9' : 'var(--ink2)';
  const lsub = dark ? '' : 'style="color:var(--amber-d)"';
  const glow = dark
    ? `<div style="position:absolute;inset:0;background:radial-gradient(680px 460px at 82% 10%,rgba(245,166,35,.22),transparent 62%)"></div>` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">${FONTS}<style>${CSS}</style></head><body>
<div class="f" style="background:${bg}">
  ${glow}
  <div class="stripe" style="top:0"></div>
  <div style="position:absolute;left:46px;right:46px;top:50px;color:${fg}">
    <div class="logo"><div class="mark">P4</div><div>
      <div class="lname" style="color:${fg}">EMINENT GLOBAL</div><div class="lsub" ${lsub}>Fix • Restore • Maintain</div></div></div>

    <div style="margin-top:34px;display:flex;gap:10px;flex-wrap:wrap;align-items:center">
      <span class="${dark?'pill':'geo'}" ${dark?'':'style="background:var(--navy);color:var(--amber)"'}>${kicker}</span>
      <span class="geo">📍 ${AREA}</span>
    </div>

    <div style="font-size:96px;margin-top:14px;line-height:1">${icon}</div>
    <div class="disp" style="font-size:76px;margin-top:10px;color:${fg}">${h1a}</div>
    <div class="disp" style="font-size:76px;color:var(--amber${dark?'':'-d'})">${h1b}</div>
    <div style="font-size:18px;color:${body};margin-top:18px;max-width:46ch;line-height:1.5">${blurb}</div>

    <div style="margin-top:24px">
      ${items.map(i=>`<div class="item ${dark?'':'dark'}"><span class="tick">✓</span>${i}</div>`).join('')}
    </div>

    <div style="margin-top:26px;display:flex;align-items:center;justify-content:space-between;gap:16px;
                background:${dark?'rgba(245,166,35,1)':'var(--navy)'};color:${dark?'var(--navy3)':'#fff'};
                border-radius:12px;padding:16px 22px">
      <div>
        <div class="disp" style="font-size:28px">FREE QUOTE — NO OBLIGATION</div>
        <div style="font-size:12.5px;font-weight:600">${accentNote}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;opacity:.8">From</div>
        <div class="disp" style="font-size:40px">$${from}</div>
      </div>
    </div>
  </div>
  ${ctaBar}
</div></body></html>`;
}

const SET = {
  'flyer-hvac': flyer({
    icon:'❄️', kicker:'HVAC Services', h1a:"DON'T REPLACE", h1b:'YOUR AC.',
    blurb:'Houston heat is no joke. Before you spend thousands on a new unit, let us diagnose and repair the one you have.',
    items:['AC repair &amp; recharge','Heating &amp; furnace repair','Thermostat supply &amp; install','Duct &amp; vent cleaning','Seasonal servicing &amp; tune-ups'],
    from:'95', dark:true, accentNote:'We only recommend a new unit when repair genuinely isn\'t worth it.' }),

  'flyer-painting': flyer({
    icon:'🎨', kicker:'Interior &amp; Exterior Painting', h1a:'FRESH PAINT,', h1b:'INSIDE &amp; OUT.',
    blurb:'Don\'t move — refresh it. Proper prep, clean lines and a finish that actually lasts, inside the home and out.',
    items:['Interior walls &amp; ceilings','Exterior siding &amp; trim','Cabinets &amp; doors','Prep, patching &amp; priming','Deck &amp; fence staining'],
    from:'150', dark:false, accentNote:'Free colour advice · Tidy, protected work area · On-time finish.' }),

  'flyer-powerwash': flyer({
    icon:'💦', kicker:'Power Washing', h1a:'MAKE IT LOOK', h1b:'NEW AGAIN.',
    blurb:'Walls, driveways and decks don\'t need replacing — they need cleaning. See the difference in a single visit.',
    items:['Walls &amp; siding','Driveways &amp; walkways','Decks &amp; patios','Fences &amp; gates','Gutters &amp; roofline'],
    from:'120', dark:true, accentNote:'Restored, not replaced — a fraction of the cost of new.' }),
};

Object.entries(SET).forEach(([n,html]) => fs.writeFileSync(D+n+'.html', html));
console.log('wrote', Object.keys(SET).length, 'service flyers:', Object.keys(SET).join(', '));
