
import { useState, useEffect } from 'react';
import { MovieCard } from '@/components/MovieCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Movie } from '@/types/movie';

interface MovieListProps {
  movies: Movie[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  favorites?: number[];
  onToggleFavorite?: (id: number) => void;
}

export function MovieList({ 
  movies, 
  loading = false, 
  error = null,
  title,
  favorites = [], 
  onToggleFavorite
}: MovieListProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-primary">{title}</h2>
      )}
      
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
              className={`animate-fade-up`}
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
      )}
      
      {!loading && movies.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No movies found</p>
        </div>
      )}
    </div>
  );
}

export default MovieList;
