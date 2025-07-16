
'use server';

/**
 * @fileOverview A flow for fetching and parsing the top creators from Effect House.
 *
 * - fetchTopCreators - A function that returns a list of top TikTok creators.
 * - CreatorData - The type definition for a single creator's data.
 * - FetchTopCreatorsOutput - The return type for the fetchTopCreators function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getTopCreatorsFromTikTok } from '@/ai/tools/get-top-creators';

const CreatorDataSchema = z.object({
  rank: z.number().describe('The rank of the creator.'),
  name: z.string().describe("The creator's name or handle."),
  avatar: z.string().url().describe("The URL to the creator's avatar image."),
  followers: z.string().describe('The number of followers the creator has.'),
  likes: z.string().describe('The total number of likes the creator has received.'),
  effects: z.number().describe('The number of effects the creator has published.'),
  hint: z.string().optional().describe('An AI hint for the avatar image.'),
});

const FetchTopCreatorsOutputSchema = z.object({
  creators: z.array(CreatorDataSchema),
});

export type CreatorData = z.infer<typeof CreatorDataSchema>;
export type FetchTopCreatorsOutput = z.infer<typeof FetchTopCreatorsOutputSchema>;

export async function fetchTopCreators(): Promise<FetchTopCreatorsOutput> {
  return fetchTopCreatorsFlow();
}

const fetchTopCreatorsFlow = ai.defineFlow(
  {
    name: 'fetchTopCreatorsFlow',
    outputSchema: FetchTopCreatorsOutputSchema,
  },
  async () => {
    console.log('Fetching top creators from TikTok Effect House...');
    const creators = await getTopCreatorsFromTikTok();
    console.log(`Successfully fetched ${creators.length} creators.`);
    return { creators };
  }
);
