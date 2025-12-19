/**
 * Company Research API Endpoint
 * 
 * This endpoint handles company research requests by:
 * 1. Accepting a company name and filter preferences
 * 2. Using OpenAI's GPT-4 to gather comprehensive research data
 * 3. Parsing and organizing results according to the research template
 * 4. Returning structured data matching the ResearchResult type
 */

import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/research
 * 
 * Request body:
 * {
 *   companyName: string;
 *   includeFinancials: boolean;
 *   includeLeadership: boolean;
 *   includeTechnology: boolean;
 *   includeNews: boolean;
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { companyName, includeFinancials, includeLeadership, includeTechnology, includeNews } = body;

    // Validate input
    if (!companyName || typeof companyName !== 'string' || companyName.trim() === '') {
      return NextResponse.json(
        { error: 'Company name is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate API key is configured
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error. Please ensure OPENAI_API_KEY is set.' },
        { status: 500 }
      );
    }

    // Build research query based on filters
    let researchQuery = `You are a comprehensive business research assistant. Provide detailed research on ${companyName}. `;
    
    if (includeFinancials) {
      researchQuery += `Include: revenue, earnings, financial performance, budget cycles, estimated revenue range, headcount growth, fiscal year end. `;
    }
    
    if (includeLeadership) {
      researchQuery += `Include: CEO, CFO, CIO, Chief Medical Officer, Chief Digital Officer, Chief AI Officer, Chief Operating Officer, Chief Strategy Officer, and other C-suite executives with their names and titles. `;
    }
    
    if (includeTechnology) {
      researchQuery += `Include: technology implementations in the past 12 months, AI and digital initiatives, PACS vendors, clinical documentation systems, radiology technology, ambient documentation tools, EHR systems. `;
    }
    
    if (includeNews) {
      researchQuery += `Include: recent press releases (past 6-12 months), news coverage, facility expansions, new hiring announcements, strategic partnerships, clinical trials, research publications, rankings. `;
    }

    researchQuery += `Provide specific, factual information with dates and details where available. Format the response with clear sections and bullet points for easy parsing.`;

    console.log('Calling OpenAI API with query:', researchQuery.substring(0, 100) + '...');

    // Call OpenAI API for research
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a comprehensive business research assistant specializing in healthcare organizations and enterprise companies. Provide detailed, factual information based on your knowledge cutoff.',
          },
          {
            role: 'user',
            content: researchQuery,
          },
        ],
        max_tokens: 4000,
        temperature: 0.3,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: `OpenAI API error: ${errorData.error?.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    const openaiData = await openaiResponse.json();
    const researchContent = openaiData.choices[0]?.message?.content || '';

    if (!researchContent) {
      return NextResponse.json(
        { error: 'No research data returned from OpenAI' },
        { status: 500 }
      );
    }

    // Parse the research content and structure it
    const result = {
      companyName,
      companyInfo: parseCompanyInfo(researchContent, companyName),
      keyPeople: parseKeyPeople(researchContent),
      summaryData: parseSummaryData(researchContent),
      sources: ['OpenAI GPT-4 Knowledge Base', `Research Date: ${new Date().toLocaleDateString()}`],
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Research API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during research';
    return NextResponse.json(
      { error: `Research failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}

/**
 * Parse company information from research content
 */
function parseCompanyInfo(content: string, companyName: string) {
  return {
    businessName: companyName,
    description: extractSection(content, 'description', 'overview', 'about'),
    website: extractUrl(content),
    companyType: extractSection(content, 'type', 'organization', 'healthcare'),
    yearFounded: extractYear(content),
    headcountRange: extractSection(content, 'employees', 'headcount', 'staff'),
    estimatedRevenueRange: extractSection(content, 'revenue', 'financial', 'billion', 'million'),
    hqCountry: extractSection(content, 'headquarters', 'location', 'based'),
    numberOfHospitalLocations: extractSection(content, 'hospital', 'locations', 'facilities'),
    hospitalBeds: extractSection(content, 'beds', 'capacity', 'inpatient'),
    pacsVendor: extractSection(content, 'PACS', 'vendor', 'imaging system'),
    radiologyReportingVendor: extractSection(content, 'radiology', 'reporting', 'speech recognition'),
  };
}

