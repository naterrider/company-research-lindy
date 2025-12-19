# Company Research Tool - Setup Guide

## Overview

This is a comprehensive company research application that allows you to search for detailed information about any company (especially healthcare organizations) and get results organized according to your research template.

**Key Features:**
- 🔍 Company name search with intelligent research
- 📊 Comprehensive data gathering (financials, leadership, technology, news)
- 🎯 Customizable research filters
- 📥 Export results as JSON
- 🔗 Source citations and references
- ⚡ Real-time research using Perplexity AI

## How It Works

### Architecture

1. **Frontend (Next.js App Router)**
   - Search interface with company name input
   - Filter options for research categories
   - Results display with organized data
   - Export and sharing capabilities

2. **Backend (Next.js API Routes)**
   - `/api/research` endpoint accepts company name and filters
   - Uses Perplexity AI (Sonar Reasoning Pro model) for research
   - Parses and structures results according to your template
   - Returns comprehensive ResearchResult object

3. **Data Structure**
   - Matches your provided template exactly
   - Includes Company Info, People Info, and Summary Data
   - Organized by categories: Financials, Leadership, Technology, News

### Research Template Integration

The app is built around your research template with these main sections:

**Company Info:**
- Business name, description, website
- Financial data (revenue, headcount growth)
- Operational details (hospital locations, beds, radiology volume)
- Technology vendors (PACS, reporting systems)
- Recent annual report summaries

**People Info:**
- C-suite executives (CEO, CFO, CIO, CMO, CDO, CAIO, etc.)
- Department chairs and clinical leadership
- Digital and innovation leaders
- Contact information and LinkedIn profiles

**Summary Data:**
- Overall system assessment
- Financial performance
- Compliance and reputation risks
- Strategic direction
- Technology implementations
- Facility expansions
- News and press releases
- Clinical trials and research
- Rankings and reputation

## Setup Instructions

### Prerequisites

- Node.js 18+ (comes with npm/bun)
- Perplexity API key (free tier available)

### Step 1: Get Perplexity API Key

