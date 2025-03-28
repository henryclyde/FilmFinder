import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Movie } from '@/types/movie';
import { Rating } from '@/components/Rating';
import { Clock, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieDetailsProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function MovieDetails({ 
  movie, 
  isFavorite = false,
  onToggleFavorite 
}: MovieDetailsProps) {
  const [loaded, setLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [backdropLoaded, setBackdropLoaded] = useState(false);

  const { 
    id, 
    title, 
    overview, 
    backdropPath, 
    posterPath, 
    rating,
    runtime, 
    genres, 
    year, 
    director 
  } = movie;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <div className="relative">
      {/* Backdrop image */}
      <div className="absolute inset-0 w-full h-[70vh] overflow-hidden">
        {!backdropLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        {backdropPath && (
          <img
            src={backdropPath}
            alt={title}
            className={cn(
              'w-full h-full object-cover object-top transition-opacity duration-500',
              backdropLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setBackdropLoaded(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 pt-[25vh] pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className={cn(
            'flex-shrink-0 md:w-80 w-48 mx-auto md:mx-0 transition-all duration-700 transform',
            loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          )}>
            <div className="overflow-hidden rounded-lg shadow-xl relative">
              {!posterLoaded && (
                <div className="absolute inset-0 bg-secondary animate-pulse" />
              )}
              <img
                src={posterPath || 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={title}
                className={cn(
                  'w-full h-auto object-cover transition-opacity duration-500',
                  posterLoaded ? 'opacity-100' : 'opacity-0'
                )}
                onLoad={() => setPosterLoaded(true)}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-grow">
            <div className={cn(
              'transform transition-all duration-700',
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            )}>
              <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{year}</span>
                </div>
                {runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{runtime} min</span>
                  </div>
                )}
                {rating !== undefined && rating !== null && (
                  <Rating score={rating} />
                )}
              </div>

              {genres && genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {genres.map((genre) => (
                    <span 
                      key={genre} 
                      className="px-3 py-1 bg-secondary text-xs rounded-full text-secondary-foreground"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-foreground/90 text-lg leading-relaxed mb-6">
                {overview}
              </p>

              {director && (
                <p className="text-muted-foreground mb-6">
                  <span className="font-medium">Director:</span> {director}
                </p>
              )}
              
              <div>
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  className={cn(
                    "gap-2 transition-all duration-200", 
                    isFavorite && "bg-red-500 hover:bg-red-600 border-0"
                  )}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
