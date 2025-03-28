import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MovieDetails } from '@/components/MovieDetails';
import { Navbar } from '@/components/Navbar';
import { MovieService } from '@/services/movieService';
import { Movie } from '@/types/movie';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-lg text-muted-foreground">
            Loading...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-lg text-red-500">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-lg text-muted-foreground">
            Movie not found
          </div>
        </main>
      </div>
    );
  }

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
          
          <MovieDetails
            movie={movie}
            isFavorite={favorites.includes(movie.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>
      </main>
      
      <footer className="py-8 border-t border-border mt-16">
        <div className="max-w-screen-xl mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} MovieVibes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
