/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ScreenId } from '../../types.ts';
import { useAuth } from '../../context/AuthContext.tsx';

interface TopNavBarProps {
  currentScreen: ScreenId;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenNotifications: () => void;
  onOpenHelpdesk: () => void;
  onOpenAuthModal: () => void;
  onNavigateToAdmin: () => void;
  onToggleSidebarMobile: () => void;
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
  'settings': 'Settings & Regulatory Methodology Transparency',
  'admin-dashboard': 'Municipal Administration & Security Console'
};

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentScreen,
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenHelpdesk,
  onOpenAuthModal,
  onNavigateToAdmin,
  onToggleSidebarMobile,
  unreadCount = 2
}) => {
  const { currentUser, isAdmin, logout, users, switchUser } = useAuth();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  // Close profile dropdown on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
        setIsMobileSearchOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isProfileMenuOpen]);

  // Focus mobile search input when expanded
  useEffect(() => {
    if (isMobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

  return (
    <>
      <header className="sticky top-0 w-full h-14 z-30 flex items-center justify-between px-2 sm:px-4 md:px-6 bg-surface-container-lowest border-b border-outline-variant shrink-0 shadow-[0_1px_2px_rgba(15,23,42,0.03)] gap-1.5 sm:gap-3 min-w-0">
        {/* Leading: Hamburger Toggle + Breadcrumb */}
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
          {/* Mobile/Tablet Hamburger Menu Button (>=44px touch target) */}
          <button
            type="button"
            onClick={onToggleSidebarMobile}
            aria-label="Open navigation sidebar"
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-on-surface-variant shrink-0 min-w-0">
            <span className="font-medium text-outline hidden md:inline shrink-0">BMC Environmental Cell</span>
            <span className="material-symbols-outlined text-sm text-outline hidden md:inline shrink-0">chevron_right</span>
            <span className="text-primary font-semibold truncate max-w-[120px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-none">
              {SCREEN_TITLES[currentScreen]}
            </span>
          </div>

          {/* Global Search Bar (Desktop & Tablet) */}
          <div className="relative w-36 sm:w-48 md:w-64 hidden sm:block min-w-0">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-base pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:border-primary focus:outline-none transition-all"
              placeholder="Search ghats, records..."
              aria-label="Search ghats and records"
            />
          </div>
        </div>

        {/* Trailing Controls & Officer Profile */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="sm:hidden w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle search input"
            title="Search"
          >
            <span className="material-symbols-outlined text-xl">
              {isMobileSearchOpen ? 'close' : 'search'}
            </span>
          </button>

          {/* Baseline pill (Desktop only) */}
          <span className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-primary text-xs font-semibold border border-outline-variant">
            <span className="material-symbols-outlined text-sm text-primary">calendar_month</span>
            2023-2025 Historical Baseline
          </span>

          {/* Role Pill */}
          {currentUser?.role === 'admin' ? (
            <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold tracking-wide uppercase flex items-center gap-1 shadow-xs shrink-0">
              <span className="material-symbols-outlined text-xs">verified_user</span>
              <span className="hidden sm:inline">ADMIN</span>
            </span>
          ) : (
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-600/30 text-[10px] sm:text-xs font-semibold tracking-wide uppercase shrink-0">
              {currentUser?.role ? currentUser.role.toUpperCase() : 'USER'}
            </span>
          )}

          <div className="h-4 w-px bg-outline-variant mx-0.5 hidden sm:block"></div>

          {/* Notifications Button (>=44px touch target) */}
          <button
            type="button"
            onClick={onOpenNotifications}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
            title="Notifications & Dispatches"
            aria-label={`View notifications and dispatches (${unreadCount} unread)`}
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-error ring-2 ring-surface-container-lowest"></span>
            )}
          </button>

          {/* Helpdesk Button (>=44px touch target) */}
          <button
            type="button"
            onClick={onOpenHelpdesk}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-primary"
            title="Regulatory Guidance & Help"
            aria-label="Open municipal helpdesk"
          >
            <span className="material-symbols-outlined text-xl">help_outline</span>
          </button>

          {/* Officer Profile Dropdown Area (Bounded inside viewport - NO CLIPPING) */}
          <div className="relative pl-1 sm:pl-2 border-l border-outline-variant" ref={profileMenuRef}>
            <button
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="menu"
              aria-label="Open user profile menu"
              className="min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-1.5 py-1 rounded-lg hover:bg-surface-container-low transition-colors text-left focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-xs shrink-0 ring-1 ring-primary/30">
                {currentUser ? currentUser.avatarInitials : '??'}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight max-w-[120px] xl:max-w-[140px]">
                <span className="text-xs font-semibold text-on-surface truncate">
                  {currentUser ? currentUser.name : 'Sign In'}
                </span>
                <span className="text-[10px] text-outline capitalize truncate">
                  {currentUser ? `${currentUser.role} · ${currentUser.department.slice(0, 14)}...` : 'Municipal Credential'}
                </span>
              </div>
              <span className="material-symbols-outlined text-xs text-outline">arrow_drop_down</span>
            </button>

            {/* Profile Flyout Dropdown (Adaptive Responsive Viewport Alignment) */}
            {isProfileMenuOpen && (
              <>
                {/* Mobile Backdrop Overlay to guarantee click outside dismissal */}
                <div
                  className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs sm:hidden"
                  onClick={() => setIsProfileMenuOpen(false)}
                  aria-hidden="true"
                />

                <div
                  role="menu"
                  aria-label="Officer Profile and Credentials Menu"
                  className="fixed inset-x-2 top-14 max-w-[calc(100vw-1rem)] mx-auto sm:inset-auto sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-80 sm:max-w-xs bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl z-50 p-2 text-xs divide-y divide-outline-variant/60 animate-fade-in"
                  style={{
                    transformOrigin: 'top right'
                  }}
                >
                  <div className="p-2.5 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-bold text-on-surface text-sm truncate">
                        {currentUser?.name || 'Unauthenticated User'}
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-primary text-white text-[9px] font-bold uppercase shrink-0">
                        {currentUser?.role || 'Guest'}
                      </span>
                    </div>
                    <div className="font-mono text-[11px] text-primary truncate mt-0.5">
                      {currentUser?.email || 'guest@bmc.gov.in'}
                    </div>
                    <div className="text-[10px] text-outline mt-1 leading-snug">
                      {currentUser?.designation} · {currentUser?.department}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[10px] text-outline font-mono bg-surface-container-low px-2 py-1 rounded border border-outline-variant/50">
                      <span>Badge: {currentUser?.badgeNumber || 'N/A'}</span>
                      <span className="text-secondary font-bold">BMC VERIFIED</span>
                    </div>
                  </div>

                  {/* Quick Switch Test Accounts */}
                  <div className="py-2 space-y-1">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] uppercase font-bold text-outline">
                        Quick Switch Persona
                      </span>
                      <span className="text-[9px] text-outline font-mono">DEV MODE</span>
                    </div>
                    {users.slice(0, 3).map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => {
                          switchUser(u.id);
                          setIsProfileMenuOpen(false);
                        }}
                        className={`w-full min-h-[36px] flex items-center justify-between px-2 py-1.5 rounded-lg text-left text-xs transition-colors ${
                          currentUser?.id === u.id ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-surface-container'
                        }`}
                      >
                        <span className="truncate">{u.name}</span>
                        <span className="text-[9px] font-mono uppercase text-outline shrink-0 ml-2">{u.role}</span>
                      </button>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 space-y-1">
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          onNavigateToAdmin();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full min-h-[40px] flex items-center gap-2 px-2.5 py-2 rounded-lg text-primary font-semibold hover:bg-surface-container text-left transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                        <span>Admin Dashboard Console</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        onOpenAuthModal();
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full min-h-[40px] flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-surface-container text-on-surface text-left transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">switch_account</span>
                      <span>Sign In Another User / Sign Up</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                        onOpenAuthModal();
                      }}
                      className="w-full min-h-[40px] flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-error-container/40 text-error text-left transition-colors font-semibold"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Expandable Mobile Search Bar (< 640px) */}
      {isMobileSearchOpen && (
        <div className="sm:hidden px-3 py-2 bg-surface-container-low border-b border-outline-variant animate-fade-in flex items-center gap-2 z-20">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-base pointer-events-none">
              search
            </span>
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-9 pl-8 pr-3 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:border-primary focus:outline-none"
              placeholder="Search ghats, parameters, records..."
              aria-label="Mobile search"
            />
          </div>
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(false)}
            className="h-9 px-3 text-xs font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};
