# Company Research Tool

A comprehensive web application for researching companies using your custom research template. Built with Next.js, TypeScript, and **OpenAI's GPT-4**.

## 🎯 What This Does

This tool answers your original question: **"Can I provide a company name and get results including or related to what I have listed in my template?"**

**Answer: Yes!** ✅

Simply:
1. Enter a company name (e.g., "Northwell Health")
2. Select what to research (Financials, Leadership, Technology, News)
3. Click "Research Company"
4. Get comprehensive results organized by your template categories
5. Export as JSON for further analysis

## 🚀 Quick Start

### 1. Get OpenAI API Key (2 minutes)
```bash
# Visit https://platform.openai.com/api-keys
# Sign in with your ChatGPT account
# Create new secret key
# Copy the key
```

### 2. Configure
```bash
cp .env.example .env.local
# Edit .env.local and add your OpenAI API key
```

### 3. Run
```bash
npm run dev
# Open http://localhost:3000
```

### 4. Search
- Enter company name
- Select filters
- Click "Research Company"
- Review results
- Export as JSON

## 📋 Template Integration

Your research template has been fully integrated:

### Summary Data (20 Categories)
- Overall System
- Financials
- Compliance & Reputation Risk
- Strategic Direction
- Radiology & Imaging Expansion
- Current Reporting Stack
- PACS / Imaging Stack
- Ambient & Clinical Documentation
- AI & Digital Posture
- AI Governance & Data
- Radiology Workforce
- ED & Acute Care Expansion
- Inpatient & Women's/Neonatal Growth
- Pediatrics & Children's Hospital
- Internal Innovation in Radiology
- Negative Outcomes & Malpractice
- Reputation & Rankings
- Leadership Changes
- AI & Prostate / Oncology Focus
- Key Stakeholders

### Company Info (30+ Fields)
- Business basics (name, description, website, type, founded)
- Operational data (headcount, revenue, locations, beds)
- Healthcare-specific (radiology volume, radiologists, affiliations)
- Technology stack (PACS, reporting vendors)
- Recent implementations (past 12 months)
- Recent announcements (past 6-12 months)
- Strategic activities (job openings, clinical trials, RFPs)

### People Info (20+ Personas)
- C-Suite executives (CEO, CFO, CIO, CMO, CDO, CAIO, etc.)
- Department chairs (Radiology, Emergency, Cardiology, etc.)
- Clinical leadership (radiologists, emergency physicians)
- Operations & management (IT directors, PACS admin, procurement)

## 🏗️ Architecture

```
Frontend (Next.js App Router)
    ↓
User enters company name + filters
    ↓
API Endpoint (/api/research)
    ↓
OpenAI GPT-4 API
    ↓
Parse & Structure Results
    ↓
Display in UI + Export as JSON
```

## 📁 Project Structure

```
company-research/
├── app/
│   ├── page.tsx                    # Main search interface
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Global styles
│   └── api/
│       └── research/
│           └── route.ts            # Research API endpoint (OpenAI)
├── components/
│   └── ui/                         # shadcn/ui components
├── lib/
│   ├── types.ts                    # TypeScript type definitions
│   └── utils.ts                    # Utility functions
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── .env.local                      # Your API keys (create from .env.example)
├── package.json                    # Dependencies
├── QUICK_START.md                  # Quick start guide
├── OPENAI_SETUP.md                 # OpenAI configuration guide
├── SETUP.md                        # Detailed setup guide
├── TEMPLATE_MAPPING.md             # How template is integrated
└── README.md                       # This file
```

## 🔧 How It Works

### 1. User Submits Search
```json
{
  "companyName": "Northwell Health",
  "includeFinancials": true,
  "includeLeadership": true,
  "includeTechnology": true,
  "includeNews": true
}
```

### 2. API Builds Research Query
The query includes:
- Company name
- Selected categories from your template
- Request for specific fields (CEO, CFO, PACS vendor, etc.)
- Request for recent data (past 6-12 months)

### 3. OpenAI GPT-4 Researches
- Analyzes the research query
- Provides comprehensive information based on its knowledge base
- Structures response with clear sections

### 4. Results Are Parsed & Structured
- Extracted data is organized into your template structure
- Company info, people, and summary data are separated
- Sources are documented

### 5. Results Displayed & Exported
- UI shows organized results in tabs
- Export button downloads JSON file
- Sources are listed for reference

