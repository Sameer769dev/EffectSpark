
'use client';

import { BarChart, Heart, Sparkles, TrendingUp, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/generator', label: 'Generator', icon: Sparkles },
  { href: '/trends', label: 'Trends', icon: TrendingUp },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/creators', label: 'Creators', icon: BarChart },
  { href: '/profile', label: 'Profile', icon: User },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show the main nav on the landing page or login pages
  if (pathname === '/' || pathname === '/login' || pathname === '/profile/create') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">EffectSpark</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ href, label }) => (
              <Button
                key={href}
                variant={pathname.startsWith(href) ? 'secondary' : 'ghost'}
                asChild
                className="h-9 px-4"
              >
                <Link href={href}>
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container max-w-screen-2xl py-8">{children}</div>
      </main>
      <footer className="md:hidden sticky bottom-0 z-50 mt-auto border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="flex items-center justify-around h-16">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-colors hover:text-primary w-16 h-full',
                pathname.startsWith(href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs text-center">{label}</span>
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
}
