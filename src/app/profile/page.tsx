
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
import { AtSign, History, User, Link as LinkIcon, Rss, Loader2, Edit } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const effectHistory: any[] = [];

type UserProfile = {
    avatar_url: string;
    display_name: string;
    username: string;
    creatorStyle?: string;
    interests?: string;
}

// TikTok Icon SVG
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97v7.48c0 2.9-2.32 5.23-5.17 5.23-2.81 0-5.1-2.3-5.1-5.18 0-2.86 2.32-5.17 5.1-5.17.06 0 .12.01.18.01v4.02c-.18-.01-.36-.02-.53-.02-1.09 0-1.97.9-1.97 2.02 0 1.14.9 2.03 1.97 2.03 1.1 0 1.97-.9 1.97-2.03v-7.42c.31.02.62.03.92.03.22 0 .44-.01.66-.02v-4.02c-.22.01-.43.02-.64.02-1.31 0-2.62-.01-3.92-.02-.08-1.53-.62-3.09-1.75-4.17C8.9 1.11 7.33.6 5.9.42V0h6.625z"></path>
    </svg>
)

function LoggedOutState() {
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        <TikTokIcon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Welcome to EffectSpark</CardTitle>
                    <CardDescription>
                        Connect your TikTok account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth/tiktok">
                            <TikTokIcon className="mr-2 h-5 w-5" />
                            <span>Continue with TikTok</span>
                        </Link>
                    </Button>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">
                        We'll use your basic profile info to personalize your experience.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}


export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchProfile() {
            setIsLoading(true);
            try {
                const res = await fetch('/api/user/profile');
                if (res.ok) {
                    const data = await res.json();
                     if (data.isLoggedIn) {
                        setProfile(data.user);
                        if (!data.profileComplete) {
                            router.replace('/profile/create');
                        }
                    } else {
                        setProfile(null);
                    }
                } else {
                   setProfile(null);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
                setProfile(null);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, [router]);
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
    }

    if (!profile) {
        return <LoggedOutState />;
    }

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
                   <span className='text-muted-foreground'>{profile ? `@${profile.username}` : 'user@example.com'}</span>
               </div>
            </CardContent>
            {profile && (
              <CardFooter className="flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full">
                      <Link href="/profile/create"><Edit className="mr-2" /> Edit Profile</Link>
                  </Button>
                  <Button variant="destructive" asChild className="w-full">
                        <Link href="/api/auth/logout">Unlink Account</Link>
                  </Button>
              </CardFooter>
            )}
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
