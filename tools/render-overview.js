const NM='C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules';
const { chromium } = require(NM+'/playwright');
const T = __dirname.replace(/\\/g,'/') + '/';

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport:{width:794,height:1123}, deviceScaleFactor:2 });
  await p.goto('file:///'+T+'overview.html', { waitUntil:'networkidle' });
  await p.waitForTimeout(500);

  // overflow guard: no page's content may exceed the 1123px sheet
  const bad = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll('.pg').forEach((pg,i) => {
      const foot = pg.querySelector('.foot').getBoundingClientRect().top;
      let max = 0;
      pg.querySelectorAll('.body > *').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom > max) max = r.bottom;
      });
      if (max > foot - 2) out.push(`page ${i+1}: content ${Math.round(max)} overlaps footer at ${Math.round(foot)}`);
    });
    return out;
  });
  console.log(bad.length ? 'LAYOUT ISSUES:\n  ' + bad.join('\n  ') : 'layout OK — no page overflows');

  await p.pdf({ path: T+'P4-Eminent-Global-Platform-Overview.pdf', width:'794px', height:'1123px',
                printBackground:true, margin:{top:'0',right:'0',bottom:'0',left:'0'} });
  // page-1 preview for a visual check
  await p.locator('.pg').first().screenshot({ path: T+'ov1.png' });
  await p.locator('.pg').nth(2).screenshot({ path: T+'ov3.png' });
  await b.close();
  console.log('overview PDF rendered');
})();
