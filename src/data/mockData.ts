/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  GhatStation,
  ObservationRecord,
  TimeSeriesPoint,
  SamplingMission,
  EvidenceDossierDoc,
  StatutoryThresholds,
  RiskWeights,
  CopilotMessage
} from '../types.ts';

export const GHAT_STATIONS: GhatStation[] = [
  {
    id: 'BPL-WTR-GH-04',
    name: 'Prempura Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Bhoj Wetland)',
    ward: 'Ward 24',
    recordsCount: 38,
    missingDataPct: 44.2,
    latestObsDate: '2024-10-18',
    riskPriority: 'High Priority',
    confidence: '72% Mod',
    confidenceLevel: 'Mod',
    primaryTriggerReason: 'BOD Exceedance (6.4 mg/L) during Post-Visarjan 2024',
    coordinates: { lat: 23.2381, lng: 77.3695 },
    availableParameters: ['pH', 'DO', 'BOD', 'F.Coli'],
    aliases: [
      'Prem Pura Ghat (2023)',
      'Prempura Lake Front (2024)',
      'Prempura Visarjan Sthal (Lab Reg #442)',
      'Bada Talab Ghat 04'
    ],
    metrics: {
      latestBOD: 6.4,
      latestDO: 4.1,
      latestPH: 7.8,
      latestFColi: 840,
      historicalBODRange: [2.9, 6.8],
      historicalDORange: [3.8, 6.2],
      historicalPHRange: [7.4, 8.1]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/ENV/2024/889',
      documentTitle: 'MPPCB Regional Office Bhopal — Post-Visarjan Water Monitoring Report 2024',
      pageAndTable: 'Document No. MPPCB/BPL/ENV/2024/889, Volume II, Page 14, Table 3.2, Row 4',
      printedValue: 'BOD = 6.4 mg/L, DO = 4.1 mg/L, Temp = 24.2°C',
      sampleTime: '2024-10-18 at 09:30 AM IST',
      chainOfCustody: 'Sampled by Field Officer S. Verma, Analysed by Central Lab Govindpura, Bhopal',
      provenanceId: 'MPPCB-2024-DOC889',
      ocrConfidence: '98.4%'
    }
  },
  {
    id: 'BPL-WTR-GH-09',
    name: 'Khatlapura Ghat',
    waterBody: 'Lower Lake (Chhota Talab)',
    basinZone: 'Lower Lake (Chhota Talab)',
    ward: 'Ward 39',
    recordsCount: 29,
    missingDataPct: 51.0,
    latestObsDate: '2024-09-21',
    riskPriority: 'High Priority',
    confidence: '58% Low',
    confidenceLevel: 'Low',
    primaryTriggerReason: 'Low DO (< 3.2 mg/L) & Severe Organic Load',
    coordinates: { lat: 23.2501, lng: 77.4082 },
    availableParameters: ['pH', 'DO', 'BOD'],
    aliases: ['Khatlapura immersion dock', 'K-Ghat', 'Lower Talab boat club'],
    metrics: {
      latestBOD: 7.2,
      latestDO: 3.1,
      latestPH: 7.6,
      historicalBODRange: [3.2, 7.8],
      historicalDORange: [2.9, 5.8],
      historicalPHRange: [7.2, 7.9]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/ENV/2024/892',
      documentTitle: 'MPPCB Lower Lake Seasonal Monitoring Filing 2024',
      pageAndTable: 'Page 8, Table 2.1, Row 2',
      printedValue: 'BOD = 7.2 mg/L, DO = 3.1 mg/L',
      sampleTime: '2024-09-21 at 10:15 AM IST',
      chainOfCustody: 'Field Officer M. Khan, Regional Lab Bhopal',
      provenanceId: 'MPPCB-2024-DOC892',
      ocrConfidence: '97.6%'
    }
  },
  {
    id: 'BPL-WTR-GH-12',
    name: 'Shahpura Lake Ghat (Sector B)',
    waterBody: 'Shahpura Lake',
    basinZone: 'Shahpura Lake Sub-Basin',
    ward: 'Ward 48',
    recordsCount: 21,
    missingDataPct: 62.5,
    latestObsDate: '2023-11-04',
    riskPriority: 'High Priority',
    confidence: '44% Severe Gap',
    confidenceLevel: 'Critical',
    primaryTriggerReason: 'Severe Sampling Gaps (>14 mos unmonitored)',
    coordinates: { lat: 23.195, lng: 77.4285 },
    availableParameters: ['pH', 'DO'],
    aliases: ['Manisha Market Bank', 'Chunabhatti Ghat', 'Shahpura Lake Sector B Immersion Point'],
    metrics: {
      latestBOD: 8.1,
      latestDO: 3.6,
      latestPH: 7.9,
      historicalBODRange: [4.1, 8.5],
      historicalDORange: [3.0, 5.2],
      historicalPHRange: [7.5, 8.3]
    },
    evidenceCitation: {
      documentId: 'BMC/ENV/MON-2023/11',
      documentTitle: 'BMC Environmental Cell Archival Inspection Register 2023',
      pageAndTable: 'Page 19, Field Entry 14',
      printedValue: 'BOD = 8.1 mg/L, DO = 3.6 mg/L',
      sampleTime: '2023-11-04 at 11:00 AM IST',
      chainOfCustody: 'BMC Water Works Division',
      provenanceId: 'BMC-2023-DOC114',
      ocrConfidence: '91.2%'
    }
  },
  {
    id: 'BPL-WTR-GH-01',
    name: 'Sheetal Das Ki Bagiya',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Bhoj Wetland)',
    ward: 'Ward 22',
    recordsCount: 64,
    missingDataPct: 22.8,
    latestObsDate: '2024-11-12',
    riskPriority: 'Moderate Priority',
    confidence: '86% High',
    confidenceLevel: 'High',
    primaryTriggerReason: 'Post-event Fecal Coliform elevation spike (920 MPN)',
    coordinates: { lat: 23.2435, lng: 77.382 },
    availableParameters: ['pH', 'DO', 'BOD', 'FC'],
    aliases: ['Sheetaldas Bagichi', 'VIP Road dock', 'Sheetal Das Bagicha'],
    metrics: {
      latestBOD: 3.4,
      latestDO: 5.4,
      latestPH: 7.9,
      latestFColi: 920,
      historicalBODRange: [2.1, 4.2],
      historicalDORange: [4.8, 6.9],
      historicalPHRange: [7.3, 8.2]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RPT-08',
      documentTitle: 'MPPCB Pre & Post Visarjan Comparative Water Study 2024',
      pageAndTable: 'Page 44, Table 3.4, Row 2',
      printedValue: 'BOD = 3.4 mg/L, F.Coli = 920 MPN/100mL',
      sampleTime: '2024-11-12 at 08:45 AM IST',
      chainOfCustody: 'Senior Chemist R. Gupta',
      provenanceId: 'MPPCB-2024-DOC744',
      ocrConfidence: '99.1%'
    }
  },
  {
    id: 'BPL-WTR-GH-02',
    name: 'VIP Road Visarjan Point',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Bhoj Wetland)',
    ward: 'Ward 25',
    recordsCount: 58,
    missingDataPct: 18.4,
    latestObsDate: '2025-01-14',
    riskPriority: 'Moderate Priority',
    confidence: '88% High',
    confidenceLevel: 'High',
    primaryTriggerReason: 'Turbidity boundary threshold exceedances during ritual immersions',
    coordinates: { lat: 23.248, lng: 77.387 },
    availableParameters: ['pH', 'DO', 'BOD', 'Turbidity'],
    aliases: ['VIP Road Pier', 'Raja Bhoj Statue Embankment'],
    metrics: {
      latestBOD: 3.2,
      latestDO: 5.6,
      latestPH: 7.7,
      historicalBODRange: [2.0, 4.0],
      historicalDORange: [5.1, 7.2],
      historicalPHRange: [7.4, 8.0]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2025-Q1-REP',
      documentTitle: 'MPPCB Winter Baseline Report 2025',
      pageAndTable: 'Page 12, Table 1.4',
      printedValue: 'BOD = 3.2 mg/L, Turbidity = 18.4 NTU',
      sampleTime: '2025-01-14 at 10:00 AM IST',
      chainOfCustody: 'BMC Central Lab Field Unit',
      provenanceId: 'MPPCB-2025-DOC012',
      ocrConfidence: '98.7%'
    }
  },
  {
    id: 'BPL-WTR-GH-03',
    name: 'Kamla Park Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper-Lower Spill Channel',
    ward: 'Ward 26',
    recordsCount: 42,
    missingDataPct: 25.1,
    latestObsDate: '2024-10-10',
    riskPriority: 'Lower Priority',
    confidence: '78% Mod',
    confidenceLevel: 'Mod',
    primaryTriggerReason: 'Parameters within Class B standards; low post-immersion surge',
    coordinates: { lat: 23.245, lng: 77.399 },
    availableParameters: ['pH', 'DO', 'BOD'],
    aliases: ['Kamla Nehru bridge bank', 'Kamla Park Talab Ghat No. 2'],
    metrics: {
      latestBOD: 2.8,
      latestDO: 5.8,
      latestPH: 7.8,
      historicalBODRange: [1.9, 3.5],
      historicalDORange: [5.2, 7.0],
      historicalPHRange: [7.3, 8.1]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RPT-08',
      documentTitle: 'MPPCB Regional Office Bhopal Post-Visarjan Dossier',
      pageAndTable: 'Page 39, Table 2.1, Row 11',
      printedValue: 'BOD = 2.8 mg/L, pH = 7.82',
      sampleTime: '2024-10-10 at 09:15 AM IST',
      chainOfCustody: 'Field Officer P. Sharma',
      provenanceId: 'MPPCB-2024-DOC391',
      ocrConfidence: '99.0%'
    }
  },
  {
    id: 'BPL-WTR-GH-07',
    name: 'Bhairon Mandir Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Bhoj Wetland)',
    ward: 'Ward 21',
    recordsCount: 42,
    missingDataPct: 11.9,
    latestObsDate: '2025-02-02',
    riskPriority: 'Lower Priority',
    confidence: '85% High',
    confidenceLevel: 'High',
    primaryTriggerReason: 'Parameters within Class B standards; low post-immersion surge',
    coordinates: { lat: 23.235, lng: 77.362 },
    availableParameters: ['pH', 'DO', 'BOD'],
    aliases: ['Bhairon Mandir Visarjan Point', 'Old VIP Bank'],
    metrics: {
      latestBOD: 2.6,
      latestDO: 6.1,
      latestPH: 7.7,
      historicalBODRange: [1.8, 3.2],
      historicalDORange: [5.5, 7.4],
      historicalPHRange: [7.2, 8.0]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2025-REG-01',
      documentTitle: 'MPPCB Bhoj Wetland Annual Baseline 2025',
      pageAndTable: 'Page 5, Table 1.1',
      printedValue: 'BOD = 2.6 mg/L, DO = 6.1 mg/L',
      sampleTime: '2025-02-02 at 11:30 AM IST',
      chainOfCustody: 'Environmental Officer A. Roy',
      provenanceId: 'MPPCB-2025-DOC045',
      ocrConfidence: '99.4%'
    }
  },
  {
    id: 'BPL-WTR-GH-14',
    name: 'Kali Mandir Visarjan Step',
    waterBody: 'Lower Lake (Chhota Talab)',
    basinZone: 'Lower Lake (Chhota Talab)',
    ward: 'Ward 40',
    recordsCount: 6,
    missingDataPct: 85.7,
    latestObsDate: '2023-08-11',
    riskPriority: 'Insufficient Evidence',
    confidence: '30% Critical',
    confidenceLevel: 'Critical',
    primaryTriggerReason: 'Under-sampled auxiliary location; archival documents fragmented',
    coordinates: { lat: 23.249, lng: 77.412 },
    availableParameters: ['pH'],
    aliases: ['Kali Mandir Ghat', 'Chhota Talab South Steps'],
    metrics: {
      latestBOD: 4.8,
      latestDO: 4.0,
      latestPH: 7.9,
      historicalBODRange: [3.5, 5.5],
      historicalDORange: [3.5, 5.0],
      historicalPHRange: [7.4, 8.1]
    },
    evidenceCitation: {
      documentId: 'BMC/HIST-2023/REC',
      documentTitle: 'BMC Archival Grab Binder 2023',
      pageAndTable: 'Binder 4, Logsheet 22',
      printedValue: 'pH = 7.9, Unverified BOD',
      sampleTime: '2023-08-11 at 12:00 PM IST',
      chainOfCustody: 'Handwritten Log, Signature smudged',
      provenanceId: 'BMC-2023-DOC006',
      ocrConfidence: '64.2%'
    }
  },
  {
    id: 'BPL-WTR-GH-05',
    name: 'Bairagarh Sant Hirdaram Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Western Spur)',
    ward: 'Ward 1',
    recordsCount: 34,
    missingDataPct: 20.6,
    latestObsDate: '2024-10-15',
    riskPriority: 'Lower Priority',
    confidence: '82% High',
    confidenceLevel: 'High',
    primaryTriggerReason: 'Parameters conforming to Class B outside festive weeks',
    coordinates: { lat: 23.262, lng: 77.334 },
    availableParameters: ['pH', 'DO', 'BOD'],
    aliases: ['Bairagarh Ghat', 'Halalpur Visarjan'],
    metrics: {
      latestBOD: 2.9,
      latestDO: 5.7,
      latestPH: 7.8,
      historicalBODRange: [2.0, 3.8],
      historicalDORange: [5.0, 6.8],
      historicalPHRange: [7.3, 8.0]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RPT-08',
      documentTitle: 'MPPCB Post-Visarjan Report 2024',
      pageAndTable: 'Page 31, Table 2.8',
      printedValue: 'BOD = 2.9 mg/L, DO = 5.7 mg/L',
      sampleTime: '2024-10-15 at 09:40 AM IST',
      chainOfCustody: 'Analyst K. Joshi',
      provenanceId: 'MPPCB-2024-DOC312',
      ocrConfidence: '98.1%'
    }
  },
  {
    id: 'BPL-WTR-GH-06',
    name: 'Kaliyasot Reservoir Dam Ghat',
    waterBody: 'Kaliyasot Dam',
    basinZone: 'Kaliyasot Reservoir Catchment',
    ward: 'Ward 51',
    recordsCount: 35,
    missingDataPct: 32.4,
    latestObsDate: '2024-12-05',
    riskPriority: 'Lower Priority',
    confidence: '81% High',
    confidenceLevel: 'High',
    primaryTriggerReason: 'Low festive pressure; stable biological background',
    coordinates: { lat: 23.181, lng: 77.404 },
    availableParameters: ['pH', 'DO', 'BOD'],
    aliases: ['Kaliyasot Dam Bank', 'Kaliyasot Intake Point'],
    metrics: {
      latestBOD: 2.5,
      latestDO: 6.3,
      latestPH: 7.7,
      historicalBODRange: [1.7, 3.3],
      historicalDORange: [5.5, 7.5],
      historicalPHRange: [7.2, 8.1]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RES-12',
      documentTitle: 'MPPCB Reservoir Assessment 2024',
      pageAndTable: 'Page 17, Table 2.2',
      printedValue: 'BOD = 2.5 mg/L, DO = 6.3 mg/L',
      sampleTime: '2024-12-05 at 11:15 AM IST',
      chainOfCustody: 'Senior Lab Officer D. Patel',
      provenanceId: 'MPPCB-2024-DOC517',
      ocrConfidence: '98.9%'
    }
  },
  {
    id: 'BPL-WTR-GH-08',
    name: 'Bhadbhada Spillway Ghat',
    waterBody: 'Upper Lake Outfall',
    basinZone: 'Bhadbhada River Outlet',
    ward: 'Ward 28',
    recordsCount: 28,
    missingDataPct: 40.0,
    latestObsDate: '2024-09-28',
    riskPriority: 'Moderate Priority',
    confidence: '74% Mod',
    confidenceLevel: 'Mod',
    primaryTriggerReason: 'Sediment flush during gate opening post-immersion',
    coordinates: { lat: 23.218, lng: 77.362 },
    availableParameters: ['pH', 'DO', 'BOD', 'Turbidity'],
    aliases: ['Bhadbhada Dam Gate', 'Bhadbhada Road Spillway near Kaliyasot'],
    metrics: {
      latestBOD: 3.7,
      latestDO: 5.1,
      latestPH: 7.6,
      historicalBODRange: [2.2, 4.6],
      historicalDORange: [4.7, 6.5],
      historicalPHRange: [7.3, 7.9]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RPT-08',
      documentTitle: 'MPPCB Post-Visarjan Report 2024',
      pageAndTable: 'Page 51, Footnote *Legacy JTU Unit',
      printedValue: 'BOD = 3.7 mg/L, Turbidity = 120 NTU',
      sampleTime: '2024-09-28 at 02:00 PM IST',
      chainOfCustody: 'BMC Water Works Lab',
      provenanceId: 'MPPCB-2024-DOC510',
      ocrConfidence: '96.5%'
    }
  },
  {
    id: 'BPL-WTR-GH-10',
    name: 'Khanugaon Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Bhoj Wetland)',
    ward: 'Ward 23',
    recordsCount: 24,
    missingDataPct: 35.0,
    latestObsDate: '2024-08-30',
    riskPriority: 'Lower Priority',
    confidence: '76% Mod',
    confidenceLevel: 'Mod',
    primaryTriggerReason: 'Rural perimeter station; baseline within permissible limits',
    coordinates: { lat: 23.252, lng: 77.375 },
    availableParameters: ['pH', 'DO'],
    aliases: ['Khanugaon Boat Steps', 'Khanugaon Jetty'],
    metrics: {
      latestBOD: 2.7,
      latestDO: 5.9,
      latestPH: 7.7,
      historicalBODRange: [1.9, 3.4],
      historicalDORange: [5.2, 7.1],
      historicalPHRange: [7.3, 8.0]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RPT-08',
      documentTitle: 'MPPCB Pre-Monsoon Survey',
      pageAndTable: 'Page 22, Table 1.9',
      printedValue: 'pH = 7.7, DO = 5.9 mg/L',
      sampleTime: '2024-08-30 at 10:45 AM IST',
      chainOfCustody: 'Field Officer S. Tiwari',
      provenanceId: 'MPPCB-2024-DOC229',
      ocrConfidence: '97.2%'
    }
  },
  {
    id: 'BPL-WTR-GH-11',
    name: 'Retghat VIP Steps',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Bhoj Wetland)',
    ward: 'Ward 22',
    recordsCount: 31,
    missingDataPct: 29.0,
    latestObsDate: '2024-10-12',
    riskPriority: 'Lower Priority',
    confidence: '80% High',
    confidenceLevel: 'High',
    primaryTriggerReason: 'Moderate pilgrim gathering; municipal bio-filtration barrier active',
    coordinates: { lat: 23.246, lng: 77.388 },
    availableParameters: ['pH', 'DO', 'BOD'],
    aliases: ['Ret Ghat', 'Retghat Bathing Steps'],
    metrics: {
      latestBOD: 2.9,
      latestDO: 5.5,
      latestPH: 7.8,
      historicalBODRange: [2.1, 3.8],
      historicalDORange: [5.0, 6.9],
      historicalPHRange: [7.4, 8.1]
    },
    evidenceCitation: {
      documentId: 'MPPCB/BPL/2024-RPT-08',
      documentTitle: 'MPPCB Post-Visarjan Report 2024',
      pageAndTable: 'Page 40, Table 3.1',
      printedValue: 'BOD = 2.9 mg/L, DO = 5.5 mg/L',
      sampleTime: '2024-10-12 at 11:20 AM IST',
      chainOfCustody: 'Field Officer M. Khan',
      provenanceId: 'MPPCB-2024-DOC401',
      ocrConfidence: '98.5%'
    }
  },
  {
    id: 'BPL-WTR-GH-13',
    name: 'Bishankhedi Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    basinZone: 'Upper Lake (Rural Reach)',
    ward: 'Ward 20',
    recordsCount: 15,
    missingDataPct: 60.0,
    latestObsDate: '2023-10-20',
    riskPriority: 'Moderate Priority',
    confidence: '50% Low',
    confidenceLevel: 'Low',
    primaryTriggerReason: 'Infrequent quarterly grab visits; unmonitored agricultural inflow',
    coordinates: { lat: 23.224, lng: 77.321 },
    availableParameters: ['pH', 'DO'],
    aliases: ['Bishan Khedi Ghat', 'Bishankhedi Agricultural Bund'],
    metrics: {
      latestBOD: 3.5,
      latestDO: 5.0,
      latestPH: 7.6,
      historicalBODRange: [2.4, 4.5],
      historicalDORange: [4.6, 6.4],
      historicalPHRange: [7.2, 8.0]
    },
    evidenceCitation: {
      documentId: 'BMC/HIST-2023/REC',
      documentTitle: 'BMC Rural Water Monitoring 2023',
      pageAndTable: 'Register 3, Page 12',
      printedValue: 'BOD = 3.5 mg/L, DO = 5.0 mg/L',
      sampleTime: '2023-10-20 at 01:15 PM IST',
      chainOfCustody: 'Water Works Field Van',
      provenanceId: 'BMC-2023-DOC015',
      ocrConfidence: '92.0%'
    }
  }
];

