import { Link, useLocation } from "wouter";
import { Heart, Home, Film, Tv, User } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Início", icon: Home },
    { href: "/filmes", label: "Filmes", icon: Film },
    { href: "/series", label: "Séries", icon: Tv },
    { href: "/favoritos", label: "Favoritos", icon: Heart },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#040714]/95 backdrop-blur-md border-b border-white/5">
      <nav className="container mx-auto h-16 flex items-center justify-between px-6">

        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-1 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
              DISNEY
            </span>
            <span className="text-blue-300 font-black text-sm align-super italic -ml-0.5">
              +
            </span>
          </a>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = location === href;
            return (
              <Link key={href} href={href}>
                <a
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-wide
                    transition-all duration-200 border
                    ${active
                      ? "text-white bg-blue-600/20 border-blue-500/40"
                      : "text-white/60 border-transparent hover:text-white hover:bg-white/8 hover:border-white/10"
                    }
                  `}
                >
                  <Icon size={16} />
                  {label}
                </a>
              </Link>
            );
          })}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <User size={16} className="text-white" />
        </div>
      </nav>
    </header>
  );
}