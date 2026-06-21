import { Link } from "wouter";
import { Heart, Play } from "lucide-react";
import type { Filme } from "@/types";
import { useFavoritesContext } from "@/contexts/FavoritesContext";

interface Props {
  movie: Filme;
}

export default function MovieCard({ movie }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesContext();
  const favorite = isFavorite(movie.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Pega o primeiro gênero para o badge
  const primaryGenre = movie.genero?.[0]?.toUpperCase() ?? "FILME";

  return (
    <Link href={`/filme/${movie.id}`}>
      <a className="group block h-full focus:outline-none">
        <div className="relative h-full bg-[#0b0f29] border border-white/7 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(26,107,255,0.12)]">

          {/* Imagem */}
          <div className="relative w-full h-52 overflow-hidden bg-black">
            <img
              src={movie.imagem}
              alt={movie.titulo}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
            />

            {/* Badge de franquia/gênero */}
            <div className="absolute top-2.5 left-2.5 bg-blue-600/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded z-10">
              {primaryGenre}
            </div>

            {/* Botão de favorito */}
            <button
              onClick={handleFavorite}
              aria-label={favorite ? "Remover favorito" : "Adicionar favorito"}
              className={`
                absolute top-2.5 right-2.5 z-10
                w-7 h-7 rounded-full border backdrop-blur-sm
                flex items-center justify-center
                transition-all duration-200
                ${favorite
                  ? "text-rose-400 border-rose-400/40 bg-rose-500/15 hover:bg-rose-500/25"
                  : "text-white/60 border-white/15 bg-[#040714]/70 hover:text-white hover:bg-white/15"
                }
              `}
            >
              <Heart size={12} fill={favorite ? "currentColor" : "none"} />
            </button>

            {/* Overlay com play */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040714]/95 via-[#040714]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Play size={16} fill="#040714" className="text-[#040714] ml-0.5" />
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-3.5">
            <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug mb-2">
              {movie.titulo}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-yellow-400 font-bold">★ {movie.avaliacao}</span>
                <span className="text-white/35">{movie.ano}</span>
              </div>
            </div>

            {movie.genero?.length > 0 && (
              <p className="text-[11px] text-white/30 mt-1.5 truncate">
                {movie.genero.join(" · ")}
              </p>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
}