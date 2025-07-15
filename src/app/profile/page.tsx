
'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AtSign, History, User, Link as LinkIcon, Rss, Loader2 } from 'lucide-react';
import Link from 'next/link';

const effectHistory: any[] = [];

type UserProfile = {
    avatar_url: string;
    display_name: string;
    username: string;
}

// TikTok Icon SVG
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 288 332" {...props}>
        <path fill="#00FFFF" d="M81.5 194.1c-5.8-3.4-11.9-6.2-18-8.4v-56.1c3.5 1.1 6.8 2.3 10.2 3.6v-57.9c-3.4-.9-6.8-1.8-10.2-2.7V19.9c32.3 0 59.4 26.9 59.4 60.2 0 33.3-27.1 60.2-59.4 60.2-1.5 0-3-.1-4.4-.2v56.5c24.4 9.1 47.9 20.3 69.1 34.3v-58.3c-20.4-12.8-42.3-24.3-64.7-33.4z"></path>
        <path fill="#A020F0" d="M149.2 0v180.6c-26.2 15.3-54.7 26.9-84.7 34.3V158c29.1-7.2 56.4-19.1 80.3-34.3V0h4.4z"></path>
        <path fill="#FFFFFF" d="M208.6 19.9v57.9c-3.4 1-6.8 1.9-10.2 2.7v57.9c3.4-1.2 6.8-2.5 10.2-3.6v56.1c-6.1 2.2-12.2 5-18 8.4-22.4 9.1-44.3 20.6-64.7 33.4v58.3c21.2-14 44.7-25.2 69.1-34.3 26-9.6 51.5-22.1 74.3-37.2 22.9-15.1 43.1-33.1 60.2-53.5 17.1-20.4 30.6-43.7 39.9-69.1 1.5-4.1 2.9-8.2 4.1-12.4h-58.3c-1.2 3.8-2.5 7.6-4.1 11.3-8.8 23.8-22.1 45-39.2 63.1-17.1 18-36.8 33.4-58.8 45.8v-57.9c25.2-11.3 48.7-25.5 69.8-42.5 21.1-17.1 39.2-37.1 53.5-59.4 14.3-22.2 24.3-46.8 29.5-73.4h58.3c-9.1 26.6-22.8 51.2-40.6 73.4-17.8 22.2-38.9 41.5-62.8 57.2z"></path>
    </svg>
)

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data.user);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, []);

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
                <AvatarImage src={profile?.avatar_url || "https://placehold.co/100x100.png"} data-ai-hint="creator avatar" alt={profile?.username || 'creator'} />
                <AvatarFallback>{profile?.display_name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{profile?.display_name || 'EffectHouse-User'}</CardTitle>
              <CardDescription>{profile ? `@${profile.username}` : 'Creator Account'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-3">
                  <User className="text-muted-foreground" />
                  <span className='font-medium'>{profile?.display_name || 'Your Name'}</span>
               </div>
                <div className="flex items-center gap-3">
                  <AtSign className="text-muted-foreground" />
                   <span className='text-muted-foreground'>{profile ? `${profile.username}@tiktok.com` : 'user@example.com'}</span>
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
              {isLoading ? (
                <div className='flex justify-center items-center h-10'>
                    <Loader2 className="animate-spin" />
                </div>
              ) : profile ? (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-secondary p-3 rounded-lg">
                        <TikTokIcon className="h-6 w-6" />
                        <span className="font-medium text-foreground">@{profile.username}</span>
                    </div>
                    <Button variant="outline" asChild className="w-full">
                        <Link href="/api/auth/logout">Unlink Account</Link>
                    </Button>
                </div>
              ) : (
                <Button asChild className="w-full bg-black hover:bg-gray-800 text-white font-bold border border-gray-600">
                    <Link href="/api/auth/tiktok">
                        <TikTokIcon className="h-5 w-5" />
                        <span>Login with TikTok</span>
                    </Link>
                </Button>
              )}
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
              {effectHistory.length > 0 ? (
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
                          {/* Badge styling would go here */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card/50">
                  <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No Effect History</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Link your TikTok account to see your effect history here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

