'use server';

/**
 * @fileOverview Analyzes current TikTok trends to provide actionable insights for creators.
 * 
 * - analyzeTrends - A function that returns a trend analysis report.
 * - TrendAnalysisOutput - The return type for the analyzeTrends function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TrendAnalysisOutputSchema = z.object({
  trends: z.array(
    z.object({
      name: z.string().describe('The name of the trend (e.g., an effect, sound, or challenge).'),
      category: z.string().describe('The category of the trend (e.g., "AR Effect", "Sound", "Template", "Challenge").'),
      description: z.string().describe('A brief description of the trend.'),
      popularityAnalysis: z.string().describe('An analysis of why this trend is popular and how creators can leverage it.'),
    })
  ).describe('A list of current TikTok trends.'),
});

export type TrendAnalysisOutput = z.infer<typeof TrendAnalysisOutputSchema>;

export async function analyzeTrends(): Promise<TrendAnalysisOutput> {
  return analyzeTrendsFlow();
}

const analyzeTrendsPrompt = ai.definePrompt({
  name: 'analyzeTrendsPrompt',
  output: { schema: TrendAnalysisOutputSchema },
  prompt: `You are a TikTok Trend Analysis expert for Effect House creators. Your task is to identify and analyze the top 3-5 emerging trends on TikTok right now.

For each trend, provide:
1.  A clear name for the trend.
2.  The category (e.g., "AR Effect", "Sound", "Template", "Challenge").
3.  A concise description.
4.  A sharp analysis of *why* it's popular and how an Effect House creator could leverage this insight. For example, "This sound is paired with simple AR games, leading to a high engagement spike."

Focus on trends that are actionable for effect creators. Provide a diverse mix of trend types.
`,
});

const analyzeTrendsFlow = ai.defineFlow(
  {
    name: 'analyzeTrendsFlow',
    outputSchema: TrendAnalysisOutputSchema,
  },
  async () => {
    const { output } = await analyzeTrendsPrompt();
    return output!;
  }
);
