/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenId } from '../../types.ts';

interface TopNavBarProps {
  currentScreen: ScreenId;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNotifications: () => void;
  onOpenHelpdesk: () => void;
  unreadCount?: number;
}

const SCREEN_TITLES: Record<ScreenId, string> = {
  'overview': 'Ghat Intelligence Overview',
  'ghat-intelligence': 'Ghat Intelligence & Site Investigation',
  'water-trends': 'Water Quality Trends & Temporal Analysis',
  'data-quality': 'Data Quality & Evidence Audit',
  'sampling-optimiser': 'Sampling Resource Optimiser & Priority Scheduler',
  'ai-copilot': 'AI Action Copilot & Decision Assistant',
  'reports-evidence': 'Reports & Evidence Dossier Workspace',
  'settings': 'Settings & Regulatory Methodology Transparency'
};

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentScreen,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenHelpdesk,
  unreadCount = 2
}) => {
  return (
    <header className="sticky top-0 w-full h-14 z-30 flex items-center justify-between px-6 bg-surface-container-lowest border-b border-outline-variant shrink-0 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      {/* Breadcrumb & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant shrink-0">
          <span className="font-medium text-outline">BMC Environmental Cell</span>
          <span className="material-symbols-outlined text-sm text-outline">chevron_right</span>
          <span className="text-primary font-semibold truncate max-w-[240px] sm:max-w-none">
            {SCREEN_TITLES[currentScreen]}
          </span>
        </div>

        <div className="relative w-64 lg:w-72 hidden sm:block">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-base">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-8 pl-8 pr-3 text-xs bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all"
            placeholder="Search ghats, grab samples, reports..."
          />
        </div>
      </div>

      {/* Trailing Controls & Officer Profile */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-semibold border border-outline-variant">
          <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
          2023-2025 Historical Baseline
        </span>

        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-600/30 text-xs font-semibold tracking-wide uppercase">
          Prototype Mode
        </span>

        <div className="h-4 w-px bg-outline-variant mx-1 hidden sm:block"></div>

        <button
          type="button"
          onClick={onOpenNotifications}
          className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative"
          title="Notifications & Dispatches"
        >
          <span className="material-symbols-outlined text-xl">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
          )}
        </button>

        <button
          type="button"
          onClick={onOpenHelpdesk}
          className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          title="Regulatory Guidance & Help"
        >
          <span className="material-symbols-outlined text-xl">help_outline</span>
        </button>

        {/* Officer Profile Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-outline-variant">
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs">
            RS
          </div>
          <div className="hidden lg:flex flex-col text-left leading-tight">
            <span className="text-xs font-semibold text-on-surface">Er. R. Sharma</span>
            <span className="text-[10px] text-outline">Senior Municipal Officer</span>
          </div>
        </div>
      </div>
    </header>
  );
};
