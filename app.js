// ─── INTERVENTIONS ───────────────────────────────────────────────────────────
const IV = {
  tariff: {
    title: 'Tariff escalation — projected effects (12–24 months)',
    narr: 'Tariffs act as a supply-side tax: they raise consumer prices while compressing margins and slowing trade-linked growth. In Dalio\'s framework this is classic "engineered stagflation" — sticky inflation prevents the Fed from cutting rates even as growth deteriorates, trapping policymakers. Iran-driven oil already at ~$120/bbl amplifies the inflationary channel. Gold surges further as a real-asset hedge; the dollar initially firms on trade balance optics but weakens as growth expectations fall. Credit spreads widen as earnings compress across import-dependent sectors. The 1970s parallel is direct.',
    cells: [
      { label: 'Fed funds rate', arrow: '→', cls: 'flat', val: 'Hold 3.75–4.50%' },
      { label: 'Headline inflation', arrow: '▲▲', cls: 'bad', val: '+1.0–2.0pp' },
      { label: 'Core inflation', arrow: '▲', cls: 'bad', val: '+0.5–1.0pp' },
      { label: 'S&P 500', arrow: '▼', cls: 'bad', val: '−10 to −20%' },
      { label: 'Unemployment', arrow: '▲', cls: 'bad', val: '4.8–5.5%' },
      { label: '10-yr yield', arrow: '▲', cls: 'bad', val: '4.8–5.5%' },
      { label: 'USD (DXY)', arrow: '→', cls: 'flat', val: '97–102' },
      { label: 'Gold', arrow: '▲▲', cls: 'bad', val: '+15–25%' },
    ],
    probs: { dep: 18, rec: 42, slow: 28, soft: 12 },
    badge: 'badge-rec',
    badgeLabel: 'Stagflation / recession most likely',
  },
  qe: {
    title: 'QE / debt monetisation — projected effects (12–24 months)',
    narr: 'Printing money to buy Treasury debt suppresses rates and inflates asset prices short-term. But in Stage 5 of Dalio\'s cycle this is the defining "kick the can" move — it delays restructuring while accelerating reserve currency erosion. With core PCE already at 3.3% and gold already up 73% YoY, a fresh monetisation round would deliver a sharp further gold surge, material dollar weakening, and eventual severe inflation re-acceleration. Dalio calls this "the central banker\'s dilemma": buying time at the cost of a larger future crisis. Nominal S&P 500 gains mask real purchasing-power destruction.',
    cells: [
      { label: 'Fed funds rate', arrow: '▼▼', cls: 'good', val: 'Cut to 2.5–3.0%' },
      { label: 'Headline inflation', arrow: '▲▲▲', cls: 'bad', val: '+3–5pp surge' },
      { label: 'Core inflation', arrow: '▲▲▲', cls: 'bad', val: '+2–4pp' },
      { label: 'S&P 500', arrow: '▲', cls: 'good', val: '+10–20% nominal' },
      { label: 'Unemployment', arrow: '▼', cls: 'good', val: '3.8–4.0% short-term' },
      { label: '10-yr yield', arrow: '▼→▲', cls: 'flat', val: 'Fall then spike' },
      { label: 'USD (DXY)', arrow: '▼▼', cls: 'bad', val: '−10 to −18%' },
      { label: 'Gold', arrow: '▲▲▲', cls: 'bad', val: '+30–50%' },
    ],
    probs: { dep: 10, rec: 28, slow: 35, soft: 27 },
    badge: 'badge-slow',
    badgeLabel: 'Short relief → slow growth → re-inflation',
  },
  austerity: {
    title: 'Fiscal austerity (DOGE-style) — projected effects (12–24 months)',
    narr: 'Spending cuts reduce the deficit but contract demand sharply. The 1930s showed that austerity during a debt cycle peak can turn recession into depression — demand collapses faster than debt is reduced. Bond markets initially cheer lower supply; but falling growth expectations soon dominate. HY credit spreads blow out on corporate earnings collapse. The social/political dimension in Dalio\'s model worsens sharply: wealth gaps intensify as social spending falls, fuelling domestic conflict — the marker Dalio calls the most dangerous for political stability. Consumer confidence, already below 90, would likely collapse further.',
    cells: [
      { label: 'Fed funds rate', arrow: '▼', cls: 'good', val: '3.0–3.25%' },
      { label: 'Headline inflation', arrow: '▼', cls: 'good', val: '2.0–2.5%' },
      { label: 'Core inflation', arrow: '▼', cls: 'good', val: '1.8–2.2%' },
      { label: 'S&P 500', arrow: '▼▼', cls: 'bad', val: '−20 to −35%' },
      { label: 'Unemployment', arrow: '▲▲', cls: 'bad', val: '5.5–8%' },
      { label: '10-yr yield', arrow: '▼', cls: 'good', val: '3.5–4.0%' },
      { label: 'USD (DXY)', arrow: '▲', cls: 'flat', val: 'Short-term strength' },
      { label: 'Gold', arrow: '▼→▲', cls: 'flat', val: 'Mixed then up' },
    ],
    probs: { dep: 35, rec: 38, slow: 20, soft: 7 },
    badge: 'badge-dep',
    badgeLabel: 'Debt-deflation depression risk elevated',
  },
  ratecut: {
    title: 'Aggressive rate cuts — projected effects (12–24 months)',
    narr: 'With core PCE at 3.3% and rising and the Fed already holding with 4 internal dissents, cutting rates aggressively would be a historically unusual move. The Volcker lesson is decisive: cutting rates before inflation is anchored entrenches inflation expectations and ultimately requires a harder correction. Bond vigilantes would respond by selling the long end, bear-steepening the curve sharply. The dollar would weaken materially, pushing gold higher and further stoking import inflation. The S&P 500 initially rallies on rate relief but ultimately faces an earnings hit as stagflation entrenches. This is Dalio\'s "1970s re-run" path.',
    cells: [
      { label: 'Fed funds rate', arrow: '▼▼▼', cls: 'flat', val: 'Cut to 1.0–1.5%' },
      { label: 'Headline inflation', arrow: '▲▲', cls: 'bad', val: '+2–4pp rerun' },
      { label: 'Core inflation', arrow: '▲▲', cls: 'bad', val: '+1.5–3pp' },
      { label: 'S&P 500', arrow: '▲▼', cls: 'flat', val: 'Rally then selloff' },
      { label: 'Unemployment', arrow: '▼', cls: 'good', val: '3.8–4.0% short-term' },
      { label: '10-yr yield', arrow: '▲▲', cls: 'bad', val: '5.0–6.5% vigilante' },
      { label: 'USD (DXY)', arrow: '▼▼', cls: 'bad', val: '−12 to −20%' },
      { label: 'Gold', arrow: '▲▲', cls: 'bad', val: '+25–40%' },
    ],
    probs: { dep: 14, rec: 32, slow: 36, soft: 18 },
    badge: 'badge-slow',
    badgeLabel: '1970s re-run risk — stagnation with inflation',
  },
  devalue: {
    title: 'Dollar devaluation deal — projected effects (12–24 months)',
    narr: 'A managed USD depreciation (analogous to a "Mar-a-Lago Accord") inflates away debt in real terms and boosts export competitiveness. But with DXY already at ~99 and down from 107 in 2025, the dollar has already weakened substantially. A formal devaluation deal would signal to global creditors that the US is willing to transfer its debt burden to foreign holders — the most direct Stage 5→6 accelerant in Dalio\'s framework. Gold, already at $4,540, would likely surge towards $6,000+. Import prices would spike further, pushing headline PCE from 3.8% toward 7%+. Bond vigilantes demand compensation: long yields spike to 5.5–7%.',
    cells: [
      { label: 'Fed funds rate', arrow: '▲', cls: 'bad', val: '4.5–5.5% forced' },
      { label: 'Headline inflation', arrow: '▲▲▲', cls: 'bad', val: '+3–6pp import shock' },
      { label: 'Core inflation', arrow: '▲▲', cls: 'bad', val: '+2–4pp' },
      { label: 'S&P 500', arrow: '→', cls: 'flat', val: 'Flat–+10% nominal' },
      { label: 'Unemployment', arrow: '▼', cls: 'good', val: '3.8–4.2% export boost' },
      { label: '10-yr yield', arrow: '▲▲', cls: 'bad', val: '5.5–7.0%' },
      { label: 'USD (DXY)', arrow: '▼▼▼', cls: 'bad', val: '−18 to −28%' },
      { label: 'Gold', arrow: '▲▲▲', cls: 'bad', val: '+35–65%' },
    ],
    probs: { dep: 24, rec: 38, slow: 26, soft: 12 },
    badge: 'badge-rec',
    badgeLabel: 'Reserve erosion — currency crisis risk',
  },
  reform: {
    title: 'Fiscal grand bargain (1990s path) — projected effects (12–24 months)',
    narr: 'Dalio\'s only structural off-ramp: a bipartisan deal combining credible multi-year spending reform and revenue measures, analogous to the Clinton-era surplus. This is the scenario that interrupts the Stage 5 dynamic without crisis — bond vigilantes retreat, yields fall, the dollar stabilises, gold retreats from $4,540 toward $3,000–3,500, and the Fed can cut gradually. Dalio is explicit: the 1990s path required political conditions (post-Cold War dividend, bipartisan consensus, productivity boom from early internet) that are largely absent today. The fractured 8-4 FOMC, the Iran conflict premium, and structural fiscal polarisation all cut against it. It is the blueprint; achieving it is the question.',
    cells: [
      { label: 'Fed funds rate', arrow: '▼', cls: 'good', val: 'Gradual to 2.75%' },
      { label: 'Headline inflation', arrow: '▼▼', cls: 'good', val: 'Back to 2.0–2.5%' },
      { label: 'Core inflation', arrow: '▼▼', cls: 'good', val: 'Back to 2.0%' },
      { label: 'S&P 500', arrow: '▲▲', cls: 'good', val: '+25–40%' },
      { label: 'Unemployment', arrow: '▼', cls: 'good', val: '3.5–4.0%' },
      { label: '10-yr yield', arrow: '▼▼', cls: 'good', val: '3.0–3.5%' },
      { label: 'USD (DXY)', arrow: '▲', cls: 'good', val: '+5 to +10%' },
      { label: 'Gold', arrow: '▼▼', cls: 'good', val: '−20 to −35%' },
    ],
    probs: { dep: 3, rec: 13, slow: 31, soft: 53 },
    badge: 'badge-soft',
    badgeLabel: 'Soft landing — if politically achievable',
  },
};

