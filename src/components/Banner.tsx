import { Link } from "wouter";
import { Play, Info, Star } from "lucide-react";
import type { Filme } from "@/types";

interface Props {
  filme: Filme;
}

export default function Banner({ filme }: Props) {
  return (
    <div className="relative w-full h-[80vh] min-h-[560px] overflow-hidden bg-[#040714]">

      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src={filme.fundo}
          alt={filme.titulo}
          className="w-full h-full object-cover object-top"
        />
        {/* Gradientes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-[#040714]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#040714]/30 via-transparent to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 pt-16">
        <div className="max-w-xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded mb-5">
            <Star size={10} fill="currentColor" />
            Em destaque
          </div>

          {/* Título */}
          <h1 className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-4 drop-shadow-2xl">
            {filme.titulo}
          </h1>

          {/* Metadados */}
          <div className="flex items-center gap-2 mb-5 text-sm">
            <span className="text-yellow-400 font-bold">★ {filme.avaliacao}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-white/55">{filme.ano}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-white/55">{filme.duracao} min</span>
          </div>

          {/* Descrição */}
          <p className="text-white/65 text-base leading-relaxed max-w-md mb-8">
            {filme.descricao}
          </p>

          {/* Botões */}
          <div className="flex items-center gap-3">
            <Link href={`/filme/${filme.id}`}>
              <a>
                <button className="flex items-center gap-2.5 bg-white text-[#040714] hover:bg-blue-50 active:scale-95 font-bold px-7 py-3 rounded-lg text-sm tracking-wide transition-all duration-200">
                  <Play size={16} fill="currentColor" />
                  Assistir
                </button>
              </a>
            </Link>
            <button className="flex items-center gap-2.5 bg-white/10 hover:bg-white/18 active:scale-95 border border-white/20 hover:border-white/30 text-white backdrop-blur-sm font-semibold px-6 py-3 rounded-lg text-sm tracking-wide transition-all duration-200">
              <Info size={16} />
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}