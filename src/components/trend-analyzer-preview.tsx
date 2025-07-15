'use client';

import { useState, useEffect } from 'react';
import {
  analyzeTrends,
  type TrendAnalysisOutput,
} from '@/ai/flows/analyze-trends';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2, TrendingUp, WandSparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function TrendAnalyzerPreview() {
  const [analysis, setAnalysis] = useState<TrendAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrends = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeTrends();
      // Slice the results for the preview
      setAnalysis({ trends: result.trends.slice(0, 2) });
    } catch (error) {
      console.error('Error analyzing trends:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem analyzing trends. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-4 rounded-lg bg-muted/50 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-5 bg-muted rounded w-1/4"></div>
            </div>
            <div className="mt-2 h-4 bg-muted rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {analysis && analysis.trends.map((trend, index) => (
        <div key={index} className="p-4 rounded-lg bg-secondary/50">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-foreground">{trend.name}</h4>
            <Badge variant="outline">{trend.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {trend.description}
          </p>
        </div>
      ))}
       <Button asChild variant="outline" className="w-full">
        <Link href="/trends">
          <span>View Full Trend Report</span>
          <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
