// Převod HTML z tools/pdf/html/ na PDF do public/pdf/ (Chromium přes Playwright).
// Použití z kořene repa: python3 tools/pdf/build.py && node tools/pdf/render.cjs
const { chromium } = require('playwright');
const path = require('path');

const files = [
  ['pecena-hruska-recept', false],
  ['medove-pernicky-recept', false],
  ['medovo-horcicny-dresink-recept', false],
  ['horka-medovina-recept', false],
  ['pecene-orechy-recept', false],
  ['medove-jmenovky', false],
  ['vanocni-prani', true],
];

(async () => {
  const root = path.resolve(__dirname, '..', '..');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [name, landscape] of files) {
    await page.goto('file://' + path.join(__dirname, 'html', name + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(root, 'public', 'pdf', name + '.pdf'), format: 'A4', landscape, printBackground: true, preferCSSPageSize: true });
    console.log('PDF:', name);
  }
  await browser.close();
})();
