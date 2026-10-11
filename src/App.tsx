/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types.ts';
import { PrototypeBanner } from './components/common/PrototypeBanner.tsx';
import { TopNavBar } from './components/common/TopNavBar.tsx';
import { SideNavBar } from './components/common/SideNavBar.tsx';
import { AuditDossierExportModal } from './components/modals/AuditDossierExportModal.tsx';
import { SystemDiagnosticsModal } from './components/modals/SystemDiagnosticsModal.tsx';
import { MunicipalHelpdeskModal } from './components/modals/MunicipalHelpdeskModal.tsx';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer.tsx';

import { OverviewView } from './components/screens/OverviewView.tsx';
import { GhatIntelligenceView } from './components/screens/GhatIntelligenceView.tsx';
import { WaterQualityTrendsView } from './components/screens/WaterQualityTrendsView.tsx';
import { DataQualityView } from './components/screens/DataQualityView.tsx';
import { SamplingOptimiserView } from './components/screens/SamplingOptimiserView.tsx';
import { CopilotView } from './components/screens/CopilotView.tsx';
import { ReportsEvidenceView } from './components/screens/ReportsEvidenceView.tsx';
import { SettingsView } from './components/screens/SettingsView.tsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('overview');
  const [targetGhatId, setTargetGhatId] = useState<string>('BPL-WTR-GH-04');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalGhatId, setExportModalGhatId] = useState<string | undefined>(undefined);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState(false);
  const [isHelpdeskModalOpen, setIsHelpdeskModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleInspectGhat = (ghatId: string) => {
    setTargetGhatId(ghatId);
    setCurrentScreen('ghat-intelligence');
  };

  const handleOpenExport = (ghatId?: string) => {
    setExportModalGhatId(ghatId);
    setIsExportModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col font-sans bg-background text-on-surface antialiased overflow-hidden">
      {/* 1. TOP PROTOTYPE ADVISORY BANNER */}
      <PrototypeBanner />

      {/* 2. SHELL CONTAINER (SIDEBAR + MAIN CANVAS) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SHARED COMPONENT: Left Sidebar */}
        <SideNavBar
          currentScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen)}
          onOpenExportDossier={() => handleOpenExport('all')}
          onOpenDiagnostics={() => setIsDiagnosticsModalOpen(true)}
          onOpenHelpdesk={() => setIsHelpdeskModalOpen(true)}
        />

        {/* MAIN APP CANVAS (OFFSET FOR 256px SIDEBAR) */}
        <div className="flex-1 flex flex-col ml-64 overflow-hidden bg-background">
          {/* SHARED COMPONENT: Top App Bar */}
          <TopNavBar
            currentScreen={currentScreen}
            searchQuery={globalSearch}
            onSearchChange={setGlobalSearch}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenHelpdesk={() => setIsHelpdeskModalOpen(true)}
          />

          {/* DYNAMIC SCREEN ROUTING */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {currentScreen === 'overview' && (
              <OverviewView
                onInspectGhat={handleInspectGhat}
                onNavigateToTrends={() => setCurrentScreen('water-trends')}
                onNavigateToOptimiser={() => setCurrentScreen('sampling-optimiser')}
                onNavigateToReports={() => setCurrentScreen('reports-evidence')}
              />
            )}

            {currentScreen === 'ghat-intelligence' && (
              <GhatIntelligenceView
                initialGhatId={targetGhatId}
                onNavigateToOptimiser={() => setCurrentScreen('sampling-optimiser')}
                onOpenExportModal={handleOpenExport}
              />
            )}

            {currentScreen === 'water-trends' && (
              <WaterQualityTrendsView
                onOpenExportModal={handleOpenExport}
                onNavigateToEvidence={() => setCurrentScreen('data-quality')}
                onNavigateToOptimiser={() => setCurrentScreen('sampling-optimiser')}
              />
            )}

            {currentScreen === 'data-quality' && (
              <DataQualityView
                onOpenExportModal={handleOpenExport}
                onInspectGhat={handleInspectGhat}
              />
            )}

            {currentScreen === 'sampling-optimiser' && (
              <SamplingOptimiserView
                onOpenExportModal={handleOpenExport}
                onInspectGhat={handleInspectGhat}
              />
            )}

            {currentScreen === 'ai-copilot' && (
              <CopilotView
                onOpenExportModal={handleOpenExport}
                onInspectGhat={handleInspectGhat}
              />
            )}

            {currentScreen === 'reports-evidence' && (
              <ReportsEvidenceView onOpenExportModal={handleOpenExport} />
            )}

            {currentScreen === 'settings' && (
              <SettingsView onOpenDiagnostics={() => setIsDiagnosticsModalOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* 3. MODALS & FLYOUTS */}
      <AuditDossierExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedGhatId={exportModalGhatId}
      />

      <SystemDiagnosticsModal
        isOpen={isDiagnosticsModalOpen}
        onClose={() => setIsDiagnosticsModalOpen(false)}
      />

      <MunicipalHelpdeskModal
        isOpen={isHelpdeskModalOpen}
        onClose={() => setIsHelpdeskModalOpen(false)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectGhat={handleInspectGhat}
      />
    </div>
  );
}
