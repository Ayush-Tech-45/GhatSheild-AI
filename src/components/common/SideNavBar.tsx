/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ScreenId } from '../../types.ts';
import { useAuth } from '../../context/AuthContext.tsx';

interface SideNavBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenExportDossier: () => void;
  onOpenDiagnostics: () => void;
  onOpenHelpdesk: () => void;
  onOpenAuthModal?: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  isDesktopCollapsed?: boolean;
  onToggleDesktopCollapse?: () => void;
}

interface NavItem {
  id: ScreenId;
  label: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'ghat-intelligence', label: 'Ghat Intelligence', icon: 'water_voc' },
  { id: 'water-trends', label: 'Water Quality Trends', icon: 'monitoring' },
  { id: 'data-quality', label: 'Data Quality', icon: 'fact_check' },
  { id: 'sampling-optimiser', label: 'Sampling Optimiser', icon: 'tune' },
  { id: 'ai-copilot', label: 'AI Action Copilot', icon: 'psychology' },
  { id: 'reports-evidence', label: 'Reports & Evidence', icon: 'assignment' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'admin-dashboard', label: 'Admin Dashboard', icon: 'admin_panel_settings', badge: 'AUTH' }
];

export const SideNavBar: React.FC<SideNavBarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenExportDossier,
  onOpenDiagnostics,
  onOpenHelpdesk,
  onOpenAuthModal,
  isOpenMobile,
  onCloseMobile,
  isDesktopCollapsed = false,
  onToggleDesktopCollapse
}) => {
  const { currentUser, isAdmin } = useAuth();
  const [internalDesktopCollapsed, setInternalDesktopCollapsed] = useState(false);

  const collapsed = onToggleDesktopCollapse !== undefined ? isDesktopCollapsed : internalDesktopCollapsed;
  const toggleCollapse = onToggleDesktopCollapse || (() => setInternalDesktopCollapsed((prev) => !prev));

  // Escape key closes mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenMobile) {
        onCloseMobile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpenMobile, onCloseMobile]);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (isOpenMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpenMobile]);

  const handleNavClick = (screenId: ScreenId) => {
    onSelectScreen(screenId);
    onCloseMobile();
  };

  // Nav content for expanded sidebar
  const renderExpandedContent = (isMobile = false) => (
    <div className="flex flex-col h-full justify-between select-none bg-surface-container-lowest overflow-hidden">
      <div className="flex flex-col min-w-0">
        {/* Brand Header */}
        <div className="p-3.5 sm:p-4 border-b border-outline-variant flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
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

          {/* Desktop collapse toggle button */}
          {!isMobile && (
            <button
              type="button"
              onClick={toggleCollapse}
              aria-label="Collapse sidebar navigation"
              title="Collapse sidebar (Ctrl+B)"
              className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg text-outline hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
          )}

          {/* Mobile close button (>=44px touch target) */}
          {isMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close navigation menu"
              className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Catchment Unit Pill */}
        <div className="p-3 pb-1 shrink-0">
          <div className="bg-surface-container-low p-2.5 rounded-lg border border-outline-variant/60 flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-base shrink-0">location_city</span>
            <div className="text-xs leading-tight min-w-0">
              <p className="font-semibold text-on-surface text-[11px] truncate">Bhopal Municipal Corp.</p>
              <p className="text-slate-500 text-[10px] truncate">Bhoj Wetland Catchment</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (min 44px touch target) */}
        <nav aria-label="Main Navigation Menu" className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-320px)]">
          {NAV_ITEMS.map((item) => {
            const isActive = currentScreen === item.id;
            const isSpecialAdmin = item.id === 'admin-dashboard';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full min-h-[44px] flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  isActive
                    ? 'bg-surface-container text-primary font-bold border-l-4 border-primary'
                    : isSpecialAdmin
                    ? 'text-primary hover:bg-primary/5 hover:text-primary font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`material-symbols-outlined text-lg shrink-0 ${isSpecialAdmin && !isActive ? 'text-primary' : ''}`}
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shrink-0 ml-2 ${
                      isAdmin
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
                    }`}
                  >
                    {isAdmin ? 'ADMIN' : item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area & CTA */}
      <div className="p-3 border-t border-outline-variant space-y-2 bg-surface-container-lowest shrink-0">
        {/* User Status Card */}
        <div className="p-2 rounded-lg bg-surface-container-low border border-outline-variant/60 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
              {currentUser?.avatarInitials || '??'}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-on-surface truncate">
                {currentUser?.name || 'Guest Officer'}
              </p>
              <p className="text-[10px] text-outline capitalize truncate">
                {currentUser ? `${currentUser.role} · ${currentUser.badgeNumber}` : 'Unverified'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onOpenAuthModal) onOpenAuthModal();
              onCloseMobile();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-primary hover:bg-surface-container text-xs transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
            title="Login / Switch Officer Account"
            aria-label="Login or switch officer account"
          >
            <span className="material-symbols-outlined text-base">switch_account</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            onOpenExportDossier();
            onCloseMobile();
          }}
          className="w-full min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary border border-outline-variant transition-colors text-xs font-semibold shadow-xs focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Export Audit Dossier
        </button>

        <div className="space-y-0.5 pt-1">
          <button
            type="button"
            onClick={() => {
              onOpenDiagnostics();
              onCloseMobile();
            }}
            className="w-full min-h-[36px] flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-[11px] transition-colors text-left"
          >
            <span className="material-symbols-outlined text-sm text-outline">format_image_left</span>
            <span>System Diagnostics</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenHelpdesk();
              onCloseMobile();
            }}
            className="w-full min-h-[36px] flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-[11px] transition-colors text-left"
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
    </div>
  );

  // Nav content for collapsed rail (Desktop icon-only mode)
  const renderCollapsedContent = () => (
    <div className="flex flex-col h-full justify-between items-center py-3 bg-surface-container-lowest select-none">
      <div className="flex flex-col items-center gap-3">
        {/* Brand Logo & Expand Toggle */}
        <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            shield
          </span>
        </div>

        <button
          type="button"
          onClick={toggleCollapse}
          aria-label="Expand sidebar navigation"
          title="Expand sidebar navigation"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>

        <div className="w-8 h-px bg-outline-variant my-1" />

        {/* Compact Nav Icons */}
        <nav aria-label="Compact Main Navigation" className="flex flex-col items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectScreen(item.id)}
                title={item.label}
                aria-label={item.label}
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors relative ${
                  isActive
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.badge && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Collapsed Footer Actions */}
      <div className="flex flex-col items-center gap-2 pt-2 border-t border-outline-variant w-full">
        <button
          type="button"
          onClick={onOpenExportDossier}
          title="Export Audit Dossier"
          aria-label="Export Audit Dossier"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-primary hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-xl">download</span>
        </button>

        <button
          type="button"
          onClick={onOpenDiagnostics}
          title="System Diagnostics"
          aria-label="System Diagnostics"
          className="w-10 h-10 flex items-center justify-center rounded-lg text-outline hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-xl">format_image_left</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (onOpenAuthModal) onOpenAuthModal();
          }}
          title={currentUser ? currentUser.name : 'Sign In'}
          aria-label="User Account"
          className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20 hover:scale-105 transition-transform"
        >
          {currentUser?.avatarInitials || '??'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (>= 1024px) - Expandable or Collapsible */}
      <aside
        aria-label="Desktop Main Navigation"
        className={`hidden lg:flex shrink-0 flex-col h-full border-r border-outline-variant bg-surface-container-lowest z-30 shadow-xs transition-all duration-200 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        {collapsed ? renderCollapsedContent() : renderExpandedContent(false)}
      </aside>

      {/* 2. MOBILE & TABLET SLIDE-OUT DRAWER (< 1024px) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-visibility duration-300 ${
          isOpenMobile ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!isOpenMobile}
      >
        {/* Backdrop (Click to dismiss) */}
        <div
          onClick={onCloseMobile}
          className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${
            isOpenMobile ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Drawer Panel */}
        <div
          className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] h-full bg-surface-container-lowest shadow-2xl border-r border-outline-variant transition-transform duration-300 ease-in-out transform ${
            isOpenMobile ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {renderExpandedContent(true)}
        </div>
      </div>
    </>
  );
};
