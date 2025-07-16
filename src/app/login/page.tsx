
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

// Google Icon SVG
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 6.097-4.464 10.994-9.95 10.994S-4.265 14.283-4.265 8.186c0-5.523 4.464-9.996 9.95-9.996a9.42 9.42 0 0 1 6.862 2.793l-3.377 3.377z" transform="translate(6.5 6.5)" />
    </svg>
)

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                         <GoogleIcon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle>Welcome to EffectSpark</CardTitle>
                    <CardDescription>
                        Connect your Google account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full">
                        <Link href="/api/auth/google">
                            <GoogleIcon className="mr-2 h-5 w-5" />
                            <span>Continue with Google</span>
                        </Link>
                    </Button>
                </CardContent>
                 <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">
                       By signing in, you agree to our{' '}
                        <Link href="/terms" className="underline hover:text-primary">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="underline hover:text-primary">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
