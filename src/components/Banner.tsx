import { Link } from 'wouter';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Filme } from '@/types';

interface Props {
  filme: Filme;
}

export default function Banner({ filme }: Props) {
  return (
    <div className="relative w-full h-[75vh] overflow-hidden bg-[#040714]">
      
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img
          src={filme.fundo}
          alt={filme.titulo}
          className="w-full h-full object-cover"
        />

        {/* Gradiente estilo Disney+ */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040714] via-[#040714]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#040714] via-transparent to-transparent" />
      </div>

      {/* Conteúdo */}
      <div className="relative h-full flex flex-col justify-center items-start px-8 md:px-16">
        
        <div className="max-w-2xl">

          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {filme.titulo}
          </h1>

          {/* Metadados */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
            <span className="font-semibold">★ {filme.avaliacao}</span>
            <span>{filme.ano}</span>
            <span>{filme.duracao} min</span>
          </div>

          {/* Descrição */}
          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-8">
            {filme.descricao}
          </p>

          {/* Botões */}
          <div className="flex gap-4">

            <Link href={`/filme/${filme.id}`}>
              <a>
                <Button
                  className="
                    bg-white
                    text-black
                    hover:bg-gray-200
                    font-semibold
                    px-8
                    py-6
                    flex items-center gap-2
                    transition-all duration-200
                    active:scale-95
                  "
                >
                  <Play size={18} fill="currentColor" />
                  Assistir
                </Button>
              </a>
            </Link>

            <Button
              variant="secondary"
              className="
                bg-white/20
                backdrop-blur
                text-white
                hover:bg-white/30
                font-semibold
                px-8
                py-6
                flex items-center gap-2
                transition-all duration-200
                active:scale-95
              "
            >
              <Info size={18} />
              Detalhes
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
}