'use client';

import { useState } from 'react';
import { suggestImplementationHints } from '@/ai/flows/suggest-implementation-hints';
import type { EffectIdea } from '@/types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useFavorites } from '@/context/favorites-context';
import { Heart, Lightbulb, Loader2, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { Progress } from './ui/progress';

interface EffectIdeaCardProps {
  idea: EffectIdea;
}

export function EffectIdeaCard({ idea }: EffectIdeaCardProps) {
  const { toast } = useToast();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isGettingHints, setIsGettingHints] = useState(false);
  const [currentHints, setCurrentHints] = useState(idea.implementationHints);

  const favorite = isFavorite(idea.id);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(idea.id);
    } else {
      addFavorite(idea);
    }
  };

  const handleGetMoreHints = async () => {
    setIsGettingHints(true);
    try {
        const result = await suggestImplementationHints({ effectIdea: idea.description });
        setCurrentHints(currentHints + '\n\n' + result.implementationHints);
        toast({
            title: 'New Hints Generated!',
            description: `We've brainstormed more ideas for "${idea.title}".`,
        });
    } catch (error) {
        console.error('Error getting more hints:', error);
        toast({
            variant: 'destructive',
            title: 'Oh no!',
            description: 'Could not generate more hints at this time.',
        });
    } finally {
        setIsGettingHints(false);
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-primary/20 transition-shadow duration-300 bg-card border-border hover:border-primary/50">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{idea.title}</CardTitle>
        <CardDescription className="text-sm">{idea.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {idea.viralityScore !== undefined && (
          <div className="space-y-2">
            <div className='flex justify-between items-center'>
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <TrendingUp className="text-primary" />
                Virality Score
              </h4>
              <span className='font-bold text-lg text-foreground'>{idea.viralityScore}</span>
            </div>
            <Progress value={idea.viralityScore} className="h-2" />
            <p className="text-xs text-muted-foreground italic">"{idea.predictionReasoning}"</p>
          </div>
        )}
        <div className="space-y-2">
            <h4 className="font-semibold text-sm">Implementation Hints</h4>
            <p className="text-xs text-muted-foreground whitespace-pre-wrap font-mono bg-muted/30 p-3 rounded-md">{currentHints}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2 pt-4 border-t mt-auto">
        <Button variant="ghost" size="sm" onClick={handleGetMoreHints} disabled={isGettingHints} className="text-primary hover:text-primary hover:bg-primary/10">
          {isGettingHints ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Getting hints...</span>
            </>
          ) : (
            <>
              <Lightbulb />
              <span>More Hints</span>
            </>
          )}
        </Button>
        <Button variant="ghost" size="icon" onClick={handleFavoriteToggle} aria-label="Toggle Favorite">
          <Heart className={`transition-colors duration-300 ${favorite ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
        </Button>
      </CardFooter>
    </Card>
  );
}
