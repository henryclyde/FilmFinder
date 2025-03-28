import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface MovieFiltersProps {
  genre: string;
  sortBy: string;
  onGenreChange: (value: string) => void;
  onSortChange: (value: string) => void;
  genres: string[];
}

export function MovieFilters({
  genre,
  sortBy,
  onGenreChange,
  onSortChange,
  genres
}: MovieFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1 space-y-2">
        <Label htmlFor="genre-filter">Filter by Genre</Label>
        <Select value={genre} onValueChange={onGenreChange}>
          <SelectTrigger id="genre-filter">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 space-y-2">
        <Label htmlFor="sort-by">Sort By</Label>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger id="sort-by">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="title_desc">Title (Z-A)</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
            <SelectItem value="rating_asc">Rating (Low to High)</SelectItem>
            <SelectItem value="year">Year (Newest)</SelectItem>
            <SelectItem value="year_asc">Year (Oldest)</SelectItem>
            <SelectItem value="popularity">Popularity (High to Low)</SelectItem>
            <SelectItem value="popularity_asc">Popularity (Low to High)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 