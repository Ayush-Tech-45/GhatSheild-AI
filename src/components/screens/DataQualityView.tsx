/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GHAT_STATIONS, RAW_OBSERVATION_RECORDS } from '../../data/mockData.ts';
import { ObservationRecord } from '../../types.ts';

interface DataQualityViewProps {
  onOpenExportModal: (ghatId: string) => void;
  onInspectGhat: (ghatId: string) => void;
}

export const DataQualityView: React.FC<DataQualityViewProps> = ({
  onOpenExportModal,
  onInspectGhat
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'ledger' | 'reconciliation'>('matrix');
  const [granularity, setGranularity] = useState<'annual' | 'monthly'>('annual');
  const [ledgerFilter, setLedgerFilter] = useState('All');
  const [searchLedger, setSearchLedger] = useState('');
  const [selectedRecordForModal, setSelectedRecordForModal] = useState<ObservationRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredRecords = RAW_OBSERVATION_RECORDS.filter((rec) => {
    if (ledgerFilter !== 'All' && rec.status !== ledgerFilter) return false;
    if (
      searchLedger &&
      !rec.id.toLowerCase().includes(searchLedger.toLowerCase()) &&
      !rec.siteNameRaw.toLowerCase().includes(searchLedger.toLowerCase()) &&
      !rec.siteMasterName.toLowerCase().includes(searchLedger.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Prominent Top Notice Banner */}
      <section className="bg-surface-container-high border-l-4 border-primary rounded-xl p-4 flex items-start justify-between shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-primary text-on-primary rounded-lg mt-0.5">
            <span className="material-symbols-outlined text-base">shield</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                Regulatory Baseline Notice
              </span>
              <span className="text-xs text-outline">• Archival Audit Scope</span>
            </div>
            <p className="text-xs font-medium text-on-surface mt-0.5 leading-relaxed">
              <strong className="font-bold text-primary">HISTORICAL PROTOTYPE (2023–2025) — NOT LIVE TELEMETRY:</strong>{' '}
              Based on archival municipal grab samples for Bhopal visarjan ghats. Data quality audit evaluates completeness, OCR digitization fidelity, and geospatial entity reconciliation.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <span className="text-[11px] bg-surface-container-lowest px-2.5 py-1 rounded border border-outline-variant text-on-surface-variant font-medium">
            ISO 14044 Data Lineage
          </span>
        </div>
      </section>

      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-xl font-bold text-on-surface tracking-tight">
              Data Quality & Evidence Reliability Workspace
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-surface-container-highest text-primary border border-outline-variant">
              <span className="material-symbols-outlined text-xs">verified</span>
              CPCB & MPPCB Archival Audit v2.4
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1.5 max-w-4xl">
            Traceability and integrity audit for 428 archival water-quality grab records across 14 Bhopal visarjan ghats. Identifies sampling voids, name variations, unit anomalies, and preserves BDL/ND categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onOpenExportModal('all')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-surface-container-lowest border border-outline-variant hover:border-outline text-on-surface rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-outline text-sm">download</span>
            <span>Export Integrity Audit (CSV)</span>
          </button>
          <button
            onClick={() => onOpenExportModal('all')}
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary hover:bg-tertiary text-on-primary rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            <span>Download Provenance Dossier (PDF)</span>
          </button>
        </div>
      </section>

      {/* 4 Top Audit Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Overall Data Completeness
            </span>
            <span className="p-1.5 rounded-lg bg-surface-container-high text-primary">
              <span className="material-symbols-outlined text-base">donut_large</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary tabular-nums">68.4%</span>
              <span className="text-xs text-outline font-semibold">4 Parameters</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '68.4%' }}></div>
            </div>
            <p className="text-[11px] text-outline mt-2">
              Audit baseline: pH, DO, BOD, F.Coli. <span className="text-error font-medium">31.6% unmonitored</span> or missing observation intervals.
            </p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Entity Reconciliation
            </span>
            <span className="p-1.5 rounded-lg bg-secondary-fixed/40 text-secondary">
              <span className="material-symbols-outlined text-base">pin_drop</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-secondary tabular-nums">92.8%</span>
              <span className="text-xs text-outline font-semibold">13 / 14 Ghats</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '92.8%' }}></div>
            </div>
            <p className="text-[11px] text-outline mt-2">
              Resolved to master GIS centroids. <span className="text-secondary font-medium">1 site</span> requires manual gazette alignment.
            </p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Records Requiring Review
            </span>
            <span className="p-1.5 rounded-lg bg-error-container text-error">
              <span className="material-symbols-outlined text-base">warning</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-error tabular-nums">19</span>
              <span className="text-xs text-outline font-semibold">Grab Samples</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] bg-error-container text-on-error-container font-semibold">
                11 format error
              </span>
              <span className="inline-flex px-1.5 py-0.5 rounded text-[10px] bg-surface-container text-on-surface-variant font-semibold">
                8 legacy notes
              </span>
            </div>
            <p className="text-[11px] text-outline mt-2">
              Pending human sign-off for OCR transcript verification.
            </p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline">
              Categorical Flags Preserved
            </span>
            <span className="p-1.5 rounded-lg bg-tertiary-fixed text-tertiary">
              <span className="material-symbols-outlined text-base">policy</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-tertiary tabular-nums">42</span>
              <span className="text-xs text-outline font-semibold">BDL / ND Entries</span>
            </div>
            <div className="w-full bg-surface-container h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-[11px] text-outline mt-2">
              Explicitly preserved: <span className="font-semibold text-on-surface">Never zero-substituted</span>. Preserved as statutory BDL thresholds.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs / Subview Switcher */}
      <section className="border-b border-outline-variant flex items-center justify-between">
        <div className="flex items-center gap-6 text-xs">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'matrix'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">grid_view</span>
            <span>Missing-Value & Parameter Availability Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'ledger'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">table_chart</span>
            <span>Raw-to-Normalised Evidence Ledger</span>
            <span className="px-1.5 py-0.5 rounded-full bg-surface-container text-outline text-[10px]">
              {RAW_OBSERVATION_RECORDS.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('reconciliation')}
            className={`pb-3 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'reconciliation'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">hub</span>
            <span>Entity Reconciliation & Gazette Alias Log</span>
            <span className="px-1.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold">
              1
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 pb-2 text-xs">
          <span className="text-outline">Matrix Granularity:</span>
          <div className="inline-flex rounded-lg border border-outline-variant bg-surface-container-lowest p-0.5 text-xs">
            <button
              onClick={() => setGranularity('annual')}
              className={`px-2.5 py-1 rounded transition-colors ${
                granularity === 'annual' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              Annualized
            </button>
            <button
              onClick={() => setGranularity('monthly')}
              className={`px-2.5 py-1 rounded transition-colors ${
                granularity === 'monthly' ? 'bg-primary text-on-primary font-semibold' : 'text-on-surface-variant'
              }`}
            >
              Monthly Cycles
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: PARAMETER AVAILABILITY HEATMAP MATRIX */}
      {activeTab === 'matrix' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-low/50">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-on-surface">
                  Parameter Availability & Missing-Value Heatmap Matrix
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">
                  14 Bhopal Ghats
                </span>
              </div>
              <p className="text-xs text-outline mt-0.5">
                Explicit data void preservation: Absence of data represents an unmonitored window,{' '}
                <span className="font-bold text-error">never 0.00 pollution</span>.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-[9px] font-bold">
                  ✓
                </span>
                <span className="text-on-surface">Observed (Regular)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-surface-container-highest border border-outline-variant"></span>
                <span className="text-on-surface">Partial / Irregular</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-error-container border border-error/30 text-error flex items-center justify-center text-[9px] font-bold">
                  !
                </span>
                <span className="text-error font-medium">Data Void (No Samples)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-primary-fixed border border-primary/30 text-primary flex items-center justify-center text-[9px] font-bold">
                  B
                </span>
                <span className="text-primary font-medium">BDL / Categorical</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant text-[11px] uppercase border-b border-outline-variant font-semibold">
                  <th className="py-2.5 px-4 sticky left-0 bg-surface-container z-10 w-64 border-r border-outline-variant">
                    Ghat Location & Basin Zone
                  </th>
                  <th className="py-2 px-3 text-center border-r border-outline-variant bg-surface-container/80" colSpan={4}>
                    <span className="text-primary font-bold">2023 Baseline Cycle</span>
                  </th>
                  <th className="py-2 px-3 text-center border-r border-outline-variant bg-surface-container-high/60" colSpan={4}>
                    <span className="text-primary font-bold">2024 Visarjan Audit</span>
                  </th>
                  <th className="py-2 px-3 text-center bg-surface-container/80" colSpan={3}>
                    <span className="text-primary font-bold">2025 Interim Q1-Q2</span>
                  </th>
                </tr>
                <tr className="bg-surface-container-low text-outline text-[10px] font-semibold border-b border-outline-variant">
                  <th className="py-2 px-4 sticky left-0 bg-surface-container-low z-10 border-r border-outline-variant">
                    Ghat ID & Master Centroid
                  </th>
                  <th className="py-1.5 px-2 text-center w-16">pH</th>
                  <th className="py-1.5 px-2 text-center w-16">DO</th>
                  <th className="py-1.5 px-2 text-center w-16">BOD</th>
                  <th className="py-1.5 px-2 text-center w-20 border-r border-outline-variant">F.Coli</th>
                  <th className="py-1.5 px-2 text-center w-16">pH</th>
                  <th className="py-1.5 px-2 text-center w-16">DO</th>
                  <th className="py-1.5 px-2 text-center w-16">BOD</th>
                  <th className="py-1.5 px-2 text-center w-20 border-r border-outline-variant">F.Coli</th>
                  <th className="py-1.5 px-2 text-center w-16">pH</th>
                  <th className="py-1.5 px-2 text-center w-16">DO</th>
                  <th className="py-1.5 px-2 text-center w-16">BOD</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {GHAT_STATIONS.slice(0, 8).map((ghat) => {
                  const isShahpura = ghat.id === 'BPL-WTR-GH-12';
                  const isKali = ghat.id === 'BPL-WTR-GH-14';

                  return (
                    <tr
                      key={ghat.id}
                      onClick={() => onInspectGhat(ghat.id)}
                      className="hover:bg-surface-container-low transition-colors cursor-pointer"
                    >
                      <td className="py-2.5 px-4 sticky left-0 bg-surface-container-lowest hover:bg-surface-container-low z-10 border-r border-outline-variant font-medium text-on-surface">
                        <div className="flex items-center justify-between">
                          <span>{ghat.name}</span>
                          <span className="text-[10px] text-outline font-mono">{ghat.id}</span>
                        </div>
                        <span className="text-[10px] text-secondary font-medium">{ghat.waterBody}</span>
                      </td>

                      {/* 2023 */}
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          12 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          12 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          12 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center border-r border-outline-variant">
                        {isShahpura || isKali ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                            Void
                          </span>
                        ) : ghat.id === 'BPL-WTR-GH-09' ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-primary">
                            BDL (3)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                            11 obs
                          </span>
                        )}
                      </td>

                      {/* 2024 */}
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          14 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          14 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          14 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center border-r border-outline-variant">
                        {isShahpura ? (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container">
                            Void
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-surface-container-highest text-on-surface-variant">
                            4 irreg
                          </span>
                        )}
                      </td>

                      {/* 2025 */}
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          6 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          6 obs
                        </span>
                      </td>
                      <td className="p-1.5 text-center">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-secondary-fixed/50 text-on-secondary-fixed-variant">
                          6 obs
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-surface-container-low/40 border-t border-outline-variant flex items-center justify-between text-xs text-outline">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              <span>
                Displaying 8 of 14 monitored sites. Total sampling opportunities across audit horizon: 616 cells (422 monitored, 194 unmonitored voids).
              </span>
            </div>
            <button
              onClick={() => showToast('Displaying all 14 monitoring stations.')}
              className="text-primary font-semibold hover:underline"
            >
              Expand Full Matrix →
            </button>
          </div>
        </section>
      )}

      {/* TAB 2: RAW-TO-NORMALISED EVIDENCE LEDGER */}
      {activeTab === 'ledger' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden">
          <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-on-surface">
                  Raw-to-Normalised Evidence Ledger & OCR Extraction Audit
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container text-primary font-semibold">
                  428 Records
                </span>
              </div>
              <p className="text-xs text-outline mt-0.5">
                Cross-examination of original physical lab certificates against digitized analytical records. Traceable to page and table coordinates.
              </p>
            </div>

            {/* Table Filters */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="relative">
                <input
                  type="text"
                  value={searchLedger}
                  onChange={(e) => setSearchLedger(e.target.value)}
                  placeholder="Search record ID or text..."
                  className="h-8 pl-7 pr-2 bg-surface-container-low border border-outline-variant rounded text-xs text-on-surface focus:outline-none"
                />
                <span className="material-symbols-outlined absolute left-2 top-2 text-xs text-outline">search</span>
              </div>

              <select
                value={ledgerFilter}
                onChange={(e) => setLedgerFilter(e.target.value)}
                className="h-8 px-2.5 bg-surface-container-low border border-outline-variant rounded text-xs text-on-surface focus:outline-none"
              >
                <option value="All">All Validation Statuses</option>
                <option value="Verified Mapping">Verified Mapping</option>
                <option value="BDL Preserved">BDL Preserved</option>
                <option value="Needs Review">Needs Review</option>
                <option value="Parsing Warning">Parsing Warning</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant text-[11px] uppercase border-b border-outline-variant font-semibold">
                  <th className="py-2.5 px-4 w-44">Record ID & Date</th>
                  <th className="py-2.5 px-4 w-52">Original Scanned Site Name</th>
                  <th className="py-2.5 px-4 w-52">Normalised Site (Master GIS)</th>
                  <th className="py-2.5 px-3 text-right w-36">Original Printed Value</th>
                  <th className="py-2.5 px-3 text-right w-36">Parsed Value</th>
                  <th className="py-2.5 px-4">Source Document & Citation</th>
                  <th className="py-2.5 px-4 text-center w-36">Audit Status</th>
                  <th className="py-2.5 px-4 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-mono">
                      <div className="font-bold text-on-surface">{rec.id}</div>
                      <div className="text-[10px] text-outline">{rec.date}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-on-surface-variant bg-surface-container-low/30 rounded">
                      "{rec.siteNameRaw}"
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-primary">{rec.siteMasterName}</div>
                      <div className="text-[10px] font-mono text-outline">{rec.ghatId} • {rec.basin}</div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-medium text-on-surface">
                      {rec.originalPrintedValue}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-primary">
                      {rec.parsedValue}
                    </td>
                    <td className="py-3 px-4 text-[11px]">
                      <div className="font-medium text-on-surface">{rec.sourceDoc}</div>
                      <div className="text-outline">{rec.citation}</div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                          rec.status === 'Verified Mapping'
                            ? 'bg-secondary-fixed/40 text-on-secondary-fixed-variant border border-secondary/20'
                            : rec.status === 'BDL Preserved'
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20'
                            : rec.status === 'Needs Review'
                            ? 'bg-surface-container-highest text-on-surface-variant border border-outline'
                            : 'bg-error-container text-on-error-container border border-error/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-xs">
                          {rec.status === 'Verified Mapping' ? 'check_circle' : rec.status === 'BDL Preserved' ? 'lock' : 'help'}
                        </span>
                        {rec.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedRecordForModal(rec)}
                          className="p-1 hover:bg-surface-container rounded text-outline hover:text-primary"
                          title="View Source Scan"
                        >
                          <span className="material-symbols-outlined text-base">visibility</span>
                        </button>
                        <button
                          onClick={() => showToast(`Flagged ${rec.id} for human re-verification.`)}
                          className="p-1 hover:bg-surface-container rounded text-outline hover:text-error"
                          title="Flag for Review"
                        >
                          <span className="material-symbols-outlined text-base">flag</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-outline">
              <span>Showing <strong>1–{filteredRecords.length}</strong> of <strong>428</strong> audited grab records</span>
              <span className="h-3 w-px bg-outline-variant"></span>
              <span>OCR Confidence: <strong className="text-primary font-mono">98.2%</strong> avg character fidelity</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-[11px] font-semibold text-primary">Page 1 of 54</span>
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: ENTITY RECONCILIATION */}
      {activeTab === 'reconciliation' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3">
            <div>
              <h3 className="text-sm font-bold text-on-surface">GIS Master Entity Reconciliation & Gazette Matcher</h3>
              <p className="text-xs text-outline mt-0.5">
                Deterministic matching connects municipal police ghat maps, lab dispatch notes, and CPCB station IDs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
                13 VERIFIED
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-600/30 text-xs font-bold">
                1 NEEDS REVIEW
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant uppercase text-[10px] tracking-wider border-b border-outline-variant font-semibold">
                  <th className="py-2 px-3">Gazette Master Entity</th>
                  <th className="py-2 px-3">Scanned Aliases / Field Logs</th>
                  <th className="py-2 px-3">Basin Catchment</th>
                  <th className="py-2 px-3">Match Confidence</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {GHAT_STATIONS.map((ghat) => {
                  const isNeedsReview = ghat.id === 'BPL-WTR-GH-12';
                  return (
                    <tr
                      key={ghat.id}
                      className={`hover:bg-surface-container-low transition-colors ${
                        isNeedsReview ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-semibold text-on-surface flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                        {ghat.name}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-on-surface-variant">
                        {ghat.aliases.join(' / ')}
                      </td>
                      <td className="py-2.5 px-3 text-on-surface-variant">{ghat.basinZone}</td>
                      <td className="py-2.5 px-3 font-mono font-semibold text-primary">{ghat.confidence}</td>
                      <td className="py-2.5 px-3 text-right">
                        {isNeedsReview ? (
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                            NEEDS REVIEW
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px]">
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
        </section>
      )}

      {/* Section C: Data Integrity Principles & Algorithmic Handling Rules */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1 rounded bg-primary text-on-primary">
            <span className="material-symbols-outlined text-sm">menu_book</span>
          </span>
          <h3 className="text-sm font-bold text-on-surface">Data Integrity Principles & Algorithmic Handling Rules</h3>
          <span className="text-[10px] uppercase tracking-wider text-outline px-2 py-0.5 rounded bg-surface-container font-semibold">
            Statutory Governance
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rule 1 */}
          <div className="p-3.5 rounded-lg border border-outline-variant bg-surface-container-low/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-primary font-semibold mb-1 text-xs">
                <span className="material-symbols-outlined text-base">do_not_disturb_on</span>
                <span>Rule 1: Zero Replacement Prohibition</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Null or missing observation intervals are <strong>strictly maintained as Data Voids</strong>. The system strictly prohibits numerical zero imputation (e.g. 0.0 mg/L), which would falsify models into predicting pristine water.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[10px] text-outline">
              <span>Standard: CPCB Guidelines 2021</span>
              <span className="text-primary font-bold">ENFORCED</span>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="p-3.5 rounded-lg border border-outline-variant bg-surface-container-low/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-tertiary font-semibold mb-1 text-xs">
                <span className="material-symbols-outlined text-base">bookmark</span>
                <span>Rule 2: BDL / ND Explicit Retention</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Values Below Detection Limit (such as BOD &lt; 2.0 mg/L or Fecal Coliform &lt; 2 MPN/100mL) are retained as <strong>categorical threshold boundaries</strong>. They are never substituted with half-detection constants without logged user authorization.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[10px] text-outline">
              <span>Standard: EPA Censored Data Method</span>
              <span className="text-tertiary font-bold">PRESERVED</span>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="p-3.5 rounded-lg border border-outline-variant bg-surface-container-low/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-secondary font-semibold mb-1 text-xs">
                <span className="material-symbols-outlined text-base">share_location</span>
                <span>Rule 3: Geospatial Entity Reconciliation</span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Dual-stage Levenshtein string matching coupled with a <strong>&lt; 250m spatial proximity radius</strong> resolves historical phonetic variations (e.g., 'Sheetal Das Bagicha' vs 'Sheetal Das Ki Bagiya') to canonical Bhopal Municipal GIS centroids.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[10px] text-outline">
              <span>Precision: 92.8% Centroid Match</span>
              <span className="text-secondary font-bold">VERIFIED</span>
            </div>
          </div>
        </div>
      </section>

      {/* Record Inspect Modal */}
      {selectedRecordForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-outline-variant pb-2">
              <div>
                <h3 className="font-bold text-on-surface text-sm">Archival Sample Certificate Inspection</h3>
                <span className="text-[11px] font-mono text-primary">{selectedRecordForModal.id}</span>
              </div>
              <button
                onClick={() => setSelectedRecordForModal(null)}
                className="p-1 rounded text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="p-3 rounded bg-surface-container-low font-mono text-xs space-y-1.5">
              <div><strong>Raw Site Log:</strong> "{selectedRecordForModal.siteNameRaw}"</div>
              <div><strong>Mapped Master:</strong> {selectedRecordForModal.siteMasterName} ({selectedRecordForModal.ghatId})</div>
              <div><strong>Original Printed Value:</strong> <span className="text-error font-bold">{selectedRecordForModal.originalPrintedValue}</span></div>
              <div><strong>Normalized Value:</strong> {selectedRecordForModal.parsedValue}</div>
              <div><strong>Citation:</strong> {selectedRecordForModal.sourceDoc} ({selectedRecordForModal.citation})</div>
              <div><strong>Analyst:</strong> {selectedRecordForModal.analyst}</div>
              <div><strong>Sampling Date:</strong> {selectedRecordForModal.date}</div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
              <button
                onClick={() => setSelectedRecordForModal(null)}
                className="px-3 py-1.5 rounded border border-outline-variant text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Certified extract for ${selectedRecordForModal.id} downloaded.`);
                  setSelectedRecordForModal(null);
                }}
                className="px-3 py-1.5 rounded bg-primary text-white text-xs font-semibold"
              >
                Download Scan (PDF)
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
