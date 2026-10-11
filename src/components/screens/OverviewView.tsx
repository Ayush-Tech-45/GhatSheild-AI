/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GHAT_STATIONS } from '../../data/mockData.ts';

interface OverviewViewProps {
  onInspectGhat: (ghatId: string) => void;
  onNavigateToTrends: () => void;
  onNavigateToOptimiser: () => void;
  onNavigateToReports: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onInspectGhat,
  onNavigateToTrends,
  onNavigateToOptimiser,
  onNavigateToReports
}) => {
  const [activeParam, setActiveParam] = useState<'BOD' | 'DO' | 'pH'>('BOD');
  const [lakeFilter, setLakeFilter] = useState<'all' | 'upper' | 'lower' | 'shahpura'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredGhats = GHAT_STATIONS.filter((ghat) => {
    if (lakeFilter === 'upper') return ghat.waterBody.includes('Upper');
    if (lakeFilter === 'lower') return ghat.waterBody.includes('Lower');
    if (lakeFilter === 'shahpura') return ghat.waterBody.includes('Shahpura');
    return true;
  }).slice(0, 7);

  return (
    <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-fade-in border border-slate-700">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded bg-slate-100 text-slate-700 border border-slate-300 px-2 py-0.5 text-xs font-semibold">
              <span className="material-symbols-outlined text-xs">shield</span>
              BMC Environmental Cell
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">CPCB Bathing Water Protocol (Class B)</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Ghat Intelligence Overview</h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
            Historical water-quality evidence and operational priorities for Bhopal visarjan ghats (Lower Lake, Upper Lake, Shahpura Lake).
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {/* Lake Filter Dropdown */}
          <div className="relative">
            <select
              value={lakeFilter}
              onChange={(e) => setLakeFilter(e.target.value as any)}
              className="h-9 px-3 pr-8 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 rounded text-xs font-semibold shadow-xs cursor-pointer focus:outline-none focus:border-primary"
            >
              <option value="all">Lake Filter: All (3)</option>
              <option value="upper">Upper Lake (Bada Talab)</option>
              <option value="lower">Lower Lake (Chhota Talab)</option>
              <option value="shahpura">Shahpura Lake Basin</option>
            </select>
          </div>

          <button
            onClick={onNavigateToReports}
            className="h-9 px-3 bg-primary text-white border border-primary-container hover:bg-tertiary rounded text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            Executive Brief
          </button>
        </div>
      </div>

      {/* 4 EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Ghats in Dataset</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold text-slate-900 tabular-nums">14</h3>
                <span className="text-xs font-medium text-slate-600">Visarjan Sites</span>
              </div>
            </div>
            <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
              <span className="material-symbols-outlined text-xl">water_drop</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-xs text-slate-600">
              <span className="material-symbols-outlined text-xs text-primary">check_circle</span>
              Bhopal Municipal Limits
            </span>
            <span className="text-[11px] text-slate-400 font-mono">100% Geo-tagged</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Observations Available</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold text-slate-900 tabular-nums">428</h3>
                <span className="text-xs font-medium text-slate-600">Grab Records</span>
              </div>
            </div>
            <div className="p-2 bg-sky-50 rounded-lg text-primary">
              <span className="material-symbols-outlined text-xl">dataset</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-[11px] text-slate-600 flex items-center justify-between">
              <span>pH (142)</span>
              <span>•</span>
              <span>DO (118)</span>
              <span>•</span>
              <span>BOD (96)</span>
              <span>•</span>
              <span>F.Coli (72)</span>
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority Ghats</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold text-red-600 tabular-nums">5</h3>
                <span className="text-xs font-medium text-slate-600">Sites Flagged</span>
              </div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg text-red-700">
              <span className="material-symbols-outlined text-xl">flag</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center">
            <span className="inline-flex items-center gap-1 rounded bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
              3 High Priority | 2 Moderate
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Completeness</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-bold text-slate-900 tabular-nums">68.4%</h3>
                <span className="text-xs font-medium text-slate-600">Audit Metric</span>
              </div>
            </div>
            <div className="p-2 bg-amber-50 rounded-lg text-amber-700">
              <span className="material-symbols-outlined text-xl">pie_chart</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-amber-800 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-amber-600">info</span>
              31.6% Gaps or Unmonitored Intervals
            </span>
          </div>
        </div>
      </div>

      {/* SECTION A: GHAT PRIORITY RANKING TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">sort</span>
            <h2 className="text-sm font-bold text-slate-900">Ghat Priority Ranking & Risk Triggers</h2>
            <span className="rounded bg-slate-200/80 text-slate-700 text-xs px-2 py-0.5 font-medium ml-1">
              Ranked by Sampling Need & Anomaly Frequency
            </span>
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">info</span>
            Evidence Window: Jan 2023 – Feb 2025
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 uppercase tracking-wider border-b border-slate-200 h-9 font-semibold">
                <th className="px-4 py-2 w-12 text-center">Rank</th>
                <th className="px-4 py-2">Ghat Name</th>
                <th className="px-4 py-2">Water Body</th>
                <th className="px-4 py-2">Risk Priority Badge</th>
                <th className="px-4 py-2 text-right">Available Records</th>
                <th className="px-4 py-2 text-right">Missing Data %</th>
                <th className="px-4 py-2">Latest Obs Date</th>
                <th className="px-4 py-2">Primary Trigger Reason</th>
                <th className="px-4 py-2 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredGhats.map((ghat, idx) => {
                const rankNum = String(idx + 1).padStart(2, '0');
                const isHigh = ghat.riskPriority === 'High Priority';
                const isMod = ghat.riskPriority === 'Moderate Priority';
                const isLow = ghat.riskPriority === 'Lower Priority';

                return (
                  <tr key={ghat.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-4 py-3 font-semibold text-center text-slate-900">{rankNum}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      {ghat.name}
                      <span className="block text-[11px] font-normal text-slate-400 font-mono">ID: {ghat.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        {ghat.waterBody}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isHigh
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : isMod
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : isLow
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isHigh ? 'bg-red-600' : isMod ? 'bg-amber-600' : isLow ? 'bg-emerald-600' : 'bg-slate-500'
                          }`}
                        ></span>
                        {ghat.riskPriority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-medium tabular-nums">{ghat.recordsCount}</td>
                    <td
                      className={`px-4 py-3 text-right font-mono font-semibold tabular-nums ${
                        ghat.missingDataPct > 40 ? 'text-red-600' : ghat.missingDataPct > 20 ? 'text-amber-600' : 'text-emerald-700'
                      }`}
                    >
                      {ghat.missingDataPct.toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-[11px]">{ghat.latestObsDate}</td>
                    <td className="px-4 py-3">
                      {isHigh ? (
                        <div className="flex items-center gap-1.5 text-[11px] text-red-900 bg-red-50/60 p-1 rounded border border-red-100">
                          <span className="material-symbols-outlined text-xs text-red-600 shrink-0">error</span>
                          <span>{ghat.primaryTriggerReason}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-600">{ghat.primaryTriggerReason}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => onInspectGhat(ghat.id)}
                        className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-300 rounded text-slate-700 shadow-xs transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <p className="text-slate-500 italic">
            <strong>Statutory Caveat:</strong> Risk Priority is an analytical sampling flag reflecting observation gaps and historical threshold breaches, not a formal statutory declaration of bathing water safety.
          </p>
          <div className="text-slate-400 font-mono">Showing {filteredGhats.length} of 14 Ghats</div>
        </div>
      </div>

      {/* SECTION B & C: DYNAMICS CHART & MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Historical Dynamics Chart - 8 cols */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Historical Water Quality Dynamics</h3>
                <p className="text-xs text-slate-500">
                  Multi-year parameter trends during Pre-Visarjan, Visarjan Peak, and Post-Immersion recovery periods
                </p>
              </div>

              {/* Parameter Toggle Controls */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start">
                <button
                  onClick={() => setActiveParam('BOD')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    activeParam === 'BOD' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  BOD (mg/L)
                </button>
                <button
                  onClick={() => setActiveParam('DO')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    activeParam === 'DO' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dissolved Oxygen
                </button>
                <button
                  onClick={() => setActiveParam('pH')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    activeParam === 'pH' ? 'bg-white text-primary shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  pH Index
                </button>
              </div>
            </div>

            {/* Simulated Chart Container */}
            <div className="mt-4 relative pt-2">
              <div className="flex items-center justify-between text-xs mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <span className="w-3 h-0.5 bg-sky-500"></span> 2023 Immersion Season
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
                    <span className="w-3 h-0.5 bg-primary"></span> 2024 Immersion Season
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                    <span className="w-3 h-0.5 border-t border-dashed border-slate-400"></span> 2025 Preliminary
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200 font-semibold text-[11px]">
                  <span className="w-2 h-0.5 bg-red-600"></span> CPCB Standard Limit: BOD ≤ 3.0 mg/L
                </div>
              </div>

              {/* SVG Graphic Canvas */}
              <div className="w-full h-56 bg-slate-50/50 rounded-lg border border-slate-200/80 p-2 relative flex flex-col justify-between">
                {/* Threshold line */}
                <div className="absolute inset-x-2 top-[46%] border-b border-dashed border-red-400 z-10 flex items-center justify-between pointer-events-none">
                  <span className="bg-red-50 text-red-800 text-[10px] px-1 font-mono rounded -translate-y-2.5 border border-red-200">
                    BOD = 3.0 mg/L Threshold
                  </span>
                </div>

                {/* Sampling Gap Highlight */}
                <div className="absolute left-[54%] w-[16%] top-2 bottom-6 bg-amber-100/30 border-x border-dashed border-amber-300 z-0 flex items-center justify-center">
                  <span className="text-[10px] text-amber-800 bg-amber-100/90 px-1 py-0.5 rounded border border-amber-300 font-medium text-center leading-tight">
                    Sampling Gap<br />
                    <span className="text-[9px] font-normal">(No lab records)</span>
                  </span>
                </div>

                <svg className="w-full h-full overflow-visible z-20" fill="none" viewBox="0 0 700 180">
                  <text fill="#94A3B8" fontFamily="Inter" fontSize="10" x="5" y="25">8.0 mg/L</text>
                  <text fill="#94A3B8" fontFamily="Inter" fontSize="10" x="5" y="70">5.0 mg/L</text>
                  <text fill="#DC2626" fontFamily="Inter" fontSize="10" fontWeight="600" x="5" y="105">3.0 mg/L (Limit)</text>
                  <text fill="#94A3B8" fontFamily="Inter" fontSize="10" x="5" y="150">1.0 mg/L</text>

                  {/* 2023 Season Line */}
                  <path d="M 60 140 Q 140 130 200 95 T 320 60 T 420 110 T 520 135" fill="none" stroke="#38BDF8" strokeLinecap="round" strokeWidth="2.2" />

                  {/* 2024 Season Line */}
                  <path d="M 60 120 Q 150 115 220 70 T 310 35 T 370 85" fill="none" stroke="#006194" strokeLinecap="round" strokeWidth="2.5" />

                  {/* 2024 Data dots */}
                  <circle cx="60" cy="120" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="220" cy="70" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="310" cy="35" fill="#DC2626" r="4.5" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* Annotation on Spike */}
                  <rect fill="#DC2626" height="20" rx="3" width="85" x="290" y="8" />
                  <text fill="#FFFFFF" fontFamily="Inter" fontSize="10" fontWeight="bold" x="295" y="22">
                    Spike: 6.8 mg/L
                  </text>
                  <circle cx="370" cy="85" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />

                  {/* Gap break in 2025 */}
                  <path d="M 490 100 Q 550 90 620 95" fill="none" stroke="#006194" strokeDasharray="4 4" strokeLinecap="round" strokeWidth="2.5" />
                  <circle cx="490" cy="100" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="620" cy="95" fill="#006194" r="3.5" stroke="#FFFFFF" strokeWidth="1.5" />
                </svg>

                <div className="flex justify-between text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-200">
                  <span>Aug (T-30 Pre)</span>
                  <span>Sep (T-7 Baseline)</span>
                  <span>Sep-Oct (Peak Visarjan)</span>
                  <span>Nov (Post Day 15)</span>
                  <span>Dec (Post Day 45)</span>
                  <span>Jan (Inter-season)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-primary text-lg shrink-0 mt-0.5">insights</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Hydrological Finding:</strong> Post-Visarjan BOD spikes frequently cross the 3.0 mg/L bathing threshold within 72 hours of immersion events before degrading over a 21-day natural sedimentation curve. Data gaps between November and January hinder confirmation of full biological recovery.
              </p>
            </div>
            <button
              onClick={onNavigateToTrends}
              className="text-xs font-semibold text-primary hover:underline whitespace-nowrap shrink-0"
            >
              Open Full Analysis →
            </button>
          </div>
        </div>

        {/* Section C: Regulatory Thresholds Matrix - 4 cols */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100 flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Regulatory Thresholds</h3>
                <p className="text-xs text-slate-500">CPCB Class B Bathing Water Criteria</p>
              </div>
              <span className="material-symbols-outlined text-slate-400">policy</span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">pH Potential</span>
                  <span className="text-[11px] text-slate-500">Benchmark: 6.5 – 8.5</span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  <span className="material-symbols-outlined text-xs">check</span>
                  94% Compliant
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Dissolved Oxygen (DO)</span>
                  <span className="text-[11px] text-slate-500">Benchmark: ≥ 5.0 mg/L</span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                  <span className="material-symbols-outlined text-xs">warning</span>
                  61% Compliant
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">BOD (5-Day @ 20°C)</span>
                  <span className="text-[11px] text-slate-500">Benchmark: ≤ 3.0 mg/L</span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200 text-[11px]">
                  <span className="material-symbols-outlined text-xs">cancel</span>
                  43% Exceeded
                </span>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 block">Total / Fecal Coliform</span>
                  <span className="text-[11px] text-slate-500">Benchmark: ≤ 500 MPN/100ml</span>
                </div>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                  <span className="material-symbols-outlined text-xs">warning</span>
                  52% Compliant
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 leading-tight block">
              <strong className="text-slate-700">Notice:</strong> Reference criteria compared against partial grab samples only; does not signify automated continuous verification.
            </span>
          </div>
        </div>
      </div>

      {/* SECTION D & E: DATA QUALITY & RECOMMENDED ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Section D: Data Quality & Traceability - 5 cols */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">fact_check</span>
                <h3 className="text-sm font-bold text-slate-900">Data Quality & Traceability</h3>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Audit Score: 89/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  341 Verified
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Confirmed laboratory registry mappings</p>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-1.5 text-amber-700 text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">pending</span>
                  28 Need Review
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Ambiguous sample time/coordinates</p>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-1.5 text-red-700 text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">alt_route</span>
                  4 Unmatched Aliases
                </div>
                <p className="text-[11px] text-slate-500 mt-1">e.g. 'Sheetal Das' vs 'Sheetaldas Ki Bagiya'</p>
              </div>

              <div className="p-3 bg-slate-50 rounded border border-slate-200">
                <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">description</span>
                  100% Traceable
                </div>
                <p className="text-[11px] text-slate-500 mt-1">CPCB & MPPCB original PDF dispatch trace</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>Verified vs Discrepant Records</span>
              <span className="font-mono font-semibold">79.6% Clean</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-600 w-[79.6%]"></div>
              <div className="h-full bg-amber-500 w-[14.8%]"></div>
              <div className="h-full bg-red-500 w-[5.6%]"></div>
            </div>
          </div>
        </div>

        {/* Section E: Recommended Municipal Actions - 7 cols */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">task_alt</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Recommended Municipal Actions</h3>
                  <p className="text-xs text-slate-500">Evidence-backed interventions for Bhopal water resource engineers</p>
                </div>
              </div>
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">Sprint 2025-Q2</span>
            </div>

            <div className="space-y-3 mt-4">
              {/* Action 1 */}
              <div className="p-3 rounded-lg border border-red-200 bg-red-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-800 border border-red-300">
                      Priority 1 • High Priority
                    </span>
                    <span className="text-xs font-semibold text-slate-900">Prempura Ghat (Upper Lake)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Deploy pre-visarjan baseline sampling team to Prempura Ghat due to an 18-month observation gap and historical BOD spikes.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                    <span className="font-medium text-slate-700">Designated Team:</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-slate-800">
                      [Environmental Lab Div.]
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Action Order Generated: Prempura Baseline Dispatch Sent #BPL-ORD-401')}
                  className="shrink-0 h-8 px-3 bg-primary hover:bg-tertiary text-white rounded text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">post_add</span>
                  Generate Action Order
                </button>
              </div>

              {/* Action 2 */}
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                      Priority 2 • Moderate Priority
                    </span>
                    <span className="text-xs font-semibold text-slate-900">Khatlapura Ghat (Lower Lake)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Reconcile handwritten CPCB lab report references from October 2024 to confirm biological load degradation rate.
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-0.5">
                    <span className="font-medium text-slate-700">Designated Team:</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-slate-800">
                      [Water Works Field Unit]
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Dispatch reviewed and confirmed with Central Laboratory.')}
                  className="shrink-0 h-8 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                  Review Dispatch
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Automatic sync with BMC Integrated Command and Control Centre (ICCC)</span>
            <button
              onClick={onNavigateToOptimiser}
              className="text-primary font-semibold hover:underline flex items-center gap-0.5"
            >
              View All Actions <span className="material-symbols-outlined text-xs">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* CIVIC FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">GhatShield AI — Bhopal Municipal Corporation</span>
          <span>•</span>
          <span>Bhoj Wetland Conservation Cell</span>
          <span>•</span>
          <span className="font-mono text-slate-400">Baseline Engine v2.4.1</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Confidential Municipal Record</span>
          <button onClick={onNavigateToReports} className="hover:text-slate-600 transition-colors">
            Data Protocol
          </button>
          <button onClick={onNavigateToReports} className="hover:text-slate-600 transition-colors">
            CPCB Standards
          </button>
        </div>
      </footer>
    </main>
  );
};
