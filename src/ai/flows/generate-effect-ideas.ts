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
  prompt: z
    .string()
    .describe('A user-provided prompt or keywords for the kind of effects they want to see.'),
  category: z
    .string()
    .optional()
    .describe('The selected category of effect ideas to generate (e.g., "AR", "Funny", "Beauty"). This is the Effect Type.'),
  theme: z
    .string()
    .optional()
    .describe('The selected theme of effect ideas to generate (e.g., "Holidays", "Music", "Challenges"). This is the Topic.'),
});

export type GenerateEffectIdeasInput = z.infer<typeof GenerateEffectIdeasInputSchema>;

const GenerateEffectIdeasOutputSchema = z.object({
  effectIdeas: z.array(
    z.object({
      title: z.string().describe('The title of the effect idea. Should be catchy and descriptive.'),
      description: z.string().describe('A detailed, one-paragraph description of the effect, explaining what it does and how a user would interact with it.'),
      implementationHints: z.string().describe('A few bullet points with basic implementation suggestions or starting points for building this in Effect House.'),
    })
  ).describe('A list of 3-5 novel TikTok effect ideas.'),
});

export type GenerateEffectIdeasOutput = z.infer<typeof GenerateEffectIdeasOutputSchema>;

export async function generateEffectIdeas(input: GenerateEffectIdeasInput): Promise<GenerateEffectIdeasOutput> {
  return generateEffectIdeasFlow(input);
}

const generateEffectIdeasPrompt = ai.definePrompt({
  name: 'generateEffectIdeasPrompt',
  input: {schema: GenerateEffectIdeasInputSchema},
  output: {schema: GenerateEffectIdeasOutputSchema},
  prompt: `You are a creative consultant for TikTok effect creators. Your goal is to generate 3 to 5 novel and engaging effect ideas based on the user's request.

The user has provided the following input:
- Prompt/Keywords: "{{{prompt}}}"
{{#if category}}
- Effect Type (Category): "{{{category}}}"
{{/if}}
{{#if theme}}
- Topic (Theme): "{{{theme}}}"
{{/if}}

Your Task:
Generate a list of 3-5 distinct effect ideas that are highly relevant to the user's selections.
For each idea, provide:
1.  **A catchy and descriptive title.**
2.  **A detailed, one-paragraph description** of the effect. Explain the concept, what the user sees, and how they interact with it.
3.  **A few bullet points of implementation hints.** These should be actionable starting points for an Effect House creator (e.g., "Use a Head Tracker to attach the crown," "Trigger the particle system on mouth open," "Use the segmentation feature to change the background.").

Focus on originality and virality potential. Ensure the ideas are creative and align perfectly with the requested Type and Topic.
  `,
});

const generateEffectIdeasFlow = ai.defineFlow(
  {
    name: 'generateEffectIdeasFlow',
    inputSchema: GenerateEffectIdeasInputSchema,
    outputSchema: GenerateEffectIdeasOutputSchema,
  },
  async input => {
    try {
      const {output} = await generateEffectIdeasPrompt(input);
      return output!;
    } catch (error: any) {
      if (error.status === 503 || (error.cause as any)?.status === 503) {
        console.warn('Primary model overloaded, switching to fallback.');
        const {output} = await generateEffectIdeasPrompt(input, { model: 'googleai/gemini-1.5-flash-latest' });
        return output!;
      }
      throw error;
    }
  }
);
