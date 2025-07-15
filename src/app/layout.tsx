import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { MainLayout } from '@/components/layout/main-layout';
import { FavoritesProvider } from '@/context/favorites-context';

export const metadata: Metadata = {
  title: 'EffectSpark',
  description: 'AI-powered inspiration for TikTok Effect Creators',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FavoritesProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster />
        </FavoritesProvider>
      </body>
    </html>
  );
}
