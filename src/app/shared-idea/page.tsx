
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EffectIdeaCard } from '@/components/effect-idea-card';
import type { EffectIdea } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function SharedIdeaContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get('data');

  let idea: EffectIdea | null = null;
  let error: string | null = null;

  if (data) {
    try {
      idea = JSON.parse(atob(data));
      // Basic validation
      if (!idea || typeof idea.title !== 'string' || typeof idea.description !== 'string') {
        throw new Error("Invalid idea data structure.");
      }
    } catch (e) {
      console.error("Failed to parse shared idea data:", e);
      error = "The shared link is invalid or corrupted.";
    }
  } else {
    error = "No idea data found in the link.";
  }

  return (
    <div className="min-h-screen bg-secondary/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">EffectSpark</span>
        </div>
        {idea && !error && (
            <EffectIdeaCard idea={idea} />
        )}
        {error && (
          <Card className="bg-card border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle />
                Could Not Load Idea
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button asChild>
                <Link href="/generator">Go to Generator</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function SharedIdeaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-secondary/30 flex items-center justify-center">Loading shared idea...</div>}>
            <SharedIdeaContent />
        </Suspense>
    )
}
