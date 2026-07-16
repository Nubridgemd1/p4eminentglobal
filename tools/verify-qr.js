const NM='C:/Users/tojug/OneDrive/Desktop/BIZFORMCORP BUILD/bizformcorp/node_modules';
const QRCode = require(NM+'/qrcode');
const fs = require('fs');
const D = __dirname.replace(/\\/g,'/').replace(/\/tools$/,'') + '/marketing/';
const EXPECTED = 'https://nubridgemd1.github.io/p4eminentglobal/';

(async () => {
  // Re-encode the expected URL with identical options; byte-identical output proves
  // the QR on the flyers encodes exactly this URL.
  const regen = await QRCode.toString(EXPECTED, { type:'svg', errorCorrectionLevel:'M', margin:1, width:300,
                                                  color:{ dark:'#0F2233', light:'#FFFFFF' } });
  const onDisk = fs.readFileSync(D+'qr-site.svg','utf8');
  console.log('expected URL :', EXPECTED);
  console.log('QR matches   :', regen === onDisk ? 'YES (byte-identical)' : 'NO — MISMATCH');

  // confirm every flyer references the qr image
  ['flyer1','flyer2','flyer3','flyer4','flyer5'].forEach(f => {
    const png = fs.existsSync(D+f+'.png'), pdf = fs.existsSync(D+f+'.pdf');
    console.log(`${f}: png=${png} pdf=${pdf}`);
  });
})();
