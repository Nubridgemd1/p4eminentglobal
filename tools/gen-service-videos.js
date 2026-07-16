/* Per-service vertical videos: HVAC, Painting, Power Washing. Run then record-videos.js */
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';
const PHONE='(347) 812-9270', WEB='p4eminentglobal.com', AREA='Houston, TX';

const SHELL = (scenes, timeline) => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--navy:#0F2233;--navy2:#17324A;--navy3:#0A1826;--amber:#F5A623;--amber-d:#D98A0B}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;overflow:hidden;background:var(--navy3);font-family:'Inter',Arial,sans-serif}
.stage{position:relative;width:1080px;height:1920px;overflow:hidden}
.bg{position:absolute;inset:0;background:radial-gradient(1100px 800px at 50% 22%,var(--navy2) 0%,var(--navy) 45%,var(--navy3) 100%)}
.blob{position:absolute;border-radius:50%;background:rgba(245,166,35,.10);filter:blur(3px)}
.stripe{position:absolute;left:0;right:0;height:14px;background:repeating-linear-gradient(90deg,var(--amber) 0 46px,var(--navy3) 46px 92px)}
.geo{position:absolute;top:96px;left:0;right:0;text-align:center;font-size:24px;font-weight:800;letter-spacing:.2em;
     text-transform:uppercase;color:var(--amber);z-index:15}
