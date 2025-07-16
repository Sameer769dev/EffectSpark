
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

            $('div[class*="TopCreatorCard-cardContainer"]').each((i, el) => {
                const rank = parseInt($(el).find('div[class*="TopCreatorCard-rankNumber"]').text().trim(), 10);
                const avatar = $(el).find('img[class*="TopCreatorCard-avatar"]').attr('src') || 'https://placehold.co/40x40.png';
                const name = $(el).find('p[class*="TopCreatorCard-creatorName"]').text().trim();
                
                const stats: string[] = [];
                $(el).find('div[class*="TopCreatorCard-statValue"]').each((idx, statEl) => {
                    stats.push($(statEl).text().trim());
                });

                const [followers, likes, effectsStr] = stats;

                const creator: CreatorData = {
                    rank,
                    name,
                    avatar: avatar.startsWith('http') ? avatar : `https:${avatar}`,
                    followers: normalizeNumber(followers || '0'),
                    likes: normalizeNumber(likes || '0'),
                    effects: parseInt(effectsStr || '0', 10),
                    hint: 'creator avatar'
                };
                creators.push(creator);
            });
            
            return creators;

        } catch (error) {
            console.error('Error scraping TikTok creators:', error);
            // Return an empty array or throw the error, depending on desired error handling
            return [];
        }
    }
);
