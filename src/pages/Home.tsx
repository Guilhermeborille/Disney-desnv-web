import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/Card";
import type { Filme } from "@/types";
import dadosFilmes from "@/data/movies.json";

interface SectionRowProps {
  title: string;
  filmes: Filme[];
  accentColor?: string;
}

function SectionRow({ title, filmes, accentColor = "bg-blue-500" }: SectionRowProps) {
  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span className={`inline-block w-1 h-5 rounded-sm ${accentColor}`} />
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <button className="text-xs font-medium text-blue-400 hover:text-blue-300 tracking-wide transition-colors">
          Ver todos →
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide [&::-webkit-scrollbar]:h-0.5 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded">
        {filmes.map((filme) => (
          <div key={filme.id} className="min-w-[168px] max-w-[168px]">
            <MovieCard movie={filme} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [filmes] = useState<Filme[]>(dadosFilmes as Filme[]);
  const [query, setQuery] = useState("");

  const filtrados = useMemo(() => {
    if (!query.trim()) return filmes;
    const q = query.toLowerCase();
    return filmes.filter(
      (f) =>
        f.titulo.toLowerCase().includes(q) ||
        f.genero?.some((g) => g.toLowerCase().includes(q))
    );
  }, [filmes, query]);

  const buscando = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-[#040714]">
      <Header />

      {/* Banner hero — só aparece quando não está buscando */}
      {!buscando && <Banner filme={filmes[0]} />}

      <main className="px-6 md:px-14 pb-24">

        {/* Busca */}
        <section className={`${buscando ? "pt-28" : "mt-10"} mb-10`}>
          <h2 className="text-lg font-semibold text-white/70 mb-3 tracking-wide">
            Buscar conteúdo
          </h2>
          <SearchBar onSearch={setQuery} />
        </section>

        {/* Resultados da busca */}
        {buscando ? (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block w-1 h-5 rounded-sm bg-blue-500" />
              <h2 className="text-xl font-bold text-white">
                {filtrados.length > 0
                  ? `${filtrados.length} resultado${filtrados.length !== 1 ? "s" : ""} para "${query}"`
                  : `Nenhum resultado para "${query}"`}
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtrados.map((filme) => (
                <MovieCard key={filme.id} movie={filme} />
              ))}
            </div>
          </section>
        ) : (
          <>
            <SectionRow
              title="Populares agora"
              filmes={filmes}
              accentColor="bg-blue-500"
            />
            <SectionRow
              title="Recomendados para você"
              filmes={filmes.slice(0, 8)}
              accentColor="bg-rose-500"
            />
            <SectionRow
              title="Lançamentos"
              filmes={filmes.slice(2, 10)}
              accentColor="bg-violet-500"
            />
          </>
        )}
      </main>
    </div>
  );
}