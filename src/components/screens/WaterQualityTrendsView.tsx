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
  const [hoveredPoint, setHoveredPoint] = useState<string | null>('Sep 2024');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentDataset =
    activeParam === 'BOD'
      ? TIME_SERIES_PREMPURA_BOD
      : activeParam === 'DO'
      ? TIME_SERIES_PREMPURA_DO
      : TIME_SERIES_PREMPURA_PH;

  return (
    <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION 1: Page Header & Global Dossier Actions */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-on-surface tracking-tight">
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

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenExportModal('BPL-WTR-GH-04')}
            className="h-9 px-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base text-outline">download</span>
            <span>Export Trend Data (CSV)</span>
          </button>
          <button
            onClick={() => showToast('Trend Brief (PDF) generated with MPPCB seal.')}
            className="h-9 px-3.5 rounded-lg bg-primary hover:bg-tertiary-container text-on-primary text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>Generate Trend Brief (PDF)</span>
          </button>
        </div>
      </section>

      {/* SECTION 2: Control & Filter Ribbon */}
      <section className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Ghat Selector Group */}
          <div className="flex items-center gap-3 flex-wrap">
            <label className="text-[11px] font-bold uppercase tracking-wider text-outline shrink-0">
              Monitored Ghat:
            </label>
            <div className="relative">
              <select
                value={selectedGhat}
                onChange={(e) => setSelectedGhat(e.target.value)}
                className="h-9 pl-3 pr-8 bg-surface-container-low border border-outline-variant/80 rounded-lg text-xs font-semibold text-on-surface focus:outline-none focus:border-primary cursor-pointer"
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
            <div className="hidden lg:flex items-center gap-1.5 text-xs">
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
              <button
                type="button"
                onClick={() => setSelectedGhat('Sheetal Das Ki Bagiya (BPL-WTR-GH-01) — Upper Lake')}
                className="px-2 py-1 rounded bg-surface hover:bg-surface-container border border-outline-variant/70 text-on-surface-variant text-[11px]"
              >
                Sheetal Das
              </button>
            </div>
          </div>

          {/* Year Comparison Toggles */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider text-outline">
              Historical Series:
            </span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low border border-outline-variant/80 cursor-pointer hover:bg-surface-container transition-colors text-xs">
                <input
                  type="checkbox"
                  checked={show2023}
                  onChange={(e) => setShow2023(e.target.checked)}
                  className="rounded border-outline text-secondary focus:ring-0"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-semibold text-on-surface">2023</span>
                <span className="text-[10px] bg-secondary/15 text-secondary px-1.5 py-0.2 rounded font-bold">
                  14 obs
                </span>
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
                <span className="text-[10px] bg-primary text-on-primary px-1.5 py-0.2 rounded font-bold">
                  18 obs
                </span>
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
                <span className="text-[10px] bg-outline-variant/50 text-on-surface-variant px-1.5 py-0.2 rounded font-bold">
                  6 obs
                </span>
              </label>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 bg-surface-container-low border border-outline-variant/80 rounded-lg">
            <button
              onClick={() => setViewMode('line')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'line'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">show_chart</span>
              <span>Line (Temporal)</span>
            </button>
            <button
              onClick={() => setViewMode('seasonal')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${
                viewMode === 'seasonal'
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bar_chart</span>
              <span>Seasonal Matrix</span>
            </button>
          </div>
        </div>

        {/* Parameter Tabs & Statutory Threshold Prominence */}
        <div className="pt-2.5 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-outline mr-2 font-medium">Water Parameter:</span>
            <button
              onClick={() => setActiveParam('BOD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'BOD'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span className="material-symbols-outlined text-sm">bubble_chart</span>
              <span>BOD (Biochemical Oxygen Demand)</span>
            </button>
            <button
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
              onClick={() => setActiveParam('pH')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'pH'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span>pH Index</span>
            </button>
            <button
              onClick={() => setActiveParam('F.Coli')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeParam === 'F.Coli'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface hover:bg-surface-container text-on-surface-variant border border-outline-variant/60'
              }`}
            >
              <span>Fecal Coliform (MPN)</span>
            </button>
          </div>

          {/* Parameter Benchmark Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-error-container/50 border border-error/20 text-on-error-container text-xs">
            <span className="material-symbols-outlined text-base text-error">rule</span>
            <span>
              <strong>BOD Standard:</strong> CPCB Class B Limit: <strong>≤ 3.0 mg/L</strong> (Outdoor Bathing)
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: Main Analytical Visualisation Area */}
      <div className="grid grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Multi-Year Temporal Chart & Seasonal Matrix (8 cols) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          {/* Historical Comparison Chart Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            <div className="px-5 py-3 border-b border-outline-variant/60 flex items-center justify-between bg-surface-container-low/40">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-lg">timeline</span>
                <div>
                  <h3 className="text-xs font-bold text-on-surface">
                    Biochemical Oxygen Demand (BOD) — 2023 vs 2024 vs 2025
                  </h3>
                  <p className="text-[11px] text-outline">
                    Location: {selectedGhat}
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs">
                {show2023 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-secondary rounded-full"></span>
                    <span className="text-on-surface">2023 (14)</span>
                  </div>
                )}
                {show2024 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-primary rounded-full"></span>
                    <span className="text-on-surface">2024 (18)</span>
                  </div>
                )}
                {show2025 && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1 bg-tertiary-container rounded-full"></span>
                    <span className="text-on-surface">2025 (6)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-error"></span>
                  <span className="text-error font-semibold">Class B (3.0 mg/L)</span>
                </div>
              </div>
            </div>

            {/* Canvas / Chart Area */}
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container-low rounded-lg border border-outline-variant/50 text-[11px] text-outline">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 data-void-hatch border border-outline-variant rounded-xs inline-block"></span>
                  <span>
                    <strong>Preserved Sampling Gaps:</strong> Hatched corridors denote zero registered MPPCB grab samples. Zero concentration is NOT interpolated.
                  </span>
                </div>
                <span className="text-primary font-medium">Confidence Model: Deterministic Point-to-Point</span>
              </div>

              {/* Interactive SVG Chart */}
              <div className="relative w-full h-[320px] mt-2 border-b border-l border-outline-variant/80 select-none bg-surface/30">
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
                      CPCB Bathing Standard Threshold (Max 3.0 mg/L)
                    </span>
                  </div>
                  <div className="w-full border-t border-outline-variant/30 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">2.0 mg/L</span>
                  </div>
                  <div className="w-full border-t border-outline-variant/50 flex items-center justify-between text-[10px] text-outline pr-1">
                    <span className="pl-1">0.0 mg/L Baseline</span>
                  </div>
                </div>

                {/* Hatched Data Void Corridors */}
                {/* Void 1: Feb to May */}
                <div className="absolute top-0 bottom-0 left-[12%] w-[24%] data-void-hatch border-x border-outline-variant/70 flex flex-col items-center justify-center pointer-events-auto group">
                  <div className="opacity-70 group-hover:opacity-100 bg-surface-container-lowest/90 px-2 py-1 rounded border border-outline-variant text-[10px] text-center shadow-xs transition-opacity">
                    <span className="font-bold text-outline block">DATA VOID (Feb–May)</span>
                    <span className="text-[9px] text-outline/80">No Grab Samples Logged</span>
                  </div>
                </div>

                {/* Void 2: Q4 Upcoming Void */}
                <div className="absolute top-0 bottom-0 left-[78%] w-[20%] data-void-hatch border-x border-outline-variant/70 flex flex-col items-center justify-center">
                  <div className="bg-surface-container-lowest/90 px-2 py-0.5 rounded border border-outline-variant text-[10px] text-center">
                    <span className="font-semibold text-outline text-[10px]">Q4 Observation Void</span>
                  </div>
                </div>

                {/* Event Marker: Ganesh Visarjan (Mid-Sept) */}
                <div className="absolute top-0 bottom-0 left-[68%] w-px border-l border-error border-dashed pointer-events-none z-10"></div>
                <div className="absolute -top-3 left-[68%] -translate-x-1/2 bg-error text-on-error text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider z-20 shadow-xs">
                  Ganesh Visarjan (Sep 18)
                </div>

                {/* Event Marker: Durga Visarjan (Mid-Oct) */}
                <div className="absolute top-0 bottom-0 left-[77%] w-px border-l border-error border-dashed pointer-events-none z-10"></div>
                <div className="absolute top-3 left-[77%] -translate-x-1/2 bg-[#B45309] text-on-error text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider z-20 shadow-xs">
                  Durga Visarjan (Oct 14)
                </div>

                {/* SVG Curve Elements */}
                <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 320">
                  {/* 2023 Series (Teal) */}
                  {show2023 && (
                    <>
                      <polyline
                        fill="none"
                        points="30,230 110,225 370,205 480,195 590,190 680,88 770,135 880,203"
                        stroke="#006a61"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                      <circle cx="30" cy="230" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="110" cy="225" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="370" cy="205" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="480" cy="195" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="590" cy="190" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="680" cy="88" fill="#006a61" r="6" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="770" cy="135" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="880" cy="203" fill="#006a61" r="4" stroke="#ffffff" strokeWidth="2" />
                    </>
                  )}

                  {/* 2024 Series (Deep Blue Primary) */}
                  {show2024 && (
                    <>
                      <polyline
                        fill="none"
                        points="30,220 100,215 370,230 460,220 560,205 680,64 770,116 840,176 890,192"
                        stroke="#006194"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3.5"
                      />
                      <circle cx="30" cy="220" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="100" cy="215" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="370" cy="230" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="460" cy="220" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="560" cy="205" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                      {/* Critical Spike Points */}
                      <circle cx="680" cy="64" fill="#ba1a1a" r="7" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx="770" cy="116" fill="#ba1a1a" r="6" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="840" cy="176" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="890" cy="192" fill="#006194" r="4.5" stroke="#ffffff" strokeWidth="2" />
                    </>
                  )}

                  {/* 2025 Series (Dashed) */}
                  {show2025 && (
                    <>
                      <polyline
                        fill="none"
                        points="370,224 460,218 560,210 650,150"
                        stroke="#287ab3"
                        strokeDasharray="4 3"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                      <circle cx="370" cy="224" fill="#287ab3" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="460" cy="218" fill="#287ab3" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="560" cy="210" fill="#287ab3" r="4" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="650" cy="150" fill="#287ab3" r="4" stroke="#ffffff" strokeWidth="2" />
                    </>
                  )}
                </svg>

                {/* Tooltip Overlay (Sep 2024 Peak BOD Breach) */}
                <div className="absolute top-10 left-[68%] -translate-x-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg shadow-xl border border-slate-700 pointer-events-none z-30 min-w-[190px]">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-700 pb-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Ganesh Visarjan +72h</span>
                    <span className="text-[10px] font-mono text-slate-400">Sep 18, 2024</span>
                  </div>
                  <div className="text-xs font-bold text-white flex items-baseline gap-1">
                    <span className="text-base font-extrabold text-red-400">6.4</span>{' '}
                    <span className="text-[11px] font-normal text-slate-300">mg/L BOD</span>
                    <span className="text-[10px] text-red-300 font-semibold ml-auto">+113% Breach</span>
                  </div>
                  <div className="text-[10px] text-slate-300 flex items-center justify-between mt-1 pt-1 border-t border-slate-800">
                    <span>Lab ID: MPPCB/BPL-LAB-24</span>
                    <span className="font-bold text-emerald-400">VERIFIED</span>
                  </div>
                </div>

                {/* Secondary Flag for Durga Visarjan */}
                <div className="absolute top-24 left-[77%] -translate-x-1/2 bg-white text-on-surface px-2.5 py-1 rounded border border-error/50 shadow-sm z-20 text-[10px]">
                  <span className="font-bold text-error">5.1 mg/L</span> <span className="text-outline">Durga Visarjan</span>
                </div>
              </div>

              {/* X-Axis Months */}
              <div className="grid grid-cols-12 text-center text-xs text-outline pt-2 px-1">
                <div>Jan</div>
                <div className="text-outline/60">Feb</div>
                <div className="text-outline/60">Mar</div>
                <div className="text-outline/60">Apr</div>
                <div>May</div>
                <div>Jun</div>
                <div>Jul</div>
                <div className="font-semibold text-primary">Aug</div>
                <div className="font-bold text-error">Sep (V)</div>
                <div className="font-bold text-[#B45309]">Oct (V)</div>
                <div>Nov</div>
                <div>Dec</div>
              </div>
            </div>

            <div className="px-5 py-2.5 bg-surface-container-low/30 border-t border-outline-variant/60 flex items-center justify-between text-xs text-outline">
              <div className="flex items-center gap-4">
                <span>Standard Basis: <strong>CPCB Gazette Notification 2000</strong></span>
                <span>•</span>
                <span>Method: <strong>5-Day Incubated BOD @ 20°C</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="font-medium">No Interpolation Applied</span>
              </div>
            </div>
          </div>

          {/* Seasonal Periodicity & Visarjan Impact Summary Table */}
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-on-surface">Seasonal Periodicity & Visarjan Impact Analysis</h4>
                <p className="text-[11px] text-outline">Ghat concentration dynamics compared against pre-monsoon baseline.</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-high text-primary border border-primary/20">
                Archival 2024 Aggregate
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
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
                    <td className="px-3 py-2.5 text-right text-secondary font-medium tabular-nums">0.70x (Within Limit)</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                        SAFE
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-outline">4 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-outline">MPPCB/BPL-LAB-24-06</td>
                  </tr>

                  <tr className="bg-error-container/10 hover:bg-error-container/20 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-error flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      Ganesh Visarjan Spike
                    </td>
                    <td className="px-3 py-2.5 text-outline">Sep 16 – Sep 20</td>
                    <td className="px-3 py-2.5 text-right font-extrabold text-error tabular-nums">6.4 mg/L</td>
                    <td className="px-3 py-2.5 text-right text-error font-bold tabular-nums">+204% vs baseline (2.13x)</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                        EXCEEDANCE
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-on-surface">6 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-primary">MPPCB/BPL-LAB-24-09A</td>
                  </tr>

                  <tr className="bg-amber-500/5 hover:bg-amber-500/10 transition-colors">
                    <td className="px-3 py-2.5 font-bold text-[#B45309] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B45309]"></span>
                      Durga Visarjan Spike
                    </td>
                    <td className="px-3 py-2.5 text-outline">Oct 12 – Oct 16</td>
                    <td className="px-3 py-2.5 text-right font-bold text-[#B45309] tabular-nums">5.1 mg/L</td>
                    <td className="px-3 py-2.5 text-right text-[#B45309] font-medium tabular-nums">+142% vs baseline (1.70x)</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        EXCEEDANCE
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-on-surface">5 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-primary">MPPCB/BPL-LAB-24-10B</td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-3 py-2.5 font-semibold text-on-surface flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-outline"></span>
                      Winter Recovery
                    </td>
                    <td className="px-3 py-2.5 text-outline">Dec 02 – Dec 18</td>
                    <td className="px-3 py-2.5 text-right font-semibold text-on-surface tabular-nums">3.2 mg/L</td>
                    <td className="px-3 py-2.5 text-right text-outline font-medium tabular-nums">1.06x (Near threshold)</td>
                    <td className="px-3 py-2.5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                        NEAR LIMIT
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-outline">3 grab samples</td>
                    <td className="px-3 py-2.5 font-mono text-[11px] text-outline">MPPCB/BPL-LAB-24-12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Deterministic Trend Intelligence & Anomaly Audit (4 cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl shadow-xs p-4 flex flex-col gap-4">
            <div className="pb-3 border-b border-outline-variant/60">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-sm">psychology</span>
                  Rule-Based Engine
                </span>
                <span className="text-[10px] font-mono text-outline">VER-2.4-DET</span>
              </div>
              <h3 className="text-sm font-bold text-on-surface mt-2">
                Deterministic Trend Intelligence & Anomaly Audit
              </h3>
              <p className="text-xs text-outline mt-0.5">
                Rule-based synthesis grounded exclusively in available grab samples without generative synthesis.
              </p>
            </div>

            {/* Insight Block 1 */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-error text-base">error</span>
                  Post-Visarjan Organic Exceedance
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF2F2] text-[#B91C1C] border border-[#FECACA]">
                  HIGH SEVERITY
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Both 2023 and 2024 show statistically significant BOD spikes <strong className="text-error">&gt;5.0 mg/L</strong> within 72 hours of immersion ceremonies at Prempura Ghat.
              </p>
              <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant/60 flex flex-col gap-1 text-[11px]">
                <div className="text-outline font-semibold">Evidence Documentation:</div>
                <div className="text-on-surface font-mono">
                  4 archival records from MPPCB Post-Visarjan Dossier (Table 3.2). P-value: &lt;0.012 against baseline.
                </div>
              </div>
            </div>

            {/* Insight Block 2 */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#B45309] text-base">indeterminate_check_box</span>
                  Severe Unmonitored Baseline Gap (Q1-Q2)
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FDE68A]">
                  DATA GAP
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Zero grab records logged between <strong className="text-on-surface">Feb 12 and May 30</strong> across both 2024 and 2025. Dry season baseline is mathematically undefined.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#B45309] bg-[#FFFBEB] p-2 rounded border border-[#FDE68A]">
                <span className="material-symbols-outlined text-sm shrink-0">recommend</span>
                <span>Flagged for Pre-Monsoon sampling prioritisation mandate in 2026 scheduling plan.</span>
              </div>
            </div>

            {/* Insight Block 3 */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-base">compress</span>
                  DO Depletion Correlation
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-primary border border-primary/20">
                  MODERATE
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Strong inverse correlation observed: BOD peaks coincide with Dissolved Oxygen dropping to <strong className="text-error">3.8 mg/L</strong> (below CPCB mandatory minimum of 5.0 mg/L).
              </p>
              <div className="w-full bg-outline-variant/40 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-error h-full rounded-full" style={{ width: '76%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-outline font-mono">
                <span>Observed: 3.8 mg/L</span>
                <span>Threshold: ≥ 5.0 mg/L</span>
              </div>
            </div>

            {/* Audit Provenance Actions */}
            <div className="pt-3 border-t border-outline-variant/60 flex flex-col gap-3">
              <div className="text-[11px] text-outline leading-tight">
                <strong>Analytical Methodology:</strong> Deterministic Threshold Validation (CPCB Gazette Notification 2000). No generative imputation applied.
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={onNavigateToEvidence}
                  className="w-full h-8 px-3 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container text-on-surface text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm text-outline">manage_search</span>
                  <span>Inspect Raw Observation Logs</span>
                </button>
                <button
                  onClick={() => showToast('Trend analysis added to working audit dossier.')}
                  className="w-full h-8 px-3 rounded-lg bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">post_add</span>
                  <span>Add to Audit Dossier</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">history_edu</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Statutory Ledger Synced</div>
                <div className="text-[11px] text-outline">Bhopal Gazette Ref: MPPCB/ENV/24-B</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline">check_circle</span>
          </div>
        </div>
      </div>

      {/* SECTION 4: Secondary Multi-Ghat Comparative Trend Strip */}
      <section className="bg-surface-container-lowest border border-outline-variant/80 rounded-xl p-4 shadow-xs flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between border-b border-outline-variant/50 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">compare_arrows</span>
            <h3 className="text-xs font-bold text-on-surface">
              Secondary Multi-Ghat Comparative Trend Benchmarks (Visarjan Season Trajectory)
            </h3>
          </div>
          <span className="text-[11px] text-outline">4 Bhopal Immersion Ghats Under Active Environmental Surveillance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-3.5 rounded-lg bg-primary/5 border-2 border-primary/40 flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-primary truncate">Prempura Ghat</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                EXCEEDED
              </span>
            </div>
            <div className="text-[11px] text-outline">Upper Lake Bhoj Wetland</div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-base font-bold text-error">6.4</span>{' '}
                <span className="text-xs text-outline">mg/L BOD</span>
              </div>
              <span className="text-[11px] text-outline font-medium">38 total records</span>
            </div>
            <div className="h-6 w-full flex items-end gap-1 pt-1 border-t border-outline-variant/40">
              <div className="w-1/6 bg-secondary h-3 rounded-xs" title="Jan 2.4"></div>
              <div className="w-2/6 data-void-hatch h-full border border-outline-variant/50" title="Feb-May Void"></div>
              <div className="w-1/6 bg-secondary h-4 rounded-xs" title="Aug 2.9"></div>
              <div className="w-1/6 bg-error h-full rounded-xs" title="Sep Peak 6.4"></div>
              <div className="w-1/6 bg-error h-5 rounded-xs" title="Oct 5.1"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface truncate">Khatlapura Ghat</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                EXCEEDED
              </span>
            </div>
            <div className="text-[11px] text-outline">Lower Lake (Chhota Talab)</div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-base font-bold text-error">7.2</span>{' '}
                <span className="text-xs text-outline">mg/L BOD</span>
              </div>
              <span className="text-[11px] text-outline font-medium">29 total records</span>
            </div>
            <div className="h-6 w-full flex items-end gap-1 pt-1 border-t border-outline-variant/40">
              <div className="w-1/6 bg-secondary h-4 rounded-xs"></div>
              <div className="w-2/6 data-void-hatch h-full border border-outline-variant/50"></div>
              <div className="w-1/6 bg-error h-5 rounded-xs"></div>
              <div className="w-1/6 bg-error h-full rounded-xs"></div>
              <div className="w-1/6 bg-error h-6 rounded-xs"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface truncate">Shahpura Lake</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FEF2F2] text-[#B91C1C]">
                CRITICAL
              </span>
            </div>
            <div className="text-[11px] text-outline">Sector B Immersion Zone</div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-base font-bold text-error">8.1</span>{' '}
                <span className="text-xs text-outline">mg/L BOD</span>
              </div>
              <span className="text-[11px] text-[#B45309] font-medium">21 rec (62.5% gap)</span>
            </div>
            <div className="h-6 w-full flex items-end gap-1 pt-1 border-t border-outline-variant/40">
              <div className="w-1/6 bg-error h-5 rounded-xs"></div>
              <div className="w-3/6 data-void-hatch h-full border border-outline-variant/50"></div>
              <div className="w-1/6 bg-error h-full rounded-xs"></div>
              <div className="w-1/6 bg-error h-5 rounded-xs"></div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant/70 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-on-surface truncate">Sheetal Das Ki Bagiya</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FFFBEB] text-[#B45309]">
                NEAR LIMIT
              </span>
            </div>
            <div className="text-[11px] text-outline">Upper Lake Main Embankment</div>
            <div className="flex items-baseline justify-between mt-1">
              <div>
                <span className="text-base font-bold text-[#B45309]">3.4</span>{' '}
                <span className="text-xs text-outline">mg/L BOD</span>
              </div>
              <span className="text-[11px] text-outline font-medium">64 total records</span>
            </div>
            <div className="h-6 w-full flex items-end gap-1 pt-1 border-t border-outline-variant/40">
              <div className="w-1/6 bg-secondary h-3 rounded-xs"></div>
              <div className="w-1/6 data-void-hatch h-full border border-outline-variant/50"></div>
              <div className="w-1/6 bg-secondary h-3 rounded-xs"></div>
              <div className="w-1/6 bg-[#B45309] h-4 rounded-xs"></div>
              <div className="w-2/6 bg-secondary h-3 rounded-xs"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
