import { useState } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Card';
import type { Filme } from '@/types';
import dadosFilmes from '@/data/movies.json';

export default function Home() {

  const [filmes] = useState<Filme[]>(dadosFilmes);

  return (
    <div className="min-h-screen bg-[#040714]">

      <Header />

      {/* HERO */}
      <Banner filme={filmes[0]} />

      {/* CONTEÚDO */}
      <main className="px-8 md:px-16 pb-20">

        {/* BUSCA */}
        <section className="mt-10 mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Buscar filmes
          </h2>

          <SearchBar />
        </section>

        {/* LISTA ESTILO DISNEY+ (ROW) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Populares
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {filmes.map((filme) => (
              <div key={filme.id} className="min-w-[220px]">
                <Card movie={filme} />
              </div>
            ))}
          </div>
        </section>

        {/* OUTRA ROW (exemplo) */}
        <section className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {filmes.slice(0, 6).map((filme) => (
              <div key={filme.id} className="min-w-[220px]">
                <Card movie={filme} />
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}