.scene{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;padding:150px 90px;text-align:center}
.disp{font-family:'Barlow Condensed',Arial,sans-serif;font-weight:800;line-height:1.02;color:#fff}
.amber{color:var(--amber)}
.icon{font-size:190px;line-height:1}
.kick{font-size:30px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--amber)}
.big{font-size:104px}.mid{font-size:78px}
.sub{font-size:34px;color:#BCCBD9;font-weight:500;margin-top:28px;line-height:1.45;max-width:23ch}
.list{display:flex;flex-direction:column;gap:20px;width:100%;max-width:720px;margin-top:38px}
.li{display:flex;align-items:center;gap:22px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
    border-radius:20px;padding:22px 26px;text-align:left;font-size:34px;font-weight:600;color:#fff}
.li .t{width:52px;height:52px;border-radius:14px;background:var(--amber);color:var(--navy3);display:grid;place-items:center;
       font-weight:900;font-size:26px;flex-shrink:0}
.price{display:inline-flex;align-items:baseline;gap:14px;background:var(--amber);color:var(--navy3);
       border-radius:24px;padding:20px 40px;margin-top:36px}
.price .l{font-size:24px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}
.price .v{font-family:'Barlow Condensed';font-weight:900;font-size:64px}
.qr{background:#fff;border-radius:26px;padding:24px;box-shadow:0 22px 50px rgba(0,0,0,.4)}
.qr img{width:280px;height:280px;display:block}
.cta{font-size:42px;color:#fff;font-weight:700;margin-top:16px}.cta b{color:var(--amber)}
.web{font-family:'Barlow Condensed';font-weight:800;font-size:50px;color:#fff;margin-top:8px}
.pbar{position:absolute;top:56px;left:80px;right:80px;height:9px;background:rgba(255,255,255,.2);border-radius:6px;overflow:hidden;z-index:20}
.pfill{position:absolute;inset:0 auto 0 0;width:0;background:var(--amber);border-radius:6px}
.fadeUp{animation:fadeUp .85s cubic-bezier(.2,.7,.3,1) forwards}
.pop{animation:pop 1s cubic-bezier(.2,.8,.2,1) forwards}
@keyframes fadeUp{from{opacity:0;transform:translateY(46px)}to{opacity:1;transform:none}}
@keyframes pop{0%{opacity:0;transform:scale(.84)}60%{opacity:1;transform:scale(1.03)}100%{opacity:1;transform:scale(1)}}
.d1{animation-delay:.12s}.d2{animation-delay:.34s}.d3{animation-delay:.56s}.d4{animation-delay:.78s}.d5{animation-delay:1s}
</style></head><body>
<div class="stage">
  <div class="bg"></div>
  <div class="stripe" style="top:0"></div><div class="stripe" style="bottom:0"></div>
  <div class="blob" style="width:560px;height:560px;left:-180px;top:-140px"></div>
  <div class="blob" style="width:440px;height:440px;right:-150px;bottom:180px"></div>
  <div class="pbar"><div class="pfill" id="pfill"></div></div>
  <div class="geo">📍 ${AREA}</div>
  ${scenes}
</div>
<script>
const scenes = ${JSON.stringify(timeline)};
const OUT=450; let t=1500;
const total = scenes.reduce((a,s)=>a+s.in+s.hold+OUT,0)+1500+600;
const pfill=document.getElementById('pfill');
function show(id){const e=document.getElementById(id);e.style.transition='opacity .45s ease';e.style.opacity='1';
  e.querySelectorAll('.fadeUp,.pop').forEach(n=>{n.style.animation='none';void n.offsetWidth;n.style.animation='';});}
function hide(id){const e=document.getElementById(id);e.style.transition='opacity .45s ease';e.style.opacity='0';}
scenes.forEach(s=>{setTimeout(()=>show(s.el),t);setTimeout(()=>hide(s.el),t+s.in+s.hold);t+=s.in+s.hold+OUT;});
const start=performance.now();
(function tick(now){const p=Math.min(1,((now||start)-start)/total);pfill.style.width=(p*100)+'%';
  if(p<1)requestAnimationFrame(tick);})(start);
window.__DURATION__=total;
</script></body></html>`;

function build({ icon, kicker, h1a, h1b, sub, items, from }) {
  const scenes = [
    `<div class="scene" id="s1"><div class="icon pop d1">${icon}</div>
      <div class="kick fadeUp d3" style="margin-top:24px">${kicker}</div>
      <div class="disp big fadeUp d4" style="margin-top:14px">${h1a}<br><span class="amber">${h1b}</span></div></div>`,
    `<div class="scene" id="s2"><div class="kick fadeUp d1">What's included</div>
      <div class="list">
        ${items.map((i,n)=>`<div class="li fadeUp d${Math.min(n+1,5)}"><div class="t">✓</div>${i}</div>`).join('')}
      </div></div>`,
    `<div class="scene" id="s3"><div class="disp mid fadeUp d1">${sub}</div>
      <div class="price pop d2"><span class="l">From</span><span class="v">$${from}</span></div>
      <div class="sub fadeUp d3" style="font-size:28px">Free quote · No obligation</div></div>`,
    `<div class="scene" id="s4"><div class="disp mid fadeUp d1">GET YOUR<br><span class="amber">FREE QUOTE</span></div>
      <div class="qr pop d2" style="margin-top:40px"><img src="qr-site.svg" alt="Scan"></div>
      <div class="cta fadeUp d3" style="margin-top:28px">📞 <b>${PHONE}</b></div>
      <div class="web fadeUp d4">${WEB}</div>
      <div class="sub fadeUp d5" style="font-size:26px;margin-top:14px">Serving ${AREA}</div></div>`,
  ];
  const timeline = [{el:'s1',in:350,hold:2000},{el:'s2',in:350,hold:3000},
                    {el:'s3',in:350,hold:2000},{el:'s4',in:350,hold:2700}];
  return SHELL(scenes.join('\n'), timeline);
}

const SET = {
  'video-hvac': build({ icon:'❄️', kicker:'HVAC Services', h1a:"DON'T REPLACE", h1b:'YOUR AC.',
    sub:'WE FIX IT<br><span class="amber">FOR YOU.</span>',
    items:['AC repair &amp; recharge','Heating &amp; furnace','Thermostats','Duct &amp; vent cleaning'], from:'95' }),
  'video-painting': build({ icon:'🎨', kicker:'Interior &amp; Exterior Painting', h1a:'FRESH PAINT,', h1b:'INSIDE &amp; OUT.',
    sub:"DON'T MOVE.<br><span class=\"amber\">REFRESH IT.</span>",
    items:['Walls &amp; ceilings','Siding &amp; trim','Cabinets &amp; doors','Decks &amp; fences'], from:'150' }),
  'video-powerwash': build({ icon:'💦', kicker:'Power Washing', h1a:'MAKE IT LOOK', h1b:'NEW AGAIN.',
    sub:'RESTORED,<br><span class="amber">NOT REPLACED.</span>',
    items:['Walls &amp; siding','Driveways','Decks &amp; patios','Fences &amp; gutters'], from:'120' }),
};

Object.entries(SET).forEach(([n,h]) => fs.writeFileSync(D+n+'.html', h));
console.log('wrote', Object.keys(SET).length, 'service videos:', Object.keys(SET).join(', '));