1. Visit [Perplexity API](https://www.perplexity.ai/api)
2. Sign up for a free account
3. Generate an API key
4. Copy the key (you'll need it in Step 3)

### Step 2: Install Dependencies

The project is already initialized with Next.js and shadcn/ui. Dependencies are installed.

Verify by running:
```bash
npm list
# or
bun install
```

### Step 3: Configure Environment Variables

1. Copy the example file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add your Perplexity API key:
```bash
PERPLEXITY_API_KEY=your_actual_api_key_here
```

3. Save the file (it's in `.gitignore`, so it won't be committed)

### Step 4: Start the Development Server

The server should already be running on port 3000. If not:

```bash
npm run dev
# or
bun run dev
```

You should see:
```
> next dev
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

You should see the Company Research interface with:
- Search input for company name
- Filter checkboxes (Financials, Leadership, Technology, News)
- Research button
- Results area

## Usage Guide

### Basic Search

1. **Enter Company Name**
   - Type the company name (e.g., "Northwell Health", "Mayo Clinic", "Cleveland Clinic")
   - The app works best with well-known organizations

2. **Select Research Filters**
   - Check/uncheck categories you want to include:
     - **Financials & Revenue**: Revenue, earnings, budget cycles, headcount growth
     - **Leadership & People**: C-suite executives, department chairs, key personnel
     - **Technology & AI**: Tech implementations, PACS vendors, AI initiatives
     - **News & Press Releases**: Recent announcements, facility expansions, hiring

3. **Click "Research Company"**
   - The app will search using Perplexity AI
   - Results appear in the right panel
   - Takes 10-30 seconds depending on data availability

4. **Review Results**
   - Overview tab shows company basics
   - Additional tabs for Financials, Leadership, Technology, News (if selected)
   - Sources section shows where data came from

5. **Export Results**
   - Click "Export" button to download as JSON
   - Useful for further analysis or integration with other tools

### Advanced Features

**Export Data:**
- Results are exported as JSON with timestamp
- Filename format: `{CompanyName}-research-{YYYY-MM-DD}.json`
- Contains all structured data from the research

**Share Results:**
- Share button (future enhancement) for sharing with team members

**Multiple Searches:**
- Search for different companies without refreshing
- Previous results are replaced with new search

## API Reference

### POST /api/research

**Request:**
```json
{
  "companyName": "Northwell Health",
  "includeFinancials": true,
  "includeLeadership": true,
  "includeTechnology": true,
  "includeNews": true
}
```

**Response:**
```json
{
  "companyName": "Northwell Health",
  "companyInfo": {
    "businessName": "Northwell Health",
    "description": "...",
    "website": "https://...",
    "yearFounded": "1997",
    "estimatedRevenueRange": "$...",
    "numberOfHospitalLocations": "23",
    "pacsVendor": "...",
    ...
  },
  "keyPeople": [
    {
      "persona": "CEO",
      "name": "Michael Dowling",
      "title": "CEO",
      "department": "Executive"
    },
    ...
  ],
  "summaryData": {
    "overallSystem": "...",
    "financials": "...",
    "strategicDirection": "...",
    ...
  },
  "sources": ["https://...", "https://..."],
  "lastUpdated": "2025-12-18T..."
}
```

## Troubleshooting

### "Failed to research company" Error

**Cause:** Perplexity API key is missing or invalid

**Solution:**
1. Check `.env.local` has `PERPLEXITY_API_KEY` set
2. Verify the API key is correct (copy from Perplexity dashboard)
3. Restart the dev server: `npm run dev`

### No Results Returned

**Cause:** Company name not recognized or no public data available

**Solution:**
1. Try a more specific company name (e.g., "Northwell Health" instead of "Northwell")
2. Try a different company
3. Check that at least one filter is selected

### Slow Response Times

**Cause:** Perplexity API is processing a complex query

**Solution:**
1. This is normal - research can take 10-30 seconds
2. Uncheck filters you don't need to speed up research
3. Try a simpler company name

### TypeScript Errors

**Cause:** Missing type definitions

**Solution:**
```bash
npm install
# or
bun install
```

## Project Structure

```
company-research/
├── app/
│   ├── api/
│   │   └── research/
│   │       └── route.ts          # Research API endpoint
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Main search interface
│   └── globals.css               # Global styles
├── components/
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
├── .env.example                  # Environment variables template
├── .env.local                    # Your actual API keys (not committed)
├── package.json                  # Dependencies
└── SETUP.md                      # This file
```

## Key Files Explained

### `app/page.tsx`
- Main search interface
- Handles company name input and filters
- Displays results in organized tabs
- Manages loading and error states

### `app/api/research/route.ts`
- Receives search requests from frontend
- Builds research query based on filters
- Calls Perplexity API with Sonar Reasoning Pro model
- Parses results and structures according to template
- Returns ResearchResult object

### `lib/types.ts`
- TypeScript interfaces for all data structures
- Matches your research template exactly
- Ensures type safety throughout the app

## Customization

### Modify Research Template

To add new fields to the research template:

1. **Update `lib/types.ts`**
   - Add new fields to `CompanyInfo`, `PersonInfo`, or `SummaryData` interfaces

2. **Update `app/api/research/route.ts`**
   - Add parsing logic in `parseCompanyInfo()`, `parseKeyPeople()`, or `parseSummaryData()`
   - Update the research query to include new fields

3. **Update `app/page.tsx`**
   - Add new tabs or sections to display new data

### Change Perplexity Model

To use a different Perplexity model:

1. Open `app/api/research/route.ts`
2. Find the line: `model: 'sonar-reasoning-pro'`
3. Change to: `model: 'sonar'` or `model: 'sonar-pro'`

Available models:
- `sonar` - Fast, good for simple queries
- `sonar-pro` - Balanced speed and accuracy
- `sonar-reasoning-pro` - Most accurate, slower (recommended)

## Performance Tips

1. **Uncheck unnecessary filters** - Reduces query complexity
2. **Use specific company names** - More accurate results
3. **Cache results** - Export and reuse JSON files
4. **Batch searches** - Research multiple companies in sequence

## Security Notes

- **Never commit `.env.local`** - It's in `.gitignore`
- **API keys are server-side only** - Not exposed to frontend
- **Perplexity API calls are authenticated** - Your key is required
- **No data is stored** - Results are only in memory/browser

## Support & Resources

- **Perplexity API Docs:** https://docs.perplexity.ai
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui Components:** https://ui.shadcn.com

## Next Steps

1. ✅ Set up environment variables
2. ✅ Start the dev server
3. ✅ Test with a company search
4. ✅ Export results as JSON
5. 🚀 Deploy to production (Vercel recommended)

## Deployment

To deploy to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add `PERPLEXITY_API_KEY` to environment variables
4. Deploy

```bash
# Or deploy manually
vercel
```

---

**Questions?** Check the troubleshooting section or review the code comments for detailed explanations.
