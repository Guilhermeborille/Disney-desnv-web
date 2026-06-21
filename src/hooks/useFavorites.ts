import { useState, useEffect } from 'react';
import type { Movie } from '@/types';

export function useFavorites() {

  const [favorites, setFavorites] = useState<Movie[]>(() => {
    // Garante que roda no ambiente do navegador
    if (typeof window !== 'undefined') { 
      const stored = localStorage.getItem('favorites');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
        }
      }
    }
    return []; // se não houver nada salvo
  });

  useEffect(() => {
    // Salva quando favoritos muda
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      if (!prev.find((m) => m.id === movie.id)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((m) => m.id === movieId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}