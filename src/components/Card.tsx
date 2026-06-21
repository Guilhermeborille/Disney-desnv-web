import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types';
import { useFavoritesContext } from '@/contexts/FavoritesContext';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {

  const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
  const favorite = isFavorite(movie.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();

    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link href={`/filme/${movie.id}`}>
      <a className="group block h-full">
        <Card className="
          relative
          h-full
          bg-[#0b0f29]
          border border-white/10
          overflow-hidden
          transition-all duration-300
          hover:border-white/30
          hover:shadow-lg
          hover:shadow-black/40
        ">

          {/* Imagem */}
          <div className="relative w-full h-64 overflow-hidden bg-black">
            <img
              src={movie.imagem}
              alt={movie.titulo}
              className="
                w-full h-full object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
            />

            {/* Overlay suave */}
            <div className="
              absolute inset-0
              bg-gradient-to-t from-[#040714] via-transparent to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-300
            " />
          </div>

          {/* Conteúdo */}
          <div className="p-4">

            <h3 className="
              text-sm font-semibold text-white
              line-clamp-2 mb-2
            ">
              {movie.titulo}
            </h3>

            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="text-white font-medium">
                  ★ {movie.avaliacao}
                </span>
                <span>{movie.ano}</span>
              </div>

              {/* Favorito */}
              <Button
                onClick={handleFavorite}
                variant="ghost"
                size="sm"
                className="
                  p-1.5
                  rounded-full
                  bg-white/10
                  text-white
                  hover:bg-white/20
                  transition-all
                "
                aria-label={favorite ? 'Remover favorito' : 'Adicionar favorito'}
              >
                <Heart
                  size={16}
                  fill={favorite ? 'currentColor' : 'none'}
                />
              </Button>

            </div>

            <p className="text-xs text-gray-400 line-clamp-2">
              {movie.genero.join(', ')}
            </p>

          </div>

        </Card>
      </a>
    </Link>
  );
}