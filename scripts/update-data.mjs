// Runs in GitHub Actions (Node 20+). Fetches FRED + Yahoo server-side (no CORS)
// and writes data.json for the page to read. Keeps previous values on failure.
import { readFile, writeFile } from 'node:fs/promises';

const KEY = process.env.FRED_API_KEY;
if (!KEY) { console.error('FRED_API_KEY is not set'); process.exit(1); }

let prev = {};
try { prev = JSON.parse(await readFile('data.json', 'utf8')); } catch {}
const prevVals = prev.values ?? {};

async function fred(series, limit = 5) {
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${series}`
    + `&api_key=${KEY}&file_type=json&sort_order=desc&limit=${limit}`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    return (d.observations ?? []).filter(o => o.value !== '.').map(o => parseFloat(o.value));
  } catch (e) { console.warn('FRED', series, 'failed:', e.message); return null; }
}

async function yahoo(ticker) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=5d`;
  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; econ-dashboard)' },
      signal: AbortSignal.timeout(15000),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    const closes = d?.chart?.result?.[0]?.indicators?.quote?.[0]?.close ?? [];
    for (let i = closes.length - 1; i >= 0; i--) if (closes[i] != null) return closes[i];
    throw new Error('no closes');
  } catch (e) { console.warn('Yahoo', ticker, 'failed:', e.message); return null; }
}

const [dff, unrate, dgs10, dgs2, debt, pce, spx, gold] = await Promise.all([
  fred('DFF', 3), fred('UNRATE', 2), fred('DGS10', 3), fred('DGS2', 3),
  fred('GFDEGDQ188S', 2), fred('PCEPILFE', 14), yahoo('^GSPC'), yahoo('GC=F'),
]);

const first = a => (a && a.length ? a[0] : null);
const corePCE = pce && pce.length >= 13 ? ((pce[0] - pce[12]) / pce[12]) * 100 : null;

const fresh = {
  fedFunds: first(dff),
  corePCE: corePCE != null ? +corePCE.toFixed(1) : null,
  unemployment: first(unrate),
  yield10yr: first(dgs10),
  yield2yr: first(dgs2),
  debtGDP: first(debt) != null ? Math.round(first(debt)) : null,
  spx: spx != null ? Math.round(spx) : null,
  gold: gold != null ? Math.round(gold) : null,
};

// Keep previous value if this run failed for a field
const values = {};
let live = 0;
for (const [k, v] of Object.entries(fresh)) {
  if (v != null) { values[k] = v; live++; }
  else if (prevVals[k] != null) values[k] = prevVals[k];
  else values[k] = null;
}

const out = { updated: new Date().toISOString(), liveThisRun: live, total: 8, failed: Object.keys(fresh).filter(k => fresh[k] == null), values };
await writeFile('data.json', JSON.stringify(out, null, 2) + '\n');
console.log(`Wrote data.json: ${live}/8 fields fresh`);
if (live === 0) process.exit(1);
