/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, SecurityAuditLog, UserRole } from '../types.ts';

const SEED_USERS: UserAccount[] = [
  {
    id: 'usr-admin-01',
    name: 'Er. R. Sharma',
    email: 'admin@bmc.gov.in',
    password: 'password123',
    role: 'admin',
    department: 'BMC Environmental Cell',
    designation: 'Senior Municipal Officer & Chief Hydrologist',
    badgeNumber: 'BMC-ENV-09412',
    status: 'active',
    createdAt: '2023-01-10',
    lastLogin: '2026-10-11 04:05 IST',
    avatarInitials: 'RS'
  },
  {
    id: 'usr-off-02',
    name: 'Dr. S. K. Verma',
    email: 'verma@mppcb.gov.in',
    password: 'password123',
    role: 'officer',
    department: 'MPPCB Regional Laboratory Bhopal',
    designation: 'Senior Analyst & Lab Director',
    badgeNumber: 'MPPCB-LAB-442',
    status: 'active',
    createdAt: '2023-04-18',
    lastLogin: '2026-10-10 16:30 IST',
    avatarInitials: 'SV'
  },
  {
    id: 'usr-anl-03',
    name: 'Priya Patel',
    email: 'priya.patel@bmc.gov.in',
    password: 'password123',
    role: 'analyst',
    department: 'Wetland Field Survey Unit',
    designation: 'Field Sampling Specialist (Team Alpha)',
    badgeNumber: 'BMC-FLD-882',
    status: 'active',
    createdAt: '2024-02-11',
    lastLogin: '2026-10-09 11:20 IST',
    avatarInitials: 'PP'
  },
  {
    id: 'usr-pnd-04',
    name: 'Anil Deshmukh',
    email: 'anil.d@bhopal.gov.in',
    password: 'password123',
    role: 'officer',
    department: 'Ward 24 Sanitary Inspection',
    designation: 'Ward Environmental Inspector',
    badgeNumber: 'BMC-WRD-2401',
    status: 'pending',
    createdAt: '2026-10-08',
    lastLogin: 'Never',
    avatarInitials: 'AD'
  }
];

const SEED_AUDIT_LOGS: SecurityAuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-10-11 04:05:12',
    userEmail: 'admin@bmc.gov.in',
    userName: 'Er. R. Sharma',
    action: 'Successful Administrator Authentication',
    category: 'auth',
    ipAddress: '10.24.18.92 (BMC Intranet)',
    status: 'success',
    details: 'MFA verified via Municipal Smart Token #BMC-ENV-09412'
  },
  {
    id: 'log-102',
    timestamp: '2026-10-11 03:30:45',
    userEmail: 'admin@bmc.gov.in',
    userName: 'Er. R. Sharma',
    action: 'CPCB Class B Standard Review',
    category: 'threshold',
    ipAddress: '10.24.18.92 (BMC Intranet)',
    status: 'success',
    details: 'Verified Schedule-B Permissible Limit BOD ≤ 3.0 mg/L'
  },
  {
    id: 'log-103',
    timestamp: '2026-10-10 17:15:00',
    userEmail: 'guest.auditor@external.org',
    userName: 'Unknown Guest',
    action: 'Unauthorized Parameter Modification Attempt',
    category: 'security',
    ipAddress: '192.168.1.104 (External)',
    status: 'denied',
    details: 'Blocked attempt to modify Rule 104-B Zero Substitution flag'
  },
  {
    id: 'log-104',
    timestamp: '2026-10-10 16:30:10',
    userEmail: 'verma@mppcb.gov.in',
    userName: 'Dr. S. K. Verma',
    action: 'Certified Audit Extract Generated',
    category: 'dossier',
    ipAddress: '10.38.12.11 (MPPCB Govindpura)',
    status: 'success',
    details: 'Exported MPPCB-2024-DOC889 Prempura Post-Visarjan Dossier'
  },
  {
    id: 'log-105',
    timestamp: '2026-10-08 14:10:22',
    userEmail: 'anil.d@bhopal.gov.in',
    userName: 'Anil Deshmukh',
    action: 'New User Account Registration',
    category: 'rbac',
    ipAddress: '10.24.10.15 (Bhopal Municipal Network)',
    status: 'warning',
    details: 'Awaiting Superintending Officer verification & credential release'
  }
];

