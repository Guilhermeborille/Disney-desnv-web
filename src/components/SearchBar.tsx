import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Props {
  placeholder?: string;
}

export default function SearchBar({ placeholder = 'Buscar filmes...' }: Props) {
  
  const [query, setQuery] = useState('');

  const handleChange = () => { 
    
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-neutral-500 pointer-events-none" size={20} />
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10 py-2.5 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
        {query && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-2 text-neutral-500 hover:text-white hover:bg-transparent p-0"
            aria-label="Limpar busca"
          >
            <X size={18} />
          </Button>
        )}
      </div>
    </div>
  );
}