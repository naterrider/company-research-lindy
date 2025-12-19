# Research Template Mapping

This document explains how the Company Research Tool maps to your research template.

## Your Template Structure

Your template has three main sections:

1. **Summary Data** (20 categories)
2. **Company Info** (30+ fields)
3. **People Info** (20+ personas)

## How the App Uses Your Template

### 1. Summary Data Categories

The app researches all 20 summary data categories:

| Category | What It Researches | Example |
|----------|-------------------|---------|
| Overall System | General system overview and structure | "Northwell Health operates 23 hospitals..." |
| Financials | Revenue, earnings, financial performance | "Annual revenue of $X billion" |
| Compliance & Reputation Risk | Regulatory issues, reputation | "No major compliance violations" |
| Strategic Direction | Future plans and initiatives | "Expanding AI and digital capabilities" |
| Radiology & Imaging Expansion | Radiology department growth | "New imaging center in 2024" |
| Current Reporting Stack | Documentation systems in use | "Uses Epic EHR system" |
| PACS / Imaging Stack | Picture archiving systems | "Philips IntelliSpace PACS" |
| Ambient & Clinical Documentation | Voice-to-text and documentation tools | "Nuance Dragon ambient documentation" |
| AI & Digital Posture | AI initiatives and digital transformation | "Launched AI governance office" |
| AI Governance & Data | AI oversight and data management | "Chief AI Officer appointed" |
| Radiology Workforce | Radiologist staffing and hiring | "150+ radiologists across system" |
| ED & Acute Care Expansion | Emergency department growth | "New trauma center opening" |
| Inpatient & Women's/Neonatal Growth | Inpatient services expansion | "Expanded women's health services" |
| Pediatrics & Children's Hospital | Pediatric services | "Children's hospital with 200 beds" |
| Internal Innovation in Radiology | New radiology technologies | "Implementing AI-powered diagnostics" |
| Negative Outcomes & Malpractice | Patient safety issues | "Malpractice claims and outcomes" |
| Reputation & Rankings | Hospital rankings and reputation | "Ranked #15 nationally" |
| Leadership Changes | Executive changes | "New CEO appointed in 2024" |
| AI & Prostate / Oncology Focus | Cancer-focused AI initiatives | "AI for prostate cancer detection" |
| Key Stakeholders | Important partners and stakeholders | "Partners with major universities" |

### 2. Company Info Fields

The app gathers these company information fields:

**Basic Information:**
- Business Name
- Description
- Website
- Company Type
- Year Founded
- Headquarters (Country & Address)

**Operational Data:**
- Headcount Range
- Headcount Growth Y/Y %
- Estimated Revenue Range
- Budget Cycle
- Fiscal Year End

**Healthcare-Specific:**
- Number of Hospital Locations
- Hospital Beds
- Annual Radiology Exam Volume
- Number of Radiologists
- Radiologist Affiliation

**Technology Stack:**
- PACS Vendor
- Radiology Reporting & Speech Recognition Vendor
- Ambient & Clinical Documentation Vendor

**Recent Performance:**
- Most Recent Annual Report Summary:
  - Revenue
  - Earnings
  - Penalties
  - Challenges
  - Strategic Priorities

**Recent Implementations (Past 12 Months):**
- New Technology - Radiology
- New Technology - Ambient & Clinical Documentation
- New Technology - Artificial Intelligence (AI)

**Recent Announcements (Past 6-12 Months):**
- New Hiring - Digital Leadership
- New Hiring - Clinical Leadership
- New Hiring - C-Suite & Administrative Leadership
- Facility Expansions - Emergency Department
- Facility Expansions - Radiology
- Facility Expansions - Inpatient
- Press Releases - Radiology
- Negative Patient Outcomes - Radiology
- Media Coverage - Positive Acute Care Outcomes
- Podcast Participation - Radiology
- Grant Awards & Federal Funding - Radiology

**Strategic Activities:**
- Job Openings (Past 6-12 Months):
  - C-Suite
  - AI & Digital Leadership
  - AI Governance
  - Radiology
  - Pulmonary Embolism Response
  - Emergency Medicine / Trauma
- Clinical Trials - Radiology
- Research Publications - Radiology
- RFPs - Radiology
- RFPs - Ambient & Clinical Documentation
- National Rankings

### 3. People Info Personas

The app searches for these leadership personas:

**C-Suite Executives:**
- Chief Executive Officer (CEO)
- Chief Financial Officer (CFO)
- Chief Operating Officer (COO)
- Chief Information Officer (CIO)
- Chief Information Security Officer (CISO)
- Chief Medical Officer (CMO)
- Chief Strategy Officer (CSO)
- Chief Technology Officer (CTO)
- Chief Innovation Officer
- Chief Transformation Officer (CTrO)
- Chief Digital Officer (CDO)
- Chief AI Officer (CAIO)
- Chief Medical Informatics Officer / Chief Health Informatics Officer (CMIO/CHIO)

**Department Chairs:**
- Chair of Radiology Department
- Chair of Emergency Medicine / Trauma Department
- Chair of Cardiovascular Department / Chair of Heart & Vascular Center
- Chair of Neurovascular Department
- Chair of Pulmonology Department

**Clinical Leadership:**
- Chief of Emergency Medicine (System-Level)
- Radiologist - Emergency Radiologist
- Radiologist - Head of Body Imaging
- Radiologist - Head of Cardiothoracic Imaging
- Radiologist - Head of Neuro Imaging / Neuroradiology

**Operations & Management:**
- Director of IT - General
- Director of IT - Radiology
- Director of Radiology
- PACS Administrator
- Purchasing or Procurement Director
- Contracts Manager
- SVP / VP of Finance

