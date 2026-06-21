import { useState } from 'react';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import SearchBar from '@/components/SearchBar';
import Card from '@/components/Card';
import type { Filme } from '@/types';
import dadosFilmes from '@/data/movies.json';

export default function Home() {
    
    const [Filmes] = useState<Filme[]>(dadosFilmes);

    return (
        <div className="min-h-screen bg-black px-4">
            <Header />
            <Banner filme={Filmes[0]} />
            <section className="bg-black pt-12 pb-20">
                <div className="container">
                    <div className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Descubra Filmes
                        </h2>
                         <SearchBar />
                    </div>
            
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {
                            Filmes.map((filme) => (
                                <Card key={filme.id} movie={filme} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}