## 📊 Example Output

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
    }
  },
  "keyPeople": [
    {
      "persona": "CEO",
      "name": "Michael Dowling",
      "title": "CEO",
      "department": "Executive"
    }
  ],
  "summaryData": {
    "overallSystem": "Northwell Health is the largest healthcare provider in New York...",
    "financials": "Annual revenue of $18.5 billion with strong growth...",
    "strategicDirection": "Focused on AI implementation and digital transformation..."
  },
  "sources": ["OpenAI GPT-4 Knowledge Base"],
  "lastUpdated": "2025-12-18T20:00:00Z"
}
```

## 🎨 Features

✅ **Company Search** - Enter any company name
✅ **Customizable Filters** - Choose what to research
✅ **Template-Based Results** - Organized by your categories
✅ **Leadership Extraction** - Identifies C-suite and key personnel
✅ **Technology Stack** - Finds PACS, reporting, and AI vendors
✅ **Recent News** - Gathers past 6-12 months of announcements
✅ **Export to JSON** - Download results for analysis
✅ **Source Documentation** - Know where data came from
✅ **Responsive Design** - Works on desktop and mobile
✅ **Real-time Search** - Powered by OpenAI GPT-4

## 🔌 API Endpoint

### POST /api/research

**Request:**
```bash
curl -X POST http://localhost:3000/api/research \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Northwell Health",
    "includeFinancials": true,
    "includeLeadership": true,
    "includeTechnology": true,
    "includeNews": true
  }'
```

**Response:** ResearchResult object with company data

## 🛠️ Customization

### Add New Research Categories

1. Edit `lib/types.ts` - Add fields to interfaces
2. Edit `app/api/research/route.ts` - Add parsing logic
3. Edit `app/page.tsx` - Add UI tabs/sections

### Change AI Model

In `app/api/research/route.ts`:
```typescript
model: 'gpt-4-turbo'  // Most capable (recommended)
model: 'gpt-4'        // Slower but cheaper
model: 'gpt-3.5-turbo' // Fastest and cheapest
```

### Modify Research Query

In `app/api/research/route.ts`, customize the `researchQuery` variable to focus on specific areas.

## 📚 Documentation

- **QUICK_START.md** - Get started in 5 minutes
- **OPENAI_SETUP.md** - OpenAI configuration and API key setup
- **SETUP.md** - Detailed setup and configuration
- **TEMPLATE_MAPPING.md** - How your template is integrated
- **Code Comments** - Detailed explanations in source files

## 💰 Cost Information

**OpenAI API Pricing:**
- GPT-4 Turbo: $0.01 per 1K input tokens, $0.03 per 1K output tokens
- Typical research: ~2,000-4,000 tokens per search
- Estimated cost: $0.05-0.15 per company search

**Monitor Usage:**
- Visit https://platform.openai.com/account/usage
- Set usage limits if desired

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# OPENAI_API_KEY=your_key
```

### Deploy to Other Platforms

Works on any Node.js hosting:
- Netlify
- AWS Amplify
- Railway
- Render
- Heroku

## 🔐 Security

- ✅ API keys stored server-side only
- ✅ Never exposed to frontend
- ✅ Environment variables in `.env.local` (not committed)
- ✅ OpenAI API calls authenticated
- ✅ No data persistence (results only in memory)

## 📈 Use Cases

### Sales Intelligence
- Research prospect companies
- Identify decision-makers
- Understand technology stack
- Export for CRM

### Competitive Analysis
- Track competitor companies
- Monitor leadership changes
- Follow technology implementations
- Analyze strategic direction

### Partnership Evaluation
- Research potential partners
- Understand organizational structure
- Identify key stakeholders
- Assess financial health

### Market Research
- Track industry trends
- Monitor facility expansions
- Follow hiring patterns
- Analyze technology adoption

## 🤝 Contributing

To customize or extend the tool:

1. Review the code comments for detailed explanations
2. Check `TEMPLATE_MAPPING.md` for how data is structured
3. Modify `lib/types.ts` for new data fields
4. Update `app/api/research/route.ts` for new parsing logic
5. Enhance `app/page.tsx` for new UI features

## 📞 Support

- **OpenAI API Docs:** https://platform.openai.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com
- **TypeScript:** https://www.typescriptlang.org

## 📝 License

This project is provided as-is for your use.

## 🎉 Getting Started

1. **Get OpenAI API Key** - https://platform.openai.com/api-keys
2. **Configure `.env.local`** - Add your API key
3. **Start Dev Server** - `npm run dev`
4. **Open Browser** - http://localhost:3000
5. **Search a Company** - Enter name and click "Research"
6. **Export Results** - Download as JSON

---

**Ready to research?** Open http://localhost:3000 and start searching!

For detailed setup instructions, see **QUICK_START.md** or **OPENAI_SETUP.md**.
