/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGhat: (ghatId: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onSelectGhat
}) => {
  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const alerts = [
    {
      id: 'alt-1',
      type: 'breach',
      title: 'Critical BOD Exceedance (+113%)',
      location: 'Prempura Ghat (BPL-WTR-GH-04)',
      time: '18 Sep 2024 · Post-Visarjan +72h',
      desc: 'BOD reached 6.4 mg/L against CPCB Class B limit of ≤ 3.0 mg/L. Verified in MPPCB Doc #889.',
      ghatId: 'BPL-WTR-GH-04',
      badge: 'BREACH'
    },
    {
      id: 'alt-2',
      type: 'void',
      title: '14-Month Sampling Void Flagged',
      location: 'Shahpura Lake Ghat Sector B (BPL-WTR-GH-12)',
      time: 'Nov 2023 – Jan 2025',
      desc: 'Severe unmonitored window of 62.5% observations. Mandated for immediate Cycle 1 grab scheduling.',
      ghatId: 'BPL-WTR-GH-12',
      badge: 'DATA GAP'
    },
    {
      id: 'alt-3',
      type: 'hypoxia',
      title: 'Hypoxic Stress Warning (DO < 3.2 mg/L)',
      location: 'Khatlapura Ghat (BPL-WTR-GH-09)',
      time: '21 Sep 2024 · Lower Lake',
      desc: 'Dissolved oxygen dropped to 3.1 mg/L following immersion rush. Anoxic crisis flag avoided but elevated.',
      ghatId: 'BPL-WTR-GH-09',
      badge: 'HYPOXIA'
    },
    {
      id: 'alt-4',
      type: 'ocr',
      title: 'OCR Registry Reconciliation Complete',
      location: 'BMC Central Laboratory Archive',
      time: 'Jan 15, 2025 · Batch #MP-04',
      desc: '98.2% character fidelity achieved across 428 grab records. 1 site requires manual alias review.',
      badge: 'OCR SYNC'
    }
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notifications-drawer-title"
    >
      <div className="w-full sm:max-w-md h-full bg-surface-container-lowest border-l border-outline-variant shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="material-symbols-outlined text-primary text-2xl shrink-0">notifications</span>
            <div className="min-w-0">
              <h3 id="notifications-drawer-title" className="text-sm font-bold text-on-surface truncate">
                Municipal Alerts & Dispatches
              </h3>
              <p className="text-[11px] text-on-surface-variant truncate">
                Active Environmental Exceedances & Telemetry Voids
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close alerts drawer"
            className="w-11 h-11 flex items-center justify-center rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs scrollbar-thin">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className="p-3 rounded-lg border border-outline-variant bg-surface-bright space-y-2 hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    alt.type === 'breach'
                      ? 'bg-error-container text-on-error-container'
                      : alt.type === 'void'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : alt.type === 'hypoxia'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {alt.badge}
                </span>
                <span className="text-[10px] text-outline font-mono">{alt.time}</span>
              </div>

              <div>
                <h4 className="font-semibold text-on-surface text-xs leading-tight">{alt.title}</h4>
                <p className="text-[11px] text-primary font-medium mt-0.5">{alt.location}</p>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">{alt.desc}</p>
              </div>

              {alt.ghatId && (
                <div className="pt-2 border-t border-outline-variant/50 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectGhat(alt.ghatId!);
                      onClose();
                    }}
                    className="min-h-[36px] px-2 text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Inspect Station</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-surface-container-low border-t border-outline-variant text-[11px] text-outline flex items-center justify-between shrink-0">
          <span className="truncate mr-2">Synced with BMC Command Centre (ICCC)</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[36px] px-3 py-1.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-xs font-semibold hover:bg-surface-container shrink-0"
          >
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
};
