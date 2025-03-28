export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  rating: number; // TMDB rating
  year: number;
  runtime: number;
  genres: string[];
  director: string;
  voteCount: number;
  popularity: number;
}
