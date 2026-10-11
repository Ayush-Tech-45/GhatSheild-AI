/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INITIAL_COPILOT_MESSAGES } from '../../data/mockData.ts';
import { CopilotMessage } from '../../types.ts';

interface CopilotViewProps {
  onOpenExportModal: (ghatId: string) => void;
  onInspectGhat: (ghatId: string) => void;
}

export const CopilotView: React.FC<CopilotViewProps> = ({
  onOpenExportModal,
  onInspectGhat
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_COPILOT_MESSAGES);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeConstraint, setActiveConstraint] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'chat' | 'inspector'>('chat');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isProcessing) return;

    const userMsg: CopilotMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: 'Today, Just now · Officer Inquiry',
      content: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsProcessing(true);

    setTimeout(() => {
      const query = text.toLowerCase();
      let response: CopilotMessage;

      if (query.includes('missing') || query.includes('sampling') || query.includes('gap')) {
        response = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          timestamp: 'Today, Just now · Deterministic CPCB-IG-v2.4',
          content: 'GhatShield Deterministic Synthesiser',
          queryHash: '#MPPCB-GAP-EVAL-801',
          executiveFinding: 'Shahpura Lake Ghat (Sector B) and Kali Mandir Visarjan Step exhibit the greatest empirical void penalties in the 2023–2025 archival register, requiring immediate grab prioritization.',
          tableData: [
            {
              station: 'Shahpura Lake (Sector B)',
              basin: 'Shahpura Basin',
              parameterPeak: 'Void (62.5% missing)',
              sampleDate: 'Last Obs: Nov 2023',
              exceedanceDelta: '>14 mos unmonitored',
              citation: 'BMC Archive Reg #114',
              status: 'Critical Void'
            },
            {
              station: 'Kali Mandir Visarjan Step',
              basin: 'Lower Lake',
              parameterPeak: '85.7% unmonitored',
              sampleDate: 'Last Obs: Aug 2023',
              exceedanceDelta: 'Only 6 total grabs',
              citation: 'BMC Grab Binder #4',
              status: 'Fragmented Record'
            }
          ],
          gapNotice: 'Rule §104-B: Unmonitored sampling windows cannot be zero-filled or deemed clean. They are preserved strictly as epistemic risk voids.',
          statutoryAction: 'Dispatch Mobile Unit Beta to Shahpura Lake Sector B within Sprint Cycle 1.'
        };
      } else if (query.includes('threshold') || query.includes('exceed') || query.includes('bod')) {
        response = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          timestamp: 'Today, Just now · CPCB Class B Standard Audit',
          content: 'GhatShield Deterministic Synthesiser',
          queryHash: '#CPCB-EXCEED-BOD-902',
          executiveFinding: 'Historical records verify 43% of post-immersion grab samples exceed the CPCB Class B statutory bathing threshold (BOD ≤ 3.0 mg/L), with the severe cluster concentrated at Prempura (6.4 mg/L) and Khatlapura (7.2 mg/L).',
          tableData: [
            {
              station: 'Prempura Ghat',
              basin: 'Upper Lake (Bada Talab)',
              parameterPeak: '6.4 mg/L BOD',
              sampleDate: 'Sep 18, 2024',
              exceedanceDelta: '+113% over limit',
              citation: 'MPPCB Doc #889 Pg 14',
              status: 'Breach Class B'
            },
            {
              station: 'Khatlapura Ghat',
              basin: 'Lower Lake',
              parameterPeak: '7.2 mg/L BOD',
              sampleDate: 'Sep 21, 2024',
              exceedanceDelta: '+140% over limit',
              citation: 'MPPCB Doc #892 Pg 8',
              status: 'Breach Class B'
            }
          ],
          statutoryAction: 'Mandate deployment of micro-aeration or bio-enzyme remediation curtains 48 hours prior to immersion ceremonies.'
        };
      } else {
        response = {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          timestamp: 'Today, Just now · Deterministic Rule Engine v2.4',
          content: 'GhatShield Deterministic Synthesiser',
          queryHash: '#BMC-AUDIT-QUERY-012',
          executiveFinding: 'Analysis of 428 grab records across 14 Bhopal visarjan ghats confirms operational readiness. All findings are traceable to MPPCB archival registers with SHA-256 cryptographic provenance.',
          gapNotice: 'Preserved 42 BDL/ND categories and zero-substitution audit standards applied.',
          statutoryAction: 'Review sampling schedule in Sampling Optimiser or generate certified dossier in Reports.'
        };
      }

      setMessages((prev) => [...prev, response]);
      setIsProcessing(false);
    }, 600);
  };

  const suggestedPrompts = [
    'Which ghats need additional sampling based on missing evidence?',
    'Which historical observations exceeded CPCB Class B reference thresholds?',
    'Compare available BOD observations across years for Prempura Ghat',
    'Explain why Prempura & Khatlapura are prioritised',
    'Generate an evidence-backed pre-visarjan sampling schedule'
  ];

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-background min-w-0">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE / TABLET VIEW SWITCHER TABS (< 1024px) */}
      <div className="lg:hidden flex items-center p-1.5 bg-surface-container-low border-b border-outline-variant text-xs font-semibold gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setMobileTab('chat')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'chat' ? 'bg-primary text-white shadow-xs font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">psychology</span>
          <span>Chat Workspace</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('inspector')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            mobileTab === 'inspector' ? 'bg-primary text-white shadow-xs font-bold' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-base">policy</span>
          <span>Evidence Inspector</span>
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden min-w-0">
        {/* LEFT COLUMN: INTERACTIVE CONVERSATION WORKSPACE */}
        <section
          className={`${
            mobileTab === 'chat' ? 'flex' : 'hidden'
          } lg:flex flex-1 flex-col h-full border-r border-outline-variant bg-surface-container-lowest overflow-hidden min-w-0`}
        >
          {/* Workspace Header */}
          <div className="px-3 sm:px-6 py-3 border-b border-outline-variant bg-surface-container-lowest shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center font-bold shrink-0">
                <span className="material-symbols-outlined text-xl">psychology</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm font-bold text-on-surface tracking-tight">AI Action Copilot</h2>
                  <span className="inline-flex items-center gap-1 bg-surface-container-high text-primary border border-primary/20 text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                    Deterministic Rule-Engine v2.4 Active
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant truncate">
                  Traceable operational recommendations for Bhopal visarjan ghats.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  setMessages(INITIAL_COPILOT_MESSAGES.slice(0, 2));
                  showToast('Conversation reset to baseline thread.');
                }}
                className="px-2.5 py-1.5 rounded-lg border border-outline-variant text-on-surface text-xs font-medium hover:bg-surface-container-low transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm text-on-surface-variant">restart_alt</span>
                <span className="hidden sm:inline">Clear</span>
              </button>
              <button
                type="button"
                onClick={() => showToast('Conversation log exported as certified PDF dossier.')}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-primary text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-sm text-primary">picture_as_pdf</span>
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Suggested Query Chips Ribbon */}
          <div className="px-3 sm:px-6 py-2 bg-surface-container-low/60 border-b border-outline-variant/70 overflow-x-auto flex items-center gap-2 shrink-0 min-w-0">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
              <span className="material-symbols-outlined text-xs text-primary">bolt</span>
              Suggested:
            </span>
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 text-left px-2.5 py-1 rounded-full bg-surface-container-lowest border border-outline-variant hover:border-primary hover:text-primary text-on-surface text-[11px] font-medium transition-all shadow-xs flex items-center gap-1"
              >
                <span>{prompt}</span>
                <span className="material-symbols-outlined text-xs text-outline">arrow_forward</span>
              </button>
            ))}
          </div>

          {/* Active Chat Scroll Area */}
          <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5 bg-background/50 min-w-0">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end items-start gap-2 sm:gap-3">
                    <div className="max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-xl p-3 sm:p-3.5 shadow-xs text-left">
                      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-outline-variant/50 text-[10px] text-on-surface-variant">
                        <span className="font-semibold text-on-surface">Er. R. Sharma (Municipal Officer)</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="text-xs text-on-surface font-medium leading-relaxed">{msg.content}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-primary-container">
                      RS
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex justify-start items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <span className="material-symbols-outlined text-lg">psychology</span>
                  </div>

                  <div className="max-w-3xl w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 sm:p-5 shadow-xs space-y-3.5 min-w-0">
                    <div className="flex items-center justify-between border-b border-outline-variant/60 pb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-primary">{msg.content}</span>
                        <span className="inline-flex items-center gap-1 bg-surface-container text-primary text-[10px] font-semibold px-2 py-0.5 rounded border border-primary/20">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          100% Grounded
                        </span>
                      </div>
                      <span className="text-[10px] text-outline font-mono">{msg.queryHash || '#MPPCB-VERIFIED'}</span>
                    </div>

                    {msg.executiveFinding && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-sm">summarize</span>
                          Executive Audit Finding
                        </h4>
                        <p className="text-xs text-on-surface leading-relaxed">{msg.executiveFinding}</p>
                      </div>
                    )}

                    {/* Table if present (Locally horizontally scrollable) */}
                    {msg.tableData && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between flex-wrap gap-1">
                          <h5 className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-xs">table_chart</span>
                            Verified Observational Citations
                          </h5>
                          <span className="text-[10px] text-outline">CPCB Class B Standard: BOD ≤ 3.0 mg/L</span>
                        </div>

                        <div className="w-full overflow-x-auto min-w-0 border border-outline-variant rounded-lg">
                          <table className="w-full text-left text-xs border-collapse min-w-[560px]">
                            <thead>
                              <tr className="bg-surface-container-low border-b border-outline-variant text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                                <th className="py-2 px-3">Ghat Station</th>
                                <th className="py-2 px-3">Basin / Ward</th>
                                <th className="py-2 px-3">Parameter & Peak</th>
                                <th className="py-2 px-3">Exceedance Delta</th>
                                <th className="py-2 px-3">Citation</th>
                                <th className="py-2 px-3 text-right">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/60">
                              {msg.tableData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-surface-container-low/50">
                                  <td className="py-2.5 px-3 font-semibold text-on-surface">{row.station}</td>
                                  <td className="py-2.5 px-3 text-on-surface-variant">{row.basin}</td>
                                  <td className="py-2.5 px-3">
                                    <span className="font-mono font-bold text-error">{row.parameterPeak}</span>
                                    <span className="text-[10px] text-outline block">{row.sampleDate}</span>
                                  </td>
                                  <td className="py-2.5 px-3">
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-error-container/70 text-on-error-container font-semibold text-[10px]">
                                      {row.exceedanceDelta}
                                    </span>
                                  </td>
                                  <td className="py-2.5 px-3 font-mono text-[10px] text-primary">{row.citation}</td>
                                  <td className="py-2.5 px-3 text-right">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-error/10 text-error font-semibold text-[10px] uppercase border border-error/20">
                                      {row.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Gap Notice */}
                    {msg.gapNotice && (
                      <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-2.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-outline text-base shrink-0 mt-0.5">info</span>
                        <p className="leading-relaxed">
                          <strong className="font-semibold text-on-surface">Sampling Gap Notice: </strong>
                          {msg.gapNotice}
                        </p>
                      </div>
                    )}

                    {/* Statutory Action Plan */}
                    {msg.statutoryAction && (
                      <div className="p-3 bg-surface-container-lowest border-2 border-primary/20 rounded-lg space-y-1 text-xs">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">near_me</span>
                          Suggested Statutory Action Plan
                        </span>
                        <p className="text-on-surface leading-relaxed">{msg.statutoryAction}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-outline-variant/60 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => showToast('Response text copied to clipboard.')}
                          className="px-2 py-1 text-[11px] rounded border border-outline-variant text-on-surface hover:bg-surface-container-low flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs text-outline">content_copy</span>
                          <span>Copy</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast('Appended to municipal evidence dossier.')}
                          className="px-2 py-1 text-[11px] rounded border border-outline-variant text-primary hover:bg-surface-container-low flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs text-primary">bookmark_add</span>
                          <span>Save to Dossier</span>
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => onInspectGhat('BPL-WTR-GH-04')}
                        className="px-3 py-1 rounded bg-secondary text-on-secondary hover:bg-secondary/90 text-xs font-semibold flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-xs">assignment_turned_in</span>
                        <span>Field Mission</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-primary font-semibold p-3 bg-surface-container-low rounded-lg">
                <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                <span>Evaluating against 428 grab records & CPCB Class B invariants...</span>
              </div>
            )}
          </div>

          {/* Sticky Chat Input Bar */}
          <div className="p-3 sm:p-4 bg-surface-container-lowest border-t border-outline-variant shrink-0 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-1">
              <div className="flex items-center gap-2 text-on-surface-variant flex-wrap">
                <span className="font-semibold text-on-surface flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-sm">shield</span>
                  428 Archival Records
                </span>
                <span className="text-outline hidden sm:inline">·</span>
                <span className="text-secondary font-medium">Deterministic Rule Model</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant flex-wrap">
                <span className="text-outline text-[11px]">Constraint:</span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveConstraint(activeConstraint === 'limits' ? null : 'limits');
                    showToast('Constraint attached: CPCB Class B Bathing Limits');
                  }}
                  className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${
                    activeConstraint === 'limits'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-container border-outline-variant text-primary hover:bg-surface-container-high'
                  }`}
                >
                  + Class B Limits
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveConstraint(activeConstraint === 'basin' ? null : 'basin');
                    showToast('Constraint attached: Upper Lake Basin');
                  }}
                  className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${
                    activeConstraint === 'basin'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-container border-outline-variant text-primary hover:bg-surface-container-high'
                  }`}
                >
                  + Upper Lake
                </button>
              </div>
            </div>

            <div className="relative rounded-xl border border-outline-variant bg-surface focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 shadow-xs transition-all">
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="w-full px-3 py-2 bg-transparent text-on-surface placeholder:text-outline text-xs focus:outline-none resize-none"
                placeholder='Ask GhatShield Copilot (e.g. "Draft notice on DO threshold breaches at Khatlapura...")...'
                rows={2}
                aria-label="Input prompt for Copilot"
              />
              <div className="flex items-center justify-between px-3 py-1.5 border-t border-outline-variant/50 bg-surface-container-lowest rounded-b-xl">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <button
                    type="button"
                    onClick={() => setInputPrompt((p) => p + ' Prempura Ghat')}
                    className="p-1 rounded hover:bg-surface-container"
                    title="Filter by Ghat"
                    aria-label="Add Prempura Ghat keyword"
                  >
                    <span className="material-symbols-outlined text-base">location_on</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputPrompt((p) => p + ' BOD analysis')}
                    className="p-1 rounded hover:bg-surface-container"
                    title="Filter by parameter"
                    aria-label="Add BOD analysis keyword"
                  >
                    <span className="material-symbols-outlined text-base">science</span>
                  </button>
                  <span className="text-[10px] text-outline ml-1 hidden sm:inline">Press Enter to prompt</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={!inputPrompt.trim() || isProcessing}
                  className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-tertiary text-on-primary text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-40"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: ACTIVE GROUNDING & EVIDENCE INSPECTOR PANEL */}
        <aside
          className={`${
            mobileTab === 'inspector' ? 'flex' : 'hidden'
          } lg:flex w-full lg:w-80 xl:w-96 2xl:w-[420px] h-full flex-col bg-surface-container-lowest shrink-0 overflow-hidden border-l border-outline-variant min-w-0`}
        >
          <div className="px-4 sm:px-5 py-3 border-b border-outline-variant bg-surface-container-lowest shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">policy</span>
                <h3 className="text-xs font-bold text-on-surface tracking-tight">Active Evidence Inspector</h3>
              </div>
              <span className="inline-flex items-center gap-1 bg-surface-container text-primary font-semibold text-[10px] px-2 py-0.5 rounded border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                Live Sync
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant mt-0.5">
              Source documents & deterministic validation rules.
            </p>
            <div className="mt-2.5 p-2 bg-secondary/10 border border-secondary/20 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Grounding Integrity</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-secondary">100% Provenance</span>
            </div>
          </div>

          {/* Scrollable Cards List */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-background/30 text-xs min-w-0">
            {/* Card 1: Primary Document Reference */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary-fixed text-primary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-sm">feed</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface leading-tight">Primary Document Reference</h4>
                    <span className="text-[10px] text-outline">Statutory MPPCB Lab Filing</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container text-primary text-[10px] font-bold uppercase border border-primary/20">
                  Verified
                </span>
              </div>

              <div className="space-y-1 text-on-surface">
                <div className="font-semibold text-xs text-on-surface">
                  MPPCB RO Bhopal — Post-Visarjan Monitoring Report 2024
                </div>
                <div className="grid grid-cols-2 gap-1 text-[10px] pt-1">
                  <div>
                    <span className="text-on-surface-variant block">Doc ID:</span>
                    <span className="font-mono font-semibold text-primary truncate block">MPPCB/2024/889</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block">Page:</span>
                    <span className="font-medium text-on-surface">Pg 14, Tbl 3.2</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block">Catchment:</span>
                    <span className="font-medium text-on-surface">Bhoj Basin</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block">Custody:</span>
                    <span className="font-medium text-on-surface">Dr. Verma</span>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-surface-container-low rounded border border-outline-variant font-mono text-[10px] text-on-surface-variant leading-relaxed break-all">
                LOC: PREMPURA_GHAT | DO: 4.2 mg/L | <span className="bg-error/10 text-error font-bold px-1 rounded">BOD: 6.4 mg/L</span>
              </div>
            </div>

            {/* Card 2: CPCB Regulatory Standard */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-secondary-container/60 text-secondary flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-sm">gavel</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface leading-tight">CPCB Standard</h4>
                    <span className="text-[10px] text-outline">Class B Criteria (Bathing)</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold border border-outline-variant">
                  Class B
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="p-2 rounded bg-surface-container-low border border-outline-variant flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-on-surface block text-[11px]">BOD (5-day 20°C)</span>
                    <span className="text-[10px] text-outline">Limit: ≤ 3.0 mg/L</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-error text-xs">6.4 mg/L</span>
                    <span className="text-[10px] text-error font-semibold block">Exceeded</span>
                  </div>
                </div>

                <div className="p-2 rounded bg-surface-container-low border border-outline-variant flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-on-surface block text-[11px]">Dissolved Oxygen</span>
                    <span className="text-[10px] text-outline">Limit: ≥ 5.0 mg/L</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-error text-xs">3.1 mg/L</span>
                    <span className="text-[10px] text-error font-semibold block">Hypoxic</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Missing-Data & Uncertainty Audit */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3 shadow-xs space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-surface-container text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm">hourglass_empty</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface leading-tight">Data Void Audit</h4>
                    <span className="text-[10px] text-outline">Temporal Uncertainty</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                  Rule 104-B
                </span>
              </div>
              <div className="p-2 bg-surface-container-low border border-outline-variant rounded text-[11px] space-y-1 leading-relaxed">
                <div className="flex items-center justify-between text-on-surface">
                  <span className="font-semibold">Data Void Window:</span>
                  <span className="font-mono text-primary font-bold text-[10px]">Feb 14 → May 30</span>
                </div>
                <p className="text-on-surface-variant text-[10px]">
                  Zero-filling is strictly prohibited under municipal audit guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-surface-container-lowest border-t border-outline-variant shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenExportModal('BPL-WTR-GH-04')}
              className="flex-1 py-1.5 px-2 rounded-lg border border-outline-variant text-on-surface text-xs font-medium hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-outline">download</span>
              <span>Extract (PDF)</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Excerpt packaged to working dossier.')}
              className="flex-1 py-1.5 px-2 rounded-lg bg-primary hover:bg-tertiary text-on-primary text-xs font-semibold transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">folder_zip</span>
              <span>Save Dossier</span>
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};
