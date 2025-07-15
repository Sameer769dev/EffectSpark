// src/ai/flows/generate-effect-ideas.ts
'use server';

/**
 * @fileOverview Generates novel TikTok effect ideas based on trending content.
 *
 * - generateEffectIdeas - A function that generates TikTok effect ideas.
 * - GenerateEffectIdeasInput - The input type for the generateEffectIdeas function.
 * - GenerateEffectIdeasOutput - The return type for the generateEffectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEffectIdeasInputSchema = z.object({
  trendingStyles: z
    .string()
    .describe('A description of current trending TikTok effect styles.'),
  category: z
    .string()
    .optional()
    .describe('The category of effect ideas to generate (e.g., AR, funny, beauty).'),
  theme: z
    .string()
    .optional()
    .describe('The theme of effect ideas to generate (e.g., holidays, music, challenges).'),
});

export type GenerateEffectIdeasInput = z.infer<typeof GenerateEffectIdeasInputSchema>;

const GenerateEffectIdeasOutputSchema = z.object({
  effectIdeas: z.array(
    z.object({
      title: z.string().describe('The title of the effect idea.'),
      description: z.string().describe('A detailed description of the effect idea.'),
      implementationHints: z.string().describe('Basic implementation suggestions for the effect.'),
    })
  ).describe('A list of novel TikTok effect ideas.'),
});

export type GenerateEffectIdeasOutput = z.infer<typeof GenerateEffectIdeasOutputSchema>;

export async function generateEffectIdeas(input: GenerateEffectIdeasInput): Promise<GenerateEffectIdeasOutput> {
  return generateEffectIdeasFlow(input);
}

const generateEffectIdeasPrompt = ai.definePrompt({
  name: 'generateEffectIdeasPrompt',
  input: {schema: GenerateEffectIdeasInputSchema},
  output: {schema: GenerateEffectIdeasOutputSchema},
  prompt: `You are a creative consultant for TikTok effect creators. Your goal is to generate novel and engaging effect ideas based on current trends.

  Analyze the following trending styles and generate a list of effect ideas. Each effect idea should include a title, a detailed description, and basic implementation suggestions.

  Trending Styles: {{{trendingStyles}}}

  {{#if category}}
  Category: {{{category}}}
  {{/if}}

  {{#if theme}}
  Theme: {{{theme}}}
  {{/if}}

  Ensure that the generated effect ideas are diverse and suitable for a wide range of TikTok users. Focus on originality and potential virality.

  Format your response as a JSON object conforming to the following schema:
  ${JSON.stringify(GenerateEffectIdeasOutputSchema.describe(''))}
  `,
});

const generateEffectIdeasFlow = ai.defineFlow(
  {
    name: 'generateEffectIdeasFlow',
    inputSchema: GenerateEffectIdeasInputSchema,
    outputSchema: GenerateEffectIdeasOutputSchema,
  },
  async input => {
    const {output} = await generateEffectIdeasPrompt(input);
    return output!;
  }
);
