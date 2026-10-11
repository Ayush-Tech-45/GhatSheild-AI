/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { UserRole, UserAccount } from '../../types.ts';

interface AdminDashboardViewProps {
  onOpenCreateUser: () => void;
  onNavigateToSettings: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onOpenCreateUser,
  onNavigateToSettings
}) => {
  const {
    currentUser,
    isAdmin,
    users,
    auditLogs,
    updateUserRole,
    toggleUserStatus,
    approveUser,
    deleteUser,
    switchUser,
    logSecurityEvent
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'users' | 'rbac' | 'logs' | 'overrides'>('users');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');
  const [searchUser, setSearchUser] = useState('');
  const [searchLogs, setSearchLogs] = useState('');
  const [logCategory, setLogCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    if (
      searchUser &&
      !u.name.toLowerCase().includes(searchUser.toLowerCase()) &&
      !u.email.toLowerCase().includes(searchUser.toLowerCase()) &&
      !u.department.toLowerCase().includes(searchUser.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const filteredLogs = auditLogs.filter((l) => {
    if (logCategory !== 'all' && l.category !== logCategory) return false;
    if (
      searchLogs &&
      !l.action.toLowerCase().includes(searchLogs.toLowerCase()) &&
      !l.userName.toLowerCase().includes(searchLogs.toLowerCase()) &&
      !l.userEmail.toLowerCase().includes(searchLogs.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const pendingCount = users.filter((u) => u.status === 'pending').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const officerCount = users.filter((u) => u.role === 'officer').length;
  const analystCount = users.filter((u) => u.role === 'analyst').length;

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 bg-background min-w-0">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-fade-in">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Access Warning if not Admin */}
      {!isAdmin && (
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-600/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-amber-900 gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="material-symbols-outlined text-amber-700 text-lg shrink-0">warning</span>
            <div>
              <span className="font-bold">ELEVATED PRIVILEGES REQUIRED:</span> Signed in as{' '}
              <span className="uppercase font-mono font-bold text-amber-950">
                {currentUser ? currentUser.role : 'Guest'}
              </span>
              . Viewing in read-only administrative audit mode.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              const admin = users.find((u) => u.role === 'admin');
              if (admin) {
                switchUser(admin.id);
                showToast(`Switched session to Administrator: ${admin.name}`);
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 text-xs font-semibold shadow-xs shrink-0"
          >
            Switch to Admin Session
          </button>
        </div>
      )}

      {/* Header Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-2 border-b border-outline-variant">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm shrink-0">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-on-surface tracking-tight">
                  Municipal Administration & Security Console
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold bg-primary-fixed text-on-primary-fixed border border-primary/20 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                  RBAC Active
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Officer identity provisioning, role permissions governance, and access logs for BMC.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={onOpenCreateUser}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary text-on-primary hover:bg-tertiary rounded-xl text-xs font-semibold transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            <span>Register Officer</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Security audit ledger exported (CSV format).')}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-surface-container-lowest border border-outline-variant hover:border-outline text-on-surface rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-sm text-outline">download</span>
            <span>Export Logs</span>
          </button>
        </div>
      </section>

      {/* 4 ADMIN KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 min-w-0">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline truncate">
              Registered Accounts
            </span>
            <span className="p-1.5 rounded-lg bg-surface-container-high text-primary shrink-0 ml-1">
              <span className="material-symbols-outlined text-base">manage_accounts</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-on-surface tabular-nums">{users.length} Users</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-outline mt-1 font-medium flex-wrap">
              <span className="text-primary font-semibold">{adminCount} Admins</span>
              <span>•</span>
              <span>{officerCount} Officers</span>
              <span>•</span>
              <span>{analystCount} Analysts</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline truncate">
              Pending Approvals
            </span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700 shrink-0 ml-1">
              <span className="material-symbols-outlined text-base">pending_actions</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-bold tabular-nums ${pendingCount > 0 ? 'text-amber-700' : 'text-on-surface'}`}>
                {pendingCount} Registration{pendingCount === 1 ? '' : 's'}
              </span>
            </div>
            <p className="text-[11px] text-outline mt-1 truncate">
              {pendingCount > 0 ? 'Awaiting credential release' : 'All accounts validated and active'}
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline truncate">
              Security Events Logged
            </span>
            <span className="p-1.5 rounded-lg bg-secondary-fixed/40 text-secondary shrink-0 ml-1">
              <span className="material-symbols-outlined text-base">history</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-secondary tabular-nums">{auditLogs.length} Events</span>
            </div>
            <p className="text-[11px] text-outline mt-1">
              Immutable Append-Only Ledger
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between min-w-0">
          <div className="flex items-center justify-between text-on-surface-variant mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-outline truncate">
              Active Session Privilege
            </span>
            <span className="p-1.5 rounded-lg bg-primary-fixed text-primary shrink-0 ml-1">
              <span className="material-symbols-outlined text-base">shield_person</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-on-surface truncate">
                {currentUser ? currentUser.name : 'Not Signed In'}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-primary text-white text-[9px] font-bold uppercase">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-[10px] text-outline mt-1 truncate">
              {currentUser?.designation} · {currentUser?.badgeNumber}
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Switcher (Scrollable horizontally) */}
      <section className="border-b border-outline-variant flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2 min-w-0">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto min-w-0 w-full sm:w-auto pb-1 sm:pb-0 flex-nowrap">
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`pb-2.5 font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'users'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">manage_accounts</span>
            <span>User Accounts</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-primary font-bold text-[10px]">
              {users.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rbac')}
            className={`pb-2.5 font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rbac'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">security</span>
            <span>RBAC Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`pb-2.5 font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'logs'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">receipt_long</span>
            <span>Access Logs</span>
            <span className="px-1.5 py-0.2 rounded-full bg-surface-container text-primary font-bold text-[10px]">
              {auditLogs.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('overrides')}
            className={`pb-2.5 font-semibold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'overrides'
                ? 'text-primary border-b-2 border-primary'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-base">lock_clock</span>
            <span>Statutory Locks</span>
          </button>
        </div>

        <div className="text-outline text-xs pb-1 sm:pb-2 font-mono shrink-0 hidden sm:block">
          SHA256:4b29-e881
        </div>
      </section>

      {/* TAB 1: USERS & ROLES TABLE */}
      {activeTab === 'users' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden min-w-0">
          <div className="p-3 sm:p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-low/40">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Registered Municipal & Field Users</h3>
              <p className="text-[11px] text-outline mt-0.5">
                Manage roles, authorize pending account registrations, and toggle access permissions.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="relative">
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Search user, email..."
                  className="h-8 pl-7 pr-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
                  aria-label="Search users"
                />
                <span className="material-symbols-outlined absolute left-2 top-2 text-xs text-outline pointer-events-none">search</span>
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
                aria-label="Filter users by role"
              >
                <option value="all">All Roles</option>
                <option value="admin">Administrator</option>
                <option value="officer">Municipal Officer</option>
                <option value="analyst">Field Analyst</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
                aria-label="Filter users by status"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="w-full overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse text-xs min-w-[700px]">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-outline-variant font-semibold">
                  <th className="py-2.5 px-4">Officer / User Name</th>
                  <th className="py-2.5 px-3">Email Address</th>
                  <th className="py-2.5 px-3">Department & Designation</th>
                  <th className="py-2.5 px-3">Assigned Role</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3">Last Active</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser?.id === u.id;
                  return (
                    <tr
                      key={u.id}
                      className={`hover:bg-surface-container-low transition-colors ${
                        isCurrent ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant flex items-center justify-center font-bold text-primary text-xs shrink-0">
                            {u.avatarInitials}
                          </div>
                          <div>
                            <div className="font-semibold text-on-surface flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded bg-primary text-white text-[9px] font-bold">
                                  YOU
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-outline font-mono">{u.badgeNumber}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3 font-mono text-[11px] text-on-surface">
                        {u.email}
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-medium text-on-surface text-xs">{u.department}</div>
                        <div className="text-[10px] text-outline">{u.designation}</div>
                      </td>

                      <td className="py-3 px-3">
                        <select
                          value={u.role}
                          onChange={(e) => {
                            updateUserRole(u.id, e.target.value as UserRole);
                            showToast(`Updated role for ${u.name} to ${e.target.value.toUpperCase()}`);
                          }}
                          className={`h-7 px-2 rounded text-[11px] font-bold border focus:outline-none ${
                            u.role === 'admin'
                              ? 'bg-primary/10 border-primary text-primary'
                              : u.role === 'officer'
                              ? 'bg-secondary/10 border-secondary text-secondary'
                              : 'bg-surface-container border-outline-variant text-on-surface'
                          }`}
                          aria-label={`Change role for ${u.name}`}
                        >
                          <option value="admin">Administrator</option>
                          <option value="officer">Municipal Officer</option>
                          <option value="analyst">Field Analyst</option>
                        </select>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.status === 'active'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                              : u.status === 'pending'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-error-container text-on-error-container border border-error/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.status === 'active'
                                ? 'bg-emerald-600'
                                : u.status === 'pending'
                                ? 'bg-amber-600'
                                : 'bg-error'
                            }`}
                          ></span>
                          {u.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-[11px] text-outline font-mono">
                        {u.lastLogin}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {u.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => {
                                approveUser(u.id);
                                showToast(`Approved account registration for ${u.name}`);
                              }}
                              className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold"
                            >
                              Approve
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              switchUser(u.id);
                              showToast(`Switched active user session to ${u.name}`);
                            }}
                            className="px-2 py-1 rounded border border-outline-variant bg-surface hover:bg-surface-container text-on-surface text-[11px] font-medium"
                            title="Test session with this user"
                          >
                            Switch
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              toggleUserStatus(u.id);
                              showToast(`Toggled status for ${u.name}`);
                            }}
                            className="p-1 rounded text-outline hover:text-amber-700"
                            title={u.status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
                            aria-label={u.status === 'active' ? 'Suspend account' : 'Reactivate account'}
                          >
                            <span className="material-symbols-outlined text-base">
                              {u.status === 'active' ? 'block' : 'check_circle'}
                            </span>
                          </button>

                          {!isCurrent && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove ${u.name} from municipal credential register?`)) {
                                  deleteUser(u.id);
                                  showToast(`Removed user ${u.name}`);
                                }
                              }}
                              className="p-1 rounded text-outline hover:text-error"
                              title="Delete Account"
                              aria-label={`Delete account for ${u.name}`}
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: RBAC MATRIX */}
      {activeTab === 'rbac' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden min-w-0">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low/40">
            <h3 className="text-sm font-bold text-on-surface">Statutory RBAC Capability Matrix</h3>
            <p className="text-[11px] text-outline mt-0.5">
              Permissions enforced by GhatShield Engine across Administrator, Municipal Officer, and Field Analyst accounts.
            </p>
          </div>

          <div className="w-full overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse text-xs min-w-[650px]">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-outline-variant font-semibold">
                  <th className="py-2.5 px-4 w-72">System Feature / Capability</th>
                  <th className="py-2.5 px-3 text-center">Administrator</th>
                  <th className="py-2.5 px-3 text-center">Municipal Officer</th>
                  <th className="py-2.5 px-3 text-center">Field Analyst</th>
                  <th className="py-2.5 px-4">Statutory Governance Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60">
                {[
                  {
                    feature: 'View Ghat Intelligence & Historical Overview',
                    admin: true,
                    officer: true,
                    analyst: true,
                    basis: 'Open Public Records Act & Civic Disclosure'
                  },
                  {
                    feature: 'Export Certified Audit Dossiers (PDF / CSV)',
                    admin: true,
                    officer: true,
                    analyst: false,
                    basis: 'CPCB Protocol Rule 12-A (Officer Authority)'
                  },
                  {
                    feature: 'Modify CPCB Statutory Reference Thresholds',
                    admin: true,
                    officer: false,
                    analyst: false,
                    basis: 'State Board Gazette Notification Authority'
                  },
                  {
                    feature: 'Configure Resource Optimizer Scheduling Weights',
                    admin: true,
                    officer: true,
                    analyst: false,
                    basis: 'Municipal Operational Dispatch Protocol'
                  },
                  {
                    feature: 'Submit Field Sample Telemetry & OCR Logs',
                    admin: true,
                    officer: true,
                    analyst: true,
                    basis: 'Laboratory Chain of Custody Standard'
                  },
                  {
                    feature: 'Manage User Accounts, Roles & Revocations',
                    admin: true,
                    officer: false,
                    analyst: false,
                    basis: 'Municipal Cyber Security Policy 2024'
                  },
                  {
                    feature: 'Execute Environmental Diagnostics Self-Test',
                    admin: true,
                    officer: true,
                    analyst: false,
                    basis: 'Engine Health Monitoring Guideline'
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/50">
                    <td className="py-3 px-4 font-semibold text-on-surface">{row.feature}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        ✓
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      {row.officer ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-outline text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {row.analyst ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                          ✓
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-outline text-xs">
                          —
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-outline text-[11px]">{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xs overflow-hidden min-w-0">
          <div className="p-3 sm:p-4 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-3 bg-surface-container-low/40">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Cryptographic Audit & Access Ledger</h3>
              <p className="text-[11px] text-outline mt-0.5">
                Every login, sign-up, privilege escalation, and threshold modification is permanently logged.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs">
              <input
                type="text"
                value={searchLogs}
                onChange={(e) => setSearchLogs(e.target.value)}
                placeholder="Search audit trail..."
                className="h-8 px-3 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
                aria-label="Search audit trail"
              />

              <select
                value={logCategory}
                onChange={(e) => setLogCategory(e.target.value)}
                className="h-8 px-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg text-xs text-on-surface focus:outline-none"
                aria-label="Filter audit logs by category"
              >
                <option value="all">All Categories</option>
                <option value="auth">Authentication</option>
                <option value="rbac">RBAC Modification</option>
                <option value="threshold">Threshold Override</option>
                <option value="security">Security Events</option>
              </select>
            </div>
          </div>

          <div className="w-full overflow-x-auto min-w-0">
            <table className="w-full text-left border-collapse text-xs min-w-[680px]">
              <thead>
                <tr className="bg-surface-container text-on-surface-variant text-[11px] uppercase tracking-wider border-b border-outline-variant font-semibold">
                  <th className="py-2.5 px-4">Timestamp (IST)</th>
                  <th className="py-2.5 px-3">Officer / User</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Action Description</th>
                  <th className="py-2.5 px-3">IP Address</th>
                  <th className="py-2.5 px-4 text-center">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/60 font-mono text-[11px]">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-2.5 px-4 text-outline whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-sans font-semibold text-on-surface">
                      <div>{log.userName}</div>
                      <span className="text-[10px] text-outline font-mono">{log.userEmail}</span>
                    </td>
                    <td className="py-2.5 px-3 font-sans">
                      <span className="px-1.5 py-0.5 rounded bg-surface-container text-primary font-semibold text-[10px] uppercase">
                        {log.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-sans text-on-surface max-w-xs truncate" title={log.action}>
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 text-outline">{log.ipAddress}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span
                        className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold uppercase font-sans ${
                          log.status === 'success'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : log.status === 'warning'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-error-container text-on-error-container'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 4: STATUTORY OVERRIDES & LOCKS */}
      {activeTab === 'overrides' && (
        <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 sm:p-5 shadow-xs space-y-4 min-w-0">
          <div className="flex items-center justify-between border-b border-outline-variant pb-3 flex-wrap gap-2">
            <div>
              <h3 className="text-sm font-bold text-on-surface">Protocol Immutable Locks</h3>
              <p className="text-[11px] text-outline">
                Prevents accidental modification of CPCB standards and non-interpolation rules.
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
              DUAL KEY REQUIRED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">CPCB Gazette Schedule Lock</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">LOCKED</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Enforces Class B bathing water thresholds across all 14 sites. Disabling requires formal NGT clearance notice.
              </p>
              <button
                type="button"
                onClick={onNavigateToSettings}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-primary font-semibold text-xs hover:bg-surface-container-high transition-colors"
              >
                Inspect Statutory Thresholds
              </button>
            </div>

            <div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">Rule 104-B Non-Interpolation Lock</span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">ENFORCED</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Zero-substitution prohibition mandate is locked against accidental machine learning imputation.
              </p>
              <button
                type="button"
                onClick={() => showToast('Rule 104-B immutable lock verified.')}
                className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-primary font-semibold text-xs hover:bg-surface-container-high transition-colors"
              >
                Verify Cryptographic Hash
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
