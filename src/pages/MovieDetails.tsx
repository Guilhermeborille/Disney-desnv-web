import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Heart, Play } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFavoritesContext } from '@/contexts/FavoritesContext';
import type { Movie } from '@/types';
import moviesData from '@/data/movies.json';

export default function MovieDetails() {

  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();

  const movieId = parseInt(params?.id || '0');
  const movie = moviesData.find((m) => m.id === movieId) as Movie | undefined;

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <Header />
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-4">Filme não encontrado</h1>
          <Button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-200 mx-auto"
          >
            <ArrowLeft size={20} />
            Voltar para Home
          </Button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="relative w-full h-96 bg-neutral-900 overflow-hidden pt-16">
        <img
          src={movie.fundo}
          alt={movie.titulo}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>

      <section className="container pb-20 -mt-24 relative z-10">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          size="icon"
          className="absolute top-0.5 left-1 bg-black/50 hover:bg-black text-white rounded-full transition-all duration-200 z-10"
          aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </Button>
        
        <Card className="bg-neutral-900 border-neutral-800 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex justify-center md:justify-start">
              <img
                src={movie.imagem}
                alt={movie.titulo}
                className="w-72 h-96 object-cover rounded-lg border border-neutral-700"
              />
            </div>

            <div className="md:col-span-2">
              <h1 className="text-5xl font-black text-white mb-4">
                {movie.titulo}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-red-600">★ {movie.rating}</span>
                  <span className="text-neutral-400">/10</span>
                </div>
                <div className="text-neutral-400">
                  <span className="font-semibold">{movie.ano}</span>
                </div>
                <div className="text-neutral-400">
                  <span className="font-semibold">{movie.duracao} minutos</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-neutral-400 mb-2">Diretor</p>
                <p className="text-xl font-semibold text-white">{movie.diretor}</p>
              </div>

              <div className="mb-6">
                <p className="text-neutral-400 mb-2">Gêneros</p>
                <div className="flex flex-wrap gap-2">
                  {movie.genero.map((g) => (
                    <Badge
                      key={g}
                      variant="secondary"
                      className="px-3 py-1 bg-neutral-800 text-neutral-200 rounded-full text-sm"
                    >
                      {g}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-neutral-400 mb-2">Sinopse</p>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  {movie.descricao}
                </p>
              </div>

              <div className="flex gap-4">
                <Button 
                  className="flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50 active:scale-95"
                >
                  <Play size={20} />
                  Assistir Agora
                </Button>
                <Button
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 px-8 py-3 font-bold rounded-lg transition-all duration-200 active:scale-95 ${
                    favorite
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-neutral-800 text-white hover:bg-neutral-700'
                  }`}
                >
                  <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
                  {favorite ? 'Remover' : 'Favoritar'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}