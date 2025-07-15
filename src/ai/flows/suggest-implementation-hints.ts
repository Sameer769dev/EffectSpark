// src/ai/flows/suggest-implementation-hints.ts
'use server';

/**
 * @fileOverview Generates implementation hints for a TikTok effect idea.
 *
 * - suggestImplementationHints - A function that generates implementation hints for a TikTok effect idea.
 * - SuggestImplementationHintsInput - The input type for the suggestImplementationHints function.
 * - SuggestImplementationHintsOutput - The return type for the suggestImplementationHints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestImplementationHintsInputSchema = z.object({
  effectIdea: z.string().describe('The TikTok effect idea to get implementation hints for.'),
});
export type SuggestImplementationHintsInput = z.infer<typeof SuggestImplementationHintsInputSchema>;

const SuggestImplementationHintsOutputSchema = z.object({
  implementationHints: z.string().describe('Implementation suggestions for the effect idea.'),
});
export type SuggestImplementationHintsOutput = z.infer<typeof SuggestImplementationHintsOutputSchema>;

export async function suggestImplementationHints(input: SuggestImplementationHintsInput): Promise<SuggestImplementationHintsOutput> {
  return suggestImplementationHintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestImplementationHintsPrompt',
  input: {schema: SuggestImplementationHintsInputSchema},
  output: {schema: SuggestImplementationHintsOutputSchema},
  prompt: `You are an expert TikTok effect creator. Provide implementation suggestions and starting points for the following effect idea, including Effect House features or techniques:

Effect Idea: {{{effectIdea}}}

Implementation Hints:`,
});

const suggestImplementationHintsFlow = ai.defineFlow(
  {
    name: 'suggestImplementationHintsFlow',
    inputSchema: SuggestImplementationHintsInputSchema,
    outputSchema: SuggestImplementationHintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
