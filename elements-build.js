const fs = require('fs-extra');
const concat = require('concat');
const zlib = require('zlib');

(async function build() {
  const files = [
    './dist/momentum-element/runtime.js',
    './dist/momentum-element/polyfills.js',
    './dist/momentum-element/scripts.js',
    './dist/momentum-element/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/momentum-element.js');
  const gzip = zlib.createGzip();
  const r = fs.createReadStream('elements/momentum-element.js');
  const w = fs.createWriteStream('elements/momentum-element.js.gz');
  r.pipe(gzip).pipe(w);
  await fs.copyFile(
    './dist/momentum-element/styles.css',
    'elements/styles.css'
  );
})();