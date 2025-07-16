'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  generateEffectIdeas,
  type GenerateEffectIdeasInput,
} from '@/ai/flows/generate-effect-ideas';
import { predictVirality } from '@/ai/flows/predict-virality';
import type { EffectIdea } from '@/types';
import { EffectIdeaCard } from '@/components/effect-idea-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InspirationalPrompts } from '@/components/inspirational-prompts';

const formSchema = z.object({
  prompt: z.string().min(3, 'Please enter at least 3 characters.'),
  category: z.string().optional(),
  theme: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const categories = [
  'AR',
  'Funny',
  'Beauty',
  'Gaming',
  'Educational',
  'Interactive',
  'Green Screen',
  'Face Morph',
  'World Effect',
];
const themes = [
  'Holidays',
  'Music',
  'Challenges',
  'Fashion',
  'Sci-Fi',
  'Fantasy',
  'Retro',
  'Animals',
  'Food',
];

function GeneratorContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<EffectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      category: '',
      theme: '',
    },
  });

  const handlePromptSelect = (selectedPrompt: string) => {
    form.setValue('prompt', selectedPrompt);
  };
  
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generateEffectIdeas(values);

      const ideasWithVirality = await Promise.all(
        result.effectIdeas.map(async (idea) => {
          const viralityPrediction = await predictVirality({
            title: idea.title,
            description: idea.description,
          });
          return {
            ...idea,
            id: crypto.randomUUID(),
            viralityScore: viralityPrediction.viralityScore,
            predictionReasoning: viralityPrediction.predictionReasoning,
          };
        })
      );

      setIdeas(ideasWithVirality);
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description: 'There was a problem generating your ideas. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const prompt = searchParams.get('trendingStyles');
    const category = searchParams.get('category');
    const theme = searchParams.get('theme');

    if (prompt) {
      const newValues = {
        prompt: prompt,
        category: category || '',
        theme: theme || '',
      };
      form.reset(newValues);
      handleSubmit(newValues);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          AI Effect Idea Generator
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Spark your next viral hit. Describe an idea, pick a category and theme, and let our AI handle the brainstorming.
        </p>
      </header>
      
      <Card className="bg-card border-border">
          <CardHeader>
              <CardTitle>Create your prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Idea or Keywords</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="e.g., 'A retro-futuristic music visualizer' or 'A funny cat face filter'"
                            className="resize-y min-h-[100px]"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Describe the kind of effect you're looking for.
                        </FormDescription>
                        </FormItem>
                    )}
                    />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Effect Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ''}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value || ''}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {themes.map((theme) => (
                                <SelectItem key={theme} value={theme}>{theme}</SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    <span>{isLoading ? 'Generating...' : 'Spark Ideas'}</span>
                </Button>
                </form>
            </Form>
          </CardContent>
      </Card>
      

      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">
            Our AI is sparking some new ideas for you...
          </p>
        </div>
      )}

      {ideas.length > 0 && !isLoading && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-foreground">Your Generated Ideas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50">
                {ideas.map((idea) => (
                    <EffectIdeaCard key={idea.id} idea={idea} />
                ))}
            </div>
          </div>
      )}

      {!isLoading && ideas.length === 0 && (
         <InspirationalPrompts onPromptSelect={handlePromptSelect} />
      )}
    </div>
  );
}


export default function GeneratorPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
            <GeneratorContent />
        </Suspense>
    )
}
