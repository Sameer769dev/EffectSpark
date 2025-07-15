'use client';

import { useFavorites } from '@/context/favorites-context';
import { EffectIdeaCard } from '@/components/effect-idea-card';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
          Your Favorite Ideas
        </h1>
        <p className="text-muted-foreground mt-2">
          A collection of your saved effect ideas. Ready to start creating?
        </p>
      </header>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50">
          {favorites.map((idea) => (
            <EffectIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg bg-card">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No Favorites Yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Go to the generator to find and save some ideas!
          </p>
        </div>
      )}
    </div>
  );
}