// ─── CHART DATA (corrected) ──────────────────────────────────────────────────
const CHARTS = {
  rates: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [0.09, 0.09, 2.5,  5.25, 4.5,  3.75, 3.625, null, null, null],
    stress: [null, null, null, null, null, null, 3.625, 4.8, 6.2, 7.0],
    easy:   [null, null, null, null, null, null, 3.625, 3.0, 2.5, 2.25],
    yLabel: 'Fed funds rate (%)', yMin: 0, yMax: 9,
  },
  inflation: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [1.2,  4.7,  8.0,  3.4,  2.9,  3.0,  3.3,  null, null, null],
    stress: [null, null, null, null, null, null, 3.3,  5.5,  7.2,  5.8],
    easy:   [null, null, null, null, null, null, 3.3,  2.6,  2.1,  2.0],
    yLabel: 'Core PCE inflation (%)', yMin: 0, yMax: 10,
  },
  spx: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [3756, 4766, 3840, 4770, 5881, 5882, 7200, null, null, null],
    stress: [null, null, null, null, null, null, 7200, 5400, 4200, 4800],
    easy:   [null, null, null, null, null, null, 7200, 7800, 9000, 10500],
    yLabel: 'S&P 500 (index)', yMin: 2000, yMax: 12000,
  },
  unemp: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [8.1,  5.4,  3.6,  3.7,  4.1,  4.4,  4.3,  null, null, null],
    stress: [null, null, null, null, null, null, 4.3,  6.0,  8.0,  9.0],
    easy:   [null, null, null, null, null, null, 4.3,  3.9,  3.6,  3.4],
    yLabel: 'Unemployment rate (%)', yMin: 0, yMax: 12,
  },
  yield: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [0.9,  1.5,  3.9,  3.9,  4.2,  4.4,  4.45, null, null, null],
    stress: [null, null, null, null, null, null, 4.45, 5.8, 7.0, 7.5],
    easy:   [null, null, null, null, null, null, 4.45, 3.8, 3.2, 3.0],
    yLabel: '10-yr Treasury yield (%)', yMin: 0, yMax: 9,
  },
  gold: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [1520, 1830, 1820, 2060, 2620, 2630, 4540, null, null, null],
    stress: [null, null, null, null, null, null, 4540, 6000, 7500, 8000],
    easy:   [null, null, null, null, null, null, 4540, 3500, 2800, 2500],
    yLabel: 'Gold (USD/oz)', yMin: 1000, yMax: 9000,
  },
  usd: {
    labels: ['2020','2021','2022','2023','2024','2025','Now','2026H2','2027','2028'],
    hist:   [96,   96,   104,  103,  104,  107,  99,   null, null, null],
    stress: [null, null, null, null, null, null, 99,   86,   78,   72],
    easy:   [null, null, null, null, null, null, 99,   103,  107,  110],
    yLabel: 'USD index (DXY)', yMin: 60, yMax: 120,
  },
};