export const TIME_SERIES_PREMPURA_BOD: TimeSeriesPoint[] = [
  { month: 'Jan', monthIndex: 0, year2023: 2.2, year2024: 2.4, year2025: 2.3, note: 'Winter baseline' },
  { month: 'Feb', monthIndex: 1, year2023: null, year2024: null, year2025: null, isVoid: true, note: 'DATA VOID: No grabs logged' },
  { month: 'Mar', monthIndex: 2, year2023: null, year2024: null, year2025: null, isVoid: true, note: 'DATA VOID: No grabs logged' },
  { month: 'Apr', monthIndex: 3, year2023: null, year2024: null, year2025: null, isVoid: true, note: 'DATA VOID: Dry pre-monsoon' },
  { month: 'May', monthIndex: 4, year2023: null, year2024: null, year2025: null, isVoid: true, note: 'DATA VOID: Pause in sampling' },
  { month: 'Jun', monthIndex: 5, year2023: 2.8, year2024: 2.2, year2025: 2.4, note: 'Pre-Monsoon grab resumption' },
  { month: 'Jul', monthIndex: 6, year2023: 2.9, year2024: 2.5, year2025: 2.6, note: 'Monsoon inflow dilution' },
  { month: 'Aug', monthIndex: 7, year2023: 3.1, year2024: 2.9, year2025: 2.8, note: 'Pre-Visarjan baseline' },
  { month: 'Sep', monthIndex: 8, year2023: 5.8, year2024: 6.4, year2025: 4.8, eventLabel: 'Ganesh Visarjan (Sep 18)', note: 'BOD Spike +113% Breach' },
  { month: 'Oct', monthIndex: 9, year2023: 4.6, year2024: 5.1, year2025: null, eventLabel: 'Durga Visarjan (Oct 14)', note: 'Exceedance continuation' },
  { month: 'Nov', monthIndex: 10, year2023: 3.4, year2024: 3.6, year2025: null, note: 'Post-event degradation' },
  { month: 'Dec', monthIndex: 11, year2023: 2.9, year2024: 3.2, year2025: null, note: 'Winter recovery curve' }
];

