'use server';

/**
 * @fileOverview Predicts the virality of a TikTok effect idea.
 *
 * - predictVirality - A function that returns a virality score and reasoning.
 * - PredictViralityInput - The input type for the predictVirality function.
 * - PredictViralityOutput - The return type for the predictVirality function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PredictViralityInputSchema = z.object({
  title: z.string().describe('The title of the effect idea.'),
  description: z.string().describe('A detailed description of the effect idea.'),
});
export type PredictViralityInput = z.infer<typeof PredictViralityInputSchema>;

const PredictViralityOutputSchema = z.object({
  viralityScore: z
    .number()
    .min(1)
    .max(100)
    .describe('A score from 1-100 predicting the virality potential.'),
  predictionReasoning: z
    .string()
    .describe(
      'A detailed analysis explaining the score, considering factors like novelty, interactivity, shareability, and trend alignment.'
    ),
});
export type PredictViralityOutput = z.infer<typeof PredictViralityOutputSchema>;

export async function predictVirality(
  input: PredictViralityInput
): Promise<PredictViralityOutput> {
  return predictViralityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictViralityPrompt',
  input: { schema: PredictViralityInputSchema },
  output: { schema: PredictViralityOutputSchema },
  prompt: `You are a TikTok Virality Expert and an experienced Effect House creator. Your task is to analyze the following effect idea and predict its potential for virality on a scale from 1 to 100.

Effect Title: {{{title}}}
Effect Description: {{{description}}}

Base your prediction on the following criteria:
1.  **Novelty & Originality:** Is the idea fresh and unique? Does it stand out?
2.  **Interactivity & Engagement:** How will users interact with it? Is it a passive filter or an active game/challenge? High interactivity often leads to longer watch times.
3.  **Shareability & Meme-ability:** Is the effect easy to understand and use in various contexts? Does it have the potential to become a meme or a template for a trend?
4.  **Trend Alignment:** Does it tap into current aesthetics, sounds, or popular content formats on TikTok?
5.  **Broad Appeal:** Can a wide range of users enjoy this effect, or is it for a niche audience?

Provide a score and a detailed reasoning for your prediction. The reasoning should be constructive and offer insights into why the effect might succeed or what could be improved.
`,
});

const predictViralityFlow = ai.defineFlow(
  {
    name: 'predictViralityFlow',
    inputSchema: PredictViralityInputSchema,
    outputSchema: PredictViralityOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error: any) {
      if (error.status === 503) {
        console.warn('Primary model overloaded, switching to fallback.');
        const { output } = await prompt(input, { model: 'googleai/gemini-1.5-flash-latest' });
        return output!;
      }
      throw error;
    }
  }
);
