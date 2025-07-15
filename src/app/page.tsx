import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendAnalyzerPreview } from '@/components/trend-analyzer-preview';
import { IdeaGeneratorForm } from '@/components/idea-generator-form';

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
          Welcome to EffectSpark
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Your AI-powered co-creator for viral TikTok effects. Analyze trends,
          generate ideas, and spark your next masterpiece.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-primary" />
              <span>Quick Idea Generator</span>
            </CardTitle>
            <CardDescription>
              Get a few ideas instantly, or go to the full generator for more options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <IdeaGeneratorForm quickForm={true} />
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-primary" />
              <span>Trending Now</span>
            </CardTitle>
            <CardDescription>
              A snapshot of the hottest trends on TikTok.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrendAnalyzerPreview />
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
