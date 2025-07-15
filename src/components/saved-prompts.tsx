
'use client';

import { useSavedPrompts } from '@/hooks/use-saved-prompts';
import { History, Wand2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SavedPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

export function SavedPrompts({ onPromptSelect }: SavedPromptsProps) {
  const { prompts } = useSavedPrompts();

  if (prompts.length === 0) {
    return null;
  }

  return (
    <Card className="bg-card border-border/50 animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="text-primary" />
          Your Recent Prompts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Click a recent prompt to use it again.
        </p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt, index) => (
            <button
              key={`${prompt}-${index}`}
              onClick={() => onPromptSelect(prompt)}
              className="group"
            >
              <Badge 
                variant="outline"
                className="cursor-pointer border-dashed border-primary/50 text-primary/90 hover:border-solid hover:bg-primary/10 hover:border-primary transition-all duration-200 py-1 px-3"
              >
                <Wand2 className="mr-2 h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                {prompt}
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
