
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

const creators = [
  {
    rank: 1,
    name: 'Jeferson Araujo',
    avatar: 'https://placehold.co/40x40.png',
    followers: '13.9M',
    likes: '279.1M',
    effects: 122,
    hint: 'male creator'
  },
  {
    rank: 2,
    name: 'paigepiskin',
    avatar: 'https://placehold.co/40x40.png',
    followers: '7.3M',
    likes: '146.8M',
    effects: 59,
    hint: 'female creator'
  },
  {
    rank: 3,
    name: 'Laura Gouillon',
    avatar: 'https://placehold.co/40x40.png',
    followers: '5.6M',
    likes: '123.9M',
    effects: 67,
    hint: 'female creator'
  },
  {
    rank: 4,
    name: 'Allan Gregorio',
    avatar: 'https://placehold.co/40x40.png',
    followers: '4.5M',
    likes: '88.9M',
    effects: 88,
    hint: 'male creator'
  },
  {
    rank: 5,
    name: 'Koda',
    avatar: 'https://placehold.co/40x40.png',
    followers: '4.2M',
    likes: '95.1M',
    effects: 73,
    hint: 'creator avatar'
  },
    {
    rank: 6,
    name: 'wrld.space',
    avatar: 'https://placehold.co/40x40.png',
    followers: '3.9M',
    likes: '64.8M',
    effects: 23,
    hint: 'space avatar'
  },
  {
    rank: 7,
    name: 'wowfilterscom',
    avatar: 'https://placehold.co/40x40.png',
    followers: '3.1M',
    likes: '35.4M',
    effects: 104,
    hint: 'logo avatar'
  },
  {
    rank: 8,
    name: 'maru.studio',
    avatar: 'https://placehold.co/40x40.png',
    followers: '2.5M',
    likes: '48.2M',
    effects: 48,
    hint: 'studio logo'
  },
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
                  <TableCell className="text-right font-mono">{creator.effects}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
