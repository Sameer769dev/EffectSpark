
'use client';

import { useState } from 'react';
import type { EffectIdea } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { EffectIdeaCard } from '@/components/effect-idea-card';
import { IdeaGeneratorForm } from '@/components/idea-generator-form';
import { InspirationalPrompts } from '@/components/inspirational-prompts';

export default function GeneratorPage() {
  const [ideas, setIdeas] = useState<EffectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          AI Effect Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Spark your creativity. Describe trending styles, add constraints, and
          let our AI generate viral TikTok effect ideas for you.
        </p>
      </header>
      
      <IdeaGeneratorForm 
        setIsLoading={setIsLoading} 
        setIdeas={setIdeas} 
        toast={toast}
        prompt={prompt}
        setPrompt={setPrompt}
      />

      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">
            Our AI is brainstorming and predicting virality... this might take a
            moment.
          </p>
        </div>
      )}

      {!isLoading && ideas.length === 0 && (
        <InspirationalPrompts onPromptSelect={handlePromptSelect} />
      )}

      {ideas.length > 0 && (
        <section className="space-y-4 animate-in fade-in-50">
          <h2 className="text-2xl font-bold font-headline">Generated Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <EffectIdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
