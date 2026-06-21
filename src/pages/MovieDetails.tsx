import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Heart, Play, Star, Clock, Calendar, User } from 'lucide-react';
import Header from '@/components/Header';
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
      <div className="min-h-screen bg-[#040714] flex flex-col items-center justify-center gap-6">
        <Header />
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-3">Filme não encontrado</h1>
          <p className="text-white/40 mb-8">O título que você procura não existe ou foi removido.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#040714] font-bold rounded-lg hover:bg-blue-50 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Voltar para início
          </button>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);

  const handleFavorite = () => {
    if (favorite) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div className="min-h-screen bg-[#040714]">
      <Header />

      {/* ── HERO COM FUNDO ── */}
      <div className="relative w-full h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={movie.fundo}
          alt={movie.titulo}
          className="w-full h-full object-cover object-top"
        />
        {/* Gradientes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040714]/40 via-transparent to-transparent" />

        {/* Botão voltar */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-24 left-6 md:left-14 flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          Voltar
        </button>

        {/* Conteúdo sobre o hero */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10">
          <div className="max-w-2xl">
            {/* Gêneros como badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genero?.map((g) => (
                <span
                  key={g}
                  className="text-[10px] font-bold uppercase tracking-widest text-blue-300 bg-blue-500/15 border border-blue-400/25 px-2.5 py-1 rounded"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4 drop-shadow-2xl">
              {movie.titulo}
            </h1>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-3 text-sm mb-6">
              <span className="flex items-center gap-1.5 text-yellow-400 font-bold">
                <Star size={14} fill="currentColor" />
                {movie.avaliacao ?? movie.rating}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5 text-white/50">
                <Calendar size={13} />
                {movie.ano}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span className="flex items-center gap-1.5 text-white/50">
                <Clock size={13} />
                {movie.duracao} min
              </span>
              {movie.classificacao && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/25" />
                  <span className="text-white/50 bg-white/10 px-2 py-0.5 rounded text-xs font-medium">
                    {movie.classificacao}
                  </span>
                </>
              )}
            </div>

            {/* Botões de ação */}
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2.5 bg-white text-[#040714] hover:bg-blue-50 active:scale-95 font-bold px-7 py-3 rounded-lg text-sm tracking-wide transition-all duration-200">
                <Play size={16} fill="currentColor" />
                Assistir agora
              </button>
              <button
                onClick={handleFavorite}
                className={`flex items-center gap-2.5 active:scale-95 border font-semibold px-5 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 ${
                  favorite
                    ? 'bg-rose-500/20 border-rose-400/40 text-rose-300 hover:bg-rose-500/30'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/18 backdrop-blur-sm'
                }`}
              >
                <Heart size={16} fill={favorite ? 'currentColor' : 'none'} />
                {favorite ? 'Salvo' : 'Minha lista'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DETALHES ── */}
      <main className="px-6 md:px-14 pb-24 -mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">

          {/* Poster lateral */}
          <div className="hidden md:block">
            <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] aspect-[2/3]">
              <img
                src={movie.imagem}
                alt={movie.titulo}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040714]/30 to-transparent" />
            </div>
          </div>

          {/* Infos principais */}
          <div className="md:col-span-2 flex flex-col gap-8 pt-2">

            {/* Sinopse */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-white/35 mb-3">
                Sinopse
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                {movie.descricao}
              </p>
            </div>

            {/* Separador */}
            <div className="border-t border-white/8" />

            {/* Ficha técnica */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {movie.diretor && (
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={15} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                      Diretor
                    </p>
                    <p className="text-white font-semibold text-sm">{movie.diretor}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar size={15} className="text-white/40" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                    Lançamento
                  </p>
                  <p className="text-white font-semibold text-sm">{movie.ano}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={15} className="text-white/40" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                    Duração
                  </p>
                  <p className="text-white font-semibold text-sm">{movie.duracao} minutos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Star size={15} className="text-white/40" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                    Avaliação
                  </p>
                  <p className="text-yellow-400 font-bold text-sm">
                    ★ {movie.avaliacao ?? movie.rating}
                    <span className="text-white/30 font-normal"> / 10</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Gêneros detalhados */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">
                Gêneros
              </p>
              <div className="flex flex-wrap gap-2">
                {movie.genero?.map((g) => (
                  <span
                    key={g}
                    className="text-xs font-semibold text-white/70 bg-white/8 border border-white/10 hover:border-white/20 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 cursor-default"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}