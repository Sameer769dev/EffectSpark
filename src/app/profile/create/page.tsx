
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type UserProfile = {
  avatar_url: string;
  display_name: string;
  username: string;
};

const profileFormSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters.'),
  creatorStyle: z.string().nonempty('Please select your creator style.'),
  interests: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function CreateProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: '',
      creatorStyle: '',
      interests: '',
    },
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user/profile');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          form.setValue('displayName', data.user.display_name);
        } else {
          // If we can't fetch profile, maybe session expired.
          router.push('/profile');
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [router, form]);

  async function onSubmit(data: ProfileFormValues) {
    try {
      const response = await fetch('/api/user/save-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      toast({
        title: 'Profile Saved!',
        description: 'Welcome! You can now access the generator.',
      });

      router.push('/generator');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Could not save your profile. Please try again.',
      });
    }
  }
  
  if (isLoading || !user) {
      return (
          <div className="flex justify-center items-center h-screen">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
      )
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary mx-auto">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>{user.display_name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Welcome, {user.display_name}!</CardTitle>
          <CardDescription>
            Let's set up your EffectSpark profile to personalize your experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your creator name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="creatorStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Creator Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AR Gamer">AR Gamer</SelectItem>
                        <SelectItem value="Beauty & Fashion">Beauty & Fashion</SelectItem>
                        <SelectItem value="Comedian & Meme-maker">Comedian & Meme-maker</SelectItem>
                        <SelectItem value="Educator">Educator</SelectItem>
                        <SelectItem value="Interactive Storyteller">Interactive Storyteller</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>This helps us recommend relevant ideas.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., retro gaming, sci-fi movies, 90s aesthetic, cottagecore..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>
                      List a few topics or styles you enjoy.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Profile & Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
