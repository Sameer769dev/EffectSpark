
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-lg">EffectSpark</span>
          </Link>
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-5xl py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-center mb-8">
            {title}
          </h1>
          {children}
        </div>
      </main>
      <footer className="border-t border-border/40 py-8 bg-background">
          <div className="container max-w-5xl text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} EffectSpark. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
