
export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath?: string;
  overview: string;
  imdbRating: number;
  rottenTomatoesRating: number;
  year: number;
  runtime?: number;
  genres?: string[];
  director?: string;
}
