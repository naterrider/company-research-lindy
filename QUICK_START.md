# Company Research Tool - Quick Start Guide

## What You Have

A fully functional company research application that:
- ✅ Searches for any company by name
- ✅ Gathers comprehensive data matching your research template
- ✅ Organizes results by category (Financials, Leadership, Technology, News)
- ✅ Exports results as JSON
- ✅ Provides source citations
- ✅ **Powered by OpenAI's GPT-4** (uses your ChatGPT Pro subscription)

## Getting Started (5 minutes)

### 1. Get Your OpenAI API Key

You already have ChatGPT Pro, so you can use your OpenAI account:

```bash
# Visit: https://platform.openai.com/api-keys
# Sign in with your ChatGPT account
# Click "Create new secret key"
# Copy the key (you won't see it again!)
```

### 2. Set Up API Key (1 minute)

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
# OPENAI_API_KEY=sk-proj-your-key-here
```

### 3. Start the Server

The dev server is already running on port 3000. If you need to restart:

```bash
npm run dev
# or
bun run dev
```

### 4. Open the App

Navigate to: **http://localhost:3000**

## How to Use

### Basic Search

1. **Enter a company name** (e.g., "Northwell Health", "Mayo Clinic")
2. **Select what to research:**
   - ✓ Financials & Revenue
   - ✓ Leadership & People
   - ✓ Technology & AI
   - ✓ News & Press Releases
3. **Click "Research Company"**
4. **Wait for results** (10-30 seconds)
5. **Review organized results**
6. **Click "Export"** to download JSON

### Example Companies to Try

- Northwell Health
- Mayo Clinic
- Cleveland Clinic
- Kaiser Permanente
- Geisinger Health System
- Intermountain Healthcare
- Ascension Health
- Atrium Health

## What Data You Get

### Company Info
- Business name, description, website
- Year founded, headquarters
- Revenue range, headcount
- Hospital locations and beds
- Technology vendors (PACS, reporting systems)

### Leadership
- CEO, CFO, CIO, CMO, CDO, CAIO
- Department chairs
- Key executives with titles

### Technology
- Recent implementations (past 12 months)
- AI and digital initiatives
- PACS and imaging systems
- Clinical documentation tools

### News & Strategic
- Press releases (past 6-12 months)
- Facility expansions
- Hiring announcements
- Clinical trials
- Research publications
- Rankings and reputation

## API Integration

The app has a built-in API endpoint you can use:

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

## File Structure

```
company-research/
├── app/
│   ├── page.tsx              # Main search interface
│   ├── api/research/route.ts # Research API endpoint (uses OpenAI)
│   └── layout.tsx            # Root layout
├── lib/
│   └── types.ts              # Data type definitions
├── .env.local                # Your API keys (create from .env.example)
├── OPENAI_SETUP.md           # OpenAI configuration guide
├── SETUP.md                  # Detailed setup guide
└── QUICK_START.md            # This file
```

## Customization

### Add More Research Categories

1. Edit `lib/types.ts` - Add fields to `SummaryData`
2. Edit `app/api/research/route.ts` - Add parsing logic
3. Edit `app/page.tsx` - Add new tabs for display

### Change AI Model

In `app/api/research/route.ts`, change:
```typescript
model: 'gpt-4-turbo'  // Most capable (recommended)
// to:
model: 'gpt-4'        // Slower but cheaper
// or:
model: 'gpt-3.5-turbo' // Fastest and cheapest
```

## Troubleshooting

### "API configuration error"
- Check `.env.local` has your OpenAI API key
- Verify the API key is correct (starts with `sk-proj-`)
- Restart the dev server

### No results returned
- Try a different company name
- Make sure at least one filter is checked
- Try a more well-known organization

### Slow response
- This is normal (10-30 seconds)
- Uncheck filters you don't need
- Try a simpler company name

### "Failed to research company"
- Check your OpenAI API key is valid
- Visit https://platform.openai.com/api-keys to verify
- Check your API usage at https://platform.openai.com/account/usage

## Cost Information

**OpenAI API Pricing:**
- GPT-4 Turbo: $0.01 per 1K input tokens, $0.03 per 1K output tokens
- Typical research: ~2,000-4,000 tokens per search
- Estimated cost: $0.05-0.15 per company search

**Monitor your usage:**
- Visit https://platform.openai.com/account/usage
- Set usage limits if desired

## Next Steps

1. ✅ Get your OpenAI API key
2. ✅ Add to `.env.local`
3. ✅ Test with a company search
4. ✅ Export results as JSON
5. 🚀 Deploy to production (Vercel recommended)

## Deployment

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

The app is a standard Next.js 14 application and works on:
- Netlify
- AWS Amplify
- Railway
- Render
- Heroku

## Support

- **OpenAI API Docs:** https://platform.openai.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **shadcn/ui:** https://ui.shadcn.com

---

**Ready to research?** Open http://localhost:3000 and start searching!

For detailed OpenAI setup, see **OPENAI_SETUP.md**
