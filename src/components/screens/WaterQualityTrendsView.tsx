/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  TIME_SERIES_PREMPURA_BOD,
  TIME_SERIES_PREMPURA_DO,
  TIME_SERIES_PREMPURA_PH
} from '../../data/mockData.ts';

interface WaterQualityTrendsViewProps {
  onOpenExportModal: (ghatId: string) => void;
  onNavigateToEvidence: () => void;
  onNavigateToOptimiser: () => void;
}

export const WaterQualityTrendsView: React.FC<WaterQualityTrendsViewProps> = ({
  onOpenExportModal,
  onNavigateToEvidence,
  onNavigateToOptimiser
}) => {
  const [selectedGhat, setSelectedGhat] = useState('Prempura Ghat (BPL-WTR-GH-04) — Upper Lake');
  const [activeParam, setActiveParam] = useState<'BOD' | 'DO' | 'pH' | 'F.Coli'>('BOD');
  const [show2023, setShow2023] = useState(true);
  const [show2024, setShow2024] = useState(true);
  const [show2025, setShow2025] = useState(true);
  const [viewMode, setViewMode] = useState<'line' | 'seasonal'>('line');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col gap-4 sm:gap-5 min-w-0">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: Page Header & Global Dossier Actions */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-outline-variant/50">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">
              Water Quality Temporal Analysis & Multi-Year Trends
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
              Archival Registry
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1 max-w-4xl">
            Comparative analysis of archival chemical parameters across Bhopal visarjan ghats (2023–2025). Explicit gap visualisation preserves unmonitored intervals without interpolation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onOpenExportModal('BPL-WTR-GH-04')}
            className="h-9 px-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-outline">download</span>
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Trend Brief (PDF) generated with MPPCB seal.')}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-tertiary text-on-primary text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>Generate Brief</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: Control & Filter Ribbon */}
      <section className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-3 sm:p-4 shadow-xs flex flex-col gap-3.5 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Ghat Selector Group */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
            <label className="text-[11px] font-bold uppercase tracking-wider text-outline shrink-0">
              Monitored Ghat:
            </label>
            <div className="relative min-w-0">
              <select
                value={selectedGhat}
                onChange={(e) => setSelectedGhat(e.target.value)}
                className="h-9 pl-3 pr-8 bg-surface-container-low border border-outline-variant/80 rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer max-w-[260px] sm:max-w-none truncate"
                aria-label="Select monitored ghat"
              >
                <option value="Prempura Ghat (BPL-WTR-GH-04) — Upper Lake">
                  Prempura Ghat (BPL-WTR-GH-04) — Upper Lake
                </option>
                <option value="Khatlapura Ghat (BPL-WTR-GH-09) — Lower Lake">
                  Khatlapura Ghat (BPL-WTR-GH-09) — Lower Lake
                </option>
                <option value="Shahpura Lake Ghat (BPL-WTR-GH-12) — Sector B">
                  Shahpura Lake Ghat (BPL-WTR-GH-12) — Sector B
                </option>
                <option value="Sheetal Das Ki Bagiya (BPL-WTR-GH-01) — Upper Lake">
                  Sheetal Das Ki Bagiya (BPL-WTR-GH-01) — Upper Lake
                </option>
              </select>
            </div>

            {/* Quick Switch Tags */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs">
              <span className="text-outline text-[11px]">Quick:</span>
              <button
                type="button"
                onClick={() => setSelectedGhat('Khatlapura Ghat (BPL-WTR-GH-09) — Lower Lake')}
                className="px-2 py-1 rounded bg-surface hover:bg-surface-container border border-outline-variant/70 text-on-surface-variant text-[11px]"
              >
                Khatlapura
              </button>
              <button
                type="button"
                onClick={() => setSelectedGhat('Shahpura Lake Ghat (BPL-WTR-GH-12) — Sector B')}
                className="px-2 py-1 rounded bg-surface hover:bg-surface-container border border-outline-variant/70 text-on-surface-variant text-[11px]"
              >
                Shahpura Lake
              </button>
            </div>
          </div>

          {/* Year Comparison Toggles */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-outline shrink-0">
              Series:
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/80 cursor-pointer hover:bg-surface-container transition-colors text-xs">
                <input
                  type="checkbox"
                  checked={show2023}
                  onChange={(e) => setShow2023(e.target.checked)}
                  className="rounded border-outline text-secondary focus:ring-0"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-semibold text-on-surface">2023</span>
              </label>

              <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/30 cursor-pointer hover:bg-primary/15 transition-colors text-xs">
                <input
                  type="checkbox"
                  checked={show2024}
                  onChange={(e) => setShow2024(e.target.checked)}
                  className="rounded border-outline text-primary focus:ring-0"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="font-semibold text-primary">2024</span>
              </label>

              <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/80 cursor-pointer hover:bg-surface-container transition-colors text-xs">
                <input
                  type="checkbox"
                  checked={show2025}
                  onChange={(e) => setShow2025(e.target.checked)}
                  className="rounded border-outline text-tertiary-container focus:ring-0"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                <span className="font-semibold text-on-surface">2025</span>
              </label>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-surface-container-low border border-outline-variant/80 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('line')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'line'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">show_chart</span>
              <span>Line</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('seasonal')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'seasonal'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bar_chart</span>
              <span>Seasonal</span>
            </button>
          </div>
        </div>

        {/* Parameter Tabs & Statutory Threshold Prominence */}
        <div className="pt-2.5 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-outline mr-2 font-medium">Parameter:</span>
            <button
              type="button"
              onClick={() => setActiveParam('BOD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'BOD'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span>BOD</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveParam('DO')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'DO'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span>Dissolved Oxygen (DO)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveParam('pH')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'pH'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span>pH</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveParam('F.Coli')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'F.Coli'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span>F. Coliform</span>
            </button>
          </div>

          {/* Parameter Benchmark Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-error-container/50 border border-error/20 text-on-error-container text-xs">
            <span className="material-symbols-outlined text-base text-error">rule</span>
            <span>
              <strong>BOD Standard:</strong> CPCB Class B Limit ≤ 3.0 mg/L
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Main Analytical Visualisation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start min-w-0">
        {/* LEFT COLUMN: Temporal Chart & Seasonal Matrix (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5 min-w-0">
          {/* Historical Comparison Chart Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl shadow-xs overflow-hidden flex flex-col min-w-0">
            <div className="px-4 sm:px-5 py-3 border-b border-outline-variant/60 flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container-low/40 gap-2">
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-on-surface truncate">
                  Biochemical Oxygen Demand (BOD) — 2023 vs 2024 vs 2025
                </h3>
                <p className="text-[11px] text-outline truncate">
                  Location: {selectedGhat}
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs flex-wrap">
                {show2023 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-secondary rounded-full"></span>
                    <span className="text-on-surface text-[11px]">2023</span>
                  </div>
                )}
                {show2024 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-primary rounded-full"></span>
                    <span className="text-on-surface text-[11px]">2024</span>
                  </div>
                )}
                {show2025 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-tertiary-container rounded-full"></span>
                    <span className="text-on-surface text-[11px]">2025</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-error"></span>
                  <span className="text-error font-semibold text-[11px]">Class B Limit</span>
                </div>
              </div>
            </div>

            {/* Canvas / Chart Area */}
            <div className="p-3 sm:p-5 flex flex-col gap-2 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-1.5 bg-surface-container-low rounded-lg border border-outline-variant/50 text-[11px] text-outline gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 data-void-hatch border border-outline-variant rounded-xs inline-block shrink-0"></span>
                  <span>
                    <strong>Preserved Sampling Gaps:</strong> Hatched corridors denote zero registered MPPCB grab samples.
                  </span>
                </div>
                <span className="text-primary font-medium shrink-0">Point-to-Point Model</span>
              </div>

              {/* Interactive SVG Chart */}
              <div className="relative w-full h-[260px] sm:h-[320px] mt-2 border-b border-l border-outline-variant/80 select-none bg-surface/30 overflow-hidden">
                {/* Horizontal Gridlines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="w-full border-t border-outline-variant/30 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">8.0 mg/L</span>
                  </div>
                  <div className="w-full border-t border-outline-variant/30 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">6.0 mg/L</span>
                  </div>
                  <div className="w-full border-t border-outline-variant/30 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">4.0 mg/L</span>
                  </div>
                  {/* CPCB Limit 3.0 Line */}
                  <div className="w-full relative flex items-center text-[10px] text-error font-semibold pr-1">
                    <div className="w-full border-t-2 border-dashed border-error absolute top-0 left-0"></div>
                    <span className="relative z-10 bg-surface-container-lowest px-1 border border-error/30 rounded text-error ml-2 text-[10px]">
                      CPCB Limit (3.0 mg/L)
                    </span>
                  </div>
                  <div className="w-full border-t border-outline-variant/30 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">2.0 mg/L</span>
                  </div>
                  <div className="w-full border-t border-outline-variant/50 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">0.0 mg/L</span>
                  </div>
                </div>

                {/* Hatched Data Void Corridors */}
                <div className="absolute top-0 bottom-0 left-[12%] w-[24%] data-void-hatch border-x border-outline-variant/70 flex flex-col items-center justify-center">
                  <div className="bg-surface-container-lowest/90 px-1.5 py-0.5 rounded border border-outline-variant text-[9px] sm:text-[10px] text-center shadow-xs">
                    <span className="font-bold text-outline block">DATA VOID</span>
                  </div>
                </div>

                <div className="absolute top-0 bottom-0 left-[78%] w-[20%] data-void-hatch border-x border-outline-variant/70 flex flex-col items-center justify-center">
                  <div className="bg-surface-container-lowest/90 px-1.5 py-0.5 rounded border border-outline-variant text-[9px] sm:text-[10px] text-center">
                    <span className="font-semibold text-outline">Q4 Void</span>
                  </div>
                </div>

                <svg className="w-full h-full" fill="none" viewBox="0 0 700 240" preserveAspectRatio="none">
                  {/* 2023 Season Line */}
                  {show2023 && (
                    <path d="M 60 180 Q 140 170 200 130 T 320 80 T 420 150 T 520 175" fill="none" stroke="#006a61" strokeLinecap="round" strokeWidth="2.5" />
                  )}

                  {/* 2024 Season Line */}
                  {show2024 && (
                    <>
                      <path d="M 60 160 Q 150 150 220 90 T 310 40 T 370 110" fill="none" stroke="#006194" strokeLinecap="round" strokeWidth="3" />
                      <circle cx="60" cy="160" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="220" cy="90" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="310" cy="40" fill="#ba1a1a" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="370" cy="110" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                    </>
                  )}

                  {/* 2025 Gap break */}
                  {show2025 && (
                    <>
                      <path d="M 490 130 Q 550 120 620 125" fill="none" stroke="#287ab3" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="2.5" />
                      <circle cx="490" cy="130" fill="#287ab3" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                      <circle cx="620" cy="125" fill="#287ab3" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                    </>
                  )}
                </svg>
              </div>

              {/* X-Axis Months */}
              <div className="grid grid-cols-12 text-center text-[9px] sm:text-[11px] text-outline pt-2 px-1">
                <div>Jan</div>
                <div className="text-outline/60">Feb</div>
                <div className="text-outline/60">Mar</div>
                <div className="text-outline/60">Apr</div>
                <div>May</div>
                <div>Jun</div>
                <div>Jul</div>
                <div className="font-semibold text-primary">Aug</div>
                <div className="font-bold text-error">Sep</div>
                <div className="font-bold text-[#B45309]">Oct</div>
                <div>Nov</div>
                <div>Dec</div>
              </div>
            </div>

            <div className="px-4 sm:px-5 py-2.5 bg-surface-container-low/30 border-t border-outline-variant/60 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-outline gap-1">
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <span>Basis: <strong>CPCB Gazette 2000</strong></span>
                <span>•</span>
                <span>Method: <strong>5-Day Incubated BOD @ 20°C</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="font-medium">No Interpolation</span>
              </div>
            </div>
          </div>

          {/* Seasonal Periodicity Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-3 sm:p-4 shadow-xs flex flex-col gap-3 min-w-0">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <div>
                <h4 className="text-xs font-bold text-on-surface">Seasonal Periodicity & Visarjan Impact Analysis</h4>
                <p className="text-[11px] text-outline">Ghat concentration dynamics compared against pre-monsoon baseline.</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-high text-primary border border-primary/20">
                2024 Aggregate
              </span>
            </div>

            <div className="w-full overflow-x-auto min-w-0">
              <table className="w-full text-left text-xs border-collapse min-w-[620px]">
                <thead>
                  <tr className="h-9 bg-surface-container-low text-on-surface-variant text-[11px] uppercase border-b border-outline-variant font-semibold">
                    <th className="px-3 py-1">Seasonal Window</th>
                    <th className="px-3 py-1">Obs Date Range</th>
                    <th className="px-3 py-1 text-right">Mean BOD</th>
                    <th className="px-3 py-1 text-right">CPCB Threshold Ratio</th>
                    <th className="px-3 py-1 text-center">Status</th>
                    <th className="px-3 py-1">Grab Samples</th>
                    <th className="px-3 py-1">Lab Registry Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-3 py-2.5 font-semibold text-on-surface flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      Baseline (Pre-Monsoon)
                    </td>
                    <td className="px-3 py-2.5 text-outline">Jun 05 – Jun 24</td>
                    <td className="px-3 py-2.5 text-right font-bold text-on-surface tabular-nums">2.1 mg/L</td>
                    <td className="px-3 py-2.5 text-right text-secondary font-medium tabular-nums">0.70x</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                        SAFE
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-outline">4 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-outline">MPPCB/24-06</td>
                  </tr>

                  <tr className="bg-error-container/10 hover:bg-error-container/20 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-error flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Ganesh Visarjan Spike
                    </td>
                    <td className="px-3 py-2.5 text-outline">Sep 16 – Sep 20</td>
                    <td className="px-3 py-2.5 text-right font-extrabold text-error tabular-nums">6.4 mg/L</td>
                    <td className="px-3 py-2.5 text-right text-error font-bold tabular-nums">+204%</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                        EXCEEDANCE
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-on-surface">6 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-primary">MPPCB/24-09A</td>
                  </tr>

                  <tr className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-[#B45309] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B45309]"></span>
                      Durga Visarjan Spike
                    </td>
                    <td className="px-3 py-2.5 text-outline">Oct 12 – Oct 16</td>
                    <td className="px-3 py-2.5 text-right font-bold text-[#B45309] tabular-nums">5.1 mg/L</td>
                    <td className="px-3 py-2.5 text-right text-[#B45309] font-medium tabular-nums">+142%</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        EXCEEDANCE
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-on-surface">5 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-primary">MPPCB/24-10B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Deterministic Trend Intelligence (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 min-w-0">
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl shadow-xs p-4 flex flex-col gap-4 min-w-0">
            <div className="pb-3 border-b border-outline-variant/60">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Rule-Based Engine
                </span>
                <span className="text-[10px] font-mono text-outline">VER-2.4</span>
              </div>
              <h3 className="text-sm font-bold text-on-surface mt-2">
                Trend Intelligence & Anomaly Audit
              </h3>
              <p className="text-xs text-outline mt-0.5">
                Rule-based synthesis grounded in available grab samples without interpolation.
              </p>
            </div>

            {/* Insight Block 1 */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-error text-base">error</span>
                  Post-Visarjan Exceedance
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                  BREACH
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Both 2023 and 2024 show BOD spikes <strong className="text-error">&gt;5.0 mg/L</strong> within 72 hours of immersion ceremonies at Prempura Ghat.
              </p>
            </div>

            {/* Insight Block 2 */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#B45309] text-base">indeterminate_check_box</span>
                  Sampling Gap (Q1-Q2)
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                  VOID
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Zero grab records logged between Feb and May across both 2024 and 2025. Dry season baseline is unmonitored.
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-outline-variant/60 flex flex-col gap-2">
              <button
                type="button"
                onClick={onNavigateToEvidence}
                className="w-full h-8 px-3 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container text-on-surface text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm text-outline">manage_search</span>
                <span>Inspect Observation Logs</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Trend analysis added to working audit dossier.')}
                className="w-full h-8 px-3 rounded-lg bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">post_add</span>
                <span>Add to Audit Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
