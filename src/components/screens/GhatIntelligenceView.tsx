/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GHAT_STATIONS } from '../../data/mockData.ts';
import { GhatStation } from '../../types.ts';

interface GhatIntelligenceViewProps {
  initialGhatId?: string;
  onNavigateToOptimiser: () => void;
  onOpenExportModal: (ghatId: string) => void;
}

export const GhatIntelligenceView: React.FC<GhatIntelligenceViewProps> = ({
  initialGhatId = 'BPL-WTR-GH-04',
  onNavigateToOptimiser,
  onOpenExportModal
}) => {
  const [selectedGhatId, setSelectedGhatId] = useState<string>(initialGhatId);
  const [searchFilter, setSearchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [basinFilter, setBasinFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [compareMode, setCompareMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [officerNotes, setOfficerNotes] = useState<string[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteInput, setNoteInput] = useState('');

  const selectedGhat = GHAT_STATIONS.find((g) => g.id === selectedGhatId) || GHAT_STATIONS[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setOfficerNotes((prev) => [...prev, noteInput.trim()]);
    setNoteInput('');
    setIsAddingNote(false);
    showToast('Officer audit note appended to archival register.');
  };

  const filteredStations = GHAT_STATIONS.filter((ghat) => {
    if (searchFilter && !ghat.name.toLowerCase().includes(searchFilter.toLowerCase()) && !ghat.id.toLowerCase().includes(searchFilter.toLowerCase())) {
      return false;
    }
    if (basinFilter !== 'All') {
      if (basinFilter === 'Upper' && !ghat.waterBody.includes('Upper')) return false;
      if (basinFilter === 'Lower' && !ghat.waterBody.includes('Lower')) return false;
      if (basinFilter === 'Shahpura' && !ghat.waterBody.includes('Shahpura')) return false;
    }
    if (priorityFilter !== 'All') {
      if (priorityFilter === 'High' && ghat.riskPriority !== 'High Priority') return false;
      if (priorityFilter === 'Moderate' && ghat.riskPriority !== 'Moderate Priority') return false;
      if (priorityFilter === 'Lower' && ghat.riskPriority !== 'Lower Priority') return false;
    }
    return true;
  });

  return (
    <main className="flex-1 flex flex-col overflow-y-auto p-5 gap-4">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION & WORKSPACE TOOLBAR */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-1 border-b border-outline-variant/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-on-surface tracking-tight">Ghat Intelligence & Site Comparative Analysis</h1>
            <span className="px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant text-[11px] text-primary font-semibold">
              Bhoj Wetland Catchment Area
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Cross-site historical observation drilldown, CPCB Class B reference compliance flags, and traceable archival evidence records.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              setBasinFilter('All');
              setPriorityFilter('All');
              setSearchFilter('');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-lowest border border-outline-variant hover:border-outline text-xs text-on-surface font-medium transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-sm text-outline">tune</span>
            <span>Filter Views: All 14 Sites</span>
          </button>

          <button
            onClick={() => {
              setCompareMode(!compareMode);
              showToast(compareMode ? 'Exited dual compare mode.' : 'Dual Compare Mode Activated.');
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-medium transition-colors shadow-xs ${
              compareMode
                ? 'bg-primary/10 border-primary text-primary font-bold'
                : 'bg-surface-container-lowest border-outline-variant text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-sm">compare_arrows</span>
            <span>Compare Mode ({compareMode ? 'Active' : 'Off'})</span>
          </button>

          <button
            onClick={() => onOpenExportModal(selectedGhatId)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-primary text-on-primary hover:bg-tertiary text-xs font-semibold transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">file_download</span>
            <span>Export Ghat Matrix (CSV)</span>
          </button>
        </div>
      </section>

      {/* TOP FILTER & METRIC SUMMARY STRIP */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 shadow-xs flex flex-col gap-2.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2">
          {/* Filter Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-outline">
              <span className="material-symbols-outlined text-sm">filter_alt</span>
            </span>
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-7 pr-2 py-1 text-xs bg-surface-container-low border border-outline-variant rounded focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
              placeholder="Filter by ghat name or ID..."
            />
          </div>

          {/* Year Dropdown */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="py-1 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none"
          >
            <option value="All">All Years (2023, 2024, 2025)</option>
            <option value="2024">Year 2024 (Post-Visarjan Focused)</option>
            <option value="2023">Year 2023 (Baseline)</option>
            <option value="2025">Year 2025 (Preliminary Log)</option>
          </select>

          {/* Basin Dropdown */}
          <select
            value={basinFilter}
            onChange={(e) => setBasinFilter(e.target.value)}
            className="py-1 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none"
          >
            <option value="All">All Basins (Upper, Lower, Shahpura)</option>
            <option value="Upper">Upper Lake (Bada Talab)</option>
            <option value="Lower">Lower Lake (Chhota Talab)</option>
            <option value="Shahpura">Shahpura Lake Basin</option>
          </select>

          {/* Parameter Filter */}
          <select className="py-1 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none">
            <option>All Parameters (pH, DO, BOD, F.Coli)</option>
            <option>Biochemical Oxygen Demand (BOD)</option>
            <option>Dissolved Oxygen (DO)</option>
            <option>Fecal Coliform (FC)</option>
            <option>Hydrogen Potential (pH)</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="py-1 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none"
          >
            <option value="All">All Priorities: High, Mod, Low</option>
            <option value="High">High Priority (CPCB Class B Breach)</option>
            <option value="Moderate">Moderate Priority</option>
            <option value="Lower">Low / Conforming Baseline</option>
          </select>

          {/* Sort By */}
          <select className="py-1 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded text-on-surface focus:outline-none">
            <option>Sort: Risk Priority (Desc)</option>
            <option>Sort: Confidence Score (Asc)</option>
            <option>Sort: Most Recent Sample</option>
            <option>Sort: Historical Records Count</option>
          </select>
        </div>

        {/* Status Indicator Chips */}
        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-outline-variant/50 gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-primary text-[11px] border border-outline-variant font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              14 Sites Tracked
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-low text-on-surface-variant text-[11px] border border-outline-variant">
              <span className="material-symbols-outlined text-[13px]">inventory_2</span>
              428 Grab Records
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary-container/15 text-primary text-[11px] border border-primary/40 font-bold">
              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                pin_drop
              </span>
              Selected Site: {selectedGhat.name} ({selectedGhat.id})
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-outline">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-error"></span> High Risk Priority
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderate Priority
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> Within Safe Limits
            </span>
          </div>
        </div>
      </section>

      {/* SPLIT WORKSPACE: 65% Main Matrix & Sparklines / 35% Evidence Dossier Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN: MATRIX & PARAMETRIC DRILLDOWN (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* 1. INTERACTIVE GHAT MATRIX TABLE */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xs overflow-hidden flex flex-col">
            <div className="px-4 py-2.5 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">table_chart</span>
                <h2 className="text-xs font-bold text-on-surface uppercase tracking-wider">
                  Bhopal Municipal Ghat Surveillance Matrix
                </h2>
              </div>
              <span className="text-[11px] text-outline">Click row to mount archival dossier</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container/60 border-b border-outline-variant text-[11px] uppercase text-on-surface-variant font-semibold tracking-wider">
                    <th className="py-2.5 px-3">Ghat Name & ID</th>
                    <th className="py-2.5 px-2">Water Body</th>
                    <th className="py-2.5 px-2 text-right">Records</th>
                    <th className="py-2.5 px-3">Available Parameters</th>
                    <th className="py-2.5 px-2 text-center">Confidence</th>
                    <th className="py-2.5 px-2">Risk Priority</th>
                    <th className="py-2.5 px-2">Last Sample</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40 text-xs">
                  {filteredStations.map((ghat) => {
                    const isSelected = ghat.id === selectedGhatId;
                    const isHigh = ghat.riskPriority === 'High Priority';
                    const isMod = ghat.riskPriority === 'Moderate Priority';

                    return (
                      <tr
                        key={ghat.id}
                        onClick={() => setSelectedGhatId(ghat.id)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-surface-container/80 ring-2 ring-primary relative z-10'
                            : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-semibold text-primary">
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-base">
                              {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                            </span>
                            <div>
                              <div className="font-bold text-on-surface">{ghat.name}</div>
                              <span className="text-[11px] font-mono text-outline">{ghat.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-on-surface-variant">{ghat.waterBody}</td>
                        <td className="py-2.5 px-2 text-right font-mono font-semibold tabular-nums">
                          {ghat.recordsCount}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex flex-wrap gap-1">
                            {ghat.availableParameters.map((p) => (
                              <span
                                key={p}
                                className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                                  p === 'BOD' && isHigh
                                    ? 'bg-error-container text-on-error-container font-bold'
                                    : 'bg-surface-container-highest text-on-surface'
                                }`}
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span
                            className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                              ghat.confidenceLevel === 'Critical'
                                ? 'bg-error-container text-on-error-container font-bold'
                                : 'bg-surface-container-high text-on-surface'
                            }`}
                          >
                            {ghat.confidence}
                          </span>
                        </td>
                        <td className="py-2.5 px-2">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              isHigh
                                ? 'border border-error text-error bg-error-container/30'
                                : isMod
                                ? 'border border-amber-300 text-amber-800 bg-amber-50'
                                : 'border border-outline-variant text-secondary bg-surface-container'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isHigh ? 'bg-error' : isMod ? 'bg-amber-500' : 'bg-secondary'
                              }`}
                            ></span>
                            {ghat.riskPriority}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 font-mono text-[11px] text-on-surface-variant tabular-nums">
                          {ghat.latestObsDate}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          {isSelected ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`Inspection active for ${ghat.name}`);
                              }}
                              className="px-2.5 py-1 rounded bg-primary text-on-primary text-[11px] font-semibold shadow-xs flex items-center gap-1 ml-auto"
                            >
                              <span className="material-symbols-outlined text-xs">folder_open</span>
                              <span>Inspecting Evidence</span>
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedGhatId(ghat.id);
                              }}
                              className="px-2 py-1 rounded border border-outline-variant hover:border-outline text-on-surface-variant hover:text-on-surface text-[11px]"
                            >
                              Inspect
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. SELECTED GHAT IN-DEPTH ANALYSIS SECTION */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-outline-variant gap-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    {selectedGhat.name} — Parametric History & Exceedance Profile
                  </h3>
                  <span className="text-[11px] text-outline">
                    Station: {selectedGhat.id} | Statutory Benchmark: Central Pollution Control Board (CPCB) Class B Criteria
                  </span>
                </div>
              </div>
              <span className="text-[11px] px-2 py-1 rounded bg-surface-container border border-outline-variant text-primary font-semibold self-start sm:self-auto">
                Aggregated: 2023 - 2024 Logs
              </span>
            </div>

            {/* 3 PARAMETER SPARKLINE / TREND SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* CARD A: DISSOLVED OXYGEN (DO) */}
              <div className="border border-outline-variant rounded-lg p-3 bg-surface-container-low/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-on-surface">Dissolved Oxygen (DO)</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-error-container text-on-error-container">
                      Below Threshold
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-error tabular-nums">{selectedGhat.metrics.latestDO}</span>
                    <span className="text-xs text-outline font-semibold">mg/L</span>
                    <span className="text-[11px] text-outline ml-auto">Latest Oct 2024</span>
                  </div>
                  {/* Sparkline SVG */}
                  <div className="h-10 w-full my-2 bg-surface-container-lowest rounded border border-outline-variant/60 p-1 flex items-end">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                      <line stroke="#ef4444" strokeDasharray="2,2" strokeWidth="1" x1="0" x2="100" y1="12" y2="12" />
                      <polyline fill="none" points="0,8 15,10 30,14 45,9 60,18 75,22 90,24 100,24" stroke="#ba1a1a" strokeWidth="2" />
                      <circle cx="100" cy="24" fill="#ba1a1a" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/40">
                    <span>Ref Limit: <strong>≥ 5.0 mg/L</strong></span>
                    <span className="text-error font-medium">Non-compliant</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-outline bg-surface-container-lowest px-2 py-1 rounded border border-outline-variant/40">
                  Historical Range: <strong>{selectedGhat.metrics.historicalDORange[0]} – {selectedGhat.metrics.historicalDORange[1]} mg/L</strong>
                </div>
              </div>

              {/* CARD B: BIOCHEMICAL OXYGEN DEMAND (BOD) */}
              <div className="border border-error/50 rounded-lg p-3 bg-error-container/15 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-error">BOD (5-Day 20°C)</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-error text-on-error">
                      +113% Exceedance
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-error tabular-nums">{selectedGhat.metrics.latestBOD}</span>
                    <span className="text-xs text-error font-semibold">mg/L</span>
                    <span className="text-[11px] text-outline ml-auto">Latest Oct 2024</span>
                  </div>
                  {/* Sparkline Spike */}
                  <div className="h-10 w-full my-2 bg-surface-container-lowest rounded border border-error/30 p-1 flex items-end">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                      <line stroke="#006194" strokeDasharray="2,2" strokeWidth="1" x1="0" x2="100" y1="20" y2="20"></line>
                      <polyline fill="none" points="0,22 18,20 35,21 50,17 68,14 82,9 100,5" stroke="#ba1a1a" strokeWidth="2.5" />
                      <circle cx="100" cy="5" fill="#ba1a1a" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-on-surface-variant pt-1 border-t border-error/30">
                    <span>Ref Limit: <strong>≤ 3.0 mg/L</strong></span>
                    <span className="text-error font-bold">Severe Post-Visarjan Spike</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-outline bg-surface-container-lowest px-2 py-1 rounded border border-outline-variant/40">
                  Historical Range: <strong>{selectedGhat.metrics.historicalBODRange[0]} – {selectedGhat.metrics.historicalBODRange[1]} mg/L</strong>
                </div>
              </div>

              {/* CARD C: pH */}
              <div className="border border-outline-variant rounded-lg p-3 bg-surface-container-low/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-on-surface">Hydrogen Potential (pH)</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-secondary-container text-on-secondary-container">
                      Within Bounds
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold text-secondary tabular-nums">{selectedGhat.metrics.latestPH}</span>
                    <span className="text-xs text-outline font-semibold">pH units</span>
                    <span className="text-[11px] text-outline ml-auto">Latest Oct 2024</span>
                  </div>
                  {/* Sparkline pH */}
                  <div className="h-10 w-full my-2 bg-surface-container-lowest rounded border border-outline-variant/60 p-1 flex items-end">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 30">
                      <line stroke="#006a61" strokeDasharray="2,2" strokeWidth="1" x1="0" x2="100" y1="15" y2="15" />
                      <polyline fill="none" points="0,17 15,16 32,15 48,14 65,16 80,15 100,15" stroke="#006a61" strokeWidth="1.8" />
                      <circle cx="100" cy="15" fill="#006a61" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/40">
                    <span>Ref Limit: <strong>6.5 – 8.5</strong></span>
                    <span className="text-secondary font-semibold">Stable Baseline</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-outline bg-surface-container-lowest px-2 py-1 rounded border border-outline-variant/40">
                  Historical Range: <strong>{selectedGhat.metrics.historicalPHRange[0]} – {selectedGhat.metrics.historicalPHRange[1]}</strong>
                </div>
              </div>
            </div>

            {/* SAMPLING GAP WARNING BANNER */}
            <div className="flex items-center gap-3 p-2.5 rounded bg-amber-50/80 border border-amber-300 text-amber-900">
              <span className="material-symbols-outlined text-amber-600 text-lg shrink-0">history_toggle_off</span>
              <div className="flex-1 text-xs">
                <span className="font-bold">Unmonitored Interval Detected:</span> 7-month gap between Jan 2024 and Aug 2024 during pre-monsoon baseline. No physical grab samples logged for Station {selectedGhat.id}.
              </div>
              <button
                onClick={onNavigateToOptimiser}
                className="px-2.5 py-1 text-xs font-semibold text-amber-800 bg-white border border-amber-300 hover:bg-amber-100 rounded transition-colors shrink-0"
              >
                Trigger Optimiser Protocol
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DEDICATED MUNICIPAL EVIDENCE DRAWER (4 cols) */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-xs flex flex-col">
          {/* DRAWER HEADER */}
          <div className="p-3.5 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-sm">verified</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-on-surface">Evidence Dossier: {selectedGhat.name}</h3>
                <span className="text-[11px] text-outline">Traceable Archival Citation</span>
              </div>
            </div>
          </div>

          {/* Certified Extract Download Button Slot */}
          <div className="px-3.5 py-2 bg-surface-container-lowest border-b border-outline-variant/60 flex items-center justify-between">
            <span className="text-[10px] text-outline uppercase font-semibold">
              Provenance ID: {selectedGhat.evidenceCitation.provenanceId}
            </span>
            <button
              onClick={() => onOpenExportModal(selectedGhat.id)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container border border-outline-variant hover:border-primary text-primary text-[11px] font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-xs">picture_as_pdf</span>
              <span>Download Extract (PDF)</span>
            </button>
          </div>

          {/* DRAWER SECTIONS */}
          <div className="p-3.5 flex flex-col gap-3.5 text-xs overflow-y-auto max-h-[700px]">
            {/* SECTION A: SITE NORMALISATION */}
            <div className="flex flex-col gap-2 p-3 rounded border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center justify-between border-b border-outline-variant/50 pb-1.5">
                <span className="text-[11px] uppercase font-bold text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">alt_route</span>
                  Section A: Site Normalisation & Reconciliation
                </span>
                <span className="px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                  {selectedGhat.evidenceCitation.ocrConfidence} Matched
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div>
                  <span className="text-outline block text-[10px]">Matched Master String:</span>
                  <span className="font-semibold text-on-surface">
                    {selectedGhat.name}, {selectedGhat.ward}, {selectedGhat.waterBody}
                  </span>
                </div>
                <div>
                  <span className="text-outline block text-[10px]">Raw Source Spellings Logged:</span>
                  <div className="flex flex-col gap-0.5 mt-0.5 font-mono text-[10px] text-on-surface-variant bg-surface-container-low p-2 rounded border border-outline-variant/40">
                    {selectedGhat.aliases.map((alias, i) => (
                      <span key={i}>• "{alias}"</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] text-on-surface-variant">
                  <span>Deterministic Match Rule: <strong>Centroid Spatial</strong></span>
                  <span className="font-mono text-outline">
                    {selectedGhat.coordinates.lat}° N, {selectedGhat.coordinates.lng}° E
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION B: PRIMARY EXCEEDANCE RECORD AUDIT */}
            <div className="flex flex-col gap-2 p-3 rounded border border-error/40 bg-error-container/10">
              <div className="flex items-center justify-between border-b border-error/20 pb-1.5">
                <span className="text-[11px] uppercase font-bold text-error flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">flag</span>
                  Section B: Primary Exceedance Record Audit
                </span>
                <span className="px-1.5 py-0.2 rounded bg-error text-on-error text-[10px] font-bold">
                  BREACH CLASS B
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-outline text-[10px]">Record ID:</span>
                  <span className="font-mono font-bold text-on-surface">MPPCB-BPL-2024-10-V42</span>
                </div>
                <div>
                  <span className="text-outline block text-[10px]">Source Regulatory Document:</span>
                  <span className="font-medium text-on-surface">{selectedGhat.evidenceCitation.documentTitle}</span>
                </div>
                <div className="p-2 rounded bg-surface-container-lowest border border-outline-variant text-[11px] space-y-1">
                  <div className="text-on-surface font-semibold text-[10px]">Physical Citation Reference:</div>
                  <div className="font-mono text-on-surface-variant text-[10px]">{selectedGhat.evidenceCitation.pageAndTable}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-1.5 rounded bg-surface-container-lowest border border-outline-variant">
                    <span className="text-outline block text-[10px]">Original Printed Value:</span>
                    <span className="font-mono font-bold text-error text-[11px]">
                      {selectedGhat.evidenceCitation.printedValue}
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-surface-container-lowest border border-outline-variant">
                    <span className="text-outline block text-[10px]">Sampling Technique:</span>
                    <span className="font-medium text-on-surface text-[11px]">Grab Sampling</span>
                    <span className="text-outline block text-[9px]">Manual depth 0.5m littoral</span>
                  </div>
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span className="text-outline text-[10px]">Sample Logged:</span>
                  <span className="font-mono text-on-surface font-medium text-[10px]">{selectedGhat.evidenceCitation.sampleTime}</span>
                </div>
                <div className="text-[10px] pt-1 border-t border-outline-variant/40">
                  <span className="text-outline block">Chain of Custody:</span>
                  <span className="text-on-surface italic">"{selectedGhat.evidenceCitation.chainOfCustody}"</span>
                </div>
              </div>
            </div>

            {/* SECTION C: TRACEABILITY VERIFICATION & AUDITOR NOTES */}
            <div className="flex flex-col gap-2 p-3 rounded border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center justify-between border-b border-outline-variant/50 pb-1.5">
                <span className="text-[11px] uppercase font-bold text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">format_image_left</span>
                  Section C: Traceability Verification & Auditor Notes
                </span>
                <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary text-[10px] font-bold">
                  Verified Match
                </span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between text-[10px]">
                  <span className="text-outline">OCR Digitization:</span>
                  <span className="font-mono text-on-surface-variant">2025-01-15 14:22 UTC (Batch #MP-04)</span>
                </div>
                <div className="text-[10px]">
                  <span className="text-outline block">Physical Sign-Off Verification:</span>
                  <span className="font-medium text-on-surface">Er. M. K. Saxena (Superintending Chemist, Retd. Reviewer)</span>
                  <span className="text-outline block italic text-[9px]">
                    "Verified physical logbook match with MPPCB archival register."
                  </span>
                </div>

                {/* Dynamic Officer Notes if any added */}
                {officerNotes.length > 0 && (
                  <div className="space-y-1 pt-1 border-t border-outline-variant/40">
                    <span className="text-outline text-[10px] font-bold uppercase block">Appended Municipal Notes:</span>
                    {officerNotes.map((note, idx) => (
                      <div key={idx} className="p-1.5 rounded bg-primary/5 border border-primary/20 text-on-surface text-[10px]">
                        <strong>Er. R. Sharma:</strong> {note}
                      </div>
                    ))}
                  </div>
                )}

                {isAddingNote && (
                  <div className="pt-2 space-y-1.5">
                    <textarea
                      rows={2}
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="Add official observation note..."
                      className="w-full p-2 bg-surface-container-low border border-outline-variant rounded text-[11px] focus:outline-none focus:border-primary resize-none"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setIsAddingNote(false)}
                        className="px-2 py-0.5 rounded border border-outline-variant text-[10px]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNote}
                        className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-semibold"
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DRAWER ACTION FOOTER */}
          <div className="mt-auto p-3 bg-surface-container-low border-t border-outline-variant flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast(`Flagged ${selectedGhat.name} for immediate re-inspection.`)}
                className="py-1.5 px-2 bg-surface-container-lowest border border-outline-variant hover:border-outline text-on-surface rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm text-error">flag</span>
                <span>Flag Re-inspect</span>
              </button>
              <button
                onClick={() => setIsAddingNote(true)}
                className="py-1.5 px-2 bg-surface-container-lowest border border-outline-variant hover:border-outline text-on-surface rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm text-primary">edit_note</span>
                <span>Add Officer Note</span>
              </button>
            </div>
            <button
              onClick={() => onOpenExportModal(selectedGhat.id)}
              className="w-full py-2 px-3 bg-primary hover:bg-tertiary text-on-primary rounded text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              <span>Export Evidence Slip ({selectedGhat.id})</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
