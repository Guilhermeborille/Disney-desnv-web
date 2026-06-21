import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/types';
// Linha Adicionada
import { useFavoritesContext } from '@/contexts/FavoritesContext';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {

    // Linhas Adicionadas
    const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
    const favorite = isFavorite(movie.id);

    const handleFavorite = (e: React.MouseEvent) => {
        // Linhas Acionadas
        e.preventDefault();
        if (favorite) {
            removeFavorite(movie.id);
        } 
        else {
            addFavorite(movie);
        }
    }

    return (
        <Link href={`/filme/${movie.id}`}>
            <a className="group block h-full">
                <Card className="relative h-full bg-neutral-900 border-neutral-800 hover:border-red-600 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/20 hover:scale-105 overflow-hidden">
                <div className="relative w-full h-64 overflow-hidden bg-neutral-800">
                    <img
                        src={movie.imagem}
                        alt={movie.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                    <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">
                        {movie.titulo}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-red-600">★ {movie.avaliacao}</span>
                            <span className="text-xs text-neutral-400">{movie.ano}</span>
                        </div>
                        <Button
                            onClick={handleFavorite}
                            variant="ghost"
                            size="sm"
                            className={`p-1.5 rounded-full transition-all duration-200 ${
                            favorite
                                ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white'
                                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'
                            }`}
                            aria-label={favorite ? 'Remover de favoritos' : 'Adicionar aos favoritos'}
                        >
                            <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
                        </Button>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-2">
                        {movie.genero.join(', ')}
                    </p>
                </div>
                </Card>
            </a>
        </Link>
    )
}