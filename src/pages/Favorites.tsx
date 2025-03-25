
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MovieList } from '@/components/MovieList';
import { MovieService } from '@/services/movieService';
import { Movie } from '@/types/movie';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoriteMovies = await MovieService.getFavoriteMovies();
        setFavorites(favoriteMovies);
        setFavoriteIds(MovieService.getFavorites());
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);

  const handleToggleFavorite = (movieId: number) => {
    MovieService.removeFromFavorites(movieId);
    setFavorites(favorites.filter(movie => movie.id !== movieId));
    setFavoriteIds(favoriteIds.filter(id => id !== movieId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-primary mb-8">Your Favorites</h1>
          
          {!loading && favorites.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start adding movies to your favorites to see them here
              </p>
              <Button onClick={() => navigate('/movies')}>
                Discover Movies
              </Button>
            </div>
          ) : (
            <MovieList 
              movies={favorites}
              loading={loading}
              favorites={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
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

export default Favorites;