// ─── GAUGE ───────────────────────────────────────────────────────────────────
function drawGauge(probs) {
  const canvas = document.getElementById('gaugeChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const cx = W / 2, cy = H - 20, r = Math.min(W, H * 2) * 0.46;
  const segs = [
    { p: probs.dep / 100, color: '#e24b4a' },
    { p: probs.rec / 100, color: '#ef9f27' },
    { p: probs.slow / 100, color: '#378add' },
    { p: probs.soft / 100, color: '#639922' },
  ];
  let start = Math.PI;
  segs.forEach(s => {
    const end = start + s.p * Math.PI;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = s.color; ctx.fill();
    start = end;
  });
  // Inner hole
  const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.52, 0, 2 * Math.PI);
  ctx.fillStyle = isDark ? '#1e1e1c' : '#ffffff';
  ctx.fill();
  // Dominant label
  const dom = Object.entries(probs).reduce((a, b) => a[1] > b[1] ? a : b);
  const colors = { dep: '#e24b4a', rec: '#ef9f27', slow: '#378add', soft: '#639922' };
  const names = { dep: 'depression', rec: 'recession', slow: 'slow growth', soft: 'soft landing' };
  ctx.fillStyle = colors[dom[0]];
  ctx.font = `600 ${Math.round(r * 0.22)}px -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(dom[1] + '%', cx, cy - r * 0.12);
  ctx.font = `${Math.round(r * 0.16)}px -apple-system, sans-serif`;
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)';
  ctx.fillText(names[dom[0]], cx, cy + r * 0.06);
}

function setProbBars(probs) {
  Object.entries(probs).forEach(([k, v]) => {
    const fill = document.getElementById('pb-' + k);
    const pct = document.getElementById('pp-' + k);
    if (fill) fill.style.width = v + '%';
    if (pct) pct.textContent = v + '%';
  });
}

// ─── INTERVENTION PICKER ─────────────────────────────────────────────────────
function pick(key) {
  document.querySelectorAll('.iv-btn').forEach(b => b.classList.remove('sel'));
  const btn = document.getElementById('btn-' + key);
  if (btn) btn.classList.add('sel');

  const iv = IV[key];
  document.getElementById('simTitle').textContent = iv.title;
  document.getElementById('simBody').style.display = 'block';

  const grid = document.getElementById('simGrid');
  grid.innerHTML = '';
  iv.cells.forEach(cell => {
    grid.innerHTML += `
      <div class="sim-cell">
        <div class="sim-cell-label">${cell.label}</div>
        <span class="sim-arrow ${cell.cls}">${cell.arrow}</span>
        <div class="sim-val">${cell.val}</div>
      </div>`;
  });

  document.getElementById('simNarr').textContent = iv.narr;

  const badge = document.getElementById('outcomeBadge');
  badge.className = 'outcome-badge ' + iv.badge;
  badge.textContent = iv.badgeLabel;

  setProbBars(iv.probs);
  drawGauge(iv.probs);
  document.getElementById('gaugeNarr').textContent = iv.narr.substring(0, 220) + '…';
}

// ─── MAIN CHART ──────────────────────────────────────────────────────────────
let mainChart = null;

function buildChart(series) {
  const d = CHARTS[series];
  const ctx = document.getElementById('mainChart');
  if (!ctx) return;
  if (mainChart) { mainChart.destroy(); mainChart = null; }

  mainChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Historical',
          data: d.hist,
          borderColor: '#378add',
          backgroundColor: 'rgba(55,138,221,0.06)',
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#378add',
          fill: true,
          tension: 0.3,
          spanGaps: false,
        },
        {
          label: 'Stress / depression path',
          data: d.stress,
          borderColor: '#e24b4a',
          backgroundColor: 'rgba(226,75,74,0.05)',
          borderWidth: 2,
          borderDash: [6, 3],
          pointRadius: 3,
          pointBackgroundColor: '#e24b4a',
          fill: true,
          tension: 0.3,
          spanGaps: false,
        },
        {
          label: 'Managed / soft landing path',
          data: d.easy,
          borderColor: '#639922',
          backgroundColor: 'rgba(99,153,34,0.05)',
          borderWidth: 2,
          borderDash: [3, 3],
          pointRadius: 3,
          pointBackgroundColor: '#639922',
          fill: true,
          tension: 0.3,
          spanGaps: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: c => c.dataset.label + ': ' + (c.parsed.y !== null ? c.parsed.y.toLocaleString() : '—'),
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(128,128,128,0.08)' },
          ticks: { font: { size: 11 }, color: '#888', maxRotation: 0 },
        },
        y: {
          min: d.yMin,
          max: d.yMax,
          grid: { color: 'rgba(128,128,128,0.08)' },
          ticks: { font: { size: 11 }, color: '#888' },
          title: { display: true, text: d.yLabel, font: { size: 11 }, color: '#888' },
        },
      },
    },
  });
}

function sw(series, btn) {
  document.querySelectorAll('.ct').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildChart(series);
}

// ─── RENDER LIVE DATA INTO METRIC CARDS ──────────────────────────────────────
function renderData(d) {
  // Fed funds
  set('fedFunds', d.fedFunds.toFixed(2) + '%', 'warn', 'Held · Warsh era');
  // Headline PCE
  set('headlinePCE', d.headlinePCE.toFixed(1) + '%', 'bad', '3-year high · Iran oil shock');
  // Core PCE
  const pceCls = d.corePCE > 3 ? 'bad' : d.corePCE > 2.5 ? 'warn' : 'good';
  set('corePCE', d.corePCE.toFixed(1) + '%', pceCls, d.corePCE > 2 ? 'Above 2% target' : 'Near target');
  // S&P 500
  set('spx', d.spx.toLocaleString(), 'good', 'Equity market level');
  // Unemployment
  const uCls = d.unemployment > 5 ? 'bad' : d.unemployment > 4.5 ? 'warn' : 'good';
  set('unemployment', d.unemployment.toFixed(1) + '%', uCls, d.unemployment > 4.5 ? 'Rising' : 'Drifting higher');
  // 10-yr yield
  const yCls = d.yield10yr > 5 ? 'bad' : d.yield10yr > 4.5 ? 'warn' : 'neu';
  set('yield10yr', d.yield10yr.toFixed(2) + '%', yCls, 'Bond market signal');
  // DXY
  set('dxy', d.dxy.toFixed(1), 'bad', 'Structural weakening');
  // Gold
  const goldYoY = Math.round(((d.gold - 2630) / 2630) * 100); // vs end 2025
  set('gold', '$' + d.gold.toLocaleString(), 'bad', '+' + goldYoY + '% vs end-2025');
  // Yield spread
  const spreadSign = d.yieldSpread >= 0 ? '+' : '';
  const spreadCls = d.yieldSpread < 0 ? 'bad' : 'warn';
  set('yieldSpread', spreadSign + d.yieldSpread.toFixed(2) + '%', spreadCls,
    d.yieldSpread < 0 ? 'Inverted — recession signal' : 'Normal (re-steepened)');
  // Static indicators
  set('igSpread', d.igSpread + ' bp', 'warn', 'Elevated vs history');
  set('hySpread', d.hySpread + ' bp', 'bad', 'Stress signal rising');
  set('realWage', '+' + d.realWage.toFixed(1) + '%', 'warn', 'Barely positive');
  set('debtGDP', d.debtGDP + '%', 'bad', 'Post-WW2 record');
  set('deficitGDP', d.deficitGDP.toFixed(1) + '%', 'bad', 'Structural, not cyclical');
  set('interestGDP', d.interestGDP.toFixed(1) + '%', 'bad', 'Exceeds defence spend');
  set('consumerConf', d.consumerConf.toString(), 'bad', 'Below 100 = pessimism');

  // Update chart "Now" data points with live values
  CHARTS.rates.hist[6]     = +d.fedFunds.toFixed(2);
  CHARTS.inflation.hist[6] = +d.corePCE.toFixed(1);
  CHARTS.spx.hist[6]       = d.spx;
  CHARTS.unemp.hist[6]     = +d.unemployment.toFixed(1);
  CHARTS.yield.hist[6]     = +d.yield10yr.toFixed(2);
  CHARTS.gold.hist[6]      = d.gold;
  CHARTS.usd.hist[6]       = +d.dxy.toFixed(1);

  // Refresh the currently visible chart
  buildChart(currentSeries);
}

function set(id, val, cls, note) {
  const vEl = document.getElementById('v-' + id);
  const nEl = document.getElementById('n-' + id);
  if (vEl) vEl.textContent = val;
  if (nEl) {
    nEl.textContent = note || '';
    nEl.className = 'mc-note ' + (cls || 'neu');
  }
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
let currentSeries = 'rates';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Clear any FRED key stored in this browser by earlier versions (no longer used)
  try { localStorage.removeItem('fredApiKey'); sessionStorage.removeItem('fredApiKey'); } catch {}

  // 2. Draw gauge and chart immediately with fallback values — no blank cards
  // Each step is isolated so one failure (e.g. Chart.js blocked) can't stop the rest
  try { drawGauge({ dep: 15, rec: 38, slow: 32, soft: 15 }); } catch (e) { console.warn('gauge failed', e); }
  try { renderData(FALLBACK); } catch (e) { console.warn('render failed', e); }  // May 2026 numbers right away
  try { buildChart('rates'); } catch (e) { console.warn('chart failed', e); }

  // 3. Attempt live fetch — overwrite cards if successful
  try {
    const data = await loadLiveData();
    try { renderData(data); } catch (e) { console.warn('render failed', e); }
  } catch (e) {
    updateStatus('fallback');
  }
});
