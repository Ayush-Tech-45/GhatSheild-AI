/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId =
  | 'overview'
  | 'ghat-intelligence'
  | 'water-trends'
  | 'data-quality'
  | 'sampling-optimiser'
  | 'ai-copilot'
  | 'reports-evidence'
  | 'settings'
  | 'admin-dashboard';

export type UserRole = 'admin' | 'officer' | 'analyst';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department: string;
  designation: string;
  badgeNumber: string;
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin: string;
  avatarInitials: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  action: string;
  category: 'auth' | 'rbac' | 'threshold' | 'dossier' | 'security';
  ipAddress: string;
  status: 'success' | 'warning' | 'denied';
  details: string;
}

export type PriorityLevel = 'High Priority' | 'Moderate Priority' | 'Lower Priority' | 'Insufficient Evidence';

export interface GhatStation {
  id: string;
  name: string;
  waterBody: string;
  basinZone: string;
  ward: string;
  recordsCount: number;
  missingDataPct: number;
  latestObsDate: string;
  riskPriority: PriorityLevel;
  confidence: string;
  confidenceLevel: 'High' | 'Mod' | 'Low' | 'Critical';
  primaryTriggerReason: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  availableParameters: Array<'pH' | 'DO' | 'BOD' | 'F.Coli' | 'FC' | 'Turbidity'>;
  aliases: string[];
  metrics: {
    latestBOD: number;
    latestDO: number;
    latestPH: number;
    latestFColi?: number;
    historicalBODRange: [number, number];
    historicalDORange: [number, number];
    historicalPHRange: [number, number];
  };
  evidenceCitation: {
    documentId: string;
    documentTitle: string;
    pageAndTable: string;
    printedValue: string;
    sampleTime: string;
    chainOfCustody: string;
    provenanceId: string;
    ocrConfidence: string;
  };
}

export interface ObservationRecord {
  id: string;
  date: string;
  siteNameRaw: string;
  siteMasterName: string;
  ghatId: string;
  basin: string;
  parameter: 'BOD' | 'DO' | 'pH' | 'F.Coli' | 'Turbidity';
  originalPrintedValue: string;
  parsedValue: string;
  numericValue: number | null;
  unit: string;
  sourceDoc: string;
  citation: string;
  status: 'Verified Mapping' | 'BDL Preserved' | 'Needs Review' | 'Parsing Warning';
  analyst: string;
  notes?: string;
}

export interface TimeSeriesPoint {
  month: string;
  monthIndex: number;
  year2023?: number | null;
  year2024?: number | null;
  year2025?: number | null;
  isVoid?: boolean;
  eventLabel?: string;
  note?: string;
}

export interface SamplingMission {
  rank: number;
  ghatId: string;
  ghatName: string;
  waterBody: string;
  objective: string;
  objectiveSubtitle: string;
  targetDeficitParameter: string;
  parameterBadgeType: 'urgent' | 'probing' | 'void' | 'standard';
  slotTime: string;
  assignedTeam: string;
  vehicleUnit: string;
  effortLevel: 'High' | 'Moderate' | 'Standard';
  effortLabel: string;
  status: 'Scheduled' | 'Draft Allocation' | 'Standby';
  confidence: number;
  infoGainPct: number;
  exceedanceDelta: string;
  shapWeights: {
    voidSeverity: number;
    breachProb: number;
    flowDispersion: number;
  };
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  category?: string;
  queryHash?: string;
  executiveFinding?: string;
  tableData?: Array<{
    station: string;
    basin: string;
    parameterPeak: string;
    sampleDate: string;
    exceedanceDelta: string;
    citation: string;
    status: string;
  }>;
  gapNotice?: string;
  statutoryAction?: string;
  activeEvidenceCitationId?: string;
  shapBreakdown?: Array<{
    factor: string;
    score: string;
    percentage: number;
    color: string;
  }>;
  ruleCitation?: string;
  recommendedAction?: string;
}

export interface EvidenceDossierDoc {
  id: string;
  title: string;
  refCode: string;
  basin: string;
  date: string;
  pageCount: number;
  format: string;
  statusBadge: string;
  primaryFinding: string;
  sha256: string;
  isActive?: boolean;
  tableRows: Array<{
    station: string;
    parameter: string;
    observed: string;
    statutoryLimit: string;
    compliance: 'BREACH' | 'HYPOXIA' | 'PASS';
  }>;
}

export interface StatutoryThresholds {
  bodPermissible: number;
  bodExceedance: number;
  bodVisarjanSpike: number;
  doMinimum: number;
  doHypoxic: number;
  doAnoxic: number;
  phMin: number;
  phMax: number;
  fColiDesirable: number;
  fColiMax: number;
  strictCpcbScheduleVi: boolean;
  immutableAuditLogging: boolean;
  imputationMode: 'strict-non-interpolation' | 'linear-spline';
}

export interface RiskWeights {
  w1Bod: number;
  w2Do: number;
  w3DataGap: number;
  w4Volatility: number;
}