export const TIME_SERIES_PREMPURA_DO: TimeSeriesPoint[] = [
  { month: 'Jan', monthIndex: 0, year2023: 6.2, year2024: 6.0, year2025: 6.1 },
  { month: 'Feb', monthIndex: 1, isVoid: true },
  { month: 'Mar', monthIndex: 2, isVoid: true },
  { month: 'Apr', monthIndex: 3, isVoid: true },
  { month: 'May', monthIndex: 4, isVoid: true },
  { month: 'Jun', monthIndex: 5, year2023: 5.5, year2024: 5.8, year2025: 5.6 },
  { month: 'Jul', monthIndex: 6, year2023: 5.7, year2024: 5.6, year2025: 5.4 },
  { month: 'Aug', monthIndex: 7, year2023: 5.2, year2024: 5.3, year2025: 5.2 },
  { month: 'Sep', monthIndex: 8, year2023: 4.2, year2024: 3.8, year2025: 4.4, eventLabel: 'Hypoxic Stress (3.8 mg/L)' },
  { month: 'Oct', monthIndex: 9, year2023: 4.5, year2024: 4.1, year2025: null },
  { month: 'Nov', monthIndex: 10, year2023: 5.1, year2024: 4.8, year2025: null },
  { month: 'Dec', monthIndex: 11, year2023: 5.8, year2024: 5.4, year2025: null }
];

