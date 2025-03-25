
import { cn } from '@/lib/utils';
import { Star, ThumbsUp } from 'lucide-react';

interface RatingProps {
  source: 'imdb' | 'rottenTomatoes';
  score: number;
  className?: string;
}

export function Rating({ source, score, className }: RatingProps) {
  const getColor = () => {
    if (source === 'imdb') {
      if (score >= 8) return 'text-green-500';
      if (score >= 6) return 'text-yellow-500';
      return 'text-red-500';
    } else {
      if (score >= 75) return 'text-green-500';
      if (score >= 60) return 'text-yellow-500';
      return 'text-red-500';
    }
  };

  const formatScore = () => {
    if (source === 'imdb') {
      return score.toFixed(1);
    } else {
      return `${score}%`;
    }
  };

  return (
    <div className={cn(
      'flex items-center gap-1.5',
      getColor(),
      className
    )}>
      {source === 'imdb' ? (
        <>
          <Star className="h-4 w-4 fill-current" />
          <span className="font-medium">{formatScore()}</span>
        </>
      ) : (
        <>
          <ThumbsUp className="h-4 w-4" />
          <span className="font-medium">{formatScore()}</span>
        </>
      )}
    </div>
  );
}

export default Rating;