**Other Key Roles:**
- Any other titles likely to be involved in major software purchasing decisions

## How the Research Works

### Step 1: User Input
User enters company name and selects filters:
- Financials & Revenue
- Leadership & People
- Technology & AI
- News & Press Releases

### Step 2: Query Building
The app builds a research query that includes:
- Company name
- Selected categories
- Specific fields from your template
- Request for recent data (past 6-12 months)

### Step 3: Perplexity Research
The query is sent to Perplexity AI (Sonar Reasoning Pro model) which:
- Searches the web for company information
- Gathers recent news and announcements
- Finds leadership information
- Identifies technology implementations
- Collects financial data

### Step 4: Data Parsing
The response is parsed and structured into:
- `CompanyInfo` object (matches your template fields)
- `KeyPeople` array (matches your personas)
- `SummaryData` object (matches your 20 categories)
- `Sources` array (citations and references)

### Step 5: Display & Export
Results are displayed in the UI with:
- Overview tab (company basics)
- Category tabs (Financials, Leadership, Technology, News)
- Export button (JSON download)
- Source citations

## Example: Researching Northwell Health

### Input
```json
{
  "companyName": "Northwell Health",
  "includeFinancials": true,
  "includeLeadership": true,
  "includeTechnology": true,
  "includeNews": true
}
```

### Output Structure
```json
{
  "companyName": "Northwell Health",
  "companyInfo": {
    "businessName": "Northwell Health",
    "description": "Largest healthcare provider in New York...",
    "website": "https://www.northwell.edu",
    "yearFounded": "1997",
    "numberOfHospitalLocations": "23",
    "hospitalBeds": "7,000+",
    "estimatedRevenueRange": "$15-20 billion",
    "pacsVendor": "Philips IntelliSpace",
    "radiologyReportingVendor": "Nuance PowerScribe",
    "mostRecentAnnualReport": {
      "revenue": "$18.5 billion",
      "earnings": "$1.2 billion",
      "penalties": "None reported",
      "challenges": "Staffing shortages, rising costs",
      "strategicPriorities": "AI implementation, digital transformation"
    },
    "newTechnologyImplemented": {
      "radiology": "AI-powered diagnostic tools",
      "ambientClinicalDocumentation": "Nuance ambient documentation",
      "artificialIntelligence": "Chief AI Officer appointed"
    },
    "newHiringAnnouncements": {
      "digitalLeadership": "Chief Digital Officer hired",
      "clinicalLeadership": "New radiology directors",
      "cSuiteAdministrative": "New CFO appointed"
    }
  },
  "keyPeople": [
    {
      "persona": "CEO",
      "name": "Michael Dowling",
      "title": "CEO",
      "department": "Executive"
    },
    {
      "persona": "Chief Digital Officer",
      "name": "John Smith",
      "title": "Chief Digital Officer",
      "department": "Executive"
    },
    {
      "persona": "Chair of Radiology Department",
      "name": "Dr. Jane Doe",
      "title": "Chair of Radiology",
      "department": "Radiology"
    }
  ],
  "summaryData": {
    "overallSystem": "Northwell Health is the largest healthcare provider in New York...",
    "financials": "Annual revenue of $18.5 billion with strong growth...",
    "strategicDirection": "Focused on AI implementation and digital transformation...",
    "radiologyImagingExpansion": "Expanding imaging centers across the system...",
    "aiDigitalPosture": "Launched Chief AI Officer position and AI governance office...",
    "leadershipChanges": "New CEO and CFO appointed in 2024..."
  },
  "sources": [
    "https://www.northwell.edu",
    "https://www.northwell.edu/about/news",
    "https://www.linkedin.com/company/northwell-health"
  ],
  "lastUpdated": "2025-12-18T20:00:00Z"
}
```

## Customizing the Template

### To Add New Fields

1. **Update `lib/types.ts`**
   ```typescript
   export interface CompanyInfo {
     // ... existing fields
     newField: string;  // Add your new field
   }
   ```

2. **Update `app/api/research/route.ts`**
   ```typescript
   function parseCompanyInfo(content: string, companyName: string) {
     return {
       // ... existing fields
       newField: extractSection(content, 'new field keyword'),
     };
   }
   ```

3. **Update `app/page.tsx`**
   - Add new tab or section to display the field

### To Change Research Focus

Edit the research query in `app/api/research/route.ts`:

```typescript
let researchQuery = `Comprehensive research on ${companyName}. `;

// Add your custom research instructions
researchQuery += `Focus on: [your custom focus areas]. `;
```

## Integration with Your Workflow

### Use Case 1: Sales Intelligence
- Research prospect companies
- Identify decision-makers (C-suite, department chairs)
- Understand technology stack and recent implementations
- Export for CRM integration

### Use Case 2: Competitive Analysis
- Research competitor companies
- Track leadership changes
- Monitor technology implementations
- Analyze strategic direction

### Use Case 3: Partnership Evaluation
- Research potential partners
- Understand organizational structure
- Identify key stakeholders
- Assess financial health

### Use Case 4: Market Research
- Track industry trends
- Monitor facility expansions
- Follow hiring patterns
- Analyze technology adoption

## API Response Format

The API always returns a `ResearchResult` object:

```typescript
interface ResearchResult {
  companyName: string;
  companyInfo: Partial<CompanyInfo>;
  keyPeople: PersonInfo[];
  summaryData: {
    [key: string]: string;
  };
  sources: string[];
  lastUpdated: string;
}
```

This ensures consistent data structure across all searches.

---

**Questions?** Review the code comments in:
- `lib/types.ts` - Data structure definitions
- `app/api/research/route.ts` - Research and parsing logic
- `app/page.tsx` - UI and display logic
