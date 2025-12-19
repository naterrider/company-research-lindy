# OpenAI Integration Setup

This application now uses **OpenAI's GPT-4** for company research instead of Perplexity.

## Why OpenAI?

✅ You already have a paid ChatGPT Pro tier
✅ GPT-4 is excellent for comprehensive research
✅ Better integration with your existing subscription
✅ No additional API costs if you have credits

## Getting Your OpenAI API Key

### Step 1: Go to OpenAI Platform
Visit: https://platform.openai.com/api-keys

### Step 2: Sign In
- Use your ChatGPT Pro account credentials
- If you don't have an account, create one

### Step 3: Create API Key
1. Click "Create new secret key"
2. Give it a name (e.g., "Company Research Tool")
3. Copy the key (you won't see it again!)

### Step 4: Add to Your Project
```bash
# Edit .env.local
OPENAI_API_KEY=sk-proj-your-key-here
```

## Configuration

### 1. Copy Environment Template
```bash
cp .env.example .env.local
```

### 2. Edit .env.local
```bash
# Add your OpenAI API key
OPENAI_API_KEY=sk-proj-your-actual-key-here

# Application settings (optional)
NEXT_PUBLIC_APP_NAME=Company Research Tool
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Save and Restart
```bash
# Restart the dev server
npm run dev
```

## How It Works

### Research Flow
```
You enter company name
        ↓
App sends request to OpenAI API
        ↓
GPT-4 researches the company
        ↓
Results parsed and organized
        ↓
Display in UI
        ↓
Export as JSON
```

### What GPT-4 Researches

The app sends a detailed prompt to GPT-4 that includes:
- Company name
- Selected research categories
- Your template fields
- Request for specific data (CEO, CFO, PACS vendor, etc.)
- Request for recent information

GPT-4 then provides comprehensive research based on its knowledge base.

## API Usage & Costs

### Pricing
- **GPT-4 Turbo**: $0.01 per 1K input tokens, $0.03 per 1K output tokens
- **Typical research**: ~2,000-4,000 tokens per search
- **Estimated cost**: $0.05-0.15 per company search

### Monitoring Usage
1. Visit https://platform.openai.com/account/usage
2. View your API usage and costs
3. Set usage limits if desired

### Cost Optimization
- Uncheck filters you don't need (reduces token usage)
- Use simpler company names
- Batch searches together

## Troubleshooting

### "API configuration error"
**Problem:** OPENAI_API_KEY is not set

**Solution:**
1. Check `.env.local` exists
2. Verify `OPENAI_API_KEY=sk-proj-...` is set
3. Restart dev server: `npm run dev`
4. Check for typos in the key

### "Failed to research company"
**Problem:** API key is invalid or expired

**Solution:**
1. Go to https://platform.openai.com/api-keys
2. Check if your key is still active
3. Create a new key if needed
4. Update `.env.local`
5. Restart dev server

### "No research data returned"
**Problem:** GPT-4 couldn't find information

**Solution:**
1. Try a different company name
2. Try a more well-known organization
3. Check your internet connection
4. Verify API key is valid

### "Rate limit exceeded"
**Problem:** Too many requests in short time

**Solution:**
1. Wait a few minutes
2. Check your usage at https://platform.openai.com/account/usage
3. Consider setting usage limits

## Switching Back to Perplexity

If you want to switch back to Perplexity:

1. Update `.env.local`:
```bash
PERPLEXITY_API_KEY=your_key_here
```

2. Revert `app/api/research/route.ts` to use Perplexity API

3. Restart dev server

## API Key Security

⚠️ **Important Security Notes:**

- ✅ Never commit `.env.local` to git (it's in `.gitignore`)
- ✅ Never share your API key
- ✅ Rotate keys periodically
- ✅ Use environment variables for production
- ✅ Monitor usage for unusual activity

## Production Deployment

### On Vercel
1. Go to your Vercel project settings
2. Add environment variable: `OPENAI_API_KEY`
3. Paste your API key
4. Redeploy

### On Other Platforms
Set environment variable `OPENAI_API_KEY` in your hosting platform's dashboard.

## Advanced Configuration

### Change Model
In `app/api/research/route.ts`, change:
```typescript
model: 'gpt-4-turbo'  // Current (recommended)
// to:
model: 'gpt-4'        // Slower but cheaper
// or:
model: 'gpt-3.5-turbo' // Fastest and cheapest
```

### Adjust Temperature
In `app/api/research/route.ts`:
```typescript
temperature: 0.3  // Current (factual)
// Lower = more factual
// Higher = more creative
```

### Increase Token Limit
```typescript
max_tokens: 4000  // Current
// Increase for more detailed responses
```

## Support

- **OpenAI API Docs:** https://platform.openai.com/docs
- **API Reference:** https://platform.openai.com/docs/api-reference
- **Status Page:** https://status.openai.com

## Next Steps

1. ✅ Get your OpenAI API key
2. ✅ Add to `.env.local`
3. ✅ Restart dev server
4. ✅ Test with a company search
5. ✅ Monitor usage and costs

---

**Ready to research?** Open http://localhost:3000 and start searching!
