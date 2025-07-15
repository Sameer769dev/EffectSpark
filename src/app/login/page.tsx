'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

// TikTok Icon SVG
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97v7.48c0 2.9-2.32 5.23-5.17 5.23-2.81 0-5.1-2.3-5.1-5.18 0-2.86 2.32-5.17 5.1-5.17.06 0 .12.01.18.01v4.02c-.18-.01-.36-.02-.53-.02-1.09 0-1.97.9-1.97 2.02 0 1.14.9 2.03 1.97 2.03 1.1 0 1.97-.9 1.97-2.03v-7.42c.31.02.62.03.92.03.22 0 .44-.01.66-.02v-4.02c-.22.01-.43.02-.64.02-1.31 0-2.62-.01-3.92-.02-.08-1.53-.62-3.09-1.75-4.17C8.9 1.11 7.33.6 5.9.42V0h6.625z"></path>
    </svg>
)

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center min-h-[80vh]">
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
