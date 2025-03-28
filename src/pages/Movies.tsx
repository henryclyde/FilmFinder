import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MovieList } from '@/components/MovieList';
import { MovieFilters } from '@/components/MovieFilters';
import { Navbar } from '@/components/Navbar';
import { MovieService } from '@/services/movieService';
import { Movie } from '@/types/movie';

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Get URL parameters
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get('search') || '';
  const genreParam = searchParams.get('genre') || '';
  const sortParam = searchParams.get('sort') || '';

  useEffect(() => {
    const fetchGenres = async () => {
      const genreList = await MovieService.getGenres();
      setGenres(genreList);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching movies...');
        
        let results: Movie[] = [];
        if (searchParam) {
          console.log('Searching for:', searchParam);
          results = await MovieService.searchMovies(searchParam);
        } else {
          results = await MovieService.getMovies(sortParam, genreParam);
        }
        
        setMovies(results);
        setFavorites(MovieService.getFavorites());
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [searchParam, genreParam, sortParam]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    if (term) {
      params.set('search', term);
    }
    if (genreParam) {
      params.set('genre', genreParam);
    }
    if (sortParam) {
      params.set('sort', sortParam);
    }
    navigate(`/movies?${params.toString()}`);
  };

  const handleGenreChange = (value: string) => {
    const params = new URLSearchParams(location.search);
    if (value && value !== 'all') {
      params.set('genre', value);
    } else {
      params.delete('genre');
    }
    navigate(`/movies?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    navigate(`/movies?${params.toString()}`);
  };

  const handleToggleFavorite = (movieId: number) => {
    const newFavorites = MovieService.toggleFavorite(movieId)
      ? [...favorites, movieId]
      : favorites.filter(id => id !== movieId);
    
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Movies</h1>
        
        <MovieFilters
          genre={genreParam}
          sortBy={sortParam}
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          genres={genres}
        />

        <MovieList
          movies={movies}
          loading={loading}
          error={error}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </main>
      
      <footer className="py-8 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} MovieVibes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
