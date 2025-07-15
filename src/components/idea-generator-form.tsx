
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { generateEffectIdeas } from '@/ai/flows/generate-effect-ideas';
import { predictVirality } from '@/ai/flows/predict-virality';
import type { EffectIdea } from '@/types';
import { useRouter } from 'next/navigation';
import { useSavedPrompts } from '@/hooks/use-saved-prompts';

const formSchema = z.object({
  trendingStyles: z.string().min(10, {
    message: 'Please describe your idea in at least 10 characters.',
  }),
  category: z.string().optional(),
  theme: z.string().optional(),
  creativeConstraints: z.string().optional(),
});

const categories = [
  'AR',
  'Funny',
  'Beauty',
  'Gaming',
  'Educational',
  'Interactive',
  'Green Screen',
];
const themes = [
  'Holidays',
  'Music',
  'Challenges',
  'Fashion',
  'Sci-Fi',
  'Summer',
  'Winter',
];

interface IdeaGeneratorFormProps {
  quickForm?: boolean;
  setIsLoading?: (loading: boolean) => void;
  setIdeas?: (ideas: EffectIdea[]) => void;
  toast?: (options: {
    variant?: 'default' | 'destructive';
    title: string;
    description: string;
  }) => void;
  prompt?: string;
  setPrompt?: (prompt: string) => void;
}

export function IdeaGeneratorForm({
  quickForm = false,
  setIsLoading,
  setIdeas,
  toast,
  prompt,
  setPrompt
}: IdeaGeneratorFormProps) {
  const router = useRouter();
  const { addPrompt } = useSavedPrompts();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trendingStyles: prompt || '',
      category: '',
      theme: '',
      creativeConstraints: '',
    },
  });

  useEffect(() => {
    if (prompt) {
      form.setValue('trendingStyles', prompt);
    }
  }, [prompt, form]);
  
  const isGenerating = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (quickForm) {
      const queryString = new URLSearchParams(values as Record<string, string>).toString();
      addPrompt(values.trendingStyles);
      router.push(`/generator?${queryString}`);
      return;
    }

    setIsLoading?.(true);
    setIdeas?.([]);
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
      setIdeas?.(ideasWithVirality);
      addPrompt(values.trendingStyles);
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast?.({
        variant: 'destructive',
        title: 'Oh no! Something went wrong.',
        description:
          'There was a problem generating your ideas. Please try again.',
      });
    } finally {
      setIsLoading?.(false);
      setPrompt?.('');
      form.reset({
        trendingStyles: '',
        category: form.getValues('category'),
        theme: form.getValues('theme'),
        creativeConstraints: form.getValues('creativeConstraints'),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="trendingStyles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="e.g., 'face-tracking filters for summer', 'retro-futurism ideas', 'interactive AR games'..."
                  className="resize-y min-h-[100px]"
                  {...field}
                />
              </FormControl>
              {!quickForm && (
                <FormDescription>
                  Describe the kind of effect ideas you're looking for. Be as
                  specific as you like.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        {!quickForm && (
          <>
            <FormField
              control={form.control}
              name="creativeConstraints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Creative Constraints (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'must use face mesh only', 'hand gestures only', 'no external assets'..."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Add any limitations or specific features to include.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
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
                    <FormLabel>Theme (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme} value={theme}>
                            {theme}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </>
        )}
        <Button
          type="submit"
          disabled={isGenerating}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 />
              <span>
                {quickForm ? 'Generate Ideas' : 'Spark Ideas'}
              </span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