export const TIME_SERIES_PREMPURA_PH: TimeSeriesPoint[] = [
  { month: 'Jan', monthIndex: 0, year2023: 7.6, year2024: 7.7, year2025: 7.8 },
  { month: 'Feb', monthIndex: 1, isVoid: true },
  { month: 'Mar', monthIndex: 2, isVoid: true },
  { month: 'Apr', monthIndex: 3, isVoid: true },
  { month: 'May', monthIndex: 4, isVoid: true },
  { month: 'Jun', monthIndex: 5, year2023: 7.5, year2024: 7.8, year2025: 7.7 },
  { month: 'Jul', monthIndex: 6, year2023: 7.6, year2024: 7.6, year2025: 7.6 },
  { month: 'Aug', monthIndex: 7, year2023: 7.7, year2024: 7.8, year2025: 7.7 },
  { month: 'Sep', monthIndex: 8, year2023: 7.9, year2024: 8.0, year2025: 7.8 },
  { month: 'Oct', monthIndex: 9, year2023: 7.8, year2024: 7.9, year2025: null },
  { month: 'Nov', monthIndex: 10, year2023: 7.7, year2024: 7.8, year2025: null },
  { month: 'Dec', monthIndex: 11, year2023: 7.6, year2024: 7.7, year2025: null }
];

