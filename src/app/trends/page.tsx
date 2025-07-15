'use client';

import { useState, useEffect } from 'react';
import {
  analyzeTrends,
  type TrendAnalysisOutput,
} from '@/ai/flows/analyze-trends';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, TrendingUp, WandSparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TrendsPage() {
  const [analysis, setAnalysis] = useState<TrendAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrends = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeTrends();
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing trends:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description:
          'There was a problem analyzing trends. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
            Trend Analyzer
          </h1>
          <p className="text-muted-foreground mt-2">
            Your AI-powered briefing on what's currently trending on TikTok.
          </p>
        </div>
        <Button onClick={fetchTrends} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <TrendingUp />
              <span>Refresh Trends</span>
            </>
          )}
        </Button>
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-card border-border animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/4 mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="mt-4 h-6 bg-muted rounded w-1/2"></div>
                <div className="mt-2 h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {analysis && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in-50">
          {analysis.trends.map((trend, index) => (
            <Card key={index} className="flex flex-col bg-card border-border">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="font-headline text-2xl">
                    {trend.name}
                  </CardTitle>
                  <Badge variant="outline">{trend.category}</Badge>
                </div>
                <CardDescription>{trend.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div>
                  <h4 className="font-semibold text-lg flex items-center gap-2 mb-2">
                    <WandSparkles className="text-primary" />
                    Why it's Popular
                  </h4>
                  <p className="text-muted-foreground">
                    {trend.popularityAnalysis}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
