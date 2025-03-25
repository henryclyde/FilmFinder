
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MovieList } from '@/components/MovieList';
import { Navbar } from '@/components/Navbar';
import { SearchBar } from '@/components/SearchBar';
import { MovieService } from '@/services/movieService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Movie } from '@/types/movie';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get search and sort parameters from URL
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    const sortParam = params.get('sort') || '';
    
    // Set active tab based on sort parameter
    if (sortParam === 'imdb') {
      setActiveTab('imdb');
    } else if (sortParam === 'rt') {
      setActiveTab('rt');
    } else {
      setActiveTab('all');
    }
    
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let results: Movie[] = [];
        
        if (searchParam) {
          results = await MovieService.searchMovies(searchParam);
        } else if (sortParam === 'imdb') {
          results = await MovieService.getTopRatedMovies('imdb', 10);
        } else if (sortParam === 'rt') {
          results = await MovieService.getTopRatedMovies('rottenTomatoes', 10);
        } else {
          results = await MovieService.getMovies();
        }
        
        setMovies(results);
        setFavorites(MovieService.getFavorites());
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [location.search]);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams();
    if (term) {
      params.set('search', term);
    }
    navigate(`/movies?${params.toString()}`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const params = new URLSearchParams();
    
    if (value === 'imdb') {
      params.set('sort', 'imdb');
    } else if (value === 'rt') {
      params.set('sort', 'rt');
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
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-6">Discover Movies</h1>
            <SearchBar 
              initialValue={new URLSearchParams(location.search).get('search') || ''}
              onSearch={handleSearch}
              className="mb-8"
            />
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
                <TabsTrigger value="all">All Movies</TabsTrigger>
                <TabsTrigger value="imdb">IMDb Top</TabsTrigger>
                <TabsTrigger value="rt">RT Top</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <MovieList 
            movies={movies}
            loading={loading}
            error={movies.length === 0 && !loading ? "No movies found matching your criteria" : null}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>
      
      <footer className="py-8 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} MovieVibes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Movies;
