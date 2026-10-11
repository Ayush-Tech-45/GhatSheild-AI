/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SAMPLING_MISSIONS } from '../../data/mockData.ts';
import { SamplingMission } from '../../types.ts';

interface SamplingOptimiserViewProps {
  onOpenExportModal: (ghatId: string) => void;
  onInspectGhat: (ghatId: string) => void;
}

export const SamplingOptimiserView: React.FC<SamplingOptimiserViewProps> = ({
  onOpenExportModal,
  onInspectGhat
}) => {
  const [missions, setMissions] = useState<SamplingMission[]>(SAMPLING_MISSIONS);
  const [selectedMissionRank, setSelectedMissionRank] = useState<number>(1);
  const [viewTab, setViewTab] = useState<'schedule' | 'routes' | 'gantt'>('schedule');
  const [activeTeams, setActiveTeams] = useState(3);
  const [maxGrabsPerTeam, setMaxGrabsPerTeam] = useState(4);
  const [coldChainTransit, setColdChainTransit] = useState(4.0);
  const [objectiveWeight, setObjectiveWeight] = useState<'Balanced' | 'Deficit First' | 'Breach First'>('Balanced');
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [planLocked, setPlanLocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedMission = missions.find((m) => m.rank === selectedMissionRank) || missions[0];

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      // Simulate slight reordering or optimization based on objectiveWeight
      let updated = [...SAMPLING_MISSIONS];
      if (objectiveWeight === 'Deficit First') {
        updated = [
          SAMPLING_MISSIONS[2], // Shahpura
          SAMPLING_MISSIONS[0], // Prempura
          SAMPLING_MISSIONS[1], // Khatlapura
          SAMPLING_MISSIONS[3],
          SAMPLING_MISSIONS[4]
        ].map((m, idx) => ({ ...m, rank: idx + 1 }));
      } else if (objectiveWeight === 'Breach First') {
        updated = [
          SAMPLING_MISSIONS[0], // Prempura
          SAMPLING_MISSIONS[1], // Khatlapura
          SAMPLING_MISSIONS[2], // Shahpura
          SAMPLING_MISSIONS[3],
          SAMPLING_MISSIONS[4]
        ].map((m, idx) => ({ ...m, rank: idx + 1 }));
      }
      setMissions(updated);
      setSelectedMissionRank(1);
      showToast(`Optimal schedule recalculated: ${activeTeams} teams, ${maxGrabsPerTeam} grabs/day, ${objectiveWeight} weighting.`);
    }, 700);
  };

  const handleReset = () => {
    setActiveTeams(3);
    setMaxGrabsPerTeam(4);
    setColdChainTransit(4.0);
    setObjectiveWeight('Balanced');
    setMissions(SAMPLING_MISSIONS);
    showToast('Reset to CPCB baseline scheduling assumptions.');
  };

  const handleLockPlan = () => {
    setPlanLocked(true);
    showToast('Plan locked into Municipal Audit Register #BMC-REG-2025-Q2.');
  };

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 space-y-4 sm:space-y-6 min-w-0">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP SECTION: HEADER AREA & ACTIONS */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-outline-variant min-w-0">
        <div className="flex flex-col gap-1 max-w-4xl min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <h1 className="text-xl font-bold text-on-surface tracking-tight">
              Sampling Resource Optimiser & Priority Scheduler
            </h1>
            <span className="px-2 py-0.5 rounded-lg bg-secondary-container text-on-secondary-container border border-secondary/20 text-[11px] font-semibold tracking-wide">
              CPCB Protocol Schedule Model v2.4
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Operational decision-support workspace for planning water grab-sample campaigns across 14 Bhopal visarjan ghats. Balances information gain from severe data voids against recurring post-visarjan chemical breach risks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            onClick={() => onOpenExportModal('all')}
            className="min-h-[40px] px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface text-xs font-semibold hover:bg-surface-container-low transition-colors flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-outline text-base">table_view</span>
            <span>Export Sampling Schedule (CSV)</span>
          </button>
          <button
            onClick={() => showToast('Field Mission Dossier (PDF) compiled and ready for dispatch.')}
            className="min-h-[40px] px-3.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-tertiary transition-colors flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>Generate Field Mission Dossier (PDF)</span>
          </button>
        </div>
      </section>

      {/* KPI METRIC CARDS (4-Column Layout) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* KPI 1 */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Available Sampling Teams</span>
            <span className="material-symbols-outlined text-primary text-lg">groups</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-on-surface tabular-nums">{activeTeams} Mobile Units</div>
            <div className="text-xs text-on-surface-variant mt-0.5 leading-tight">
              BMC Central Lab Team A, B, & Regional MPPCB Unit; {activeTeams * maxGrabsPerTeam} daily slot capacity
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Planning Horizon</span>
            <span className="material-symbols-outlined text-primary text-lg">date_range</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-on-surface tabular-nums">14 Days (Pre-Visarjan)</div>
            <div className="text-xs text-on-surface-variant mt-0.5 leading-tight">
              Configurable window: Aug 25 – Sep 08, 2025; Targeted baseline capture
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Targeted Data Deficits</span>
            <span className="material-symbols-outlined text-error text-lg">warning</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-error tabular-nums">8 High-Void Ghats</div>
            <div className="text-xs text-on-surface-variant mt-0.5 leading-tight">
              Sites with &gt;50% unmonitored intervals or missing fecal coliform/BOD series
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-outline">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Allocation Efficiency</span>
            <span className="material-symbols-outlined text-secondary text-lg">speed</span>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-secondary tabular-nums">91.6% Capacity Fit</div>
            <div className="text-xs text-on-surface-variant mt-0.5 leading-tight">
              22 planned sample runs across 24 available operational team slots; 2 reserve slots
            </div>
          </div>
        </div>
      </section>

      {/* MAIN SPLIT WORKSPACE: 68% Left Planning Grid, 32% Right Simulation Sidebar */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 pb-6 items-start">
        {/* LEFT COLUMN: PLANNING GRID & RATIONALE (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs overflow-hidden flex flex-col">
            {/* View Bar */}
            <div className="p-3 bg-surface-container-low border-b border-outline-variant flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 bg-surface-container-lowest p-1 rounded-lg border border-outline-variant text-xs">
                <button
                  onClick={() => setViewTab('schedule')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    viewTab === 'schedule'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Recommended Priority Schedule (Ranked)
                </button>
                <button
                  onClick={() => setViewTab('routes')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    viewTab === 'routes'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Team Route Matrix
                </button>
                <button
                  onClick={() => setViewTab('gantt')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    viewTab === 'gantt'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Calendar Gantt Timeline
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-outline">Granularity:</span>
                <div className="inline-flex rounded-lg border border-outline-variant bg-surface-container-lowest p-0.5">
                  <button className="px-2 py-0.5 rounded text-xs bg-surface-container-high text-primary font-semibold">
                    Daily Runs
                  </button>
                  <button className="px-2 py-0.5 rounded text-xs text-outline hover:text-on-surface">
                    Phase Summary
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-b border-outline-variant flex flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-on-surface">Recommended Sampling Mission Priority List</h2>
                <span className="text-[11px] text-outline font-mono">
                  Algorithm: CPCB-IG-v2.4 (Alpha=0.6, Beta=0.4)
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                Ranked by combined Information Gain (unmonitored gap reduction) and Historical Exceedance Frequency. All travel times and team costs represent configurable simulation parameters.
              </p>
            </div>

            {/* Missions Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-outline-variant font-semibold">
                    <th className="py-2.5 px-3 w-12 text-center">Rank</th>
                    <th className="py-2.5 px-3 min-w-[150px]">Ghat Name & Basin</th>
                    <th className="py-2.5 px-3 min-w-[180px]">Primary Sampling Objective</th>
                    <th className="py-2.5 px-3 min-w-[140px]">Target Deficit Parameter</th>
                    <th className="py-2.5 px-3 min-w-[150px]">Sampling Slot</th>
                    <th className="py-2.5 px-3 min-w-[140px]">Assigned Field Unit</th>
                    <th className="py-2.5 px-3 min-w-[110px]">Resource Effort</th>
                    <th className="py-2.5 px-3 w-24 text-center">Status</th>
                    <th className="py-2.5 px-3 w-28 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/60">
                  {missions.map((m) => {
                    const isSelected = m.rank === selectedMissionRank;
                    return (
                      <tr
                        key={m.rank}
                        onClick={() => setSelectedMissionRank(m.rank)}
                        className={`transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-surface-container-low/80 hover:bg-surface-container border-l-4 border-l-primary'
                            : 'hover:bg-surface-container-low'
                        }`}
                      >
                        <td className="py-3 px-3 text-center font-bold text-primary tabular-nums">
                          #{String(m.rank).padStart(2, '0')}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-on-surface">{m.ghatName}</div>
                          <div className="text-[11px] text-outline">{m.waterBody}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="text-on-surface font-medium">{m.objective}</div>
                          <div className="text-[11px] text-outline">{m.objectiveSubtitle}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${
                              m.parameterBadgeType === 'urgent'
                                ? 'bg-error-container text-on-error-container'
                                : m.parameterBadgeType === 'void'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-surface-container text-primary'
                            }`}
                          >
                            {m.targetDeficitParameter}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-on-surface font-medium tabular-nums">{m.slotTime}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5 text-on-surface">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            <span className="font-medium">{m.assignedTeam}</span>
                          </div>
                          <div className="text-[10px] text-outline">{m.vehicleUnit}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px]">
                            {m.effortLabel}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                              m.status === 'Scheduled'
                                ? 'bg-secondary-container text-on-secondary-container'
                                : m.status === 'Draft Allocation'
                                ? 'bg-surface-container text-primary'
                                : 'bg-surface-container-low text-outline'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                m.status === 'Scheduled' ? 'bg-secondary' : 'bg-primary'
                              }`}
                            ></span>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="inline-flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(`Slot adjusted for ${m.ghatName}`);
                              }}
                              className="px-2 py-1 rounded bg-surface-container-lowest border border-outline-variant hover:bg-surface-container text-[11px] text-on-surface"
                            >
                              Adjust
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedMissionRank(m.rank);
                              }}
                              className="p-1 rounded bg-primary text-on-primary hover:bg-tertiary"
                              title="Inspect Rationale"
                            >
                              <span className="material-symbols-outlined text-xs">visibility</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-2.5 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between text-xs text-outline">
              <div>Displaying top {missions.length} of 14 prioritised municipal ghat monitoring locations</div>
              <button
                onClick={() => showToast('All 14 ghat assignments mapped to calendar schedule.')}
                className="hover:text-primary underline text-xs font-semibold"
              >
                Show all 14 ghat assignments
              </button>
            </div>
          </div>

          {/* EXPLAINABLE PRIORITY RATIONALE CARD */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  psychology
                </span>
                <h3 className="text-xs font-bold text-on-surface">
                  Explainable Allocation Rationale: {selectedMission.ghatName} (Rank #{String(selectedMission.rank).padStart(2, '0')})
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-[11px] font-mono font-semibold">
                Model Confidence: {selectedMission.confidence}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Factor 1 */}
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-outline uppercase font-semibold">Information Gain Metric</div>
                  <div className="text-base font-bold text-primary mt-1 tabular-nums">
                    +{selectedMission.infoGainPct}% Completeness Lift
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2 leading-tight">
                  High marginal entropy reduction across Bhoj Wetland catchment by establishing pre-festival organic load baseline.
                </p>
              </div>

              {/* Factor 2 */}
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-outline uppercase font-semibold">Historical Evidence Trigger</div>
                  <div className="text-base font-bold text-error mt-1 tabular-nums">
                    {selectedMission.exceedanceDelta}
                  </div>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2 leading-tight">
                  Historical archival records demonstrate critical post-visarjan threshold breach risk exceeding CPCB Class B boundaries.
                </p>
              </div>

              {/* Factor 3 */}
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-outline uppercase font-semibold">Regulatory Justification</div>
                  <div className="text-xs font-bold text-secondary mt-1">NGT Central Zone Mandate</div>
                </div>
                <p className="text-[11px] text-on-surface-variant mt-2 leading-tight">
                  National Green Tribunal (NGT) statutory compliance on Bhoj Wetland Eco-Sensitive Zone dictates grab-sampling protocol within 50m of ghat.
                </p>
              </div>
            </div>

            {/* SHAP Weights */}
            <div className="mt-1 pt-2 border-t border-outline-variant flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-on-surface">SHAP Factor Contribution Breakdown</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-on-surface-variant">Data Void Severity (Weight 0.45)</span>
                    <span className="font-bold text-on-surface">{selectedMission.shapWeights.voidSeverity}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${selectedMission.shapWeights.voidSeverity}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-on-surface-variant">Post-Event Breach Probability (0.35)</span>
                    <span className="font-bold text-error">{selectedMission.shapWeights.breachProb}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-error h-1.5 rounded-full" style={{ width: `${selectedMission.shapWeights.breachProb}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-on-surface-variant">Hydrological Flow Dispersion (0.20)</span>
                    <span className="font-bold text-secondary">{selectedMission.shapWeights.flowDispersion}%</span>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: `${selectedMission.shapWeights.flowDispersion}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SIMULATION CONTROLS & CONSTRAINTS (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Card 1: Resource Capacity Simulator */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">tune</span>
                <h3 className="text-xs font-bold text-on-surface">Resource Capacity Simulator</h3>
              </div>
              <span className="text-[11px] text-outline">Interactive</span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              {/* Teams Stepper */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-on-surface flex justify-between">
                  <span>Active Field Teams</span>
                  <span className="text-primary font-bold">{activeTeams} Operational Teams</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTeams(Math.max(1, activeTeams - 1))}
                    className="w-8 h-8 rounded border border-outline-variant bg-surface-container-low flex items-center justify-center font-bold hover:bg-surface-container"
                  >
                    -
                  </button>
                  <div className="flex-1 h-8 rounded border border-outline-variant bg-surface-container-lowest flex items-center justify-center font-semibold text-on-surface">
                    {activeTeams === 3 ? 'Alpha, Beta, Gamma (3 Teams)' : `${activeTeams} Field Units`}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTeams(Math.min(6, activeTeams + 1))}
                    className="w-8 h-8 rounded border border-outline-variant bg-surface-container-low flex items-center justify-center font-bold hover:bg-surface-container"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Max Daily Grabs per Team */}
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-on-surface flex justify-between">
                  <span>Max Daily Grabs per Team</span>
                  <span className="text-primary font-bold">{maxGrabsPerTeam} grabs / day</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMaxGrabsPerTeam(Math.max(1, maxGrabsPerTeam - 1))}
                    className="w-8 h-8 rounded border border-outline-variant bg-surface-container-low flex items-center justify-center font-bold hover:bg-surface-container"
                  >
                    -
                  </button>
                  <div className="flex-1 h-8 rounded border border-outline-variant bg-surface-container-lowest flex items-center justify-center font-semibold text-on-surface">
                    {maxGrabsPerTeam} Grab Runs per Unit ({activeTeams * maxGrabsPerTeam} max/day)
                  </div>
                  <button
                    type="button"
                    onClick={() => setMaxGrabsPerTeam(Math.min(8, maxGrabsPerTeam + 1))}
                    className="w-8 h-8 rounded border border-outline-variant bg-surface-container-low flex items-center justify-center font-bold hover:bg-surface-container"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Cold Chain Slider */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-on-surface">Cold Chain Transit Limit</span>
                  <span className="font-mono text-primary font-bold">{coldChainTransit.toFixed(1)} Hours Max (Icebox to Lab)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={coldChainTransit}
                  onChange={(e) => setColdChainTransit(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-surface-container rounded-lg cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-outline">
                  <span>1.0h (Fastest)</span>
                  <span>4.0h (Standard CPCB)</span>
                  <span>8.0h (Preserved)</span>
                </div>
              </div>

              {/* Objective Weight */}
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-on-surface">Priority Objective Weight</span>
                <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant text-[11px] font-semibold text-center">
                  {(['Balanced', 'Deficit First', 'Breach First'] as const).map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setObjectiveWeight(w)}
                      className={`py-1 px-1 rounded transition-colors ${
                        objectiveWeight === w
                          ? 'bg-primary text-on-primary shadow-xs'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recalculate Button */}
              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={handleRecalculate}
                  disabled={isRecalculating}
                  className="w-full h-9 rounded-lg bg-primary text-on-primary text-xs hover:bg-tertiary transition-all flex items-center justify-center gap-2 shadow-xs font-semibold"
                >
                  <span className={`material-symbols-outlined text-sm ${isRecalculating ? 'animate-spin' : ''}`}>
                    autorenew
                  </span>
                  <span>{isRecalculating ? 'Optimising Matrix...' : 'Recalculate Optimal Schedule'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-1 text-center text-[11px] text-outline hover:text-on-surface transition-colors"
                >
                  Reset to Baseline Assumptions
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Routing & Travel Clusters */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">alt_route</span>
                <h3 className="text-xs font-bold text-on-surface">Routing & Travel Clusters</h3>
              </div>
              <span className="text-[11px] text-outline">Bhopal Basins</span>
            </div>

            <div className="flex flex-col gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface">Cluster 1: Bada Talab West</span>
                  <span className="text-[11px] text-primary font-bold">~45 min loop</span>
                </div>
                <div className="text-[11px] text-on-surface-variant leading-tight">
                  Prempura, Sheetal Das, Kamla Park · 18.5 km transit loop
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface">Cluster 2: Chhota Talab & Center</span>
                  <span className="text-[11px] text-primary font-bold">~28 min loop</span>
                </div>
                <div className="text-[11px] text-on-surface-variant leading-tight">
                  Khatlapura, Kaliyasot Intake · 12.2 km transit loop
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface">Cluster 3: Shahpura Basin</span>
                  <span className="text-[11px] text-primary font-bold">~35 min loop</span>
                </div>
                <div className="text-[11px] text-on-surface-variant leading-tight">
                  Shahpura Sector B & Southern Reservoirs · 15.8 km transit loop
                </div>
              </div>
            </div>

            <div className="p-2 bg-surface-container rounded border border-outline-variant flex items-start gap-2 text-[10px] text-outline">
              <span className="material-symbols-outlined text-xs shrink-0 mt-0.5">info</span>
              <span>
                <strong>Disclaimer:</strong> Transit durations are estimated routing simulations based on municipal road network approximations, not live GPS telematics.
              </span>
            </div>
          </div>

          {/* Card 3: Projected Information Impact & Lock Action */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                  analytics
                </span>
                <h3 className="text-xs font-bold text-on-surface">Projected Information Impact</h3>
              </div>
              <span className="text-xs text-secondary font-bold">+15.8% Gain</span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-on-surface font-medium">Overall Catchment Coverage</span>
                  <span className="font-bold text-on-surface tabular-nums">68.4% → 84.2%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden flex">
                  <div className="bg-outline h-2" style={{ width: '68.4%' }}></div>
                  <div className="bg-secondary h-2" style={{ width: '15.8%' }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-outline mt-0.5">
                  <span>Current baseline (68.4%)</span>
                  <span className="text-secondary font-semibold">+15.8% simulation gain</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-outline font-semibold">Critical Void Reduction</div>
                  <div className="text-base font-bold text-secondary tabular-nums">8 → 2 Sites</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-xs font-semibold">
                  75% Void Resolved
                </span>
              </div>

              <button
                type="button"
                onClick={handleLockPlan}
                disabled={planLocked}
                className="w-full h-10 rounded-lg bg-secondary text-on-secondary text-xs hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 shadow-xs font-semibold mt-1"
              >
                <span className="material-symbols-outlined text-base">verified</span>
                <span>{planLocked ? 'Plan Registered (#BMC-2025-LOCKED)' : 'Lock Plan into Municipal Audit Register'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
