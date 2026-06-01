// ─── LIVE DATA FETCHER ────────────────────────────────────────────────────────
// Sources:
//   FRED API  → Fed funds, Core PCE YoY, Unemployment, 10-yr yield, 2-yr yield, Debt/GDP
//   Yahoo Finance (via corsproxy.io) → S&P 500 (^GSPC), Gold futures (GC=F)
//
// FRED key: get a FREE key in 60 seconds at https://fred.stlouisfed.org/docs/api/api_key.html
// Enter it in the box at the bottom of the page — it's saved in your browser.

// ─── VERIFIED FALLBACK VALUES (May 30 2026) ───────────────────────────────────
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

// ─── FRED KEY: read from localStorage (or sessionStorage fallback) ───────────
function getFredKey() {
  try {
    return localStorage.getItem('fredApiKey')
        || sessionStorage.getItem('fredApiKey')
        || '';
  } catch { return ''; }
}

// ─── FRED FETCH ───────────────────────────────────────────────────────────────
async function fetchFred(seriesId, limit = 2) {
  const key = getFredKey();
  if (!key || key.length !== 32) return null;
  const url = `https://api.stlouisfed.org/fred/series/observations`
    + `?series_id=${seriesId}&api_key=${key}&file_type=json`
    + `&sort_order=desc&limit=${limit}`;
  try {
    const r = await fetch(url, { signal: AbortSignal.timeout(7000) });
    if (!r.ok) return null;
    const d = await r.json();
    return d.observations?.filter(o => o.value !== '.') ?? null;
  } catch { return null; }
}

function extractFred(obs) {
  if (!obs?.length) return null;
  const v = parseFloat(obs[0].value);
  return isNaN(v) ? null : v;
}

// ─── CORE PCE YoY ─────────────────────────────────────────────────────────────
async function fetchCorePCEyoy() {
  const obs = await fetchFred('PCEPILFE', 14);
  if (!obs || obs.length < 13) return null;
  const latest   = parseFloat(obs[0].value);
  const yearAgo  = parseFloat(obs[12].value);
  if (isNaN(latest) || isNaN(yearAgo) || yearAgo === 0) return null;
  return (latest - yearAgo) / yearAgo * 100;
}

// ─── YAHOO FINANCE (corsproxy.io — most reliable free option) ─────────────────
async function fetchYahoo(ticker) {
  const yUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ticker)}?interval=1d&range=5d`;
  // Try two proxies in sequence
  const proxies = [
    `https://corsproxy.io/?${encodeURIComponent(yUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(yUrl)}`,
  ];
  for (const proxyUrl of proxies) {
    try {
      const r = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
      if (!r.ok) continue;
      const d = await r.json();
      const closes = d?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
      if (!closes?.length) continue;
      for (let i = closes.length - 1; i >= 0; i--) {
        if (closes[i] !== null && closes[i] !== undefined) return closes[i];
      }
    } catch { continue; }
  }
  return null;
}

// ─── STATUS BANNER ────────────────────────────────────────────────────────────
function updateStatus(state, liveCount) {
  const el = document.getElementById('dataStatus');
  if (!el) return;
  const now = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
  if (state === 'loading') {
    el.className = 'data-status loading';
    el.textContent = 'Fetching live data…';
  } else if (state === 'nokey') {
    el.className = 'data-status fallback';
    el.textContent = `Showing verified May 2026 data — add your FRED key below to enable live updates · ${now}`;
  } else if (state === 'live') {
    el.className = 'data-status live';
    el.textContent = `✅ Live data active · ${liveCount} of 8 sources updated · ${now}`;
  } else if (state === 'error') {
    el.className = 'data-status fallback';
    el.textContent = `⚠️ FRED key saved but fetch failed — check key is correct · ${now}`;
  } else {
    el.className = 'data-status fallback';
    el.textContent = `Showing verified May 2026 fallback values · ${now}`;
  }
}

// ─── MAIN LOADER ─────────────────────────────────────────────────────────────
async function loadLiveData() {
  updateStatus('loading');

  const hasFredKey = getFredKey().length === 32;

  // If no FRED key, skip API calls and go straight to fallback
  if (!hasFredKey) {
    updateStatus('nokey');
    return { ...FALLBACK, _source: 'fallback' };
  }

  // Key found — show it's being used (first 6 chars only for security)
  const keyPreview = getFredKey().substring(0, 6) + '...';
  console.log('FRED key found:', keyPreview);

  updateStatus('loading');

  const [
    fredFunds,
    corePCEyoy,
    fredUnemp,
    fredYield10,
    fredYield2,
    fredDebt,
    spxVal,
    goldVal,
  ] = await Promise.all([
    fetchFred('DFF', 3),
    fetchCorePCEyoy(),
    fetchFred('UNRATE', 2),
    fetchFred('DGS10', 3),
    fetchFred('DGS2', 3),
    fetchFred('GFDEGDQ188S', 2),
    fetchYahoo('^GSPC'),
    fetchYahoo('GC=F'),
  ]);

  const fedFunds    = extractFred(fredFunds)  ?? FALLBACK.fedFunds;
  const corePCE     = corePCEyoy              != null ? +corePCEyoy.toFixed(1) : FALLBACK.corePCE;
  const unemployment= extractFred(fredUnemp)  ?? FALLBACK.unemployment;
  const yield10yr   = extractFred(fredYield10) ?? FALLBACK.yield10yr;
  const yield2yr    = extractFred(fredYield2)  ?? FALLBACK.yield2yr;
  const debtGDP     = extractFred(fredDebt)    ?? FALLBACK.debtGDP;
  const spx         = spxVal  ? Math.round(spxVal)  : FALLBACK.spx;
  const gold        = goldVal ? Math.round(goldVal) : FALLBACK.gold;
  const yieldSpread = +((yield10yr - yield2yr).toFixed(2));

  const liveCount = [fredFunds, corePCEyoy, fredUnemp, fredYield10,
                     fredYield2, fredDebt, spxVal, goldVal]
                    .filter(v => v !== null).length;

  updateStatus(liveCount > 0 ? 'live' : 'error', liveCount);

  return {
    fedFunds, corePCE,
    headlinePCE:  FALLBACK.headlinePCE,
    spx, unemployment,
    yield10yr, yield2yr, yieldSpread,
    gold,
    dxy:          FALLBACK.dxy,
    debtGDP:      +debtGDP.toFixed(0),
    igSpread:     FALLBACK.igSpread,
    hySpread:     FALLBACK.hySpread,
    realWage:     FALLBACK.realWage,
    consumerConf: FALLBACK.consumerConf,
    interestGDP:  FALLBACK.interestGDP,
    deficitGDP:   FALLBACK.deficitGDP,
    _source: liveCount > 0 ? 'live' : 'fallback',
  };
}
