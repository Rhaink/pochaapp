import { chromium } from 'playwright-core';
const exe = '/home/donrobot/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome';
const base = 'http://localhost:4200';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 420, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type()==='error') errors.push('CONSOLE: '+m.text()); });

const routes = ['home','meta','roster','cleanup','teams','builds','tierlist','recruit','climb','scout','system','plan'];
let ok = true;
for (const r of routes) {
  await page.goto(`${base}/#/${r}`, { waitUntil:'networkidle', timeout:30000 });
  await page.waitForTimeout(500);
  const d = await page.evaluate(() => ({ c: document.getElementById('app')?.children.length ?? -1 }));
  if (d.c < 1) ok = false;
  console.log(`  ${d.c>0?'✓':'❌'} /${r}`);
}
// Builds detail
await page.goto(`${base}/#/builds`, { waitUntil:'networkidle' });
await page.waitForTimeout(800);
const bd = await page.evaluate(() => ({
  builds: document.querySelectorAll('.build').length,
  strat: document.querySelectorAll('.strat li').length,
  strong: document.querySelectorAll('.sw-col.strong li').length,
  vs: document.querySelectorAll('.vrow').length,
  fresh: document.querySelectorAll('.fresh').length,
  firstItem: document.querySelector('.v.item')?.textContent
}));
console.log('Builds:', JSON.stringify(bd));
// Teams items visible
await page.goto(`${base}/#/teams`, { waitUntil:'networkidle' });
await page.waitForTimeout(500);
const td = await page.evaluate(() => document.querySelectorAll('.lu-item').length);
console.log('Teams: items mostrados =', td);
await page.goto(`${base}/#/builds`, { waitUntil:'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/claude-1000/-home-donrobot-Projects-pochaapp/165cac91-8f04-4287-8c9c-a748c493d2e2/scratchpad/builds2.png' });
console.log('\nErrores:', errors.length ? errors : 'ninguno');
console.log(ok && errors.length===0 ? 'OK' : 'FALLO');
await browser.close();
process.exit(ok && errors.length===0 ? 0 : 1);
