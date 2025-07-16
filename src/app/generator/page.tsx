
'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2 } from 'lucide-react';
import { InspirationalPrompts } from '@/components/inspirational-prompts';
import { SavedPrompts } from '@/components/saved-prompts';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { GenerateEffectHousePromptOutput } from '@/ai/flows/generate-effect-house-prompt';
import { generateEffectHousePrompt } from '@/ai/flows/generate-effect-house-prompt';
import { useSavedPrompts } from '@/hooks/use-saved-prompts';
import { EffectHousePromptDisplay } from '@/components/effect-house-prompt-display';

export default function GeneratorPage() {
  const [generatedPrompt, setGeneratedPrompt] = useState<GenerateEffectHousePromptOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  const { addPrompt } = useSavedPrompts();

  const handlePromptSelect = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.length < 10) {
      toast({
        variant: 'destructive',
        title: 'Prompt is too short',
        description: 'Please describe your idea in at least 10 characters.',
      });
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt(null);
    try {
      const result = await generateEffectHousePrompt({ idea: prompt });
      setGeneratedPrompt(result);
      addPrompt(prompt);
    } catch (error) {
      console.error('Error generating prompt:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem generating your prompt. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Turn your ideas into TikTok effects
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Describe a simple idea, and our AI will write a detailed prompt for you to use with the Effect House AI generator.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'A game where I'm a cat catching falling fish' or 'Turn me into a futuristic robot'"
          className="resize-y min-h-[120px] text-base"
        />
        <Button type="submit" disabled={isLoading} size="lg">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 />
              <span>Generate Prompt</span>
            </>
          )}
        </Button>
      </form>
      
      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">
            Our AI is crafting the perfect prompt...
          </p>
        </div>
      )}

      {generatedPrompt && !isLoading && (
        <EffectHousePromptDisplay prompt={generatedPrompt} />
      )}

      {!isLoading && !generatedPrompt && (
        <div className="space-y-8">
          <SavedPrompts onPromptSelect={handlePromptSelect} />
          <InspirationalPrompts onPromptSelect={handlePromptSelect} />
        </div>
      )}
    </div>
  );
}
