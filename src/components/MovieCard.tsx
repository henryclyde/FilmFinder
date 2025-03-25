
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Rating } from '@/components/Rating';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  className?: string;
}

export function MovieCard({ 
  movie, 
  isFavorite = false,
  onToggleFavorite,
  className 
}: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { id, title, posterPath, imdbRating, rottenTomatoesRating, year } = movie;
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <Link
      to={`/movie/${id}`}
      className={cn(
        'block relative overflow-hidden rounded-lg transition-all duration-300 ease-spring',
        'transform hover:shadow-xl group',
        isHovered ? 'scale-[1.02]' : 'scale-100',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] w-full relative overflow-hidden rounded-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-secondary animate-pulse rounded-lg" />
        )}
        <img
          src={posterPath || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={title}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay gradient on hover */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'group-hover:opacity-80'
        )} />
        
        {/* Favorite button */}
        {onToggleFavorite && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10',
              'transition-all duration-200 hover:bg-black/40',
              isFavorite ? 'text-red-500' : 'text-white/80 hover:text-white'
            )}
            onClick={handleToggleFavorite}
          >
            <Heart className={cn('h-4 w-4', isFavorite && 'fill-current')} />
          </Button>
        )}
        
        {/* Movie info */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ease-spring',
          isHovered ? 'translate-y-0' : 'translate-y-8 group-hover:translate-y-0'
        )}>
          <div className="flex justify-between items-center mb-1">
            <div className="flex gap-2">
              <Rating source="imdb" score={imdbRating} />
              <Rating source="rottenTomatoes" score={rottenTomatoesRating} />
            </div>
            <span className="text-white/80 text-sm">{year}</span>
          </div>
          <h3 className="text-white font-medium text-lg truncate">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
