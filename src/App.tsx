/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenId } from './types.ts';
import { AuthProvider } from './context/AuthContext.tsx';
import { PrototypeBanner } from './components/common/PrototypeBanner.tsx';
import { TopNavBar } from './components/common/TopNavBar.tsx';
import { SideNavBar } from './components/common/SideNavBar.tsx';
import { AuditDossierExportModal } from './components/modals/AuditDossierExportModal.tsx';
import { SystemDiagnosticsModal } from './components/modals/SystemDiagnosticsModal.tsx';
import { MunicipalHelpdeskModal } from './components/modals/MunicipalHelpdeskModal.tsx';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';

import { OverviewView } from './components/screens/OverviewView.tsx';
import { GhatIntelligenceView } from './components/screens/GhatIntelligenceView.tsx';
import { WaterQualityTrendsView } from './components/screens/WaterQualityTrendsView.tsx';
import { DataQualityView } from './components/screens/DataQualityView.tsx';
import { SamplingOptimiserView } from './components/screens/SamplingOptimiserView.tsx';
import { CopilotView } from './components/screens/CopilotView.tsx';
import { ReportsEvidenceView } from './components/screens/ReportsEvidenceView.tsx';
import { SettingsView } from './components/screens/SettingsView.tsx';
import { AdminDashboardView } from './components/screens/AdminDashboardView.tsx';

function MainAppShell() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('overview');
  const [targetGhatId, setTargetGhatId] = useState<string>('BPL-WTR-GH-04');
  const [globalSearch, setGlobalSearch] = useState<string>('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // Modals state
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportModalGhatId, setExportModalGhatId] = useState<string | undefined>(undefined);
  const [isDiagnosticsModalOpen, setIsDiagnosticsModalOpen] = useState(false);
  const [isHelpdeskModalOpen, setIsHelpdeskModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const handleInspectGhat = (ghatId: string) => {
    setTargetGhatId(ghatId);
    setCurrentScreen('ghat-intelligence');
  };

  const handleOpenExport = (ghatId?: string) => {
    setExportModalGhatId(ghatId);
    setIsExportModalOpen(true);
  };

  const handleOpenAuth = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="h-screen w-full max-w-full flex flex-col font-sans bg-background text-on-surface antialiased overflow-hidden">
      {/* 1. TOP PROTOTYPE ADVISORY BANNER */}
      <PrototypeBanner />

      {/* 2. SHELL CONTAINER (RESPONSIVE SIDEBAR + MAIN CANVAS) */}
      <div className="flex flex-1 overflow-hidden relative min-w-0">
        {/* SHARED COMPONENT: Left Sidebar (Desktop flex sibling + Mobile slide-out drawer) */}
        <SideNavBar
          currentScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen)}
          onOpenExportDossier={() => handleOpenExport('all')}
          onOpenDiagnostics={() => setIsDiagnosticsModalOpen(true)}
          onOpenHelpdesk={() => setIsHelpdeskModalOpen(true)}
          onOpenAuthModal={() => handleOpenAuth('signin')}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          isDesktopCollapsed={isDesktopCollapsed}
          onToggleDesktopCollapse={() => setIsDesktopCollapsed((prev) => !prev)}
        />

        {/* MAIN APP CANVAS (FLUID FLEX-1 MIN-W-0 CONTAINER) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background">
          {/* SHARED COMPONENT: Top App Bar */}
          <TopNavBar
            currentScreen={currentScreen}
            searchQuery={globalSearch}
            onSearchChange={setGlobalSearch}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenHelpdesk={() => setIsHelpdeskModalOpen(true)}
            onOpenAuthModal={() => handleOpenAuth('signin')}
            onNavigateToAdmin={() => setCurrentScreen('admin-dashboard')}
            onToggleSidebarMobile={() => setIsMobileSidebarOpen((prev) => !prev)}
          />

          {/* DYNAMIC SCREEN ROUTING */}
          <div className="flex-1 overflow-y-auto flex flex-col min-w-0">
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

            {currentScreen === 'admin-dashboard' && (
              <AdminDashboardView
                onOpenCreateUser={() => handleOpenAuth('signup')}
                onNavigateToSettings={() => setCurrentScreen('settings')}
              />
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

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppShell />
    </AuthProvider>
  );
}