export const RAW_OBSERVATION_RECORDS: ObservationRecord[] = [
  {
    id: 'REC-2024-BOD-089',
    date: '2024-09-18',
    siteNameRaw: 'Prem Pura Ghat (Visarjan Sthal Ward 24)',
    siteMasterName: 'Prempura Ghat',
    ghatId: 'BPL-WTR-GH-04',
    basin: 'Upper Lake (Bada Talab)',
    parameter: 'BOD',
    originalPrintedValue: '6.40 mg/L',
    parsedValue: '6.4 mg/L',
    numericValue: 6.4,
    unit: 'mg/L',
    sourceDoc: 'MPPCB/BPL/2024-RPT-08',
    citation: 'Pg 42, Table 3.2 (Row 6)',
    status: 'Verified Mapping',
    analyst: 'Dr. S. K. Verma'
  },
  {
    id: 'REC-2024-BOD-104',
    date: '2024-09-21',
    siteNameRaw: 'Sheetal Das Bagicha, VIP Road',
    siteMasterName: 'Sheetal Das Ki Bagiya',
    ghatId: 'BPL-WTR-GH-01',
    basin: 'Upper Lake (Bada Talab)',
    parameter: 'BOD',
    originalPrintedValue: '< 2.0 BDL',
    parsedValue: 'BDL (< 2.0)',
    numericValue: null,
    unit: 'mg/L',
    sourceDoc: 'MPPCB/BPL/2024-RPT-08',
    citation: 'Pg 44, Table 3.4 (Row 2)',
    status: 'BDL Preserved',
    analyst: 'R. Gupta'
  },
  {
    id: 'REC-2023-FCL-041',
    date: '2023-09-29',
    siteNameRaw: 'Khatlapura Ghat (Lower Talab boat club)',
    siteMasterName: 'Khatlapura Ghat',
    ghatId: 'BPL-WTR-GH-09',
    basin: 'Lower Lake (Chhota Talab)',
    parameter: 'F.Coli',
    originalPrintedValue: 'Present / High',
    parsedValue: 'NULL (Textual)',
    numericValue: null,
    unit: 'MPN/100mL',
    sourceDoc: 'BMC-ENV-MON-2023/11',
    citation: 'Pg 17, Field Notes Appx. B',
    status: 'Needs Review',
    analyst: 'Field Team B'
  },
  {
    id: 'REC-2024-TUR-012',
    date: '2024-09-19',
    siteNameRaw: 'Bhadbhada Road Spillway near Kaliyasot',
    siteMasterName: 'Bhadbhada Spillway Ghat',
    ghatId: 'BPL-WTR-GH-08',
    basin: 'Bhadbhada River Outlet',
    parameter: 'Turbidity',
    originalPrintedValue: '120 JTU',
    parsedValue: '120 NTU (Conv?)',
    numericValue: 120,
    unit: 'NTU',
    sourceDoc: 'MPPCB/BPL/2024-RPT-08',
    citation: 'Pg 51, Footnote *Legacy JTU Unit',
    status: 'Parsing Warning',
    analyst: 'BMC Water Works'
  },
  {
    id: 'REC-2024-PH-192',
    date: '2024-09-17',
    siteNameRaw: 'Kamla Park Talab Ghat No. 2',
    siteMasterName: 'Kamla Park Ghat',
    ghatId: 'BPL-WTR-GH-03',
    basin: 'Upper-Lower Spill Channel',
    parameter: 'pH',
    originalPrintedValue: '7.82 pH',
    parsedValue: '7.82',
    numericValue: 7.82,
    unit: 'pH',
    sourceDoc: 'MPPCB/BPL/2024-RPT-08',
    citation: 'Pg 39, Table 2.1 (Row 11)',
    status: 'Verified Mapping',
    analyst: 'P. Sharma'
  },
  {
    id: 'REC-2024-DO-076',
    date: '2024-09-20',
    siteNameRaw: 'Prem Pura Immersion Jetty',
    siteMasterName: 'Prempura Ghat',
    ghatId: 'BPL-WTR-GH-04',
    basin: 'Upper Lake (Bada Talab)',
    parameter: 'DO',
    originalPrintedValue: '3.80 mg/L',
    parsedValue: '3.8 mg/L',
    numericValue: 3.8,
    unit: 'mg/L',
    sourceDoc: 'MPPCB/BPL/2024-RPT-08',
    citation: 'Pg 42, Table 3.2 (Row 7)',
    status: 'Verified Mapping',
    analyst: 'Dr. S. K. Verma'
  },
  {
    id: 'REC-2023-BOD-014',
    date: '2023-10-14',
    siteNameRaw: 'Shahpura Sector B bank',
    siteMasterName: 'Shahpura Lake Ghat (Sector B)',
    ghatId: 'BPL-WTR-GH-12',
    basin: 'Shahpura Lake Sub-Basin',
    parameter: 'BOD',
    originalPrintedValue: '8.1 mg/L',
    parsedValue: '8.1 mg/L',
    numericValue: 8.1,
    unit: 'mg/L',
    sourceDoc: 'BMC-ENV-MON-2023/11',
    citation: 'Pg 19, Field Entry 14',
    status: 'Verified Mapping',
    analyst: 'BMC Water Works'
  },
  {
    id: 'REC-2024-FCL-063',
    date: '2024-11-12',
    siteNameRaw: 'Sheetaldas Bagichi Embankment',
    siteMasterName: 'Sheetal Das Ki Bagiya',
    ghatId: 'BPL-WTR-GH-01',
    basin: 'Upper Lake (Bada Talab)',
    parameter: 'F.Coli',
    originalPrintedValue: '920 MPN',
    parsedValue: '920 MPN/100mL',
    numericValue: 920,
    unit: 'MPN/100mL',
    sourceDoc: 'MPPCB/BPL/2024-RPT-08',
    citation: 'Pg 44, Table 3.4',
    status: 'Verified Mapping',
    analyst: 'R. Gupta'
  }
];

