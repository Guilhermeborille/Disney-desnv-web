import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';
import { useFavoritesContext } from '@/contexts/FavoritesContext';


export default function Favorites() {

    const { favorites } = useFavoritesContext();

    return (
        <div className="min-h-screen bg-black">
            <Header />

            <section className="container pt-24 pb-20">
                <div className="mb-12 ms-4">
                    <Link href="/">
                        <a>
                            <Button 
                                variant="ghost"
                                className="flex items-center gap-2 text-red-600 hover:text-red-500 hover:bg-transparent transition-colors duration-200 mb-6 font-semibold"
                            >
                                <ArrowLeft size={20} />
                                Voltar
                            </Button>
                        </a>
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-black text-white">
                        Meus Favoritos
                    </h1>
                    <p className="text-neutral-400 mt-2">
                        {favorites.length} - filme{favorites.length > 1 ? 's' : ''} salvo{favorites.length > 1 ? 's' : ''}
                    </p>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites.map((movie) => (
                            <Card key={movie.id} movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-32">
                        <div className="text-center">
                        <p className="text-2xl font-bold text-neutral-400 mb-4">
                            Nenhum filme favorito ainda
                        </p>
                        <p className="text-neutral-500 mb-8">
                            Comece a adicionar filmes aos seus favoritos
                        </p>
                        <Link href="/">
                            <a>
                            <Button className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-200">
                                Explorar Filmes
                            </Button>
                            </a>
                        </Link>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}