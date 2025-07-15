'use client';

import { BarChart, Heart, PanelLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader className="p-4 border-b border-border">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-lg shadow-md">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="group-data-[collapsed=icon]:hidden">
                <h1 className="text-2xl font-bold font-headline text-foreground">
                  EffectSpark
                </h1>
              </div>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/'}
                  tooltip={{ children: 'Generator' }}
                >
                  <Link href="/">
                    <Sparkles />
                    <span>Generator</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/favorites'}
                  tooltip={{ children: 'Favorites' }}
                >
                  <Link href="/favorites">
                    <Heart />
                    <span>Favorites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/creators'}
                  tooltip={{ children: 'Top Creators' }}
                >
                  <Link href="/creators">
                    <BarChart />
                    <span>Top Creators</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex items-center justify-between md:hidden p-4 border-b border-border">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="text-primary h-6 w-6" />
              <span className="text-xl font-bold font-headline text-foreground">
                EffectSpark
              </span>
            </Link>
            <SidebarTrigger />
          </header>
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
