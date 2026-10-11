/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DEFAULT_THRESHOLDS, DEFAULT_RISK_WEIGHTS, GHAT_STATIONS } from '../../data/mockData.ts';
import { StatutoryThresholds, RiskWeights } from '../../types.ts';

interface SettingsViewProps {
  onOpenDiagnostics: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenDiagnostics }) => {
  const [thresholds, setThresholds] = useState<StatutoryThresholds>(DEFAULT_THRESHOLDS);
  const [weights, setWeights] = useState<RiskWeights>(DEFAULT_RISK_WEIGHTS);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResetDefaults = () => {
    setThresholds(DEFAULT_THRESHOLDS);
    setWeights(DEFAULT_RISK_WEIGHTS);
    showToast('Reset to CPCB statutory default parameters.');
  };

  const handleSaveConfig = () => {
    showToast('Audit configuration revision v2.4.2 saved and cryptographically signed.');
  };

  const weightSum = weights.w1Bod + weights.w2Do + weights.w3DataGap + weights.w4Volatility;

  return (
    <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6 bg-background">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-4 border-b border-outline-variant">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-on-surface tracking-tight">
              Settings & Regulatory Methodology Transparency
            </h1>
            <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              CPCB Protocol Engine v2.4 · Deterministic Rules
            </span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Configure statutory water-quality reference thresholds, audit scoring weights, explicit zero-substitution rules, and master GIS gazette entity mappings for Bhopal visarjan ghats.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="h-9 px-3 rounded bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low transition-colors text-xs font-medium flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">restart_alt</span>
            Reset to CPCB Statutory Defaults
          </button>
          <button
            onClick={() => showToast('Methodology Whitepaper (PDF) downloaded.')}
            className="h-9 px-3 rounded bg-surface-container-lowest text-primary border border-primary/30 hover:bg-surface-container-low transition-colors text-xs font-semibold flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            Export Methodology Whitepaper (PDF)
          </button>
          <button
            onClick={handleSaveConfig}
            className="h-9 px-4 rounded bg-primary text-on-primary border border-primary-container shadow-xs hover:bg-tertiary transition-all text-xs font-bold flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">save</span>
            Save & Version Audit Config
          </button>
        </div>
      </div>

      {/* Sub-navigation Category Tabs */}
      <div className="flex items-center border-b border-outline-variant gap-6 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab(1)}
          className={`pb-3 flex items-center gap-2 whitespace-nowrap transition-colors font-semibold ${
            activeTab === 1 ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">rule</span>
          1. Regulatory Thresholds (CPCB)
        </button>
        <button
          onClick={() => setActiveTab(2)}
          className={`pb-3 flex items-center gap-2 whitespace-nowrap transition-colors font-semibold ${
            activeTab === 2 ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">balance</span>
          2. Composite Risk Scoring Weights
        </button>
        <button
          onClick={() => setActiveTab(3)}
          className={`pb-3 flex items-center gap-2 whitespace-nowrap transition-colors font-semibold ${
            activeTab === 3 ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">policy</span>
          3. Data Void & Zero-Substitution Policy
        </button>
        <button
          onClick={() => setActiveTab(4)}
          className={`pb-3 flex items-center gap-2 whitespace-nowrap transition-colors font-semibold ${
            activeTab === 4 ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">map</span>
          4. GIS Gazette & Site Alias Resolution
        </button>
        <button
          onClick={() => {
            setActiveTab(5);
            onOpenDiagnostics();
          }}
          className={`pb-3 flex items-center gap-2 whitespace-nowrap transition-colors font-semibold ${
            activeTab === 5 ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">history_edu</span>
          5. System Diagnostics & Audit Logs
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* PANEL 1: Statutory Water Quality Thresholds (8 cols) */}
        <div className="col-span-12 xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">water</span>
                <h2 className="text-sm font-bold text-on-surface">
                  Statutory Water Quality Thresholds (CPCB Class B — Outdoor Bathing Standard)
                </h2>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Governed under Environment (Protection) Rules, 1986 Schedule VI & MPPCB Regional Directive.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-on-surface-variant">Statutory Lock:</span>
              <span className="px-2 py-0.5 rounded bg-surface-container font-mono text-[11px] font-semibold text-primary border border-outline-variant">
                SCHEDULE-B-VERIFIED
              </span>
            </div>
          </div>

          {/* Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* BOD Card */}
            <div className="p-4 rounded-lg border border-outline-variant bg-surface-bright space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <span className="font-semibold text-on-surface text-xs">Biochemical Oxygen Demand (BOD)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[10px] font-bold">
                  CRITICAL
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Statutory Permissible</span>
                  <span className="text-base font-bold text-primary">
                    ≤ {thresholds.bodPermissible.toFixed(1)} <span className="text-xs font-normal">mg/L</span>
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Exceedance Trigger</span>
                  <span className="text-base font-bold text-error">
                    &gt; {thresholds.bodExceedance.toFixed(1)} <span className="text-xs font-normal">mg/L</span>
                  </span>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-on-surface-variant">
                <span className="text-[11px]">Post-Visarjan Immersion Spike Threshold:</span>
                <span className="font-mono font-semibold text-on-surface">&gt; {thresholds.bodVisarjanSpike} mg/L</span>
              </div>
            </div>

            {/* Dissolved Oxygen Card */}
            <div className="p-4 rounded-lg border border-outline-variant bg-surface-bright space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="font-semibold text-on-surface text-xs">Dissolved Oxygen (DO)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary text-[10px] font-bold">
                  BASE CRITERIA
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Statutory Minimum</span>
                  <span className="text-base font-bold text-primary">
                    ≥ {thresholds.doMinimum.toFixed(1)} <span className="text-xs font-normal">mg/L</span>
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Hypoxic Stress Alert</span>
                  <span className="text-base font-bold text-amber-700">
                    &lt; {thresholds.doHypoxic.toFixed(1)} <span className="text-xs font-normal">mg/L</span>
                  </span>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-on-surface-variant">
                <span className="text-[11px]">Anoxic Crisis Flag:</span>
                <span className="font-mono font-semibold text-error">&lt; {thresholds.doAnoxic.toFixed(1)} mg/L</span>
              </div>
            </div>

            {/* pH Card */}
            <div className="p-4 rounded-lg border border-outline-variant bg-surface-bright space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span className="font-semibold text-on-surface text-xs">Potential of Hydrogen (pH)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-container text-secondary text-[10px] font-bold">
                  RANGE BOUND
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Permissible Window</span>
                  <span className="text-base font-bold text-primary">
                    {thresholds.phMin} – {thresholds.phMax} <span className="text-xs font-normal">pH</span>
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Acidic / Alkaline Alert</span>
                  <span className="text-base font-bold text-on-surface">
                    &lt;{thresholds.phMin} or &gt;{thresholds.phMax}
                  </span>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-on-surface-variant">
                <span className="text-[11px]">Standard Calibration Buffer:</span>
                <span className="font-mono font-semibold text-on-surface">±0.2 pH NIST Traceable</span>
              </div>
            </div>

            {/* Fecal Coliform Card */}
            <div className="p-4 rounded-lg border border-outline-variant bg-surface-bright space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                  <span className="font-semibold text-on-surface text-xs">Fecal Coliform (MPN)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 text-[10px] font-bold">
                  MICROBIAL
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Desirable Standard</span>
                  <span className="text-base font-bold text-primary">
                    ≤ {thresholds.fColiDesirable} <span className="text-[10px] font-normal">MPN/100mL</span>
                  </span>
                </div>
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant/60">
                  <span className="text-[10px] text-on-surface-variant block">Maximum Permissible</span>
                  <span className="text-base font-bold text-error">
                    ≤ {thresholds.fColiMax} <span className="text-[10px] font-normal">MPN/100mL</span>
                  </span>
                </div>
              </div>
              <div className="pt-1 flex items-center justify-between text-xs text-on-surface-variant">
                <span className="text-[11px]">Lab Incubation Protocol:</span>
                <span className="font-mono font-semibold text-on-surface">44.5°C ± 0.2 / 24 hrs</span>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="pt-3 border-t border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={thresholds.strictCpcbScheduleVi}
                onChange={(e) => setThresholds({ ...thresholds, strictCpcbScheduleVi: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
              />
              <span className="font-medium text-on-surface">
                Enforce Strict CPCB Gazette Schedule VI Classification
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={thresholds.immutableAuditLogging}
                onChange={(e) => setThresholds({ ...thresholds, immutableAuditLogging: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
              />
              <span className="font-medium text-on-surface">
                Audit Exceedance Logging (Immutable Append-Only)
              </span>
            </label>
          </div>
        </div>

        {/* PANEL 2: Flagship Policy Card (Data Void & Zero-Substitution) (4 cols) */}
        <div className="col-span-12 xl:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-700 text-xl">policy</span>
                <h3 className="text-xs font-bold text-on-surface">Data Void & Zero-Substitution Policy</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-600/30 text-[10px] font-semibold uppercase">
                Statutory Rule 104-B
              </span>
            </div>

            {/* Strict Prohibition Alert Box */}
            <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-600/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                <span className="material-symbols-outlined text-base">gavel</span>
                Zero-Substitution Prohibition Mandate
              </div>
              <p className="text-[11px] text-on-surface leading-relaxed">
                Absence of data shall <strong>NEVER</strong> be coded as 0.00 mg/L or presumed compliant. Unmonitored sampling windows are cryptographically flagged as <code className="bg-surface-container px-1 py-0.5 rounded font-mono text-[10px] text-error font-bold">DATA_VOID / SAMPLING_GAP</code>.
              </p>
            </div>

            {/* Categorical BDL / ND Handling */}
            <div className="p-3.5 rounded-lg bg-surface-container-low border border-outline-variant space-y-1">
              <span className="text-xs font-semibold text-primary block">Categorical BDL / ND Handling</span>
              <p className="text-[11px] text-on-surface-variant">
                Below Detection Limit entries are preserved strictly as statutory categorical values (<code className="font-mono text-[10px] text-on-surface font-semibold">&lt;2.0 mg/L</code>) without arbitrary numerical substitution or zero-fill.
              </p>
            </div>

            {/* Imputation Mode Radios */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-bold text-on-surface-variant block uppercase tracking-wide">
                Telemetry Imputation Architecture
              </span>
              <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-primary/40 bg-primary/5 cursor-pointer">
                <input
                  type="radio"
                  name="imputation-mode"
                  checked={thresholds.imputationMode === 'strict-non-interpolation'}
                  onChange={() => setThresholds({ ...thresholds, imputationMode: 'strict-non-interpolation' })}
                  className="mt-0.5 text-primary border-outline-variant focus:ring-primary"
                />
                <div className="text-xs">
                  <span className="font-semibold text-primary block">
                    Strict Non-Interpolation (Statutory Audit Standard)
                  </span>
                  <span className="text-[11px] text-on-surface-variant block">
                    Preserves unobserved records as explicit epistemic risk voids in all civic reports.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-outline-variant bg-surface-container-low opacity-60 cursor-not-allowed">
                <input type="radio" name="imputation-mode" disabled className="mt-0.5 text-primary border-outline-variant" />
                <div className="text-xs">
                  <span className="font-semibold text-on-surface-variant block">
                    Linear Interpolation / Temporal Spline
                  </span>
                  <span className="text-[10px] text-error block">
                    Disabled by CPCB Auditor Protocol — Violates Statutory Traceability.
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-3 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
            <span>Policy Hash:</span>
            <span className="font-mono bg-surface-container px-2 py-0.5 rounded text-on-surface text-[11px]">
              SHA256:7f4a...b89e
            </span>
          </div>
        </div>

        {/* PANEL 3: Composite Risk Scoring Weights (6 cols) */}
        <div className="col-span-12 xl:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">balance</span>
                <h3 className="text-xs font-bold text-on-surface">Composite Risk Scoring Model Transparency</h3>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Multi-criteria decision formulation balancing biophysical degradation against civic monitoring gaps.
              </p>
            </div>
            <span className="text-xs font-bold text-primary px-2 py-0.5 rounded bg-surface-container">
              WEIGHT SUM: {weightSum}%
            </span>
          </div>

          {/* Formula */}
          <div className="p-3 bg-surface-container-low border border-outline-variant rounded-lg font-mono text-[11px] text-on-surface overflow-x-auto">
            <span className="text-primary font-bold">CompositeRiskIndex</span> ={' '}
            <span className="text-on-surface-variant">w₁</span> · [BOD_Exceedance] +{' '}
            <span className="text-on-surface-variant">w₂</span> · [DO_Deficit] +{' '}
            <span className="text-amber-800 font-bold">w₃ · [Data_Void_Gap]</span> +{' '}
            <span className="text-on-surface-variant">w₄</span> · [Historical_Volatility]
          </div>

          {/* Sliders */}
          <div className="space-y-3 pt-1 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-on-surface">Organic Pollution Weight (w₁ : BOD Exceedance)</span>
                <span className="font-mono font-bold text-primary">{weights.w1Bod}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={weights.w1Bod}
                onChange={(e) => setWeights({ ...weights, w1Bod: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-surface-container rounded-full cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-on-surface">Dissolved Oxygen Stress Weight (w₂ : DO Deficit)</span>
                <span className="font-mono font-bold text-primary">{weights.w2Do}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weights.w2Do}
                onChange={(e) => setWeights({ ...weights, w2Do: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-surface-container rounded-full cursor-pointer accent-primary"
              />
            </div>

            {/* Weight 3: Civic Tech Innovation */}
            <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-600/20 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-amber-900">Sampling Information Void Weight (w₃ : Data Gap)</span>
                  <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 text-[10px] font-bold">
                    CIVIC TECH INNOVATION
                  </span>
                </div>
                <span className="font-mono font-bold text-amber-800">{weights.w3DataGap}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                value={weights.w3DataGap}
                onChange={(e) => setWeights({ ...weights, w3DataGap: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-surface-container rounded-full cursor-pointer accent-amber-600"
              />
              <p className="text-[10px] text-on-surface-variant pt-1 leading-relaxed">
                Penalizes unmonitored sites (e.g., Shahpura Lake) for absence of regulatory observations, preventing unmonitored sites from appearing falsely clean.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-on-surface">Historical Visarjan Exceedance Frequency (w₄)</span>
                <span className="font-mono font-bold text-primary">{weights.w4Volatility}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={weights.w4Volatility}
                onChange={(e) => setWeights({ ...weights, w4Volatility: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-surface-container rounded-full cursor-pointer accent-primary"
              />
            </div>
          </div>

          {/* Simulation Contrast */}
          <div className="pt-3 border-t border-outline-variant space-y-2">
            <span className="text-[10px] font-bold text-on-surface-variant block uppercase tracking-wide">
              Live Model Simulation Contrast
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded border border-outline-variant bg-surface-bright">
                <span className="text-[10px] text-on-surface-variant block">Prempura Ghat (Bada Talab)</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-error">82 / 100 Risk</span>
                  <span className="text-[10px] bg-error-container text-on-error-container px-1.5 py-0.5 rounded font-medium">
                    BOD Driven
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded border border-amber-600/30 bg-amber-500/5">
                <span className="text-[10px] text-on-surface-variant block">Shahpura Lake (Sector B)</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-amber-800">74 / 100 Risk</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                    Data Void Gap
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 4: GIS Master Gazette (6 cols) */}
        <div className="col-span-12 xl:col-span-6 bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">map</span>
                <h3 className="text-xs font-bold text-on-surface">GIS Master Gazette & Entity Reconciliation</h3>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Canonical resolution across municipal logs, police control maps, and MPPCB water stations.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                13 VERIFIED
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-600/30 text-[10px] font-bold">
                1 NEEDS REVIEW
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden border border-outline-variant rounded-lg">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                  <th className="py-2.5 px-3">Gazette Master Entity</th>
                  <th className="py-2.5 px-3">Scanned Aliases / Field Logs</th>
                  <th className="py-2.5 px-3">Basin Catchment</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {GHAT_STATIONS.slice(0, 6).map((ghat) => {
                  const isReview = ghat.id === 'BPL-WTR-GH-12';
                  return (
                    <tr
                      key={ghat.id}
                      className={`transition-colors ${
                        isReview ? 'bg-amber-500/5 hover:bg-amber-500/10' : 'hover:bg-surface-container-low/50'
                      }`}
                    >
                      <td className="py-2 px-3 font-semibold text-on-surface flex items-center gap-1.5">
                        <span className={`material-symbols-outlined text-sm ${isReview ? 'text-amber-700' : 'text-primary'}`}>
                          {isReview ? 'warning' : 'location_on'}
                        </span>
                        {ghat.name}
                      </td>
                      <td className="py-2 px-3 font-mono text-[11px] text-on-surface-variant">
                        {ghat.aliases[0]}
                      </td>
                      <td className="py-2 px-3 text-on-surface-variant">{ghat.basinZone}</td>
                      <td className="py-2 px-3 text-right">
                        {isReview ? (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                            NEEDS REVIEW
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            VERIFIED
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-on-surface-variant">
            <span>Projection Standard: <strong>WGS 84 / UTM Zone 43N (EPSG:32643)</strong></span>
            <button
              onClick={() => showToast('Gazette Alias Tool opened for MPPCB/BMC master mapping.')}
              className="text-primary hover:underline font-semibold flex items-center gap-1 text-xs"
            >
              <span className="material-symbols-outlined text-sm">edit_location</span>
              Launch Gazette Alias Tool
            </button>
          </div>
        </div>

        {/* PANEL 5: Bottom Regulatory Versioning (12 cols) */}
        <div className="col-span-12 bg-surface-container-low border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-primary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-xl">verified_user</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface text-xs">
                  Active Configuration Signature: CONFIG-BMC-2024-REV04
                </span>
                <span className="px-2 py-0.2 rounded bg-surface-container text-on-surface text-[10px] font-mono">
                  HASH: 4b29-e881-c30f
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Last verified by <strong>Er. R. Sharma (BMC Environment Cell)</strong> against MPPCB Circular No. MPPCB/BPL/2023/189. All changes require Dual Municipal Secretarial authentication.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-on-surface-variant">Audit Sync: <strong>LIVE</strong></span>
            <button
              onClick={() => showToast('Audit change log (42 revisions) retrieved.')}
              className="h-8 px-3 rounded bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">history</span>
              View Change Log (42 Revisions)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
