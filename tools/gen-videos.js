const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';

const PHONE='(347) 812-9270', WEB='p4eminentglobal.com', AREA='Houston, TX';

const SHELL = (scenes, timeline) => `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--navy:#0F2233;--navy2:#17324A;--navy3:#0A1826;--amber:#F5A623;--amber-d:#D98A0B;--steel:#8FA3B6}
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
.mark{width:150px;height:150px;border-radius:32px;background:linear-gradient(135deg,var(--amber),var(--amber-d));
      display:grid;place-items:center;font-family:'Barlow Condensed';font-weight:900;color:var(--navy3);font-size:76px;
      box-shadow:0 22px 60px rgba(0,0,0,.4)}
.bname{font-family:'Barlow Condensed';font-weight:800;font-size:78px;color:#fff;letter-spacing:.05em;margin-top:44px}
.bsub{font-size:26px;color:var(--amber);letter-spacing:.24em;text-transform:uppercase;font-weight:600;margin-top:16px}
.kick{font-size:30px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--amber)}
.big{font-size:110px}.mid{font-size:80px}
.sub{font-size:36px;color:#BCCBD9;font-weight:500;margin-top:30px;line-height:1.45;max-width:22ch}
.chips{display:flex;flex-wrap:wrap;gap:22px;justify-content:center;max-width:900px;margin-top:40px}
.chip{font-size:36px;font-weight:700;color:#fff;background:rgba(255,255,255,.08);border:2px solid rgba(245,166,35,.5);
      padding:20px 36px;border-radius:60px}
.steps{display:flex;flex-direction:column;gap:22px;width:100%;max-width:760px;margin-top:40px}
.step{display:flex;align-items:center;gap:26px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);
      border-radius:22px;padding:24px 28px;text-align:left}
.step .n{width:64px;height:64px;border-radius:16px;background:var(--amber);color:var(--navy3);display:grid;place-items:center;
      font-family:'Barlow Condensed';font-weight:800;font-size:36px;flex-shrink:0}
.step .h{font-family:'Barlow Condensed';font-weight:800;font-size:40px;color:#fff}
.step .d{font-size:22px;color:#A9BDD1;margin-top:2px}
.pill{display:inline-block;background:rgba(245,166,35,.16);border:2px solid var(--amber);color:var(--amber);
      font-size:28px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;padding:16px 34px;border-radius:60px}
.qr{background:#fff;border-radius:26px;padding:24px;box-shadow:0 22px 50px rgba(0,0,0,.4)}
.qr img{width:290px;height:290px;display:block}
.cta{font-size:44px;color:#fff;font-weight:700;margin-top:16px}
.cta b{color:var(--amber)}
.phone{font-family:'Barlow Condensed';font-weight:900;font-size:96px;color:var(--amber)}
.web{font-family:'Barlow Condensed';font-weight:800;font-size:52px;color:#fff;letter-spacing:.03em;margin-top:10px}
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

const brandScene = (id) => `<div class="scene" id="${id}">
  <div class="mark pop d1">P4</div>
  <div class="bname fadeUp d3">EMINENT GLOBAL</div>
  <div class="bsub fadeUp d4">Fix • Restore • Maintain</div></div>`;

const ctaScene = (id, headline) => `<div class="scene" id="${id}">
  <div class="disp mid fadeUp d1">${headline}</div>
  <div class="qr pop d2" style="margin-top:40px"><img src="qr-site.svg" alt="Scan"></div>
  <div class="cta fadeUp d3" style="margin-top:30px">📞 <b>${PHONE}</b></div>
  <div class="web fadeUp d4">${WEB}</div>
  <div class="sub fadeUp d5" style="font-size:28px;margin-top:16px">Serving ${AREA} · Free quotes</div></div>`;

const VIDEOS = {
  video1: { scenes: [
      brandScene('s1'),
      `<div class="scene" id="s2"><div class="disp big fadeUp d1">DON'T BUY<br>A NEW ONE.</div></div>`,
      `<div class="scene" id="s3"><div class="disp big fadeUp d1">WE FIX IT<br><span class="amber">FOR YOU.</span></div>
        <div class="sub fadeUp d3">Repairs &amp; restoration at a fraction of replacement cost.</div></div>`,
      ctaScene('s4','GET OUR<br><span class="amber">QUOTE</span>')],
    timeline: [{el:'s1',in:350,hold:1350},{el:'s2',in:350,hold:1500},{el:'s3',in:350,hold:2000},{el:'s4',in:350,hold:2800}] },
  video2: { scenes: [
      brandScene('s1'),
      `<div class="scene" id="s2"><div class="kick fadeUp d1">What we fix</div>
        <div class="chips">
          <div class="chip fadeUp d1">🛠️ Handyman</div><div class="chip fadeUp d1">❄️ HVAC</div>
          <div class="chip fadeUp d2">🎨 Painting</div><div class="chip fadeUp d3">💦 Power Washing</div>
          <div class="chip fadeUp d4">🔌 Electronics</div><div class="chip fadeUp d4">🧰 Appliances</div>
          <div class="chip fadeUp d5">⚙️ Equipment</div></div>
        <div class="sub fadeUp d5">If it's broken — start with us.</div></div>`,
      `<div class="scene" id="s3"><div class="disp mid fadeUp d1">INSTEAD OF BUYING<br>A NEW ONE,<br><span class="amber">WE FIX IT.</span></div></div>`,
      ctaScene('s4','GET A<br><span class="amber">FREE QUOTE</span>')],
    timeline: [{el:'s1',in:350,hold:1200},{el:'s2',in:350,hold:2400},{el:'s3',in:350,hold:1800},{el:'s4',in:350,hold:2600}] },
  video3: { scenes: [
      `<div class="scene" id="s1"><div class="kick fadeUp d1">How it works</div>
        <div class="disp mid fadeUp d2" style="margin-top:20px">BROKEN TO FIXED<br>IN <span class="amber">4 STEPS</span></div></div>`,
      `<div class="scene" id="s2"><div class="steps">
        <div class="step fadeUp d1"><div class="n">1</div><div><div class="h">TELL US</div><div class="d">Send a photo and what's wrong</div></div></div>
        <div class="step fadeUp d2"><div class="n">2</div><div><div class="h">GET A QUOTE</div><div class="d">Free, honest, no obligation</div></div></div>
        <div class="step fadeUp d3"><div class="n">3</div><div><div class="h">WE FIX IT</div><div class="d">Booked in and repaired properly</div></div></div>
        <div class="step fadeUp d4"><div class="n">4</div><div><div class="h">BACK IN USE</div><div class="d">Keep it — and keep your money</div></div></div>
      </div></div>`,
      ctaScene('s3','START<br><span class="amber">TODAY</span>')],
    timeline: [{el:'s1',in:350,hold:1700},{el:'s2',in:350,hold:3200},{el:'s3',in:350,hold:2600}] },
  video4: { scenes: [
      `<div class="scene" id="s1"><div class="pill fadeUp d1">Free · No obligation</div>
        <div class="disp big fadeUp d2" style="margin-top:34px">GET OUR<br><span class="amber">QUOTE</span></div></div>`,
      `<div class="scene" id="s2"><div class="disp mid fadeUp d1">TELL US WHAT'S<br>BROKEN.</div>
        <div class="sub fadeUp d2">We'll tell you what it costs to fix — and we'll be honest if it isn't worth it.</div></div>`,
      ctaScene('s3','SCAN ·<br><span class="amber">CALL · EMAIL</span>')],
    timeline: [{el:'s1',in:350,hold:1700},{el:'s2',in:350,hold:2200},{el:'s3',in:350,hold:2800}] },
  video5: { scenes: [
      `<div class="scene" id="s1"><div class="pill fadeUp d1">📅 Same-week appointments</div>
        <div class="disp big fadeUp d2" style="margin-top:34px">BOOK YOUR<br><span class="amber">REPAIR</span><br>TODAY</div></div>`,
      `<div class="scene" id="s2"><div class="kick fadeUp d1">Call or WhatsApp</div>
        <div class="phone fadeUp d2" style="margin-top:26px">${PHONE}</div>
        <div class="sub fadeUp d3">Mon–Sat · 8:00 AM – 6:00 PM · ${AREA}</div></div>`,
      ctaScene('s3','BOOK<br><span class="amber">NOW</span>')],
    timeline: [{el:'s1',in:350,hold:1900},{el:'s2',in:350,hold:2000},{el:'s3',in:350,hold:2600}] },
};

Object.entries(VIDEOS).forEach(([n,v]) => fs.writeFileSync(D+n+'.html', SHELL(v.scenes.join('\n'), v.timeline)));
console.log('wrote 5 video stories (Houston, TX)');
