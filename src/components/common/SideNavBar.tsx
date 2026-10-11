/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenId } from '../../types.ts';

interface SideNavBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenExportDossier: () => void;
  onOpenDiagnostics: () => void;
  onOpenHelpdesk: () => void;
}

interface NavItem {
  id: ScreenId;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'ghat-intelligence', label: 'Ghat Intelligence', icon: 'water_voc' },
  { id: 'water-trends', label: 'Water Quality Trends', icon: 'monitoring' },
  { id: 'data-quality', label: 'Data Quality', icon: 'fact_check' },
  { id: 'sampling-optimiser', label: 'Sampling Optimiser', icon: 'tune' },
  { id: 'ai-copilot', label: 'AI Action Copilot', icon: 'psychology' },
  { id: 'reports-evidence', label: 'Reports & Evidence', icon: 'assignment' },
  { id: 'settings', label: 'Settings', icon: 'settings' }
];

export const SideNavBar: React.FC<SideNavBarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenExportDossier,
  onOpenDiagnostics,
  onOpenHelpdesk
}) => {
  return (
    <aside
      aria-label="Main Navigation"
      className="fixed top-[29px] left-0 h-[calc(100vh-29px)] w-64 flex flex-col z-40 bg-surface-container-lowest border-r border-outline-variant shrink-0 justify-between select-none shadow-sm"
    >
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-4 border-b border-outline-variant flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-primary tracking-tight truncate leading-tight">
              GhatShield AI
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">
              BMC Water Resource Intelligence
            </span>
          </div>
        </div>

        {/* Catchment Unit Pill */}
        <div className="p-3 pb-1">
          <div className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/60 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-base">location_city</span>
            <div className="text-xs leading-tight">
              <p className="font-semibold text-on-surface text-[11px]">Bhopal Municipal Corp.</p>
              <p className="text-slate-500 text-[10px]">Bhoj Wetland Catchment</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-310px)]">
          {NAV_ITEMS.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectScreen(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-xs transition-colors ${
                  isActive
                    ? 'bg-surface-container text-primary font-semibold border-l-4 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <span
                  className="material-symbols-outlined text-lg shrink-0"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area & CTA */}
      <div className="p-3 border-t border-outline-variant space-y-2 bg-surface-container-lowest">
        <button
          type="button"
          onClick={onOpenExportDossier}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary border border-outline-variant transition-colors text-xs font-semibold shadow-xs"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Export Audit Dossier
        </button>

        <div className="space-y-0.5 pt-1">
          <button
            type="button"
            onClick={onOpenDiagnostics}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-[11px] transition-colors text-left"
          >
            <span className="material-symbols-outlined text-sm text-outline">format_image_left</span>
            <span>System Diagnostics</span>
          </button>
          <button
            type="button"
            onClick={onOpenHelpdesk}
            className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-[11px] transition-colors text-left"
          >
            <span className="material-symbols-outlined text-sm text-outline">contact_support</span>
            <span>Municipal Helpdesk</span>
          </button>
        </div>

        <div className="pt-2 border-t border-outline-variant/60 flex items-center justify-between text-[10px] text-outline px-1">
          <span>Engine: MPPCB-HYD v3.1</span>
          <span className="font-bold text-secondary">STABLE</span>
        </div>
      </div>
    </aside>
  );
};
