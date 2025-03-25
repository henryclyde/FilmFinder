
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetails } from '@/components/MovieDetails';
import { Navbar } from '@/components/Navbar';
import { MovieService } from '@/services/movieService';
import { Movie } from '@/types/movie';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MovieDetail = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          setError('Movie ID is required');
          return;
        }
        
        const movieId = parseInt(id, 10);
        if (isNaN(movieId)) {
          setError('Invalid movie ID');
          return;
        }
        
        const movieData = await MovieService.getMovieById(movieId);
        if (!movieData) {
          setError('Movie not found');
          return;
        }
        
        setMovie(movieData);
        setFavorites(MovieService.getFavorites());
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);

  const handleToggleFavorite = (movieId: number) => {
    const newFavorites = MovieService.toggleFavorite(movieId)
      ? [...favorites, movieId]
      : favorites.filter(id => id !== movieId);
    
    setFavorites(newFavorites);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="max-w-screen-xl mx-auto">
          <Button
            variant="ghost"
            className="flex items-center gap-1 ml-6 mt-24 mb-2 text-muted-foreground"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          
          {loading ? (
            <div className="px-6">
              <div className="flex flex-col md:flex-row gap-8">
                <Skeleton className="w-48 h-72 rounded-lg" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                  <div className="space-y-2 pt-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="px-6 py-16 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => navigate('/movies')}>
                Browse all movies
              </Button>
            </div>
          ) : movie ? (
            <MovieDetails
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : null}
        </div>
      </main>
      
      <footer className="py-8 border-t border-border mt-16">
        <div className="max-w-screen-xl mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} MovieVibes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetail;
