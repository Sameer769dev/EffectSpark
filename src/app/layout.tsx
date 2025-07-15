import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainLayout } from '@/components/layout/main-layout';
import { FavoritesProvider } from '@/context/favorites-context';

export const metadata: Metadata = {
  title: 'EffectSpark',
  description: 'AI-powered inspiration for TikTok Effect Creators',
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1E1B2E" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <FavoritesProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </FavoritesProvider>
      </body>
    </html>
  );
}
