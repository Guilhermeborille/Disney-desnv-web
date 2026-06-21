import { useState } from "react";
import { Search, X } from "lucide-react";

interface Props {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Buscar filmes, séries, personagens...",
  onSearch,
}: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <div
        className={`
          flex items-center gap-3 h-11 px-4 rounded-lg border transition-all duration-200
          ${focused
            ? "bg-blue-600/8 border-blue-500/60 shadow-[0_0_0_3px_rgba(59,130,246,0.12)]"
            : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/8"
          }
        `}
      >
        <Search
          size={17}
          className={`shrink-0 transition-colors duration-200 ${focused ? "text-blue-400" : "text-white/35"}`}
        />

        <input
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/30"
        />

        {query && (
          <button
            onClick={handleClear}
            aria-label="Limpar busca"
            className="shrink-0 w-5 h-5 rounded flex items-center justify-center text-white/35 hover:text-white hover:bg-white/15 transition-all duration-150"
          >
            <X size={13} />
          </button>
        )}
      </div>
    </div>
  );
}