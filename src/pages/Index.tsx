
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@/components/Hero';
import { MovieList } from '@/components/MovieList';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { MovieService } from '@/services/movieService';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const [topImdbMovies, setTopImdbMovies] = useState([]);
  const [topRtMovies, setTopRtMovies] = useState([]);
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [imdbMovies, rtMovies, allMovies] = await Promise.all([
          MovieService.getTopRatedMovies('imdb', 5),
          MovieService.getTopRatedMovies('rottenTomatoes', 5),
          MovieService.getMovies(),
        ]);
        
        // Sort by newest (in a real app, you'd have a release date field)
        const newest = [...allMovies].sort((a, b) => b.year - a.year).slice(0, 5);
        
        setTopImdbMovies(imdbMovies);
        setTopRtMovies(rtMovies);
        setRecentlyAdded(newest);
        setFavorites(MovieService.getFavorites());
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleToggleFavorite = (movieId: number) => {
    const newFavorites = MovieService.toggleFavorite(movieId)
      ? [...favorites, movieId]
      : favorites.filter(id => id !== movieId);
    
    setFavorites(newFavorites);
  };
  
  const SectionHeading = ({ title, viewAllLink }: { title: string, viewAllLink?: string }) => (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-primary">{title}</h2>
      {viewAllLink && (
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 text-accent-foreground hover:text-primary transition-colors"
          onClick={() => navigate(viewAllLink)}
        >
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        <div className="max-w-screen-xl mx-auto px-6 py-16 space-y-16">
          <section>
            <SectionHeading title="Top Rated on IMDb" viewAllLink="/movies?sort=imdb" />
            <MovieList 
              movies={topImdbMovies}
              loading={loading}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </section>
          
          <section>
            <SectionHeading title="Critics' Choice on Rotten Tomatoes" viewAllLink="/movies?sort=rt" />
            <MovieList 
              movies={topRtMovies}
              loading={loading}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </section>
          
          <section>
            <SectionHeading title="Recently Added" viewAllLink="/movies" />
            <MovieList 
              movies={recentlyAdded}
              loading={loading}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          </section>
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

export default Index;
