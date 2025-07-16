'use client';

import type { GenerateEffectHousePromptOutput } from '@/ai/flows/generate-effect-house-prompt';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Check, Clipboard, Tag, Type } from 'lucide-react';
import { useState } from 'react';

interface EffectHousePromptDisplayProps {
  prompt: GenerateEffectHousePromptOutput;
}

export function EffectHousePromptDisplay({ prompt }: EffectHousePromptDisplayProps) {
  const { toast } = useToast();
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.detailedPrompt);
    setHasCopied(true);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The detailed prompt is ready to be pasted into Effect House.',
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Card className="bg-card/50 border-primary/30 animate-in fade-in-50">
      <CardHeader>
        <CardTitle>Your Generated Effect House Prompt</CardTitle>
        <CardDescription>
          Use the following details in the Effect House AI generator.
        </CardDescription>
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="flex items-center gap-2">
            <Type className="text-primary h-5 w-5" />
            <div>
              <p className="text-xs text-muted-foreground">Effect Type</p>
              <p className="font-semibold text-foreground">{prompt.effectType}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="text-primary h-5 w-5" />
            <div>
              <p className="text-xs text-muted-foreground">Topic</p>
              <p className="font-semibold text-foreground">{prompt.topic}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-foreground">Detailed Prompt</h3>
          <div className="p-4 rounded-md bg-background border font-mono text-sm whitespace-pre-wrap">
            {prompt.detailedPrompt}
          </div>
          <Button onClick={handleCopy}>
            {hasCopied ? <Check /> : <Clipboard />}
            <span>{hasCopied ? 'Copied!' : 'Copy Prompt'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
