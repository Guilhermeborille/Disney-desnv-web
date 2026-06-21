import { Link } from "wouter";
import { Heart, Home, Film } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#040714]/95 backdrop-blur border-b border-white/10">
      <nav className="container mx-auto h-16 flex items-center justify-between px-6">

        <Link href="/">
          <a className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Disney+
            </h1>
          </a>
        </Link>

        <div className="flex items-center gap-8 text-white">

          <Link href="/">
            <a className="flex items-center gap-2 text-sm uppercase tracking-wider hover:border-b-2 hover:border-white pb-1 transition-all">
              <Home size={18} />
              Início
            </a>
          </Link>

          <Link href="/filmes">
            <a className="flex items-center gap-2 text-sm uppercase tracking-wider hover:border-b-2 hover:border-white pb-1 transition-all">
              <Film size={18} />
              Filmes
            </a>
          </Link>

          <Link href="/favoritos">
            <a className="flex items-center gap-2 text-sm uppercase tracking-wider hover:border-b-2 hover:border-white pb-1 transition-all">
              <Heart size={18} />
              Favoritos
            </a>
          </Link>

        </div>
      </nav>
    </header>
  );
}