interface AuthContextType {
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  users: UserAccount[];
  auditLogs: SecurityAuditLog[];
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (userData: {
    name: string;
    email: string;
    password?: string;
    department: string;
    designation: string;
    role: UserRole;
  }) => { success: boolean; error?: string };
  logout: () => void;
  switchUser: (userId: string) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  toggleUserStatus: (userId: string) => void;
  deleteUser: (userId: string) => void;
  approveUser: (userId: string) => void;
  logSecurityEvent: (action: string, category: SecurityAuditLog['category'], status: SecurityAuditLog['status'], details: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize users from localStorage or seed
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const stored = localStorage.getItem('ghatshield_users');
      return stored ? JSON.parse(stored) : SEED_USERS;
    } catch {
      return SEED_USERS;
    }
  });

  // Current logged in user (defaults to Admin for quick evaluation, or stored)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem('ghatshield_current_user');
      if (stored) {
        return JSON.parse(stored);
      }
      return SEED_USERS[0]; // Admin by default
    } catch {
      return SEED_USERS[0];
    }
  });

  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(() => {
    try {
      const stored = localStorage.getItem('ghatshield_audit_logs');
      return stored ? JSON.parse(stored) : SEED_AUDIT_LOGS;
    } catch {
      return SEED_AUDIT_LOGS;
    }
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('ghatshield_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ghatshield_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ghatshield_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ghatshield_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const logSecurityEvent = (
    action: string,
    category: SecurityAuditLog['category'],
    status: SecurityAuditLog['status'],
    details: string
  ) => {
    const newLog: SecurityAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      userEmail: currentUser ? currentUser.email : 'anonymous@session.org',
      userName: currentUser ? currentUser.name : 'Unauthenticated User',
      action,
      category,
      ipAddress: '10.24.18.92 (Simulated BMC Portal)',
      status,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const login = (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      logSecurityEvent(`Failed Sign In Attempt: ${cleanEmail}`, 'auth', 'denied', 'Email account not recognized in BMC credential store.');
      return { success: false, error: 'Account not found. Please verify your official email or register a new user.' };
    }

    if (found.status === 'pending') {
      logSecurityEvent(`Login Attempt on Pending Account: ${cleanEmail}`, 'auth', 'warning', 'Account pending superintending administrator approval.');
      return { success: false, error: 'Account is pending administrative authorization from BMC Environmental Cell.' };
    }

    if (found.status === 'suspended') {
      logSecurityEvent(`Login Attempt on Suspended Account: ${cleanEmail}`, 'auth', 'denied', 'Account is suspended by administrator.');
      return { success: false, error: 'This municipal credential has been temporarily suspended by an Administrator.' };
    }

    // Password validation (simple check)
    if (password && found.password && found.password !== password) {
      logSecurityEvent(`Failed Password Authentication: ${cleanEmail}`, 'auth', 'denied', 'Password mismatch in authentication challenge.');
      return { success: false, error: 'Invalid password. Please check your credentials.' };
    }

    const updatedUser: UserAccount = {
      ...found,
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' IST'
    };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === found.id ? updatedUser : u)));
    logSecurityEvent(`User Signed In: ${updatedUser.name} (${updatedUser.role})`, 'auth', 'success', `Session issued with ${updatedUser.role.toUpperCase()} privileges.`);
    return { success: true };
  };

  const signup = (userData: {
    name: string;
    email: string;
    password?: string;
    department: string;
    designation: string;
    role: UserRole;
  }) => {
    const cleanEmail = userData.email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return { success: false, error: 'An account with this official email is already registered.' };
    }

    const initials = userData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'MU';

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: userData.name.trim(),
      email: cleanEmail,
      password: userData.password || 'password123',
      role: userData.role,
      department: userData.department.trim() || 'BMC Environmental Cell',
      designation: userData.designation.trim() || 'Municipal Field Officer',
      badgeNumber: `BMC-REG-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'active', // Auto-active for friendly prototype experience
      createdAt: new Date().toISOString().slice(0, 10),
      lastLogin: new Date().toISOString().replace('T', ' ').slice(0, 16) + ' IST',
      avatarInitials: initials
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    logSecurityEvent(`New User Registered: ${newUser.name} (${newUser.role})`, 'rbac', 'success', `Account created with designation "${newUser.designation}".`);
    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      logSecurityEvent(`User Signed Out: ${currentUser.name}`, 'auth', 'success', 'Session terminated by user.');
    }
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUser(target);
      logSecurityEvent(`Switched Session to: ${target.name} (${target.role})`, 'auth', 'success', `Role changed to ${target.role.toUpperCase()}.`);
    }
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
    const target = users.find((u) => u.id === userId);
    logSecurityEvent(`Role Modified for User: ${target?.name || userId}`, 'rbac', 'success', `Elevated/modified to ${newRole.toUpperCase()}.`);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          logSecurityEvent(`Account Status Changed: ${u.name}`, 'rbac', 'warning', `Status changed to ${nextStatus.toUpperCase()}.`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const approveUser = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'active' } : u))
    );
    const target = users.find((u) => u.id === userId);
    logSecurityEvent(`Approved Pending Registration: ${target?.name}`, 'rbac', 'success', 'Municipal credential approved by Superintending Officer.');
  };

  const deleteUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    logSecurityEvent(`User Deleted from Register: ${target?.name || userId}`, 'rbac', 'warning', 'Account purged from credential store.');
  };

  const isAuthenticated = currentUser !== null;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isAdmin,
        users,
        auditLogs,
        login,
        signup,
        logout,
        switchUser,
        updateUserRole,
        toggleUserStatus,
        deleteUser,
        approveUser,
        logSecurityEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
