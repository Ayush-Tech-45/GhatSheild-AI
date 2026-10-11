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
      className="w-full bg-amber-500/10 border-b border-amber-600/20 px-4 py-1.5 flex items-center justify-between text-on-surface z-50 sticky top-0 backdrop-blur-sm shrink-0"
    >
      <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
        <span className="material-symbols-outlined text-amber-700 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          warning
        </span>
        <p className="text-[11px] font-semibold tracking-wide text-on-surface uppercase truncate md:whitespace-normal">
          <span className="font-bold text-amber-800">HISTORICAL PROTOTYPE (2023–2025) — NOT LIVE TELEMETRY:</span>{' '}
          System methodology, deterministic rule engine parameters, statutory standards (CPCB Class B), and GIS gazette entity reconciliation settings for Bhopal Municipal Corporation.
        </p>
      </div>
      <span className="text-[11px] text-on-surface-variant font-mono bg-surface-container px-2 py-0.5 rounded border border-outline-variant shrink-0 ml-3">
        BUILD: {version}
      </span>
    </aside>
  );
};
