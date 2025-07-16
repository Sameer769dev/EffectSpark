
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
import { AtSign, History, User, Rss, Loader2, Edit, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const effectHistory: any[] = [];

type UserProfile = {
    avatar_url: string;
    display_name: string;
    username: string;
    creatorStyle?: string;
    interests?: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

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
                        router.replace('/login');
                    }
                } else {
                   router.replace('/login');
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'Could not fetch your profile. Please try logging in again.',
                });
                router.replace('/login');
            } finally {
                setIsLoading(false);
            }
        }
        fetchProfile();
    }, [router, toast]);
    
    if (isLoading || !profile) {
        return (
            <div className="flex justify-center items-center min-h-[80vh]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
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
                <AvatarImage src={profile.avatar_url} data-ai-hint="creator avatar" alt={profile.username} />
                <AvatarFallback>{profile.display_name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{profile.display_name}</CardTitle>
              <CardDescription>@{profile.username}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
                  <User className="text-muted-foreground" />
                  <span className='font-medium'>{profile.creatorStyle || 'Not Set'}</span>
               </div>
                <div className="flex items-center gap-3 p-2 rounded-md bg-secondary/50">
                  <AtSign className="text-muted-foreground" />
                   <span className='text-muted-foreground'>{profile.username}</span>
               </div>
            </CardContent>
              <CardFooter className="flex-col space-y-2">
                  <Button variant="outline" asChild className="w-full">
                      <Link href="/profile/create"><Edit /> Edit Profile</Link>
                  </Button>
                  <Button variant="destructive" asChild className="w-full">
                        <Link href="/api/auth/logout"><LogOut /> Sign Out</Link>
                  </Button>
              </CardFooter>
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
                    Connect your account to an external service to see your effect history here.
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
