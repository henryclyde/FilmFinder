
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

interface SearchBarProps {
  initialValue?: string;
  onSearch?: (term: string) => void;
  className?: string;
}

export function SearchBar({ initialValue = '', onSearch, className = '' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse search param from URL when location changes
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm.trim());
    } else {
      navigate(`/movies?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex w-full max-w-md mx-auto ${className}`}
    >
      <div 
        className={`relative w-full transition-all duration-200 ${
          isFocused ? 'ring-2 ring-accent/60 rounded-l-lg' : ''
        }`}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for movies..."
          className="pl-4 pr-10 py-3 w-full rounded-l-lg shadow-sm focus:outline-none border-0"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <Button 
        type="submit" 
        className="rounded-r-lg bg-primary hover:bg-primary/90 px-5 h-auto"
      >
        <Search className="h-5 w-5" />
      </Button>
    </form>
  );
}

export default SearchBar;
