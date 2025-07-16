'use server';

/**
 * @fileOverview Generates a detailed prompt for Effect House AI.
 * 
 * - generateEffectHousePrompt - A function that generates a detailed prompt.
 * - GenerateEffectHousePromptInput - The input type for the function.
 * - GenerateEffectHousePromptOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateEffectHousePromptInputSchema = z.object({
  idea: z.string().describe('The user\'s basic idea for an effect.'),
});

export type GenerateEffectHousePromptInput = z.infer<typeof GenerateEffectHousePromptInputSchema>;

const GenerateEffectHousePromptOutputSchema = z.object({
  effectType: z.string().describe('The most appropriate Effect Type for this idea (e.g., "Face Fusion", "Art Lyrics", "Fly Thru", "Platform Jumper").'),
  topic: z.string().describe('A suitable topic for this effect (e.g., "Futuristic", "Animals", "Gaming", "Music").'),
  detailedPrompt: z.string().describe('A very detailed, descriptive prompt that can be used in Effect House AI to generate a complete effect. It should describe the visual elements, user interactions, and overall experience of the effect.'),
});

export type GenerateEffectHousePromptOutput = z.infer<typeof GenerateEffectHousePromptOutputSchema>;

export async function generateEffectHousePrompt(input: GenerateEffectHousePromptInput): Promise<GenerateEffectHousePromptOutput> {
  return generateEffectHousePromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEffectHousePrompt',
  input: { schema: GenerateEffectHousePromptInputSchema },
  output: { schema: GenerateEffectHousePromptOutputSchema },
  prompt: `You are an expert prompt engineer for TikTok's Effect House AI. A user will provide a basic idea, and your task is to transform it into a detailed, comprehensive prompt that can be used to generate a complete and engaging TikTok effect.

You must also determine the most appropriate "Effect Type" and "Topic" for the idea, similar to the options available in Effect House.

**User's Idea:**
"{{{idea}}}"

**Your Task:**
1.  **Analyze the user's idea:** Identify the core concept, potential interactions, and visual style.
2.  **Determine Effect Type:** Choose the best "Effect Type" from a list like "Face Fusion", "Art Lyrics", "Fly Thru", "Platform Jumper", "Interactive Game", "Beauty", "AR Makeup", "2D Game", "Turn Me Into Anything".
3.  **Determine Topic:** Choose a relevant "Topic" like "Futuristic", "Animals", "Gaming", "Music", "Fantasy", "Retro", "Humor".
4.  **Write the Detailed Prompt:** Craft a rich, descriptive prompt. Be specific about:
    *   **Visuals:** What does the user see? Describe colors, textures, lighting, objects, and characters.
    *   **Interaction:** What does the user do? (e.g., "tilt my head to steer," "tap to start," "when I hit record," "based on my voice range").
    *   **Triggers and Logic:** How does the effect respond to the user? (e.g., "if I last 10 seconds, show 'You made it!'").
    *   **Atmosphere:** What is the overall mood or vibe? (e.g., "neon-lit concert stage," "glowing cave filled with crystals," "futuristic void").

The final prompt should be a complete instruction set for the Effect House AI to build the effect.
`,
});

const generateEffectHousePromptFlow = ai.defineFlow(
  {
    name: 'generateEffectHousePromptFlow',
    inputSchema: GenerateEffectHousePromptInputSchema,
    outputSchema: GenerateEffectHousePromptOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error: any) {
      if (error.status === 503 || (error.cause as any)?.status === 503) {
        console.warn('Primary model overloaded, switching to fallback.');
        const { output } = await prompt(input, { model: 'googleai/gemini-1.5-flash-latest' });
        return output!;
      }
      throw error;
    }
  }
);
