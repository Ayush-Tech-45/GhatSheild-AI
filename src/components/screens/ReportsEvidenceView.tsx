/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EVIDENCE_DOSSIERS } from '../../data/mockData.ts';
import { EvidenceDossierDoc } from '../../types.ts';

interface ReportsEvidenceViewProps {
  onOpenExportModal: (ghatId: string) => void;
}

export const ReportsEvidenceView: React.FC<ReportsEvidenceViewProps> = ({ onOpenExportModal }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>('DOS-2024-09-V4');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedBasin, setSelectedBasin] = useState('all');
  const [selectedDocType, setSelectedDocType] = useState('all');
  const [activeTab, setActiveTab] = useState<'dossiers' | 'builder' | 'templates' | 'registers'>('dossiers');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const selectedDoc =
    EVIDENCE_DOSSIERS.find((d) => d.id === selectedDocId) || EVIDENCE_DOSSIERS[0];

  const filteredDossiers = EVIDENCE_DOSSIERS.filter((doc) => {
    if (selectedYear !== 'all') {
      if (selectedYear === '2024' && !doc.date.includes('2024')) return false;
      if (selectedYear === '2025' && !doc.date.includes('2025')) return false;
      if (selectedYear === '2023' && !doc.date.includes('2023')) return false;
    }
    if (selectedBasin !== 'all') {
      if (selectedBasin === 'bhoj' && !doc.basin.includes('Bhoj') && !doc.basin.includes('Upper')) return false;
      if (selectedBasin === 'shahpura' && !doc.basin.includes('Shahpura')) return false;
    }
    return true;
  });

  return (
    <main className="flex-1 flex flex-col overflow-y-auto bg-background">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* WORKSPACE HEADER & CONTROL BAR */}
      <section className="p-3 sm:p-5 md:p-6 pb-4 border-b border-outline-variant bg-surface-container-lowest min-w-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-on-background tracking-tight">
                Regulatory Audit Reports & Evidence Dossier Workspace
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-primary-fixed/50 text-on-primary-fixed border border-primary/20">
                <span className="material-symbols-outlined text-xs">verified</span>
                ISO 14044 / CPCB Statutory Reporting Format
              </span>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant max-w-4xl">
              Generate, verify, and export official municipal dossiers compiling multi-year water quality records across 14 Bhopal visarjan ghats. Every report contains cryptographic provenance hashes, lab chain-of-custody citations, and explicit data-void disclosures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start lg:self-auto">
            <button
              onClick={() => onOpenExportModal('all')}
              className="min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 bg-primary text-on-primary hover:bg-tertiary rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-sm">post_add</span>
              <span>Generate New Audit Dossier</span>
            </button>
            <button
              onClick={() => showToast('Monthly automatic reporting scheduled on 1st of every month.')}
              className="min-h-[40px] inline-flex items-center gap-2 px-3 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low rounded-lg text-xs font-semibold border border-outline-variant transition-colors"
            >
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Schedule Summary</span>
            </button>
            <button
              onClick={() => showToast('Current dossier view exported as ZIP archive.')}
              className="min-h-[40px] inline-flex items-center gap-2 px-3 py-2 bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg text-xs font-medium border border-outline-variant transition-colors"
            >
              <span className="material-symbols-outlined text-sm">folder_zip</span>
              <span>Export View (ZIP)</span>
            </button>
          </div>
        </div>

        {/* 4 TOP QUICK METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Compiled Regulatory Dossiers</span>
              <span className="w-7 h-7 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-sm">folder_open</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-background tabular-nums">18 Dossiers</span>
            </div>
            <div className="mt-1 text-xs text-on-surface-variant flex items-center gap-1">
              <span className="font-semibold text-primary">12 Post-Visarjan</span> • 4 Baselines • 2 Deficits
            </div>
            <div className="mt-2 pt-2 border-t border-outline-variant/60 flex items-center gap-1.5 text-[10px] text-outline">
              <span className="material-symbols-outlined text-xs">link</span>
              All cryptographically indexed to MPPCB registers
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Verified Citations & Lab Records</span>
              <span className="w-7 h-7 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-sm">biotech</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-background tabular-nums">428 Grab Samples</span>
            </div>
            <div className="mt-1 text-xs text-secondary flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              100% Chain-of-Custody Linked
            </div>
            <div className="mt-2 pt-2 border-t border-outline-variant/60 text-[10px] text-outline">
              Bhopal Regional Labs + MPPCB Central Board
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Statutory Disclosures Embedded</span>
              <span className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-sm">warning_amber</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-background tabular-nums">31.6%</span>
              <span className="text-xs text-on-surface-variant font-semibold">Sampling Voids</span>
            </div>
            <div className="mt-1 text-xs text-on-surface-variant">
              Explicit non-interpolation disclosure attached
            </div>
            <div className="mt-2 pt-2 border-t border-outline-variant/60 flex items-center gap-1.5 text-[10px] text-outline">
              <span className="material-symbols-outlined text-xs">fact_check</span>
              Zero-substitution statutory rule applied
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-medium">Audit Status & Certification</span>
              <span className="w-7 h-7 rounded-lg bg-primary-fixed/40 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-sm">verified_user</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary tabular-nums">100% Lineage</span>
            </div>
            <div className="mt-1 text-xs text-on-surface-variant">
              Deterministic, hash-verified chain
            </div>
            <div className="mt-2 pt-2 border-t border-outline-variant/60 flex items-center gap-1 text-[10px] text-outline">
              <span className="material-symbols-outlined text-xs">edit_document</span>
              Signed by BMC Environmental Cell
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT SCREEN WORKSPACE (~60% Repository / ~40% Inspector) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden p-3 sm:p-5 md:p-6 gap-4 sm:gap-6 min-w-0">
        {/* LEFT PANEL: Official Dossier Repository (60%) */}
        <div className="w-full lg:w-[58%] xl:w-[60%] flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden min-w-0">
          <div className="border-b border-outline-variant px-3 sm:px-4 pt-3 bg-surface-container-lowest">
            <div className="flex items-center justify-between pb-3 flex-wrap gap-2">
              <div>
                <h2 className="text-xs font-bold text-on-background">
                  Official Dossier Repository & Report Generator
                </h2>
                <p className="text-[11px] text-on-surface-variant">Archival dossiers formatted according to MPPCB schedule guidelines</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container text-on-surface font-semibold border border-outline-variant">
                18 Total Documents
              </span>
            </div>

            <div className="flex gap-4 sm:gap-6 text-xs font-medium overflow-x-auto min-w-0 flex-nowrap pb-1 scrollbar-thin">
              <button
                onClick={() => setActiveTab('dossiers')}
                className={`pb-2 transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  activeTab === 'dossiers' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Generated Audit Dossiers (18)
              </button>
              <button
                onClick={() => setActiveTab('builder')}
                className={`pb-2 transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  activeTab === 'builder' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Custom Report Builder
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`pb-2 transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  activeTab === 'templates' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Statutory MPPCB Templates
              </button>
              <button
                onClick={() => setActiveTab('registers')}
                className={`pb-2 transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  activeTab === 'registers' ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Archival Grab Registers
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-3 bg-surface-container-low border-b border-outline-variant flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-on-surface-variant font-medium">Filter by:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
              >
                <option value="all">All Years (2023–2025)</option>
                <option value="2025">2025 (Current Period)</option>
                <option value="2024">2024 (Visarjan Surge)</option>
                <option value="2023">2023 (Baseline)</option>
              </select>

              <select
                value={selectedBasin}
                onChange={(e) => setSelectedBasin(e.target.value)}
                className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
              >
                <option value="all">All Catchment Basins</option>
                <option value="bhoj">Bhoj Wetland (Upper Lake)</option>
                <option value="shahpura">Shahpura Lake Environs</option>
              </select>

              <select
                value={selectedDocType}
                onChange={(e) => setSelectedDocType(e.target.value)}
                className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
              >
                <option value="all">All Regulatory Document Types</option>
                <option value="breach">Post-Visarjan Breach Audit</option>
                <option value="completeness">Baseline Completeness Review</option>
                <option value="cpcb">CPCB Class B Compliance Report</option>
              </select>
            </div>
            <div className="text-outline text-xs">Showing {filteredDossiers.length} priority items</div>
          </div>

          {/* Dossiers List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredDossiers.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-3.5 rounded-lg border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-2 border-primary bg-surface-container/40 shadow-xs'
                      : 'border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">description</span>
                        <h3 className="font-bold text-on-background text-xs">{doc.title}</h3>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-on-surface-variant">
                        <span className="font-mono text-primary font-semibold">{doc.refCode}</span>
                        <span>•</span>
                        <span>Basin: <strong className="text-on-surface">{doc.basin}</strong></span>
                        <span>•</span>
                        <span>Date: {doc.date}</span>
                        <span>•</span>
                        <span>Length: {doc.pageCount} pages</span>
                        <span>•</span>
                        <span className="font-semibold text-secondary">{doc.format}</span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-secondary-container/40 text-secondary border border-secondary/30 shrink-0">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      {doc.statusBadge}
                    </span>
                  </div>

                  <div className="mt-2.5 p-2 rounded-md bg-surface-container-lowest border border-outline-variant/80 text-xs">
                    <span className="font-semibold text-on-surface">Primary Statutory Finding:</span>
                    <span className="text-on-surface-variant ml-1">{doc.primaryFinding}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-outline-variant/50 text-xs">
                    <div className="font-mono text-[10px] text-on-surface-variant">
                      <span className="text-outline">SHA256: </span>
                      {doc.sha256.slice(0, 16)}...
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDocId(doc.id);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-surface-container-lowest border border-outline-variant hover:bg-surface-container-low text-primary flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-xs">visibility</span>
                        View Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenExportModal('all');
                        }}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-primary text-on-primary hover:bg-primary-container flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-xs">download</span>
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-4 py-2.5 bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
            <span>Showing 1 to {filteredDossiers.length} of 18 dossiers</span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-semibold">1</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Document Preview & Provenance Inspector (40%) */}
        <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">pageview</span>
              <div>
                <h2 className="text-xs font-bold text-on-surface">Document Preview: {selectedDoc.title}</h2>
                <span className="text-[11px] text-on-surface-variant">Interactive Statutory Evidence Inspector</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-fixed/40 text-primary border border-primary/20 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified_user</span>
                BMC Seal
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary-container/40 text-secondary border border-secondary/30">
                Provenance Verified
              </span>
            </div>
          </div>

          {/* Document Simulator */}
          <div className="flex-1 overflow-y-auto p-4 bg-surface-container-low/40">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 shadow-xs text-on-surface space-y-4">
              {/* Formal Letterhead */}
              <div className="border-b-2 border-outline pb-3 text-center">
                <div className="flex items-center justify-between text-left">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded border border-outline-variant flex items-center justify-center font-bold text-xs bg-surface-container text-primary">
                      BMC
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Bhopal Municipal Corporation
                      </div>
                      <div className="text-[11px] text-on-surface-variant font-medium">
                        Environmental Cell & Water Works Directorate
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-semibold text-outline uppercase tracking-wider">
                      STATUTORY AUDIT
                    </div>
                    <div className="text-xs font-mono font-bold text-primary">CPCB Class B Standard</div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[10px] font-mono text-on-surface-variant">
                  <span><strong>Doc ID:</strong> {selectedDoc.id}</span>
                  <span><strong>Date:</strong> {selectedDoc.date}</span>
                  <span><strong>Audit Reg:</strong> MPPCB/BPL/2024/889</span>
                </div>
              </div>

              {/* SHA-256 Stamping */}
              <div className="p-2 rounded bg-surface-container-low border border-outline-variant flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-1.5 text-on-surface truncate">
                  <span className="material-symbols-outlined text-xs text-primary">key</span>
                  <span className="text-outline">SHA-256: </span>
                  <span className="truncate font-semibold text-primary">{selectedDoc.sha256}</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase shrink-0 pl-2">MATCHED LAB FILE</span>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-outline mb-1">
                  1. Executive Water Body Impact Summary
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed text-justify">
                  Official observation dossier assessing water quality shifts across {selectedDoc.basin}. Compiled in accordance with Central Pollution Control Board (CPCB) Guidelines for Idol Immersion (2020) and MPPCB State Laboratory grab register protocols.
                </p>
              </div>

              {/* Table Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-outline">
                    2. Table 3.2: Critical Ghat Exceedance Extract
                  </h4>
                  <span className="text-[10px] text-outline font-mono">CPCB Class B Thresholds</span>
                </div>
                <div className="border border-outline-variant rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-surface-container border-b border-outline-variant text-[11px] text-on-surface-variant font-semibold">
                        <th className="py-1.5 px-2.5">Ghat Station</th>
                        <th className="py-1.5 px-2">Parameter</th>
                        <th className="py-1.5 px-2 text-right">Observed</th>
                        <th className="py-1.5 px-2 text-right">Statutory Limit</th>
                        <th className="py-1.5 px-2.5 text-center">Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/60 font-mono text-[11px]">
                      {selectedDoc.tableRows.map((r, i) => (
                        <tr key={i} className="hover:bg-surface-container-low">
                          <td className="py-1.5 px-2.5 font-sans font-medium text-on-surface">{r.station}</td>
                          <td className="py-1.5 px-2 text-on-surface-variant">{r.parameter}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-error tabular-nums">{r.observed}</td>
                          <td className="py-1.5 px-2 text-right text-outline tabular-nums">{r.statutoryLimit}</td>
                          <td className="py-1.5 px-2.5 text-center">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                                r.compliance === 'BREACH'
                                  ? 'bg-error-container text-on-error-container'
                                  : r.compliance === 'HYPOXIA'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-secondary-container/40 text-secondary'
                              }`}
                            >
                              {r.compliance}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Statutory Clause */}
              <div className="p-3 rounded-lg bg-surface-container-high border-l-4 border-primary text-on-surface">
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                  <span className="material-symbols-outlined text-sm">gavel</span>
                  <span>MANDATORY STATUTORY CLAUSE — AUDIT TRACEABILITY</span>
                </div>
                <p className="mt-1 text-[11px] text-on-surface-variant font-medium leading-relaxed italic">
                  "NOTE ON UNMONITORED INTERVALS: Data voids during non-festival intervals reflect municipal grab sampling pauses, NOT water purity. In accordance with environmental auditing standards, zero substitution has NOT been applied to unmonitored periods."
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-3 border-t border-outline-variant flex items-center justify-between gap-4 text-xs">
                <div className="text-left">
                  <div className="font-mono text-[9px] text-outline">AUTHORISED SIGNATORY 1</div>
                  <div className="mt-1 font-bold text-on-surface">Er. R. Sharma</div>
                  <div className="text-[10px] text-on-surface-variant">Superintending Environmental Engineer</div>
                  <div className="text-[9px] text-outline">Bhopal Municipal Corporation</div>
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div className="w-12 h-12 border border-outline-variant rounded bg-surface-container-low flex flex-col items-center justify-center p-1 text-center">
                    <span className="material-symbols-outlined text-primary text-lg">qr_code_2</span>
                    <span className="text-[7px] font-mono text-outline font-semibold">VERIFIED</span>
                  </div>
                  <span className="text-[8px] font-mono text-outline mt-0.5">COC #889-MPPCB</span>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[9px] text-outline">AUTHORISED SIGNATORY 2</div>
                  <div className="mt-1 font-bold text-on-surface">Dr. S. K. Verma</div>
                  <div className="text-[10px] text-on-surface-variant">Senior Analyst & Lab Director</div>
                  <div className="text-[9px] text-outline">MPPCB Regional Directorate Bhopal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="p-3.5 bg-surface-container-lowest border-t border-outline-variant flex flex-col gap-2">
            <button
              onClick={() => onOpenExportModal('all')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-on-primary hover:bg-tertiary rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Download Certified PDF (with Digital Signature)</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => showToast('Complete Evidence ZIP packaged.')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low rounded-lg text-xs font-semibold border border-outline-variant transition-colors"
              >
                <span className="material-symbols-outlined text-sm">archive</span>
                <span className="truncate">Package Evidence ZIP</span>
              </button>
              <button
                onClick={() => showToast('Dossier transmitted to Municipal Commissioner.')}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-lg text-xs font-medium border border-outline-variant transition-colors"
              >
                <span className="material-symbols-outlined text-sm">forward_to_inbox</span>
                <span className="truncate">Send to Commissioner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
