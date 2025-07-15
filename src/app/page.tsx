'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateEffectIdeas } from '@/ai/flows/generate-effect-ideas';
import type { EffectIdea } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Loader2, Sparkles } from 'lucide-react';
import { EffectIdeaCard } from '@/components/effect-idea-card';
import { useToast } from '@/hooks/use-toast';
import React from 'react';

const formSchema = z.object({
  trendingStyles: z.string().min(10, {
    message: 'Please describe the trending styles in at least 10 characters.',
  }),
  category: z.string().optional(),
  theme: z.string().optional(),
});

const categories = ['AR', 'Funny', 'Beauty', 'Gaming', 'Educational'];
const themes = ['Holidays', 'Music', 'Challenges', 'Fashion', 'Sci-Fi'];

export default function Home() {
  const [ideas, setIdeas] = useState<EffectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trendingStyles: '',
      category: '',
      theme: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generateEffectIdeas(values);
      const ideasWithIds = result.effectIdeas.map((idea) => ({
        ...idea,
        id: crypto.randomUUID(),
      }));
      setIdeas(ideasWithIds);
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
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          AI Effect Generator
        </h1>
        <p className="text-muted-foreground mt-2">
          Spark your creativity. Describe trending styles and let our AI
          generate viral TikTok effect ideas for you.
        </p>
      </header>

      <Card className="shadow-lg bg-card">
        <CardHeader>
          <CardTitle>Generate New Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="trendingStyles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trending Styles</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., retro-futurism, cottagecore aesthetics, glitch effects..."
                        className="resize-y min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe current trends you've noticed on TikTok.
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
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin" />
                    <span className="ml-2">Generating...</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="mr-2" />
                    <span>Spark Ideas</span>
                  </span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">
            Our AI is brainstorming... this might take a moment.
          </p>
        </div>
      )}

      {ideas.length > 0 && (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline">Generated Ideas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50">
                {ideas.map((idea) => (
                    <EffectIdeaCard key={idea.id} idea={idea} />
                ))}
            </div>
        </section>
      )}
    </div>
  );
}
