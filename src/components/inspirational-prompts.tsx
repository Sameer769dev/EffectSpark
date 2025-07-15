
'use client';

import { Lightbulb, Wand2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface InspirationalPromptsProps {
  onPromptSelect: (prompt: string) => void;
}

const prompts = [
  'Interactive AR games',
  'Retro-futurism ideas',
  'Filters for summer holidays',
  'Beauty effects with subtle sparkles',
  'Funny green screen templates',
  'Educational filters about space',
];

export function InspirationalPrompts({ onPromptSelect }: InspirationalPromptsProps) {
  return (
    <Card className="bg-card border-border/50 animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-primary" />
          Need some inspiration?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Click on a prompt below to get started.
        </p>
        <div className="flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              key={prompt}
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
