const NM='C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules';
const { chromium } = require(NM+'/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';
const FF = 'C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe';

(async () => {
  // record every video*.html present (numbered set + per-service set)
  const names = fs.readdirSync(D).filter(f => /^video.*\.html$/.test(f)).map(f => f.replace(/\.html$/,''));
  for (const name of names) {
    const vid = D + 'rec_' + name + '/';
    if (fs.existsSync(vid)) fs.rmSync(vid, {recursive:true, force:true});
    fs.mkdirSync(vid, {recursive:true});

    const browser = await chromium.launch();
    const ctx = await browser.newContext({ viewport:{width:1080,height:1920}, deviceScaleFactor:1,
      recordVideo:{ dir: vid, size:{width:1080,height:1920} } });
    const p = await ctx.newPage();
    await p.goto('file:///'+D+name+'.html', {waitUntil:'networkidle'});
    const dur = await p.evaluate(() => window.__DURATION__);
    await p.waitForTimeout(dur + 700);
    await p.close(); await ctx.close(); await browser.close();

    const webm = fs.readdirSync(vid).find(f => f.endsWith('.webm'));
    const outSec = ((dur - 1300)/1000 + 0.25).toFixed(2);
    const mp4 = D + name + '.mp4';
    execFileSync(FF, ['-y','-ss','1.3','-i', vid+webm, '-t', outSec,
      '-movflags','+faststart','-pix_fmt','yuv420p',
      '-vf','scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x0A1826,fps=30',
      '-c:v','libx264','-profile:v','high','-preset','medium','-crf','21', mp4], {stdio:'ignore'});
    fs.rmSync(vid, {recursive:true, force:true});
    fs.rmSync(D+name+'.html', {force:true});
    console.log(name, '->', (fs.statSync(mp4).size/1024/1024).toFixed(2)+'MB', outSec+'s');
  }
  console.log('videos done');
})();