export const SAMPLING_MISSIONS: SamplingMission[] = [
  {
    rank: 1,
    ghatId: 'BPL-WTR-GH-04',
    ghatName: 'Prempura Ghat',
    waterBody: 'Upper Lake (Bada Talab)',
    objective: 'Post-Immersion BOD Peak Capture',
    objectiveSubtitle: 'Critical visarjan ingress corridor',
    targetDeficitParameter: 'BOD (Urgent)',
    parameterBadgeType: 'urgent',
    slotTime: 'Slot 1: Day 2 (08:30 AM)',
    assignedTeam: 'Team Alpha',
    vehicleUnit: 'BMC Mobile Van 01',
    effortLevel: 'High',
    effortLabel: 'High (Lab Incub.)',
    status: 'Scheduled',
    confidence: 94.8,
    infoGainPct: 34.2,
    exceedanceDelta: '+113% BOD Breach Spike (6.4 mg/L)',
    shapWeights: { voidSeverity: 42.8, breachProb: 36.5, flowDispersion: 20.7 }
  },
  {
    rank: 2,
    ghatId: 'BPL-WTR-GH-09',
    ghatName: 'Khatlapura Ghat',
    waterBody: 'Lower Lake (Chhota Talab)',
    objective: 'Baseline DO Depletion Verification',
    objectiveSubtitle: 'Low circulation basin zone',
    targetDeficitParameter: 'DO & pH Probing',
    parameterBadgeType: 'probing',
    slotTime: 'Slot 2: Day 2 (11:15 AM)',
    assignedTeam: 'Team Alpha',
    vehicleUnit: 'BMC Mobile Van 01',
    effortLevel: 'Moderate',
    effortLabel: 'Moderate (In-situ)',
    status: 'Scheduled',
    confidence: 91.2,
    infoGainPct: 28.6,
    exceedanceDelta: '+93% BOD Breach Spike (5.8 mg/L)',
    shapWeights: { voidSeverity: 38.0, breachProb: 44.0, flowDispersion: 18.0 }
  },
  {
    rank: 3,
    ghatId: 'BPL-WTR-GH-12',
    ghatName: 'Shahpura Lake Ghat',
    waterBody: 'Shahpura Basin (Sector B)',
    objective: '14-Month Data Void Resolution & F.Coli Audit',
    objectiveSubtitle: 'Zero institutional sample since Q1 2024',
    targetDeficitParameter: 'F.Coli & BOD (Void)',
    parameterBadgeType: 'void',
    slotTime: 'Slot 3: Day 3 (09:00 AM)',
    assignedTeam: 'Team Beta',
    vehicleUnit: 'Regional MPPCB Lab',
    effortLevel: 'High',
    effortLabel: 'High (Multi-depth)',
    status: 'Draft Allocation',
    confidence: 88.4,
    infoGainPct: 52.0,
    exceedanceDelta: '62.5% Sampling Void (14 mos unmonitored)',
    shapWeights: { voidSeverity: 68.0, breachProb: 20.0, flowDispersion: 12.0 }
  },
  {
    rank: 4,
    ghatId: 'BPL-WTR-GH-01',
    ghatName: 'Sheetal Das Ki Bagiya',
    waterBody: 'Upper Lake (North Embankment)',
    objective: 'Pre-Monsoon Organic Baseline',
    objectiveSubtitle: 'Dense pilgrim bath area',
    targetDeficitParameter: 'DO & Coliform',
    parameterBadgeType: 'standard',
    slotTime: 'Slot 4: Day 4 (10:30 AM)',
    assignedTeam: 'Team Alpha',
    vehicleUnit: 'BMC Mobile Van 01',
    effortLevel: 'Moderate',
    effortLabel: 'Moderate (Standard)',
    status: 'Scheduled',
    confidence: 86.5,
    infoGainPct: 18.4,
    exceedanceDelta: 'Coliform Surge (920 MPN)',
    shapWeights: { voidSeverity: 22.0, breachProb: 48.0, flowDispersion: 30.0 }
  },
  {
    rank: 5,
    ghatId: 'BPL-WTR-GH-08',
    ghatName: 'Bhadbhada Dam Ghat',
    waterBody: 'Spillway Basin Outfall',
    objective: 'Heavy Metals & Total Suspended Solids Profiling',
    objectiveSubtitle: 'Sludge deposit gate verification',
    targetDeficitParameter: 'Turbidity & TDS',
    parameterBadgeType: 'standard',
    slotTime: 'Slot 5: Day 5 (02:00 PM)',
    assignedTeam: 'Team Gamma',
    vehicleUnit: 'Municipal Reserve',
    effortLevel: 'Standard',
    effortLabel: 'Standard',
    status: 'Standby',
    confidence: 81.0,
    infoGainPct: 14.2,
    exceedanceDelta: 'Turbidity (120 NTU flush)',
    shapWeights: { voidSeverity: 25.0, breachProb: 35.0, flowDispersion: 40.0 }
  }
];

