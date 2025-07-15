'use client';

import type { EffectIdea } from '@/types';
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from 'react';
import { useToast } from '@/hooks/use-toast';

interface FavoritesContextType {
  favorites: EffectIdea[];
  addFavorite: (idea: EffectIdea) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<EffectIdea[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('effect-spark-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('effect-spark-favorites', JSON.stringify(favorites));
    } catch(error) {
        console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (idea: EffectIdea) => {
    setFavorites((prev) => {
        if (prev.find(fav => fav.id === idea.id)) {
            return prev;
        }
        toast({
            title: 'Favorite Added!',
            description: `"${idea.title}" has been saved.`,
        });
        return [...prev, idea];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const ideaToRemove = prev.find(fav => fav.id === id);
      if (ideaToRemove) {
        toast({
            title: 'Favorite Removed',
            description: `"${ideaToRemove.title}" has been removed from your favorites.`,
        });
      }
      return prev.filter((fav) => fav.id !== id)
    });
  };

  const isFavorite = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