/**
 * Parse key people and leadership from research content
 */
function parseKeyPeople(content: string) {
  const people: { persona: string; name: string; title: string; department: string }[] = [];
  
  const titlePatterns = [
    { title: 'CEO', pattern: /(?:Chief Executive Officer|CEO)[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi },
    { title: 'CFO', pattern: /(?:Chief Financial Officer|CFO)[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi },
    { title: 'CIO', pattern: /(?:Chief Information Officer|CIO)[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi },
    { title: 'Chief Medical Officer', pattern: /Chief Medical Officer[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi },
    { title: 'Chief Digital Officer', pattern: /Chief Digital Officer[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi },
    { title: 'Chief AI Officer', pattern: /Chief AI Officer[:\s]+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/gi },
  ];

  titlePatterns.forEach(({ title, pattern }) => {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      if (match[1]) {
        const name = match[1].trim();
        if (!people.some(p => p.name.toLowerCase() === name.toLowerCase())) {
          people.push({
            persona: title,
            name,
            title,
            department: 'Executive',
          });
        }
      }
    }
  });

  return people;
}

/**
 * Parse summary data from research content
 */
function parseSummaryData(content: string) {
  return {
    overallSystem: extractSection(content, 'overall', 'system', 'organization'),
    financials: extractSection(content, 'financial', 'revenue', 'earnings'),
    complianceReputationRisk: extractSection(content, 'compliance', 'reputation', 'regulatory'),
    strategicDirection: extractSection(content, 'strategic', 'direction', 'future'),
    radiologyImagingExpansion: extractSection(content, 'radiology', 'expansion', 'imaging'),
    currentReportingStack: extractSection(content, 'reporting', 'stack', 'documentation'),
    pacsImagingStack: extractSection(content, 'PACS', 'imaging', 'picture archiving'),
    ambientClinicalDocumentation: extractSection(content, 'ambient', 'documentation', 'voice'),
    aiDigitalPosture: extractSection(content, 'AI', 'digital', 'artificial intelligence'),
    aiGovernanceData: extractSection(content, 'AI governance', 'data management', 'governance'),
    radiologyWorkforce: extractSection(content, 'radiology', 'workforce', 'radiologist'),
    edAcuteCareExpansion: extractSection(content, 'emergency', 'acute care', 'ED'),
    inpatientWomensNeonatalGrowth: extractSection(content, 'inpatient', 'womens', 'neonatal'),
    pediatricsChildrensHospital: extractSection(content, 'pediatrics', 'children', 'pediatric'),
    internalInnovationRadiology: extractSection(content, 'innovation', 'radiology', 'new technology'),
    negativeOutcomesMalpractice: extractSection(content, 'negative', 'outcomes', 'malpractice'),
    reputationRankings: extractSection(content, 'ranking', 'reputation', 'national'),
    leadershipChanges: extractSection(content, 'leadership', 'changes', 'appointed'),
    aiProstateOncologyFocus: extractSection(content, 'AI', 'prostate', 'oncology'),
  };
}

/**
 * Extract a specific section from content
 */
function extractSection(content: string, ...keywords: string[]): string {
  const sentences = content.split(/[.!?]+/);
  
  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase();
    if (keywords.some(keyword => lowerSentence.includes(keyword.toLowerCase()))) {
      const trimmed = sentence.trim();
      if (trimmed.length > 20 && trimmed.length < 500) {
        return trimmed;
      }
    }
  }
  
  return '';
}

/**
 * Extract URLs from content
 */
function extractUrl(content: string): string {
  const urlPattern = /https?:\/\/[^\s)]+/;
  const match = content.match(urlPattern);
  return match ? match[0] : '';
}

/**
 * Extract year founded from content
 */
function extractYear(content: string): string {
  const yearPattern = /(?:founded|established|incorporated|created)\s+(?:in\s+)?(\d{4})/i;
  const match = content.match(yearPattern);
  return match ? match[1] : '';
}
