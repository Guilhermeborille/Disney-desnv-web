import { useState, useMemo } from "react";
import { Heart, Search, Grid3x3, List, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import MovieCard from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import { useFavoritesContext } from "@/contexts/FavoritesContext";

type ViewMode = "grid" | "list";
type SortOption = "adicionado" | "titulo" | "avaliacao" | "ano";

export default function Favoritos() {
  const { favorites, removeFavorite } = useFavoritesContext();
  const [query, setQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("adicionado");

  const filtrados = useMemo(() => {
    let lista = [...favorites];

    if (query.trim()) {
      const q = query.toLowerCase();
      lista = lista.filter(
        (f) =>
          f.titulo.toLowerCase().includes(q) ||
          f.genero?.some((g: String) => g.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "titulo":
        lista.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case "avaliacao":
        lista.sort((a, b) => Number(b.avaliacao) - Number(a.avaliacao));
        break;
      case "ano":
        lista.sort((a, b) => Number(b.ano) - Number(a.ano));
        break;
      default:
        break;
    }

    return lista;
  }, [favorites, query, sortBy]);

  return (
    <div className="min-h-screen bg-[#040714]">
      <Header />

      {/* Hero header da página */}
      <div className="relative pt-16 overflow-hidden">
        {/* Fundo com gradiente e blur dos posters */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="flex absolute inset-0 opacity-10">
            {favorites.slice(0, 6).map((f, i) => (
              <img
                key={i}
                src={f.imagem ?? f.fundo}
                alt=""
                className="flex-1 object-cover"
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#040714]/60 via-[#040714]/80 to-[#040714]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-transparent to-[#040714]" />
        </div>

        <div className="relative px-6 md:px-14 pt-16 pb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center">
              <Heart size={22} className="text-rose-400" fill="currentColor" />
            </div>
            <div>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-0.5">
                Minha lista
              </p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Favoritos
              </h1>
            </div>
          </div>
          <p className="text-white/45 text-sm ml-16">
            {favorites.length === 0
              ? "Você ainda não adicionou nenhum favorito"
              : `${favorites.length} título${favorites.length !== 1 ? "s" : ""} salvos`}
          </p>
        </div>
      </div>

      <main className="px-6 md:px-14 pb-24">

        {/* Sem favoritos */}
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mb-6">
              <Heart size={36} className="text-white/20" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Sua lista está vazia
            </h2>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed">
              Adicione filmes e séries aos favoritos clicando no ícone{" "}
              <Heart size={12} className="inline text-rose-400" fill="currentColor" />{" "}
              em qualquer título.
            </p>
          </div>
        )}

        {favorites.length > 0 && (
          <>
            {/* Barra de filtros */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-white/8 pb-6">
              <SearchBar
                placeholder="Buscar nos favoritos..."
                onSearch={setQuery}
              />

              <div className="flex items-center gap-3">
                {/* Ordenação */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 h-10">
                  <span className="text-white/40 text-xs font-medium">Ordenar:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-transparent text-white text-xs font-medium outline-none cursor-pointer"
                  >
                    <option value="adicionado" className="bg-[#0b0f29]">Adicionado</option>
                    <option value="titulo" className="bg-[#0b0f29]">Título A–Z</option>
                    <option value="avaliacao" className="bg-[#0b0f29]">Melhor avaliado</option>
                    <option value="ano" className="bg-[#0b0f29]">Mais recente</option>
                  </select>
                </div>

                {/* Toggle de visualização */}
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-all ${
                      viewMode === "grid"
                        ? "bg-blue-600/30 text-blue-400"
                        : "text-white/35 hover:text-white/60"
                    }`}
                    aria-label="Visualização em grade"
                  >
                    <Grid3x3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-all ${
                      viewMode === "list"
                        ? "bg-blue-600/30 text-blue-400"
                        : "text-white/35 hover:text-white/60"
                    }`}
                    aria-label="Visualização em lista"
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Sem resultados na busca */}
            {filtrados.length === 0 && (
              <div className="flex flex-col items-center py-20 text-center">
                <Search size={32} className="text-white/20 mb-4" />
                <p className="text-white/50 font-medium mb-1">
                  Nenhum resultado para "{query}"
                </p>
                <p className="text-white/30 text-sm">
                  Tente buscar por outro título ou gênero
                </p>
              </div>
            )}

            {/* Grade */}
            {filtrados.length > 0 && viewMode === "grid" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {filtrados.map((filme) => (
                  <MovieCard key={filme.id} movie={filme} />
                ))}
              </div>
            )}

            {/* Lista */}
            {filtrados.length > 0 && viewMode === "list" && (
              <div className="flex flex-col gap-2">
                {filtrados.map((filme) => (
                  <div
                    key={filme.id}
                    className="group flex items-center gap-4 bg-white/4 hover:bg-white/7 border border-white/7 hover:border-white/15 rounded-xl px-4 py-3 transition-all duration-200 cursor-pointer"
                  >
                    {/* Poster */}
                    <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 bg-black">
                      <img
                        src={filme.imagem}
                        alt={filme.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white truncate mb-1">
                        {filme.titulo}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <span className="text-yellow-400 font-bold">★ {filme.avaliacao}</span>
                        <span className="w-0.5 h-0.5 rounded-full bg-white/25" />
                        <span>{filme.ano}</span>
                        {filme.duracao && (
                          <>
                            <span className="w-0.5 h-0.5 rounded-full bg-white/25" />
                            <span>{filme.duracao} min</span>
                          </>
                        )}
                      </div>
                      {filme.genero?.length > 0 && (
                        <p className="text-[11px] text-white/25 mt-1 truncate">
                          {filme.genero.join(" · ")}
                        </p>
                      )}
                    </div>

                    {/* Remover */}
                    <button
                      onClick={() => removeFavorite(filme.id)}
                      aria-label="Remover dos favoritos"
                      className="shrink-0 opacity-0 group-hover:opacity-100 w-8 h-8 rounded-lg flex items-center justify-center text-white/35 hover:text-rose-400 hover:bg-rose-500/15 transition-all duration-200"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}