export const EVIDENCE_DOSSIERS: EvidenceDossierDoc[] = [
  {
    id: 'DOS-2024-09-V4',
    title: 'Bhopal Visarjan 2024 Post-Immersion Environmental Impact Dossier',
    refCode: 'Ref: BMC/ENV/DOS-2024-09-V4',
    basin: 'Bhoj Wetland (Upper & Lower Lake)',
    date: 'Sep 28, 2024',
    pageCount: 42,
    format: 'PDF + CSV Annexure',
    statusBadge: 'Verified Statutory Filing',
    primaryFinding: '+113% BOD surge at Prempura Ghat; severe hypoxia (DO: 3.1 mg/L) detected at Khatlapura immersion steps.',
    sha256: 'e7f849bc80214a199de23400a45f93b1a8d052',
    isActive: true,
    tableRows: [
      { station: 'Prempura Ghat', parameter: 'BOD (mg/L)', observed: '6.4', statutoryLimit: '≤ 3.0', compliance: 'BREACH' },
      { station: 'Khatlapura Ghat', parameter: 'DO (mg/L)', observed: '3.1', statutoryLimit: '≥ 5.0', compliance: 'HYPOXIA' },
      { station: 'Sheetaldas Ki Bagiya', parameter: 'Turbidity (NTU)', observed: '18.2', statutoryLimit: '≤ 25.0', compliance: 'PASS' },
      { station: 'Bairagarh Ghat', parameter: 'pH (Field)', observed: '7.8', statutoryLimit: '6.5–8.5', compliance: 'PASS' }
    ]
  },
  {
    id: 'DOS-2025-Q1-AUDIT',
    title: '2023–2025 Multi-Year Water Quality & Data Void Forensic Review',
    refCode: 'Ref: BMC/ENV/DOS-2025-Q1-AUDIT',
    basin: 'All 14 Visarjan Ghats',
    date: 'Jan 15, 2025',
    pageCount: 68,
    format: 'PDF (Archival)',
    statusBadge: 'Peer Review Complete',
    primaryFinding: '8 high-void ghats flagged for pre-monsoon grab expansion; non-continuous telemetry documented for NGT compliance.',
    sha256: '4a2b90c91823ef017849120df3a09374028bc1',
    tableRows: [
      { station: 'Shahpura Lake Sector B', parameter: 'Data Completeness', observed: '37.5%', statutoryLimit: '≥ 80.0%', compliance: 'BREACH' },
      { station: 'Kali Mandir Step', parameter: 'Records Count', observed: '6', statutoryLimit: '≥ 24', compliance: 'HYPOXIA' },
      { station: 'Prempura Ghat', parameter: 'Verified Citations', observed: '38', statutoryLimit: '≥ 24', compliance: 'PASS' }
    ]
  },
  {
    id: 'DOS-2023-10-FIN',
    title: 'Ganesh & Durga Visarjan 2023 Comparative Chemical Exceedance Audit',
    refCode: 'Ref: BMC/ENV/DOS-2023-10-FIN',
    basin: 'Upper Lake & Shahpura Lake',
    date: 'Oct 30, 2023',
    pageCount: 36,
    format: 'PDF',
    statusBadge: 'Archived Gazette Record',
    primaryFinding: 'Peak BOD 5.8 mg/L; Below Detection Limit (BDL) preserves 24 heavy metal readings per CPCB protocol.',
    sha256: 'cb9812e47209df34a021967ee91bc341094df8',
    tableRows: [
      { station: 'Prempura Ghat', parameter: 'BOD (mg/L)', observed: '5.8', statutoryLimit: '≤ 3.0', compliance: 'BREACH' },
      { station: 'Sheetal Das Ki Bagiya', parameter: 'Lead (Pb mg/L)', observed: '< 0.01 BDL', statutoryLimit: '≤ 0.05', compliance: 'PASS' }
    ]
  },
  {
    id: 'PLAN-2025-08-S1',
    title: 'Pre-Visarjan 2025 Sampling Mission Resource Allocation Plan',
    refCode: 'Ref: BMC/ENV/PLAN-2025-08-S1',
    basin: '14 Municipal Stations',
    date: 'Aug 12, 2025',
    pageCount: 16,
    format: 'PDF + Route Matrix',
    statusBadge: 'Simulation Draft',
    primaryFinding: '3 field units scheduled for 22 priority grab runs over 14 days before idols immersion commences.',
    sha256: '9811f0a55a29c0174bb01284931a2810df3381',
    tableRows: [
      { station: 'Cluster 1 (Bada Talab)', parameter: 'Transit Route', observed: '45 min loop', statutoryLimit: '≤ 60 min', compliance: 'PASS' },
      { station: 'Cluster 2 (Chhota Talab)', parameter: 'Transit Route', observed: '28 min loop', statutoryLimit: '≤ 60 min', compliance: 'PASS' }
    ]
  }
];

