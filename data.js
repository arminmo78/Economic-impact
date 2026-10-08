// ─── LIVE DATA LOADER ─────────────────────────────────────────────────────────
// Data comes from data.json, refreshed every ~4h by a GitHub Action
// (.github/workflows/update-data.yml) that calls FRED + Yahoo server-side.
// Browsers can't call those APIs directly (CORS), so no API key is used here.

// ─── VERIFIED FALLBACK VALUES (used for anything data.json doesn't supply) ────
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

const DATA_URLS = [
  'https://raw.githubusercontent.com/arminmo78/Economic-impact/main/data.json',
  'data.json',
];

async function fetchDataJson() {
  for (const base of DATA_URLS) {
    try {
      const r = await fetch(`${base}?t=${Date.now()}`, { signal: AbortSignal.timeout(8000), cache: 'no-store' });
      if (!r.ok) continue;
      const d = await r.json();
      if (d && d.values) return d;
    } catch { continue; }
  }
  return null;
}

// ─── STATUS BANNER ────────────────────────────────────────────────────────────
function updateStatus(state, info) {
  const el = document.getElementById('dataStatus');
  if (!el) return;
  if (state === 'loading') {
    el.className = 'data-status loading';
    el.textContent = 'Fetching live data…';
  } else if (state === 'live') {
    el.className = 'data-status live';
    el.textContent = `✅ Live data · ${info.count} of 8 sources · updated ${info.when}`;
  } else {
    el.className = 'data-status fallback';
    el.textContent = 'Showing verified May 2026 fallback values — live data file not available yet.';
  }
}

// ─── MAIN LOADER ─────────────────────────────────────────────────────────────
async function loadLiveData() {
  updateStatus('loading');
  const d = await fetchDataJson();
  if (!d) {
    updateStatus('fallback');
    return { ...FALLBACK, _source: 'fallback' };
  }

  const v = d.values;
  const pick = (k) => (v[k] != null ? v[k] : FALLBACK[k]);

  const yield10yr = pick('yield10yr');
  const yield2yr  = pick('yield2yr');
  const count = ['fedFunds', 'corePCE', 'unemployment', 'yield10yr', 'yield2yr', 'debtGDP', 'spx', 'gold']
    .filter(k => v[k] != null).length;

  const when = new Date(d.updated).toLocaleString('en-AU', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
  updateStatus(count > 0 ? 'live' : 'fallback', { count, when });

  return {
    fedFunds:     pick('fedFunds'),
    corePCE:      pick('corePCE'),
    headlinePCE:  FALLBACK.headlinePCE,
    spx:          pick('spx'),
    unemployment: pick('unemployment'),
    yield10yr, yield2yr,
    yieldSpread:  +((yield10yr - yield2yr).toFixed(2)),
    gold:         pick('gold'),
    dxy:          FALLBACK.dxy,
    debtGDP:      pick('debtGDP'),
    igSpread:     FALLBACK.igSpread,
    hySpread:     FALLBACK.hySpread,
    realWage:     FALLBACK.realWage,
    consumerConf: FALLBACK.consumerConf,
    interestGDP:  FALLBACK.interestGDP,
    deficitGDP:   FALLBACK.deficitGDP,
    _source: count > 0 ? 'live' : 'fallback',
  };
}
