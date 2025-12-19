/**
 * Company Research Application - Main Page
 * 
 * This page provides a comprehensive interface for researching companies
 * against the detailed research template provided by the user.
 * 
 * Features:
 * - Company name search input
 * - Multi-category research filtering (financials, leadership, technology, news)
 * - Real-time research results display
 * - Organized data presentation by category
 * - Export and sharing capabilities
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Download, Share2, AlertCircle } from 'lucide-react';
import type { ResearchResult, SearchQuery } from '@/lib/types';

export default function Home() {
  // State management for search and results
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ResearchResult | null>(null);
  
  // Filter options for what data to include in research
  const [filters, setFilters] = useState<SearchQuery>({
    companyName: '',
    includeFinancials: true,
    includeLeadership: true,
    includeTechnology: true,
    includeNews: true,
  });

  /**
   * Handle company search
   * Validates input and initiates research process
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    if (!companyName.trim()) {
      setError('Please enter a company name');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      // Call API endpoint to research company
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...filters,
          companyName: companyName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`Research failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      // Handle errors gracefully
      setError(
        err instanceof Error 
          ? err.message 
          : 'An error occurred while researching the company'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle filter checkbox changes
   * Updates which categories of data to include in research
   */
  const handleFilterChange = (key: keyof SearchQuery, value: boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Export results as JSON
   * Allows user to download research data for external use
   */
  const handleExport = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${results.companyName}-research-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Company Research</h1>
          </div>
          <p className="text-slate-600 ml-13">
            Comprehensive research tool for healthcare organizations and enterprise companies
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Search Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">Search Company</h2>
              
              <form onSubmit={handleSearch} className="space-y-6">
                {/* Company Name Input */}
                <div className="space-y-2">
                  <Label htmlFor="company-name" className="text-sm font-medium">
                    Company Name
                  </Label>
                  <Input
                    id="company-name"
                    placeholder="e.g., Northwell Health"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isLoading}
                    className="w-full"
                  />
                </div>

                {/* Research Filters */}
                <div className="space-y-3 border-t border-slate-200 pt-6">
                  <p className="text-sm font-medium text-slate-900">Include in Research:</p>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="financials"
                      checked={filters.includeFinancials}
                      onCheckedChange={(checked) =>
                        handleFilterChange('includeFinancials', checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label htmlFor="financials" className="text-sm cursor-pointer">
                      Financials & Revenue
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="leadership"
                      checked={filters.includeLeadership}
                      onCheckedChange={(checked) =>
                        handleFilterChange('includeLeadership', checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label htmlFor="leadership" className="text-sm cursor-pointer">
                      Leadership & People
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="technology"
                      checked={filters.includeTechnology}
                      onCheckedChange={(checked) =>
                        handleFilterChange('includeTechnology', checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label htmlFor="technology" className="text-sm cursor-pointer">
                      Technology & AI
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="news"
                      checked={filters.includeNews}
                      onCheckedChange={(checked) =>
                        handleFilterChange('includeNews', checked as boolean)
                      }
                      disabled={isLoading}
                    />
                    <Label htmlFor="news" className="text-sm cursor-pointer">
                      News & Press Releases
                    </Label>
                  </div>
                </div>

                {/* Search Button */}
                <Button
                  type="submit"
                  disabled={isLoading || !companyName.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Spinner className="w-4 h-4 mr-2" />
                      Researching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Research Company
                    </>
                  )}
                </Button>
              </form>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900">
                  💡 <strong>Tip:</strong> Use the filters to customize your research focus. The app will search for information matching your template categories.
                </p>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {isLoading && (
              <Card className="p-12 flex flex-col items-center justify-center">
                <Spinner className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-slate-600">Researching {companyName}...</p>
                <p className="text-sm text-slate-500 mt-2">
                  This may take a moment as we gather comprehensive data
                </p>
              </Card>
            )}

            {/* Results Display */}
            {results && !isLoading && (
              <div className="space-y-6">
                {/* Results Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {results.companyName}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Last updated: {new Date(results.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExport}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Tabs for Different Data Categories */}
                <Tabs defaultValue="overview" className="w-full">
                  <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
                      Overview
                    </button>
                    {filters.includeFinancials && (
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap">
                        Financials
                      </button>
                    )}
                    {filters.includeLeadership && (
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap">
                        Leadership
                      </button>
                    )}
                    {filters.includeTechnology && (
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap">
                        Technology
                      </button>
                    )}
                    {filters.includeNews && (
                      <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap">
                        News
                      </button>
                    )}
                  </div>

                  {/* Overview Tab Content */}
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Company Overview
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {results.companyInfo.businessName && (
                        <div>
                          <p className="text-sm text-slate-600">Business Name</p>
                          <p className="font-medium text-slate-900">
                            {results.companyInfo.businessName}
                          </p>
                        </div>
                      )}
                      {results.companyInfo.description && (
                        <div>
                          <p className="text-sm text-slate-600">Description</p>
                          <p className="font-medium text-slate-900">
                            {results.companyInfo.description}
                          </p>
                        </div>
                      )}
                      {results.companyInfo.yearFounded && (
                        <div>
                          <p className="text-sm text-slate-600">Year Founded</p>
                          <p className="font-medium text-slate-900">
                            {results.companyInfo.yearFounded}
                          </p>
                        </div>
                      )}
                      {results.companyInfo.hqCountry && (
                        <div>
                          <p className="text-sm text-slate-600">Headquarters</p>
                          <p className="font-medium text-slate-900">
                            {results.companyInfo.hqCountry}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Summary Data */}
                    {Object.values(results.summaryData).some(v => v) && (
                      <div className="mt-6 pt-6 border-t border-slate-200">
                        <h4 className="font-semibold text-slate-900 mb-4">
                          Research Summary
                        </h4>
                        <div className="space-y-3">
                          {results.summaryData.overallSystem && (
                            <div>
                              <Badge className="mb-2">Overall System</Badge>
                              <p className="text-sm text-slate-700">
                                {results.summaryData.overallSystem}
                              </p>
                            </div>
                          )}
                          {results.summaryData.strategicDirection && (
                            <div>
                              <Badge className="mb-2">Strategic Direction</Badge>
                              <p className="text-sm text-slate-700">
                                {results.summaryData.strategicDirection}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                </Tabs>

                {/* Sources */}
                {results.sources.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      Sources
                    </h3>
                    <ul className="space-y-2">
                      {results.sources.map((source, idx) => (
                        <li key={idx} className="text-sm text-blue-600 hover:underline">
                          <a href={source} target="_blank" rel="noopener noreferrer">
                            {source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            )}

            {/* Empty State */}
            {!results && !isLoading && !error && (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">
                  Enter a company name and click &quot;Research Company&quot; to get started
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
