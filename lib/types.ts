/**
 * Type definitions for company research data
 * Based on the research template provided by the user
 */

export interface CompanyInfo {
  businessName: string;
  description: string;
  website: string;
  companyType: string;
  fiscalYearEnd: string;
  headcountGrowthYoY: string;
  estimatedRevenueRange: string;
  hqCountry: string;
  hqAddress: string;
  yearFounded: string;
  headcountRange: string;
  budgetCycle: string;
  numberOfHospitalLocations: string;
  hospitalBeds: string;
  annualRadiologyExamVolume: string;
  numberOfRadiologists: string;
  radiologistAffiliation: string;
  radiologyReportingVendor: string;
  pacsVendor: string;
  mostRecentAnnualReport: {
    revenue: string;
    earnings: string;
    penalties: string;
    challenges: string;
    strategicPriorities: string;
  };
  newTechnologyImplemented: {
    radiology: string;
    ambientClinicalDocumentation: string;
    artificialIntelligence: string;
  };
  newHiringAnnouncements: {
    digitalLeadership: string;
    clinicalLeadership: string;
    cSuiteAdministrative: string;
  };
  facilityExpansions: {
    emergencyDepartment: string;
    radiology: string;
    inpatient: string;
  };
  pressReleases: {
    radiology: string;
  };
  negativePatientOutcomes: {
    radiology: string;
  };
  mediaCovarage: {
    positiveAcuteCareOutcomes: string;
  };
  podcastParticipation: {
    radiology: string;
  };
  grantAwards: {
    radiology: string;
  };
  jobOpenings: {
    cSuite: string;
    aiDigitalLeadership: string;
    aiGovernance: string;
    radiology: string;
    pulmonaryEmbolismResponse: string;
    emergencyMedicineTrauma: string;
  };
  clinicalTrials: {
    radiology: string;
  };
  researchPublications: {
    radiology: string;
  };
  rfps: {
    radiology: string;
    ambientClinicalDocumentation: string;
  };
  nationalRankings: string;
}

export interface PersonInfo {
  persona: string;
  name: string;
  title: string;
  department: string;
  email?: string;
  linkedinUrl?: string;
  notes?: string;
}

export interface ResearchResult {
  companyName: string;
  companyInfo: Partial<CompanyInfo>;
  keyPeople: PersonInfo[];
  summaryData: {
    overallSystem: string;
    financials: string;
    complianceReputationRisk: string;
    strategicDirection: string;
    radiologyImagingExpansion: string;
    currentReportingStack: string;
    pacsImagingStack: string;
    ambientClinicalDocumentation: string;
    aiDigitalPosture: string;
    aiGovernanceData: string;
    radiologyWorkforce: string;
    edAcuteCareExpansion: string;
    inpatientWomensNeonatalGrowth: string;
    pediatricsChildrensHospital: string;
    internalInnovationRadiology: string;
    negativeOutcomesMalpractice: string;
    reputationRankings: string;
    leadershipChanges: string;
    aiProstateOncologyFocus: string;
  };
  sources: string[];
  lastUpdated: string;
}

export interface SearchQuery {
  companyName: string;
  includeFinancials: boolean;
  includeLeadership: boolean;
  includeTechnology: boolean;
  includeNews: boolean;
}
