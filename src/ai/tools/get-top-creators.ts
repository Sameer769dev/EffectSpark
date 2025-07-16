
'use server';
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as cheerio from 'cheerio';
import type { CreatorData } from '../flows/fetch-top-creators';

// Helper function to normalize abbreviated numbers like '13.9M' to a string
function normalizeNumber(str: string): string {
    return str.trim();
}

export const getTopCreatorsFromTikTok = ai.defineTool(
    {
        name: 'getTopCreatorsFromTikTok',
        description: 'Fetches and parses the top creators from the TikTok Effect House leaderboard page.',
        outputSchema: z.array(z.any()), // We will manually parse into CreatorData[]
    },
    async () => {
        try {
            const url = 'https://effecthouse.tiktok.com/top-creators/';
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch page: ${response.statusText}`);
            }

            const html = await response.text();
            const $ = cheerio.load(html);

            const creators: CreatorData[] = [];

            // The class names seem to be obfuscated, so we rely on the structure.
            // This selector targets the main container for each creator card.
            $('div.contents > div.relative').each((i, el) => {
                // Within each card, find the creator's name.
                const name = $(el).find('div.flex > p.font-bold').text().trim();
                
                // If a name isn't found, it's likely not a creator card, so we skip it.
                if (!name) return;

                // Find the avatar image url.
                const avatar = $(el).find('img.rounded-full').attr('src') || 'https://placehold.co/40x40.png';

                // Find the stats. They are now 'effect uses' and 'followers'.
                const stats: string[] = [];
                $(el).find('div.flex.gap-4 > p').each((idx, statEl) => {
                    stats.push($(statEl).text().trim());
                });

                // The stats seem to be "XX effect uses" and "XX followers". We will parse them.
                const likes = stats.find(s => s.includes('effect uses'))?.replace(' effect uses', '') || '0';
                const followers = stats.find(s => s.includes('followers'))?.replace(' followers', '') || '0';

                // We don't have an explicit effects count or rank in this new structure.
                // We'll use the loop index for rank and default effects to 0.
                const creator: CreatorData = {
                    rank: i + 1,
                    name,
                    avatar: avatar.startsWith('http') ? avatar : `https:${avatar}`,
                    followers: normalizeNumber(followers),
                    likes: normalizeNumber(likes), // Re-purposing 'likes' field for 'effect uses'
                    effects: 0, // Effects count is not available in the new UI
                    hint: 'creator avatar'
                };
                creators.push(creator);
            });
            
            return creators;

        } catch (error) {
            console.error('Error scraping TikTok creators:', error);
            return [];
        }
    }
);