export const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    timestamp: 'Today, 10:42 AM · Dispatch Inquiry',
    content: 'Which ghats have recorded the highest post-visarjan BOD exceedance in historical records, and what are the primary evidence citations?'
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    timestamp: 'Today, 10:42 AM · Deterministic Model CPCB-IG-v2.4',
    content: 'GhatShield Deterministic Synthesiser',
    queryHash: '#MPPCB-BOD-EXCEED-774',
    executiveFinding: 'Post-visarjan sampling audits identify Prempura Ghat (Upper Lake / Bada Talab) and Khatlapura Ghat (Lower Lake) with the highest recurring Biochemical Oxygen Demand (BOD) spikes following immersion events in the 2023 and 2024 monitoring campaigns.',
    tableData: [
      {
        station: 'Prempura Ghat',
        basin: 'Upper Lake (Bada Talab) · W-24',
        parameterPeak: '6.4 mg/L BOD',
        sampleDate: '+72h Post Visarjan (Sep 18, 2024)',
        exceedanceDelta: '+113% over threshold',
        citation: 'MPPCB Lab Reg #442 / Doc #889',
        status: 'Critical Breach'
      },
      {
        station: 'Khatlapura Ghat',
        basin: 'Lower Lake (Chhota Talab) · W-39',
        parameterPeak: '5.8 mg/L BOD',
        sampleDate: 'DO: 3.1 mg/L (Sep 29, 2023)',
        exceedanceDelta: '+93% over threshold',
        citation: 'MPPCB Archive #2023-BPL-L2',
        status: 'Severe Hypoxia'
      }
    ],
    gapNotice: 'Zero municipal samples logged between Feb 14, 2024 and May 30, 2024. Baseline pre-monsoon organic loading cannot be deterministically verified without interpolation. Deterministic rule-set §4.1 strictly prohibits artificial imputation in legal audit mode.',
    statutoryAction: 'Allocate Mobile Surveillance Team Alpha to Prempura Ghat for pre-visarjan grab sampling (target: Aug 26–28, 2025). Dispatch environmental field van with cold-chain icebox and calibrate dissolved oxygen probe sensors to MPPCB SOP Revision 4.',
    activeEvidenceCitationId: 'MPPCB-2024-DOC889'
  },
  {
    id: 'msg-3',
    sender: 'user',
    timestamp: 'Today, 10:48 AM · Priority Justification',
    content: 'Explain why Shahpura Lake Ghat has High Priority despite having fewer exceedance flags than Prempura.'
  },
  {
    id: 'msg-4',
    sender: 'assistant',
    timestamp: 'Today, 10:48 AM · Data Quality & Risk Deficit Model',
    content: 'Data Quality & Risk Deficit Model',
    ruleCitation: 'Rule §4.2 CPCB Uncertainty Scoring: "Unmonitored urban water bodies with high public footfall carry elevated uncertainty penalties. Absence of evidence does not indicate water safety."',
    executiveFinding: 'Shahpura Lake Ghat (Sector B) is prioritised under the Data Quality & Risk Deficit Model rather than active chemical threshold breaches. It exhibits a severe 14-month unmonitored window (62.5% data deficit) with zero grab samples logged between Q4 2023 and Q1 2025.',
    shapBreakdown: [
      { factor: 'Data Deficit Penalty (14 mos unmonitored)', score: '+52 pts', percentage: 52, color: 'bg-error' },
      { factor: 'High Public Footfall (Sector B immersion)', score: '+24 pts', percentage: 24, color: 'bg-primary' },
      { factor: 'Historical Exceedance Memory', score: '+8 pts', percentage: 8, color: 'bg-tertiary' }
    ],
    recommendedAction: 'Prioritise Shahpura Ghat for immediate grab sampling in Cycle 1 to close critical baseline void before festive season immersion mobilization.'
  }
];

export const DEFAULT_THRESHOLDS: StatutoryThresholds = {
  bodPermissible: 3.0,
  bodExceedance: 5.0,
  bodVisarjanSpike: 8.5,
  doMinimum: 5.0,
  doHypoxic: 4.0,
  doAnoxic: 2.0,
  phMin: 6.5,
  phMax: 8.5,
  fColiDesirable: 500,
  fColiMax: 2500,
  strictCpcbScheduleVi: true,
  immutableAuditLogging: true,
  imputationMode: 'strict-non-interpolation'
};

export const DEFAULT_RISK_WEIGHTS: RiskWeights = {
  w1Bod: 35,
  w2Do: 25,
  w3DataGap: 25,
  w4Volatility: 15
};
