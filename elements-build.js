const fs = require('fs-extra');
const concat = require('concat');
const zlib = require('zlib');

(async function build() {
  const files = [
    './dist/quotation/runtime.js',
    './dist/quotation/polyfills.js',
    './dist/quotation/scripts.js',
    './dist/quotation/main.js'
  ];

  await fs.ensureDir('quotation-elements');
  await concat(files, 'quotation-elements/quotation-element.js');
  const gzip = zlib.createGzip();
  const r = fs.createReadStream('quotation-elements/quotation-element.js');
  const w = fs.createWriteStream('quotation-elements/quotation-element.js.gz');
  r.pipe(gzip).pipe(w);
  
  await fs.copyFile(
    './dist/quotation/styles.css',
    'quotation-elements/styles.css'
  );
})();