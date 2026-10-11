/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GHAT_STATIONS } from '../../data/mockData.ts';

interface AuditDossierExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGhatId?: string;
}

export const AuditDossierExportModal: React.FC<AuditDossierExportModalProps> = ({
  isOpen,
  onClose,
  selectedGhatId
}) => {
  const [format, setFormat] = useState<'pdf' | 'csv' | 'bundle'>('pdf');
  const [includeRawLogs, setIncludeRawLogs] = useState(true);
  const [includeDigitalSignature, setIncludeDigitalSignature] = useState(true);
  const [selectedStation, setSelectedStation] = useState(selectedGhatId || 'all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  if (!isOpen) return null;

  const handleTriggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        onClose();
      }, 1400);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">download</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-surface">Export Statutory Audit Dossier</h3>
              <p className="text-[11px] text-on-surface-variant">CPCB Class B Standard & MPPCB Certified Lineage</p>
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
          {/* Target Station */}
          <div>
            <label className="font-semibold text-on-surface block mb-1">Target Monitoring Scope</label>
            <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="w-full h-8 px-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="all">All 14 Bhopal Visarjan Ghats (Comprehensive Catchment)</option>
              {GHAT_STATIONS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} ({g.id} · {g.waterBody})
                </option>
              ))}
            </select>
          </div>

          {/* Export Format */}
          <div>
            <label className="font-semibold text-on-surface block mb-1">Export Package Format</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  format === 'pdf'
                    ? 'border-primary bg-primary/5 text-primary font-semibold ring-1 ring-primary'
                    : 'border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                  <span>PDF Dossier</span>
                </div>
                <p className="text-[10px] text-outline">Certified letterhead with digital hashes</p>
              </button>

              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  format === 'csv'
                    ? 'border-primary bg-primary/5 text-primary font-semibold ring-1 ring-primary'
                    : 'border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <span className="material-symbols-outlined text-base">table_view</span>
                  <span>CSV Records</span>
                </div>
                <p className="text-[10px] text-outline">Tabular grab observations matrix</p>
              </button>

              <button
                type="button"
                onClick={() => setFormat('bundle')}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  format === 'bundle'
                    ? 'border-primary bg-primary/5 text-primary font-semibold ring-1 ring-primary'
                    : 'border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-0.5">
                  <span className="material-symbols-outlined text-base">folder_zip</span>
                  <span>Full Bundle</span>
                </div>
                <p className="text-[10px] text-outline">PDF + CSV + OCR scans in ZIP</p>
              </button>
            </div>
          </div>

          {/* Checkbox Options */}
          <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeRawLogs}
                onChange={(e) => setIncludeRawLogs(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
              />
              <span className="font-medium text-on-surface">Include raw lab logbook transcript references</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDigitalSignature}
                onChange={(e) => setIncludeDigitalSignature(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-outline-variant focus:ring-primary"
              />
              <span className="font-medium text-on-surface">
                Apply BMC Environmental Cell Cryptographic Signature (SHA-256)
              </span>
            </label>
          </div>

          {/* Statutory Provenance Stamp Note */}
          <div className="p-2.5 bg-amber-500/10 border border-amber-600/20 rounded text-[11px] text-amber-900 leading-relaxed">
            <strong>Audit Note:</strong> All generated packages conform to NGT Central Zone compliance filing protocols. Unmonitored sampling intervals are watermarked as <code className="font-mono bg-white px-1 py-0.5 rounded text-error font-bold">DATA_VOID</code> per Rule 104-B.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <div className="text-[10px] text-outline font-mono">
            Lineage: MPPCB-ARCHIVAL-2024
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isExporting}
              className="px-3 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleTriggerExport}
              disabled={isExporting}
              className="px-4 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              {isExporting ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  <span>Compiling Dossier...</span>
                </>
              ) : exportComplete ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Generate & Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
