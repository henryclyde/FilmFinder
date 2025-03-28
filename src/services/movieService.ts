import { Movie } from '@/types/movie';
import { supabase } from '@/lib/supabase';

// Favorites key in localStorage
const FAVORITES_KEY = 'movie_favorites';

// Service class for movie operations
export class MovieService {
  // Get all movies with sorting and filtering
  static async getMovies(sortBy: string = '', genre: string = ''): Promise<Movie[]> {
    try {
      console.log('Attempting to fetch movies from Supabase...');
      let query = supabase.from('movies').select('*');

      // Apply genre filter
      if (genre) {
        query = query.eq('genre', genre);
      }

      // Apply sorting
      switch (sortBy) {
        case 'title':
          query = query.order('title');
          break;
        case 'title_desc':
          query = query.order('title', { ascending: false });
          break;
        case 'rating':
          query = query.order('rating', { ascending: false });
          break;
        case 'rating_asc':
          query = query.order('rating');
          break;
        case 'year':
          query = query.order('release_date', { ascending: false });
          break;
        case 'year_asc':
          query = query.order('release_date');
          break;
        case 'popularity':
          query = query.order('popularity', { ascending: false });
          break;
        case 'popularity_asc':
          query = query.order('popularity');
          break;
        default:
          query = query.order('title');
      }

      const { data, error } = await query;

      if (error) {
        console.error('Supabase error fetching movies:', error);
        throw error;
      }

      // Log the first movie to see its structure
      if (data && data.length > 0) {
        console.log('Sample movie data structure:', data[0]);
      }

      // Map the database columns to our Movie interface
      return (data || []).map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: '', // Not in database schema
        overview: movie.description,
        rating: movie.rating, // Using TMDB rating
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        runtime: movie.runtime,
        genres: movie.genre ? [movie.genre] : [], // Single genre in database
        director: movie.director,
        voteCount: movie.vote_count || 0,
        popularity: movie.popularity || 0
      }));
    } catch (error) {
      console.error('Error in getMovies:', error);
      return [];
    }
  }

  // Get all unique genres
  static async getGenres(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('movies')
        .select('genre')
        .not('genre', 'is', null);

      if (error) {
        console.error('Supabase error fetching genres:', error);
        throw error;
      }

      // Get unique genres
      const genres = [...new Set(data.map(movie => movie.genre))];
      return genres.sort();
    } catch (error) {
      console.error('Error in getGenres:', error);
      return [];
    }
  }

  // Get a movie by ID
  static async getMovieById(id: number): Promise<Movie | null> {
    try {
      console.log('Attempting to fetch movie by ID:', id);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Supabase error fetching movie:', error);
        throw error;
      }

      if (!data) return null;

      // Map the database columns to our Movie interface
      return {
        id: data.id,
        title: data.title,
        posterPath: data.poster_path,
        backdropPath: '', // Not in database schema
        overview: data.description,
        rating: data.rating, // Using TMDB rating
        year: data.release_date ? new Date(data.release_date).getFullYear() : 0,
        runtime: data.runtime,
        genres: data.genre ? [data.genre] : [], // Single genre in database
        director: data.director,
        voteCount: data.vote_count || 0,
        popularity: data.popularity || 0
      };
    } catch (error) {
      console.error('Error in getMovieById:', error);
      return null;
    }
  }

  // Search movies by title
  static async searchMovies(query: string): Promise<Movie[]> {
    try {
      if (!query.trim()) {
        return this.getMovies();
      }

      console.log('Attempting to search movies for:', query);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .ilike('title', `%${query.trim()}%`)
        .order('title');

      if (error) {
        console.error('Supabase error searching movies:', error);
        throw error;
      }

      // Map the database columns to our Movie interface
      return (data || []).map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: '', // Not in database schema
        overview: movie.description,
        rating: movie.rating, // Using TMDB rating
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        runtime: movie.runtime,
        genres: movie.genre ? [movie.genre] : [], // Single genre in database
        director: movie.director,
        voteCount: movie.vote_count || 0,
        popularity: movie.popularity || 0
      }));
    } catch (error) {
      console.error('Error in searchMovies:', error);
      return [];
    }
  }

  // Get movies by genre
  static async getMoviesByGenre(genre: string): Promise<Movie[]> {
    try {
      console.log('Attempting to fetch movies by genre:', genre);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('genre', genre)
        .order('title');

      if (error) {
        console.error('Supabase error fetching movies by genre:', error);
        throw error;
      }

      // Map the database columns to our Movie interface
      return (data || []).map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: '', // Not in database schema
        overview: movie.description,
        rating: movie.rating, // Using TMDB rating
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        runtime: movie.runtime,
        genres: movie.genre ? [movie.genre] : [], // Single genre in database
        director: movie.director,
        voteCount: movie.vote_count || 0,
        popularity: movie.popularity || 0
      }));
    } catch (error) {
      console.error('Error in getMoviesByGenre:', error);
      return [];
    }
  }

  // Get top rated movies
  static async getTopRatedMovies(ratingType: 'imdb' | 'rottenTomatoes', limit: number = 10): Promise<Movie[]> {
    try {
      console.log('Attempting to fetch popular movies...');
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .order('popularity', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Supabase error fetching popular movies:', error);
        throw error;
      }

      // Map the database columns to our Movie interface
      return (data || []).map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: '', // Not in database schema
        overview: movie.description,
        rating: movie.rating, // Using TMDB rating
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        runtime: movie.runtime,
        genres: movie.genre ? [movie.genre] : [], // Single genre in database
        director: movie.director,
        voteCount: movie.vote_count || 0,
        popularity: movie.popularity || 0
      }));
    } catch (error) {
      console.error('Error in getTopRatedMovies:', error);
      return [];
    }
  }

  // Get favorites from localStorage
  static getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  // Toggle favorite status
  static toggleFavorite(movieId: number): boolean {
    try {
      const favorites = this.getFavorites();
      const isFavorite = favorites.includes(movieId);
      
      if (isFavorite) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.filter(id => id !== movieId)));
      } else {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites, movieId]));
      }
      
      return !isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  // Get favorite movies with details
  static async getFavoriteMovies(): Promise<Movie[]> {
    try {
      const favoriteIds = this.getFavorites();
      if (favoriteIds.length === 0) return [];

      console.log('Attempting to fetch favorite movies:', favoriteIds);
      const { data, error } = await supabase
        .from('movies')
        .select('*')
        .in('id', favoriteIds)
        .order('title');

      if (error) {
        console.error('Supabase error fetching favorite movies:', error);
        throw error;
      }

      // Map the database columns to our Movie interface
      return (data || []).map(movie => ({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: '', // Not in database schema
        overview: movie.description,
        rating: movie.rating, // Using TMDB rating
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 0,
        runtime: movie.runtime,
        genres: movie.genre ? [movie.genre] : [], // Single genre in database
        director: movie.director,
        voteCount: movie.vote_count || 0,
        popularity: movie.popularity || 0
      }));
    } catch (error) {
      console.error('Error in getFavoriteMovies:', error);
      return [];
    }
  }
}

export default MovieService;
