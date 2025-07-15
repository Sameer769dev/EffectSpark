
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AtSign, History, User, Link as LinkIcon } from 'lucide-react';

const effectHistory = [
  { id: 'E001', name: 'Cyberpunk Glitch', date: '2024-07-15', videos: '1.2M', status: 'Live' },
  { id: 'E002', name: 'Vintage Film Look', date: '2024-06-28', videos: '850K', status: 'Live' },
  { id: 'E003', name: 'AR Pet Companion', date: '2024-05-10', videos: '3.5M', status: 'Live' },
  { id: 'E004', name: 'Interactive Quiz', date: '2024-04-22', videos: '500K', status: 'In Review' },
];

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Profile & Settings
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your creator profile and linked accounts.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="bg-card border-border">
            <CardHeader className="items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="creator avatar" alt="@creator" />
                <AvatarFallback>EH</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">EffectHouse-User</CardTitle>
              <CardDescription>Joined July 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-3">
                  <User className="text-muted-foreground" />
                  <span className='font-medium'>JP Pirie</span>
               </div>
                <div className="flex items-center gap-3">
                  <AtSign className="text-muted-foreground" />
                   <span className='text-muted-foreground'>user@effecthouse.com</span>
               </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon />
                Linked TikTok
              </CardTitle>
              <CardDescription>
                Link your TikTok account to sync effects and data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input defaultValue="@creator_handle" />
                <Button>Save</Button>
              </div>
            </CardContent>
          </Card>

        </div>

        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History />
                Effect History
              </CardTitle>
              <CardDescription>
                A log of your generated and published effects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Effect Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Videos</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {effectHistory.map((effect) => (
                    <TableRow key={effect.id}>
                      <TableCell className="font-medium">{effect.name}</TableCell>
                      <TableCell>{effect.date}</TableCell>
                      <TableCell className="text-right">{effect.videos}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={effect.status === 'Live' ? 'default' : 'secondary'}
                          className={effect.status === 'Live' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}
                        >
                          {effect.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Note: This is sample data for demonstration purposes.
                </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
