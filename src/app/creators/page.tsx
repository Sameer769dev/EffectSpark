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
  { rank: 1, name: 'JP Pirie', followers: '1.2M', likes: '25.6M', effects: 120, avatar: 'https://placehold.co/40x40.png' },
  { rank: 2, name: 'GOWAAA', followers: '890K', likes: '18.2M', effects: 85, avatar: 'https://placehold.co/40x40.png' },
  { rank: 3, name: 'Laura Gouillon', followers: '750K', likes: '15.1M', effects: 95, avatar: 'https://placehold.co/40x40.png' },
  { rank: 4, name: 'Antoni Tudisco', followers: '680K', likes: '12.8M', effects: 70, avatar: 'https://placehold.co/40x40.png' },
  { rank: 5, name: 'Brendan Duffy', followers: '550K', likes: '10.5M', effects: 60, avatar: 'https://placehold.co/40x40.png' },
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
        <Badge variant="outline" className="mt-4">
          Note: This is sample data for demonstration purposes.
        </Badge>
      </header>

      <Card className="bg-card">
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
                <TableRow key={creator.rank}>
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
        </CardContent>
      </Card>
    </div>
  );
}
