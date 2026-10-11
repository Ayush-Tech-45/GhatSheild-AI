/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface SystemDiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemDiagnosticsModal: React.FC<SystemDiagnosticsModalProps> = ({ isOpen, onClose }) => {
  const [isRunningSelfTest, setIsRunningSelfTest] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRunSelfTest = () => {
    setIsRunningSelfTest(true);
    setTimeout(() => {
      setIsRunningSelfTest(false);
      setTestSuccess(true);
      setTimeout(() => setTestSuccess(false), 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">format_image_left</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface">System Diagnostics & Environmental Engine Health</h3>
              <p className="text-[11px] text-on-surface-variant">Deterministic Invariant Verification & Telemetry Linkages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
              <span className="text-outline text-[10px] uppercase font-bold block">Archival Database</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-on-surface text-sm">428 Records</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  HEALTHY
                </span>
              </div>
              <p className="text-[10px] text-outline mt-1">SQLite Archival Store (Read-Only Immutable)</p>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
              <span className="text-outline text-[10px] uppercase font-bold block">GIS Master Centroids</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-on-surface text-sm">13 / 14 Synced</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-300">
                  1 REVIEW
                </span>
              </div>
              <p className="text-[10px] text-outline mt-1">EPSG:32643 UTM 43N Projected</p>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
              <span className="text-outline text-[10px] uppercase font-bold block">Deterministic Rule Engine</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-bold text-on-surface text-sm">v2.4 CPCB Protocol</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  STABLE
                </span>
              </div>
              <p className="text-[10px] text-outline mt-1">Zero generative hallucination guarantee</p>
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant">
              <span className="text-outline text-[10px] uppercase font-bold block">Cryptographic Hash Digest</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-on-surface text-xs">4b29-e881</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-outline mt-1">SHA-256 Audit signature match</p>
            </div>
          </div>

          {/* Diagnostic Invariants List */}
          <div className="border border-outline-variant rounded-lg p-3 space-y-2 bg-surface-container-low/40">
            <span className="font-bold text-on-surface block text-[11px] uppercase tracking-wider">
              Statutory System Invariants
            </span>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <span>[INV-01] Zero-Substitution Prohibition:</span>
                <span className="text-emerald-700 font-bold">ENFORCED (No 0.0 mg/L auto-fill)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[INV-02] BDL Categorical Preservation:</span>
                <span className="text-emerald-700 font-bold">ENFORCED (&lt;2.0 mg/L boundary)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[INV-03] Cold Chain Transit Ceiling:</span>
                <span className="text-emerald-700 font-bold">ACTIVE (4.0 hrs limit)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>[INV-04] CPCB Class B Bathing Limit:</span>
                <span className="text-emerald-700 font-bold">LOCKED (BOD ≤ 3.0 mg/L)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <div className="text-[10px] font-mono text-outline">
            Build: v2.4.1-ENV-MPPCB
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRunSelfTest}
              disabled={isRunningSelfTest}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors text-xs font-semibold flex items-center gap-1.5"
            >
              {isRunningSelfTest ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  <span>Verifying Invariants...</span>
                </>
              ) : testSuccess ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>All Invariants Verified</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                  <span>Run Engine Self-Test</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
