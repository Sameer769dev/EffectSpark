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
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 bg-secondary/30 border-secondary">
      <CardHeader>
        <CardTitle className="font-headline">{idea.title}</CardTitle>
        <CardDescription>{idea.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        {idea.viralityScore !== undefined && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <TrendingUp className="text-primary" />
              Virality Score: {idea.viralityScore}
            </h4>
            <Progress value={idea.viralityScore} className="h-2" />
            <p className="text-sm text-muted-foreground">{idea.predictionReasoning}</p>
          </div>
        )}
        <div className="space-y-2">
            <h4 className="font-semibold text-sm">Implementation Hints</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{currentHints}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-2 pt-4 border-t border-secondary mt-auto">
        <Button variant="ghost" size="sm" onClick={handleGetMoreHints} disabled={isGettingHints} className="text-primary hover:text-primary hover:bg-primary/10">
          {isGettingHints ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Getting hints...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2" />
                More Hints
              </>
            )}
        </Button>
        <Button variant={favorite ? 'secondary' : 'outline'} size="icon" onClick={handleFavoriteToggle} aria-label="Toggle Favorite">
          <Heart className={`transition-colors duration-300 ${favorite ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
        </Button>
      </CardFooter>
    </Card>
  );
}
