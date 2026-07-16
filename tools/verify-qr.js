const NM='C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules';
const QRCode = require(NM+'/qrcode');
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';
const EXPECTED = 'https://p4eminentglobal.com';

(async () => {
  const regen = await QRCode.toString(EXPECTED, { type:'svg', errorCorrectionLevel:'M', margin:1, width:300,
                                                  color:{ dark:'#0F2233', light:'#FFFFFF' } });
  const onDisk = fs.readFileSync(D+'qr-site.svg','utf8');
  console.log('QR target      :', EXPECTED);
  console.log('QR encodes it  :', regen === onDisk ? 'YES (byte-identical)' : 'NO — MISMATCH');
  const stale = onDisk === (await QRCode.toString('https://nubridgemd1.github.io/p4eminentglobal/',
    { type:'svg', errorCorrectionLevel:'M', margin:1, width:300, color:{dark:'#0F2233',light:'#FFFFFF'} }));
  console.log('still preview? :', stale ? '*** YES — STALE ***' : 'no ✓');
  ['flyer1','flyer2','flyer3','flyer4','flyer5','flyer-hvac','flyer-painting','flyer-powerwash']
    .forEach(f => { if(!fs.existsSync(D+f+'.png')||!fs.existsSync(D+f+'.pdf')) console.log('MISSING', f); });
  console.log('all 8 flyers   : png+pdf present');
})();
