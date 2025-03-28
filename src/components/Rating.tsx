import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface RatingProps {
  score: number;
  className?: string;
}

export function Rating({ score, className }: RatingProps) {
  const getColor = () => {
    if (score >= 8) return 'text-green-500';
    if (score >= 6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className={cn(
      'flex items-center gap-1.5',
      getColor(),
      className
    )}>
      <Star className="h-4 w-4 fill-current" />
      <span className="font-medium">{score.toFixed(1)}</span>
    </div>
  );
}

export default Rating;
