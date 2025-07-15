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
import { Construction } from 'lucide-react';

const creators: any[] = [
];

export default function CreatorsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Top Effect House Creators
        </h1>
        <p className="text-muted-foreground mt-2">
          A snapshot of the leading creators in the Effect House community.
        </p>
      </header>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Creator Leaderboard</CardTitle>
          <CardDescription>
            Based on followers, likes, and number of effects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {creators.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead className="text-right">Followers</TableHead>
                  <TableHead className="text-right">Likes</TableHead>
                  <TableHead className="text-right">Effects</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creators.map((creator) => (
                  <TableRow key={creator.rank} className="border-secondary">
                    <TableCell className="font-medium">{creator.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={creator.avatar}
                          alt={creator.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                          data-ai-hint="creator avatar"
                        />
                        <span className="font-medium">{creator.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{creator.followers}</TableCell>
                    <TableCell className="text-right">{creator.likes}</TableCell>
                    <TableCell className="text-right">{creator.effects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card/50">
                <Construction className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Coming Soon!</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    We're building the leaderboard. Stay tuned!
                </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
