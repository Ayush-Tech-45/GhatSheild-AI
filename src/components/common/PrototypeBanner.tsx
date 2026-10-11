/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PrototypeBannerProps {
  version?: string;
}

export const PrototypeBanner: React.FC<PrototypeBannerProps> = ({ version = 'v2.4.1-ENV-MPPCB' }) => {
  return (
    <aside
      aria-label="Regulatory Notice"
      className="w-full bg-amber-500/10 border-b border-amber-600/20 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between text-on-surface z-40 shrink-0 gap-1.5"
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span
          className="material-symbols-outlined text-amber-700 text-sm shrink-0"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          warning
        </span>
        <p className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-on-surface uppercase leading-tight line-clamp-2 sm:line-clamp-none">
          <span className="font-bold text-amber-800">HISTORICAL PROTOTYPE (2023–2025) — NOT LIVE TELEMETRY:</span>{' '}
          CPCB Class B Bathing Protocol & GIS gazette reconciliation for Bhopal Municipal Corporation.
        </p>
      </div>
      <span className="text-[10px] sm:text-[11px] text-on-surface-variant font-mono bg-surface-container px-2 py-0.5 rounded border border-outline-variant shrink-0 ml-auto sm:ml-2">
        BUILD: {version}
      </span>
    </aside>
  );
};
