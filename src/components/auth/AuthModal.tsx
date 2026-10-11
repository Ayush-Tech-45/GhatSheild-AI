/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { UserRole } from '../../types.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'signin'
}) => {
  const { login, signup, users } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState('admin@bmc.gov.in');
  const [signInPassword, setSignInPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpDept, setSignUpDept] = useState('BMC Environmental Cell');
  const [signUpDesignation, setSignUpDesignation] = useState('');
  const [signUpRole, setSignUpRole] = useState<UserRole>('officer');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Synchronize mode when defaultMode changes
  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = login(signInEmail, signInPassword);
    if (result.success) {
      setSuccessMessage('Authentication successful. Redirecting to workspace...');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 700);
    } else {
      setErrorMessage(result.error || 'Invalid credentials.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signUpName || !signUpEmail || !signUpPassword) {
      setErrorMessage('Please fill in all mandatory municipal credential fields.');
      return;
    }

    const result = signup({
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
      role: signUpRole,
      department: signUpDept,
      designation: signUpDesignation || 'Municipal Technical Officer'
    });

    if (result.success) {
      setSuccessMessage('Officer profile registered! Credentials active in local register.');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 900);
    } else {
      setErrorMessage(result.error || 'Registration failed.');
    }
  };

  const setDemoAccount = (email: string) => {
    setSignInEmail(email);
    setSignInPassword('password123');
    setErrorMessage(null);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-2xl w-full max-w-md max-h-[92vh] flex flex-col overflow-hidden animate-fade-in my-auto">
        {/* Header Branding */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-primary to-primary-container text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield
              </span>
            </div>
            <div className="min-w-0">
              <h3 id="auth-modal-title" className="text-base font-bold tracking-tight leading-none truncate">
                GhatShield AI
              </h3>
              <p className="text-[11px] text-white/80 mt-1 truncate">
                Bhopal Municipal Corporation Security Portal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close authentication modal"
            className="w-11 h-11 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex border-b border-outline-variant bg-surface-container-low text-xs shrink-0">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 min-h-[44px] py-2.5 font-semibold text-center transition-all ${
              mode === 'signin'
                ? 'bg-surface-container-lowest text-primary border-b-2 border-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In with Credentials
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`flex-1 min-h-[44px] py-2.5 font-semibold text-center transition-all ${
              mode === 'signup'
                ? 'bg-surface-container-lowest text-primary border-b-2 border-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign Up New Account
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 text-xs scrollbar-thin">
          {/* Notifications */}
          {errorMessage && (
            <div className="mb-3.5 p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-start gap-2 border border-error/30 animate-fade-in">
              <span className="material-symbols-outlined text-sm mt-0.5 shrink-0">error</span>
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-3.5 p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-start gap-2 border border-emerald-300 animate-fade-in">
              <span className="material-symbols-outlined text-sm mt-0.5 shrink-0">check_circle</span>
              <span className="leading-snug">{successMessage}</span>
            </div>
          )}

          {mode === 'signin' ? (
            /* SIGN IN FORM */
            <form onSubmit={handleSignIn} className="space-y-3.5">
              <div>
                <label className="font-semibold text-on-surface block mb-1">
                  Official Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-base pointer-events-none">
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                    placeholder="officer@bmc.gov.in"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-base pointer-events-none">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-10 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1"
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined text-base">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-outline pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-primary">verified_user</span>
                  CPCB SHA-256 Auth Shield
                </span>
                <span className="text-primary font-medium">Default: password123</span>
              </div>

              <button
                type="submit"
                className="w-full min-h-[44px] rounded-xl bg-primary hover:bg-tertiary text-on-primary font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Authenticate Officer Session</span>
              </button>

              {/* Quick Persona Logins */}
              <div className="pt-2 border-t border-outline-variant/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
                    Quick-Login Seed Personas
                  </span>
                  <span className="text-[10px] text-secondary font-mono">1-CLICK LOGIN</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {users.slice(0, 3).map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setDemoAccount(u.email)}
                      className={`min-h-[40px] p-2 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                        signInEmail === u.email
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-outline-variant/70 hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0">
                          {u.avatarInitials}
                        </div>
                        <div className="truncate min-w-0">
                          <span className="font-semibold text-on-surface block truncate text-[11px]">{u.name}</span>
                          <span className="text-[10px] text-outline font-mono truncate block">{u.email}</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant shrink-0 ml-2">
                        {u.role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUp} className="space-y-3">
              <div>
                <label className="font-semibold text-on-surface block mb-1">
                  Full Officer / Staff Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                  placeholder="e.g. Er. Priya Verma"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="font-semibold text-on-surface block mb-1">
                    Official Email <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                    placeholder="priya.verma@bmc.gov.in"
                  />
                </div>
                <div>
                  <label className="font-semibold text-on-surface block mb-1">
                    Password <span className="text-error">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                    placeholder="Min 6 characters"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1">Department / Cell</label>
                <select
                  value={signUpDept}
                  onChange={(e) => setSignUpDept(e.target.value)}
                  className="w-full h-9 px-2.5 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:outline-none focus:border-primary"
                >
                  <option value="BMC Environmental Cell">BMC Environmental Cell</option>
                  <option value="Water Works Department">Water Works Department</option>
                  <option value="Lake Conservation Directorate">Lake Conservation Directorate</option>
                  <option value="Central Pollution Control Lab">Central Pollution Control Lab</option>
                  <option value="Municipal Engineering Division">Municipal Engineering Division</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1">Designation</label>
                <input
                  type="text"
                  value={signUpDesignation}
                  onChange={(e) => setSignUpDesignation(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-xs focus:bg-surface-container-lowest focus:border-primary focus:outline-none"
                  placeholder="e.g. Assistant Environmental Chemist"
                />
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1">Requested Role & Access Level</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSignUpRole('officer')}
                    className={`min-h-[44px] p-2 rounded-lg border text-left transition-all ${
                      signUpRole === 'officer'
                        ? 'border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <div className="font-bold text-xs">Officer</div>
                    <div className="text-[10px] text-outline">Full dossier export & dispatch</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignUpRole('analyst')}
                    className={`min-h-[44px] p-2 rounded-lg border text-left transition-all ${
                      signUpRole === 'analyst'
                        ? 'border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <div className="font-bold text-xs">Analyst</div>
                    <div className="text-[10px] text-outline">Field telemetry & laboratory logs</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSignUpRole('admin')}
                    className={`min-h-[44px] p-2 rounded-lg border text-left transition-all ${
                      signUpRole === 'admin'
                        ? 'border-primary bg-primary/10 text-primary font-bold ring-1 ring-primary'
                        : 'border-outline-variant bg-surface hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    <div className="font-bold text-xs">Admin</div>
                    <div className="text-[10px] text-outline">Full municipal RBAC control</div>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[44px] rounded-xl bg-secondary hover:bg-secondary/90 text-on-secondary font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-base">how_to_reg</span>
                  <span>Complete Registration & Issue Badge</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-surface-container-low border-t border-outline-variant text-[11px] text-outline flex items-center justify-between shrink-0">
          <span>GhatShield RBAC Engine v2.4</span>
          <span>Bhopal Municipal Corporation</span>
        </div>
      </div>
    </div>
  );
};
