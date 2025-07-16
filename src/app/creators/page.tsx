
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { CreatorData } from '@/ai/flows/fetch-top-creators';
import { fetchTopCreators } from '@/ai/flows/fetch-top-creators';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


const CreatorRowSkeleton = () => (
    <TableRow>
        <TableCell><Skeleton className="h-6 w-6 rounded-full" /></TableCell>
        <TableCell>
            <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-32" />
            </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
      
    </TableRow>
);


export default function CreatorsPage() {
    const [creators, setCreators] = useState<CreatorData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const getCreators = async () => {
            setIsLoading(true);
            try {
                const result = await fetchTopCreators();
                setCreators(result.creators);
            } catch (error) {
                console.error("Failed to fetch top creators:", error);
                toast({
                    variant: 'destructive',
                    title: 'Error Fetching Creators',
                    description: 'Could not load the top creators leaderboard. Please try again later.'
                });
            } finally {
                setIsLoading(false);
            }
        };
        getCreators();
    }, [toast]);


  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Top Effect House Creators
        </h1>
        <p className="text-muted-foreground mt-2">
          A real-time snapshot of the leading creators in the Effect House community.
        </p>
      </header>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Creator Leaderboard</CardTitle>
          <CardDescription>
            Live data from effecthouse.tiktok.com.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Rank</TableHead>
                <TableHead>Creator</TableHead>
                <TableHead className="text-right">Followers</TableHead>
                <TableHead className="text-right">Effect Uses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                    {[...Array(8)].map((_, i) => <CreatorRowSkeleton key={i} />)}
                </>
              ) : (
                creators.map((creator) => (
                  <TableRow key={creator.rank} className="border-secondary hover:bg-muted/50">
                    <TableCell className="font-bold text-lg text-primary">{creator.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={creator.avatar}
                          alt={creator.name}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-primary/50"
                          data-ai-hint={creator.hint}
                        />
                        <span className="font-medium">{creator.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">{creator.followers}</TableCell>
                    <TableCell className="text-right font-mono">{creator.likes}</TableCell>
                  </TableRow>
                ))
              )}
               {!isLoading && creators.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Could not load creator data. The page structure on TikTok may have changed.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
