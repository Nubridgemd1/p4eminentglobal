const NM='C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules';
const { chromium } = require(NM+'/playwright');
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';

(async () => {
  const b = await chromium.launch();
  for (const f of ['flyer1','flyer2','flyer3','flyer4','flyer5']) {
    const p = await b.newPage({ viewport:{width:794,height:1123}, deviceScaleFactor:2 });
    await p.goto('file:///'+D+f+'.html', { waitUntil:'networkidle' });
    await p.waitForTimeout(400);
    const o = await p.evaluate(() => {
      const fl = document.querySelector('.f');
      return { h: fl.scrollHeight, box: Math.round(fl.getBoundingClientRect().height) };
    });
    console.log(f, o.h, '/', o.box, o.h > o.box + 2 ? '*** OVERFLOW ***' : 'OK');
    await p.locator('.f').screenshot({ path: D+f+'.png' });
    await p.pdf({ path: D+f+'.pdf', width:'794px', height:'1123px', printBackground:true,
                  margin:{top:'0',right:'0',bottom:'0',left:'0'} });
    await p.close();
  }
  await b.close();
  // remove intermediate html so it isn't deployed
  ['flyer1','flyer2','flyer3','flyer4','flyer5'].forEach(f => fs.rmSync(D+f+'.html', {force:true}));
  console.log('flyers rendered');
})();
