/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface MunicipalHelpdeskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MunicipalHelpdeskModal: React.FC<MunicipalHelpdeskModalProps> = ({ isOpen, onClose }) => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDetails, setTicketDetails] = useState('');
  const [targetGhat, setTargetGhat] = useState('Prempura Ghat');
  const [submitted, setSubmitted] = useState(false);

  // Escape key handler
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTicketSubject('');
      setTicketDetails('');
      onClose();
    }, 1500);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="helpdesk-modal-title"
    >
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl w-full max-w-lg max-h-[92vh] overflow-hidden flex flex-col animate-fade-in my-auto">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-xl">contact_support</span>
            </div>
            <div className="min-w-0">
              <h3 id="helpdesk-modal-title" className="text-sm font-bold text-on-surface truncate">
                Municipal Helpdesk & Emergency Sampling Dispatch
              </h3>
              <p className="text-[11px] text-on-surface-variant truncate">
                Bhopal Municipal Corporation Environmental Cell Hotline
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close helpdesk dialog"
            className="w-11 h-11 flex items-center justify-center rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-3.5 text-xs overflow-y-auto flex-1 scrollbar-thin">
          {/* Quick contact banner */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-primary uppercase block">Environmental Officer Direct Line</span>
              <span className="font-semibold text-on-surface text-xs">+91 (0755) 2540-889 / Ext. 204</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200 shrink-0">
              OPERATIONAL
            </span>
          </div>

          <div>
            <label className="font-semibold text-on-surface block mb-1">Target Ghat Location</label>
            <select
              value={targetGhat}
              onChange={(e) => setTargetGhat(e.target.value)}
              className="w-full h-9 px-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="Prempura Ghat">Prempura Ghat (BPL-WTR-GH-04)</option>
              <option value="Khatlapura Ghat">Khatlapura Ghat (BPL-WTR-GH-09)</option>
              <option value="Shahpura Lake Ghat">Shahpura Lake Ghat (Sector B) (BPL-WTR-GH-12)</option>
              <option value="Sheetal Das Ki Bagiya">Sheetal Das Ki Bagiya (BPL-WTR-GH-01)</option>
              <option value="Bhadbhada Spillway">Bhadbhada Spillway Ghat (BPL-WTR-GH-08)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-on-surface block mb-1">Inquiry / Dispatch Category</label>
            <input
              type="text"
              required
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="e.g. Request Emergency Grab Run for Post-Visarjan Turbidity Surge"
              className="w-full h-9 px-3 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary placeholder:text-outline"
            />
          </div>

          <div>
            <label className="font-semibold text-on-surface block mb-1">Incident Details / Laboratory Discrepancy Note</label>
            <textarea
              rows={3}
              required
              value={ticketDetails}
              onChange={(e) => setTicketDetails(e.target.value)}
              placeholder="Provide context regarding sample collection time, field parameters, or archival reference ID..."
              className="w-full p-2.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none focus:border-primary placeholder:text-outline resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-outline-variant/60">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] px-3.5 py-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitted}
              className="min-h-[40px] px-4 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-tertiary transition-all text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              {submitted ? (
                <>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Ticket Logged #BMC-902</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Transmit Dispatch Notice</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
