import React, { useState, useEffect, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

// ---- Embedded plan: 382 NYSE trading days, $65 -> $1.02M (seed 9001 run) ----
const PLAN_VALS = [65.0, 67.46, 67.93, 69.24, 74.22, 82.4, 91.37, 90.5, 75.47, 76.15, 82.39, 83.48, 100.37, 98.1, 106.84, 107.08, 111.04, 116.69, 129.44, 128.52, 133.98, 145.26, 148.12, 155.33, 163.96, 176.6, 172.63, 173.42, 173.05, 176.97, 166.02, 178.16, 166.81, 164.36, 159.85, 171.1, 182.28, 179.26, 201.07, 209.09, 226.17, 237.81, 257.36, 263.68, 242.47, 242.6, 236.22, 222.52, 237.86, 222.71, 243.15, 252.25, 266.61, 275.97, 285.01, 303.0, 297.11, 309.8, 288.64, 315.82, 332.58, 368.46, 401.5, 413.38, 401.4, 422.78, 472.45, 536.47, 563.47, 653.56, 621.34, 687.51, 797.66, 800.28, 867.12, 868.94, 944.41, 973.49, 976.23, 1009.84, 1002.93, 930.86, 959.19, 941.18, 971.5, 1036.83, 1133.8, 1211.03, 1158.31, 1180.66, 1167.41, 1285.14, 1302.83, 1308.33, 1198.82, 1242.68, 1091.99, 1163.09, 1166.69, 1113.17, 1129.57, 1096.28, 1154.79, 1211.67, 1257.56, 1321.61, 1353.92, 1371.93, 1435.21, 1541.68, 1600.14, 1580.02, 1671.64, 1835.98, 1999.21, 2104.91, 2280.4, 2358.87, 2546.6, 2461.26, 2626.88, 2749.18, 2993.47, 2781.62, 2947.37, 3101.92, 3361.45, 3280.65, 3658.86, 3428.8, 3505.63, 3575.17, 3329.45, 3415.39, 3578.69, 4296.6, 4309.31, 4426.86, 4315.84, 4702.07, 4306.03, 4751.12, 5477.75, 6082.78, 6531.25, 5654.08, 5526.9, 5173.67, 4708.11, 4471.35, 3851.45, 3852.77, 3536.75, 3798.77, 3519.45, 3591.38, 3547.15, 3358.12, 3681.39, 3686.31, 3517.3, 3252.98, 3319.55, 3338.36, 3450.27, 3404.59, 3210.75, 3547.49, 3599.6, 3774.69, 3199.66, 3108.57, 3162.41, 3586.11, 3647.38, 3360.1, 3596.73, 3654.74, 4021.26, 3848.21, 3721.01, 3813.14, 3343.05, 3604.57, 4073.39, 3837.83, 3806.51, 4418.66, 5142.49, 4592.4, 4707.79, 4491.75, 4895.52, 4925.45, 5285.82, 5919.23, 6148.08, 5981.24, 6093.51, 6329.16, 6744.35, 6275.03, 6278.65, 6518.09, 6915.22, 6825.61, 7073.01, 6216.61, 6685.31, 6580.84, 6313.92, 6985.39, 6488.27, 6118.81, 6132.75, 6015.61, 5905.26, 6043.48, 6123.66, 6038.89, 6010.7, 6031.58, 5991.93, 6433.92, 5873.72, 6524.87, 6122.48, 6051.3, 6721.29, 7177.34, 8172.72, 8576.2, 7970.03, 8403.18, 9083.94, 8673.29, 9562.92, 9709.47, 10387.87, 9932.66, 10404.35, 10096.65, 10675.97, 10291.6, 10689.15, 11956.14, 13777.56, 13795.97, 14086.13, 15653.0, 15491.85, 16020.1, 16826.57, 16534.74, 15784.34, 15307.63, 14988.13, 15034.14, 16065.82, 17054.3, 16562.04, 16144.8, 18168.74, 19065.96, 20899.95, 20504.66, 20840.04, 21759.17, 22902.53, 23614.3, 28198.6, 29429.62, 28633.85, 30098.46, 34789.97, 33870.24, 35341.11, 35811.87, 34416.99, 36966.22, 39379.22, 41547.54, 47825.5, 50818.25, 52284.63, 53375.61, 58169.98, 57850.44, 58992.91, 59811.38, 55743.53, 57768.24, 60880.82, 59220.12, 58143.4, 55670.34, 60254.28, 59735.78, 60491.05, 66031.36, 65059.77, 68105.88, 73610.82, 75197.68, 91622.96, 91552.92, 89847.35, 94103.12, 96437.74, 101533.12, 108242.95, 103853.55, 116018.14, 116078.84, 132786.22, 141137.16, 155561.71, 161487.04, 154475.36, 180430.73, 183021.83, 205667.09, 203438.4, 183527.72, 200582.02, 204628.39, 212582.24, 211830.3, 214899.69, 196832.82, 212124.82, 241365.14, 241538.08, 255302.23, 280575.14, 295899.35, 306899.62, 308567.39, 288602.28, 290515.47, 300108.56, 321631.44, 323001.25, 357190.37, 367180.75, 341540.34, 359099.83, 396734.12, 386779.5, 391990.3, 397559.14, 375924.83, 382472.04, 412504.25, 445612.43, 440287.73, 466289.71, 482591.12, 489014.91, 506647.58, 524215.45, 476156.09, 505019.96, 488657.27, 524191.28, 524854.7, 503650.98, 521907.29, 494594.84, 545652.95, 644085.03, 711334.92, 714806.31, 699452.0, 722188.88, 802993.58, 903468.85, 918163.08, 978552.57, 1003148.27, 1102970.68, 1022442.74];
const PLAN_DATES = ["2026-07-13", "2026-07-14", "2026-07-15", "2026-07-16", "2026-07-17", "2026-07-20", "2026-07-21", "2026-07-22", "2026-07-23", "2026-07-24", "2026-07-27", "2026-07-28", "2026-07-29", "2026-07-30", "2026-07-31", "2026-08-03", "2026-08-04", "2026-08-05", "2026-08-06", "2026-08-07", "2026-08-10", "2026-08-11", "2026-08-12", "2026-08-13", "2026-08-14", "2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-24", "2026-08-25", "2026-08-26", "2026-08-27", "2026-08-28", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-08", "2026-09-09", "2026-09-10", "2026-09-11", "2026-09-14", "2026-09-15", "2026-09-16", "2026-09-17", "2026-09-18", "2026-09-21", "2026-09-22", "2026-09-23", "2026-09-24", "2026-09-25", "2026-09-28", "2026-09-29", "2026-09-30", "2026-10-01", "2026-10-02", "2026-10-05", "2026-10-06", "2026-10-07", "2026-10-08", "2026-10-09", "2026-10-12", "2026-10-13", "2026-10-14", "2026-10-15", "2026-10-16", "2026-10-19", "2026-10-20", "2026-10-21", "2026-10-22", "2026-10-23", "2026-10-26", "2026-10-27", "2026-10-28", "2026-10-29", "2026-10-30", "2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-06", "2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13", "2026-11-16", "2026-11-17", "2026-11-18", "2026-11-19", "2026-11-20", "2026-11-23", "2026-11-24", "2026-11-25", "2026-11-27", "2026-11-30", "2026-12-01", "2026-12-02", "2026-12-03", "2026-12-04", "2026-12-07", "2026-12-08", "2026-12-09", "2026-12-10", "2026-12-11", "2026-12-14", "2026-12-15", "2026-12-16", "2026-12-17", "2026-12-18", "2026-12-21", "2026-12-22", "2026-12-23", "2026-12-24", "2026-12-28", "2026-12-29", "2026-12-30", "2026-12-31", "2027-01-04", "2027-01-05", "2027-01-06", "2027-01-07", "2027-01-08", "2027-01-11", "2027-01-12", "2027-01-13", "2027-01-14", "2027-01-15", "2027-01-19", "2027-01-20", "2027-01-21", "2027-01-22", "2027-01-25", "2027-01-26", "2027-01-27", "2027-01-28", "2027-01-29", "2027-02-01", "2027-02-02", "2027-02-03", "2027-02-04", "2027-02-05", "2027-02-08", "2027-02-09", "2027-02-10", "2027-02-11", "2027-02-12", "2027-02-16", "2027-02-17", "2027-02-18", "2027-02-19", "2027-02-22", "2027-02-23", "2027-02-24", "2027-02-25", "2027-02-26", "2027-03-01", "2027-03-02", "2027-03-03", "2027-03-04", "2027-03-05", "2027-03-08", "2027-03-09", "2027-03-10", "2027-03-11", "2027-03-12", "2027-03-15", "2027-03-16", "2027-03-17", "2027-03-18", "2027-03-19", "2027-03-22", "2027-03-23", "2027-03-24", "2027-03-25", "2027-03-29", "2027-03-30", "2027-03-31", "2027-04-01", "2027-04-02", "2027-04-05", "2027-04-06", "2027-04-07", "2027-04-08", "2027-04-09", "2027-04-12", "2027-04-13", "2027-04-14", "2027-04-15", "2027-04-16", "2027-04-19", "2027-04-20", "2027-04-21", "2027-04-22", "2027-04-23", "2027-04-26", "2027-04-27", "2027-04-28", "2027-04-29", "2027-04-30", "2027-05-03", "2027-05-04", "2027-05-05", "2027-05-06", "2027-05-07", "2027-05-10", "2027-05-11", "2027-05-12", "2027-05-13", "2027-05-14", "2027-05-17", "2027-05-18", "2027-05-19", "2027-05-20", "2027-05-21", "2027-05-24", "2027-05-25", "2027-05-26", "2027-05-27", "2027-05-28", "2027-06-01", "2027-06-02", "2027-06-03", "2027-06-04", "2027-06-07", "2027-06-08", "2027-06-09", "2027-06-10", "2027-06-11", "2027-06-14", "2027-06-15", "2027-06-16", "2027-06-17", "2027-06-21", "2027-06-22", "2027-06-23", "2027-06-24", "2027-06-25", "2027-06-28", "2027-06-29", "2027-06-30", "2027-07-01", "2027-07-02", "2027-07-06", "2027-07-07", "2027-07-08", "2027-07-09", "2027-07-12", "2027-07-13", "2027-07-14", "2027-07-15", "2027-07-16", "2027-07-19", "2027-07-20", "2027-07-21", "2027-07-22", "2027-07-23", "2027-07-26", "2027-07-27", "2027-07-28", "2027-07-29", "2027-07-30", "2027-08-02", "2027-08-03", "2027-08-04", "2027-08-05", "2027-08-06", "2027-08-09", "2027-08-10", "2027-08-11", "2027-08-12", "2027-08-13", "2027-08-16", "2027-08-17", "2027-08-18", "2027-08-19", "2027-08-20", "2027-08-23", "2027-08-24", "2027-08-25", "2027-08-26", "2027-08-27", "2027-08-30", "2027-08-31", "2027-09-01", "2027-09-02", "2027-09-03", "2027-09-07", "2027-09-08", "2027-09-09", "2027-09-10", "2027-09-13", "2027-09-14", "2027-09-15", "2027-09-16", "2027-09-17", "2027-09-20", "2027-09-21", "2027-09-22", "2027-09-23", "2027-09-24", "2027-09-27", "2027-09-28", "2027-09-29", "2027-09-30", "2027-10-01", "2027-10-04", "2027-10-05", "2027-10-06", "2027-10-07", "2027-10-08", "2027-10-11", "2027-10-12", "2027-10-13", "2027-10-14", "2027-10-15", "2027-10-18", "2027-10-19", "2027-10-20", "2027-10-21", "2027-10-22", "2027-10-25", "2027-10-26", "2027-10-27", "2027-10-28", "2027-10-29", "2027-11-01", "2027-11-02", "2027-11-03", "2027-11-04", "2027-11-05", "2027-11-08", "2027-11-09", "2027-11-10", "2027-11-11", "2027-11-12", "2027-11-15", "2027-11-16", "2027-11-17", "2027-11-18", "2027-11-19", "2027-11-22", "2027-11-23", "2027-11-24", "2027-11-26", "2027-11-29", "2027-11-30", "2027-12-01", "2027-12-02", "2027-12-03", "2027-12-06", "2027-12-07", "2027-12-08", "2027-12-09", "2027-12-10", "2027-12-13", "2027-12-14", "2027-12-15", "2027-12-16", "2027-12-17", "2027-12-20", "2027-12-21", "2027-12-22", "2027-12-23", "2027-12-27", "2027-12-28", "2027-12-29", "2027-12-30", "2027-12-31", "2028-01-03", "2028-01-04", "2028-01-05", "2028-01-06", "2028-01-07", "2028-01-10", "2028-01-11", "2028-01-12", "2028-01-13", "2028-01-14"];
const N = PLAN_DATES.length;

const STORE_KEY = "bull-tracker-v1";
const fmt = (v) =>
  v == null ? "—" : v >= 1e6 ? "$" + (v / 1e6).toFixed(2) + "M" : "$" + Math.round(v).toLocaleString();
const fmtFull = (v) => (v == null ? "—" : "$" + Number(v).toLocaleString(undefined, { maximumFractionDigits: 2 }));
const pct = (v, d = 2) => (v == null ? "—" : (v >= 0 ? "+" : "") + (v * 100).toFixed(d) + "%");

export default function BullRunTracker() {
  const [entries, setEntries] = useState({}); // { "2026-07-13": 65.0, ... }
  const [maxLossPct, setMaxLossPct] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const [dateInput, setDateInput] = useState("");
  const [balanceInput, setBalanceInput] = useState("");
  const [saveMsg, setSaveMsg] = useState("");

  // ---- load persisted state ----
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setEntries(data.entries || {});
        if (data.maxLossPct) setMaxLossPct(data.maxLossPct);
      }
    } catch (e) {
      /* no saved data yet */
    }
    setLoaded(true);
  }, []);

  const persist = (nextEntries, nextPct) => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ entries: nextEntries, maxLossPct: nextPct }));
    } catch (e) {
      setSaveMsg("Could not save — storage unavailable.");
    }
  };

  // ---- derived: sorted logged days ----
  const logged = useMemo(() => {
    return PLAN_DATES.map((d, i) => ({ date: d, planned: PLAN_VALS[i], actual: entries[d] ?? null, day: i + 1 }))
      .filter((r) => r.actual != null);
  }, [entries]);

  const lastEntry = logged.length ? logged[logged.length - 1] : null;
  const prevEntry = logged.length > 1 ? logged[logged.length - 2] : null;

  // next untracked plan day (first date with no entry after the last logged one)
  const nextDay = useMemo(() => {
    const lastIdx = lastEntry ? PLAN_DATES.indexOf(lastEntry.date) : -1;
    for (let i = lastIdx + 1; i < N; i++) if (entries[PLAN_DATES[i]] == null) return PLAN_DATES[i];
    return null;
  }, [entries, lastEntry]);

  useEffect(() => {
    if (loaded && !dateInput && nextDay) setDateInput(nextDay);
  }, [loaded, nextDay, dateInput]);

  // ---- risk math ----
  const baseBalance = lastEntry ? lastEntry.actual : 65;
  const maxLossAllowed = baseBalance * (maxLossPct / 100);
  const floorBalance = baseBalance - maxLossAllowed;

  const rows = useMemo(() => {
    return logged.map((r, i) => {
      const prev = i > 0 ? logged[i - 1] : null;
      const ret = prev ? r.actual / prev.actual - 1 : null;
      const floor = prev ? prev.actual * (1 - maxLossPct / 100) : null;
      const breach = floor != null && r.actual < floor;
      const vsPlan = r.actual / r.planned - 1;
      return { ...r, ret, breach, vsPlan };
    });
  }, [logged, maxLossPct]);

  const breaches = rows.filter((r) => r.breach).length;
  const winDays = rows.filter((r) => r.ret != null && r.ret > 0).length;
  const retDays = rows.filter((r) => r.ret != null).length;

  // ---- chart data: full plan + actuals overlaid ----
  const chartData = useMemo(() => {
    return PLAN_DATES.map((d, i) => ({
      date: d,
      label: d.slice(2, 7),
      plan: PLAN_VALS[i],
      actual: entries[d] ?? null,
    }));
  }, [entries]);

  // ---- actions ----
  const saveEntry = () => {
    const b = parseFloat(balanceInput);
    if (!dateInput || !PLAN_DATES.includes(dateInput)) {
      setSaveMsg("Pick a trading day from the plan (weekends and holidays are skipped).");
      return;
    }
    if (isNaN(b) || b <= 0) {
      setSaveMsg("Enter a balance greater than zero.");
      return;
    }
    const next = { ...entries, [dateInput]: b };
    setEntries(next);
    persist(next, maxLossPct);
    const prevBal = lastEntry && dateInput > lastEntry.date ? lastEntry.actual : null;
    const floor = prevBal != null ? prevBal * (1 - maxLossPct / 100) : null;
    if (floor != null && b < floor) {
      setSaveMsg("Saved — but this breaks your max-loss floor of " + fmtFull(floor) + ". Log it and step away.");
    } else {
      setSaveMsg("Saved " + fmtFull(b) + " for " + dateInput + ".");
    }
    setBalanceInput("");
    setDateInput("");
  };

  const removeLast = () => {
    if (!lastEntry) return;
    const next = { ...entries };
    delete next[lastEntry.date];
    setEntries(next);
    persist(next, maxLossPct);
    setSaveMsg("Removed entry for " + lastEntry.date + ".");
  };

  const updatePct = (v) => {
    const p = Math.min(50, Math.max(0.5, v));
    setMaxLossPct(p);
    persist(entries, p);
  };

  const resetAll = () => {
    setEntries({});
    try { localStorage.removeItem(STORE_KEY); } catch (e) {}
    setSaveMsg("All entries cleared.");
  };

  // altimeter geometry: floor at left edge, base at ~70%, headroom to the right
  const altSpan = maxLossAllowed * 1.6;
  const altPos = (v) => Math.min(100, Math.max(0, ((v - floorBalance) / altSpan) * 100));
  const todayEntered = dateInput && entries[dateInput] != null ? entries[dateInput] : null;

  const dayNum = lastEntry ? lastEntry.day : 0;
  const planToday = lastEntry ? lastEntry.planned : PLAN_VALS[0];

  if (!loaded)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-sm">
        loading ledger…
      </div>
    );

  return (
    <div className="min-h-screen text-slate-200" style={{ background: "#0C1524" }}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* header */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="text-[11px] tracking-[0.25em] uppercase text-amber-400/80 font-mono">Risk ledger</div>
            <h1 className="text-2xl font-semibold text-slate-50">$65 → $1M · 18-month plan</h1>
          </div>
          <div className="font-mono text-sm text-slate-400">
            Day <span className="text-slate-100">{dayNum}</span> / {N} · Jul 13 ’26 → Jan 14 ’28
          </div>
        </div>

        {/* prompt to update balance */}
        <div className="mt-6 rounded-lg border border-amber-400/30 bg-amber-400/5 p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[220px]">
              <div className="text-sm text-amber-200/90 mb-2">
                {nextDay
                  ? "Update your balance — next unlogged trading day is " + nextDay + "."
                  : "Plan complete. All 382 days logged."}
              </div>
              <div className="flex flex-wrap gap-2">
                <input
                  type="date"
                  value={dateInput}
                  min={PLAN_DATES[0]}
                  max={PLAN_DATES[N - 1]}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded px-3 py-2 font-mono text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                  aria-label="Trading day"
                />
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Closing balance ($)"
                  value={balanceInput}
                  onChange={(e) => setBalanceInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEntry()}
                  className="w-48 bg-slate-900 border border-slate-700 rounded px-3 py-2 font-mono text-sm text-slate-100 focus:outline-none focus:border-amber-400"
                  aria-label="Closing balance in dollars"
                />
                <button
                  onClick={saveEntry}
                  className="px-4 py-2 rounded bg-amber-400 text-slate-950 text-sm font-semibold hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  Save balance
                </button>
              </div>
              {todayEntered != null && (
                <div className="mt-1 text-xs text-slate-400 font-mono">
                  {dateInput} already logged at {fmtFull(todayEntered)} — saving again overwrites it.
                </div>
              )}
            </div>
          </div>
          {saveMsg && <div className="mt-3 text-sm font-mono text-slate-300">{saveMsg}</div>}
        </div>

        {/* risk floor altimeter — signature element */}
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="flex flex-wrap justify-between items-baseline gap-2">
            <div className="text-[11px] tracking-[0.2em] uppercase text-slate-400 font-mono">Tomorrow’s risk floor</div>
            <label className="text-xs text-slate-400 font-mono flex items-center gap-2">
              max daily loss
              <input
                type="number"
                value={maxLossPct}
                min="0.5"
                max="50"
                step="0.5"
                onChange={(e) => updatePct(parseFloat(e.target.value) || 5)}
                className="w-16 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-right text-slate-100 focus:outline-none focus:border-amber-400"
                aria-label="Max daily loss percent"
              />
              %
            </label>
          </div>
          <div className="mt-4 relative h-10 rounded bg-slate-950 border border-slate-800 overflow-hidden" role="img"
               aria-label={"Balance " + fmtFull(baseBalance) + ", floor " + fmtFull(floorBalance)}>
            {/* danger zone below floor is off-scale left; shade the first 8% as the cliff edge */}
            <div className="absolute inset-y-0 left-0 w-[2px] bg-red-500" style={{ left: altPos(floorBalance) + "%" }} />
            <div
              className="absolute inset-y-0 bg-red-500/10"
              style={{ left: 0, width: altPos(floorBalance) + 8 + "%" }}
            />
            <div
              className="absolute inset-y-1 w-[3px] bg-amber-400 rounded"
              style={{ left: altPos(baseBalance) + "%" }}
              title={"Current: " + fmtFull(baseBalance)}
            />
          </div>
          <div className="mt-2 grid grid-cols-3 font-mono text-xs">
            <div className="text-red-400">
              floor {fmtFull(floorBalance)}
            </div>
            <div className="text-center text-slate-400">
              max loss allowed <span className="text-slate-100">{fmtFull(maxLossAllowed)}</span>
            </div>
            <div className="text-right text-amber-300">balance {fmtFull(baseBalance)}</div>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            If tomorrow’s balance closes under the floor, the day is flagged as a discipline breach.
          </div>
        </div>

        {/* stat tiles */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tile label="Current balance" value={fmt(baseBalance)} tone="plain" />
          <Tile
            label="Last daily return"
            value={prevEntry && lastEntry ? pct(lastEntry.actual / prevEntry.actual - 1) : "—"}
            tone={prevEntry && lastEntry ? (lastEntry.actual >= prevEntry.actual ? "up" : "down") : "plain"}
          />
          <Tile
            label="vs plan today"
            value={lastEntry ? pct(lastEntry.actual / planToday - 1, 1) : "—"}
            tone={lastEntry ? (lastEntry.actual >= planToday ? "up" : "down") : "plain"}
          />
          <Tile
            label="Breaches / win rate"
            value={(breaches > 0 ? breaches + "⚠" : "0") + " · " + (retDays ? Math.round((winDays / retDays) * 100) + "%" : "—")}
            tone={breaches > 0 ? "down" : "plain"}
          />
        </div>

        {/* chart */}
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-[11px] tracking-[0.2em] uppercase text-slate-400 font-mono mb-3">
            Plan (amber) vs your actuals (green)
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 11 }} interval={Math.floor(N / 8)} tickLine={false} axisLine={{ stroke: "#1e293b" }} />
                <YAxis tickFormatter={fmt} tick={{ fill: "#64748b", fontSize: 11 }} width={64} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 6, fontFamily: "monospace", fontSize: 12 }}
                  labelFormatter={(l, p) => (p && p[0] ? p[0].payload.date : l)}
                  formatter={(v, name) => [fmtFull(v), name === "plan" ? "Plan" : "Actual"]}
                />
                <Line type="monotone" dataKey="plan" stroke="#F5B841" strokeWidth={1.5} dot={false} strokeDasharray="4 3" />
                <Line type="monotone" dataKey="actual" stroke="#2BB673" strokeWidth={2.5} dot={false} connectNulls />
                {lastEntry && <ReferenceLine x={lastEntry.date.slice(2, 7)} stroke="#334155" />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* history table */}
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-800">
            <div className="text-[11px] tracking-[0.2em] uppercase text-slate-400 font-mono">Logged days</div>
            <div className="flex gap-2">
              <button onClick={removeLast} disabled={!lastEntry}
                className="text-xs px-3 py-1 rounded border border-slate-700 text-slate-300 hover:border-slate-500 disabled:opacity-40">
                Undo last
              </button>
              <button onClick={resetAll} disabled={!logged.length}
                className="text-xs px-3 py-1 rounded border border-red-900 text-red-400 hover:border-red-600 disabled:opacity-40">
                Clear all
              </button>
            </div>
          </div>
          {rows.length === 0 ? (
            <div className="p-6 text-sm text-slate-400">
              No days logged yet. Enter your Day 1 balance above — the plan starts at $65 on 2026-07-13.
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full font-mono text-xs">
                <thead className="sticky top-0 bg-slate-900 text-slate-500">
                  <tr className="text-left">
                    <th className="px-4 py-2 font-normal">Day</th>
                    <th className="px-2 py-2 font-normal">Date</th>
                    <th className="px-2 py-2 font-normal text-right">Balance</th>
                    <th className="px-2 py-2 font-normal text-right">Daily ret.</th>
                    <th className="px-2 py-2 font-normal text-right">vs plan</th>
                    <th className="px-4 py-2 font-normal text-right">Floor</th>
                  </tr>
                </thead>
                <tbody>
                  {[...rows].reverse().map((r) => (
                    <tr key={r.date} className={"border-t border-slate-800/60 " + (r.breach ? "bg-red-500/10" : "")}>
                      <td className="px-4 py-1.5 text-slate-500">{r.day}</td>
                      <td className="px-2 py-1.5 text-slate-300">{r.date}</td>
                      <td className="px-2 py-1.5 text-right text-slate-100">{fmtFull(r.actual)}</td>
                      <td className={"px-2 py-1.5 text-right " + (r.ret == null ? "text-slate-500" : r.ret >= 0 ? "text-emerald-400" : "text-red-400")}>
                        {pct(r.ret)}
                      </td>
                      <td className={"px-2 py-1.5 text-right " + (r.vsPlan >= 0 ? "text-emerald-400" : "text-amber-400")}>{pct(r.vsPlan, 1)}</td>
                      <td className="px-4 py-1.5 text-right text-slate-400">{r.breach ? "BREACH" : "ok"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-slate-600">
          Plan data is the simulated 18-month curve from our chart. Entries and the max-loss setting are saved to your
          personal storage on this artifact, so they persist between sessions.
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, tone }) {
  const color = tone === "up" ? "text-emerald-400" : tone === "down" ? "text-red-400" : "text-slate-100";
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3">
      <div className="text-[10px] tracking-[0.15em] uppercase text-slate-500 font-mono">{label}</div>
      <div className={"mt-1 font-mono text-lg " + color}>{value}</div>
    </div>
  );
}
