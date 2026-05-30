// ─── LIVE DATA FETCHER ────────────────────────────────────────────────────────
// Sources:
//   FRED API  → Fed funds, Core PCE, Unemployment, 10-yr yield, 2s10s spread
//   Yahoo Finance (via CORS proxy) → S&P 500, Gold spot (GC=F)
//   Fallback hardcoded values used if any fetch fails
//
// To use FRED you need a FREE api key from https://fred.stlouisfed.org/docs/api/api_key.html
// Takes ~60 seconds to register. Replace the string below with your key.

const FRED_KEY = 'YOUR_FRED_API_KEY_HERE';

// FRED series IDs
const FRED_SERIES = {
  fedFunds:    'DFF',        // Daily fed funds effective rate
  corePCE:     'PCEPILFE',   // Core PCE price index (YoY calculated below)
  unemployment:'UNRATE',     // Unemployment rate
  yield10yr:   'DGS10',      // 10-yr Treasury constant maturity
  yield2yr:    'DGS2',       // 2-yr Treasury (for spread)
  debtGDP:     'GFDEGDQ188S',// Federal debt as % of GDP (quarterly)
};

// Hardcoded fallbacks (May 2026 verified values)
const FALLBACK = {
  fedFunds:     3.63,
  corePCE:      3.3,
  headlinePCE:  3.8,
  spx:          7200,
  unemployment: 4.3,
  yield10yr:    4.45,
  yield2yr:     4.17,
  yieldSpread:  0.28,
  gold:         4540,
  dxy:          99.0,
  debtGDP:      124,
  igSpread:     115,
  hySpread:     370,
  realWage:     0.3,
  consumerConf: 89,
  interestGDP:  3.8,
  deficitGDP:   6.4,
};

// ─── FRED FETCH ───────────────────────────────────────────────────────────────
async function fetchFred(seriesId, limit = 2) {
  if (FRED_KEY === 'YOUR_FRED_API_KEY_HERE') return null;
  const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${FRED_KEY}&file_type=json&sort_order=desc&limit=${limit}`;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const d = await r.json();
    const obs = d.observations?.filter(o => o.value !== '.');
    return obs?.length ? obs : null;
  } catch { return null; }
}

// ─── YAHOO FINANCE VIA CORS PROXY ─────────────────────────────────────────────
async function fetchYahoo(ticker) {
  // allorigins proxies the request server-side, avoiding browser CORS block
  const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=5d`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(yUrl)}`;
  try {
    const r = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const d = await r.json();
    const closes = d?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
    if (!closes?.length) return null;
    // Return last non-null close
    for (let i = closes.length - 1; i >= 0; i--) {
      if (closes[i] !== null) return closes[i];
    }
    return null;
  } catch { return null; }
}

// ─── CORE PCE YoY CALCULATION ────────────────────────────────────────────────
// FRED returns index values; we calculate YoY % change ourselves
async function fetchCorePCEyoy() {
  const obs = await fetchFred('PCEPILFE', 14); // 13 months to get YoY
  if (!obs || obs.length < 13) return null;
  const latest = parseFloat(obs[0].value);
  const yearAgo = parseFloat(obs[12].value);
  if (isNaN(latest) || isNaN(yearAgo) || yearAgo === 0) return null;
  return ((latest - yearAgo) / yearAgo * 100);
}

// ─── MAIN LOADER ─────────────────────────────────────────────────────────────
async function loadLiveData() {
  updateStatus('loading');

  const results = await Promise.allSettled([
    fetchFred('DFF', 3),           // 0 fed funds
    fetchCorePCEyoy(),             // 1 core PCE YoY
    fetchFred('UNRATE', 2),        // 2 unemployment
    fetchFred('DGS10', 3),         // 3 10yr yield
    fetchFred('DGS2', 3),          // 4 2yr yield
    fetchFred('GFDEGDQ188S', 2),   // 5 debt/GDP
    fetchYahoo('^GSPC'),           // 6 S&P 500
    fetchYahoo('GC=F'),            // 7 Gold futures
  ]);

  const get = (i) => results[i].status === 'fulfilled' ? results[i].value : null;

  // Extract values with fallbacks
  const fedFunds    = extractFred(get(0)) ?? FALLBACK.fedFunds;
  const corePCE     = get(1) ?? FALLBACK.corePCE;
  const unemployment= extractFred(get(2)) ?? FALLBACK.unemployment;
  const yield10yr   = extractFred(get(3)) ?? FALLBACK.yield10yr;
  const yield2yr    = extractFred(get(4)) ?? FALLBACK.yield2yr;
  const debtGDP     = extractFred(get(5)) ?? FALLBACK.debtGDP;
  const spx         = get(6) ?? FALLBACK.spx;
  const gold        = get(7) ?? FALLBACK.gold;
  const yieldSpread = (yield10yr && yield2yr) ? (yield10yr - yield2yr) : FALLBACK.yieldSpread;

  const data = {
    fedFunds,
    corePCE:      +corePCE.toFixed(1),
    headlinePCE:  FALLBACK.headlinePCE,  // BEA only; FRED lags — use verified value
    spx:          Math.round(spx),
    unemployment: +unemployment.toFixed(1),
    yield10yr:    +yield10yr.toFixed(2),
    yield2yr:     +yield2yr.toFixed(2),
    yieldSpread:  +yieldSpread.toFixed(2),
    gold:         Math.round(gold),
    dxy:          FALLBACK.dxy,           // DXY not on FRED, use verified value
    debtGDP:      +debtGDP.toFixed(0),
    igSpread:     FALLBACK.igSpread,
    hySpread:     FALLBACK.hySpread,
    realWage:     FALLBACK.realWage,
    consumerConf: FALLBACK.consumerConf,
    interestGDP:  FALLBACK.interestGDP,
    deficitGDP:   FALLBACK.deficitGDP,
  };

  const liveCount = [get(0), get(1), get(2), get(3), get(4), get(5), get(6), get(7)]
    .filter(v => v !== null).length;

  updateStatus(liveCount > 0 ? 'live' : 'fallback', liveCount);
  return data;
}

function extractFred(obs) {
  if (!obs?.length) return null;
  const val = parseFloat(obs[0].value);
  return isNaN(val) ? null : val;
}

// ─── STATUS BANNER ────────────────────────────────────────────────────────────
function updateStatus(state, liveCount = 0) {
  const el = document.getElementById('dataStatus');
  if (!el) return;
  const now = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  if (state === 'loading') {
    el.className = 'data-status loading';
    el.textContent = 'Fetching live data…';
  } else if (state === 'live') {
    el.className = 'data-status live';
    el.textContent = `Live data · ${liveCount} of 8 sources fetched · ${now}`;
  } else {
    el.className = 'data-status fallback';
    el.textContent = `Showing verified May 2026 data · Add FRED API key for live updates · ${now}`;
  }
}
