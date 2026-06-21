import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  placeholder = 'Buscar filmes...',
  onSearch,
}: Props) {

  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">

        {/* Ícone */}
        <Search
          className="absolute left-3 text-gray-400 pointer-events-none"
          size={20}
        />

        {/* Input */}
        <Input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className="
            pl-10 pr-10 py-2.5
            bg-[#0b0f29]
            border border-white/10
            text-white
            placeholder:text-gray-400
            focus:border-white/40
            focus:ring-0
            transition-all
          "
        />

        {/* Botão limpar */}
        {query && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="
              absolute right-2
              text-gray-400
              hover:text-white
              hover:bg-transparent
              p-0
            "
            aria-label="Limpar busca"
          >
            <X size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}