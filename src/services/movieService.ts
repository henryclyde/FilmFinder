
import { Movie } from '@/types/movie';

// Mock data for the initial movies
const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Oppenheimer",
    posterPath: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    imdbRating: 8.4,
    rottenTomatoesRating: 93,
    year: 2023,
    runtime: 180,
    genres: ["Biography", "Drama", "History"],
    director: "Christopher Nolan"
  },
  {
    id: 2,
    title: "Barbie",
    posterPath: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/nHf61UzkfFno5X1ofIhugCPus2R.jpg",
    overview: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    imdbRating: 7.0,
    rottenTomatoesRating: 88,
    year: 2023,
    runtime: 114,
    genres: ["Adventure", "Comedy", "Fantasy"],
    director: "Greta Gerwig"
  },
  {
    id: 3,
    title: "Dune",
    posterPath: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", 
    backdropPath: "https://image.tmdb.org/t/p/original/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    overview: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    imdbRating: 8.0,
    rottenTomatoesRating: 83,
    year: 2021,
    runtime: 155,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    director: "Denis Villeneuve"
  },
  {
    id: 4,
    title: "Poor Things",
    posterPath: "https://image.tmdb.org/t/p/w500/k9eLozCgCCZ6hQMHgGHnYGrDYn7.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/gJESrIalQkXe7bh9ckyQvgCSlhP.jpg",
    overview: "Brought back to life by an unorthodox scientist, a young woman runs off with a lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
    imdbRating: 7.9,
    rottenTomatoesRating: 92,
    year: 2023,
    runtime: 141,
    genres: ["Romance", "Sci-Fi", "Comedy"],
    director: "Yorgos Lanthimos"
  },
  {
    id: 5,
    title: "Past Lives",
    posterPath: "https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/kPeEr4k5MnWKc84FXXVuXsL5oZA.jpg",
    overview: "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea. Twenty years later, they are reunited for one fateful week as they confront notions of love and destiny.",
    imdbRating: 7.8,
    rottenTomatoesRating: 96,
    year: 2023,
    runtime: 105,
    genres: ["Drama", "Romance"],
    director: "Celine Song"
  },
  {
    id: 6,
    title: "The Batman",
    posterPath: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    overview: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    imdbRating: 7.8,
    rottenTomatoesRating: 85,
    year: 2022,
    runtime: 177,
    genres: ["Action", "Crime", "Drama"],
    director: "Matt Reeves"
  },
  {
    id: 7,
    title: "Everything Everywhere All at Once",
    posterPath: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/nCJJzPQxlww1BFQf5xoAj5eG7Xw.jpg",
    overview: "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
    imdbRating: 7.8,
    rottenTomatoesRating: 93,
    year: 2022,
    runtime: 139,
    genres: ["Action", "Adventure", "Comedy"],
    director: "Daniel Kwan, Daniel Scheinert"
  },
  {
    id: 8,
    title: "Inception",
    posterPath: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imdbRating: 8.8,
    rottenTomatoesRating: 87,
    year: 2010,
    runtime: 148,
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "Christopher Nolan"
  },
  {
    id: 9,
    title: "The Godfather",
    posterPath: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    imdbRating: 9.2,
    rottenTomatoesRating: 97,
    year: 1972,
    runtime: 175,
    genres: ["Crime", "Drama"],
    director: "Francis Ford Coppola"
  },
  {
    id: 10,
    title: "Parasite",
    posterPath: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    imdbRating: 8.5,
    rottenTomatoesRating: 99,
    year: 2019,
    runtime: 132,
    genres: ["Comedy", "Drama", "Thriller"],
    director: "Bong Joon Ho"
  }
];

// Top-rated and popular movies
const topImdbMovies = [...mockMovies].sort((a, b) => b.imdbRating - a.imdbRating);
const topRtMovies = [...mockMovies].sort((a, b) => b.rottenTomatoesRating - a.rottenTomatoesRating);

// Favorites key in localStorage
const FAVORITES_KEY = 'movie_favorites';

// Service class for movie operations
export class MovieService {
  // Get all movies
  static getMovies(): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMovies);
      }, 800);
    });
  }

  // Get a movie by ID
  static getMovieById(id: number): Promise<Movie | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const movie = mockMovies.find(m => m.id === id) || null;
        resolve(movie);
      }, 500);
    });
  }

  // Search movies by title
  static searchMovies(query: string): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!query.trim()) {
          resolve(mockMovies);
          return;
        }
        
        const searchTerm = query.toLowerCase().trim();
        const results = mockMovies.filter(movie => 
          movie.title.toLowerCase().includes(searchTerm)
        );
        
        resolve(results);
      }, 800);
    });
  }

  // Get top-rated movies by source
  static getTopRatedMovies(source: 'imdb' | 'rottenTomatoes', limit = 5): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = source === 'imdb' ? topImdbMovies : topRtMovies;
        resolve(results.slice(0, limit));
      }, 600);
    });
  }

  // Get movies by genre
  static getMoviesByGenre(genre: string): Promise<Movie[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockMovies.filter(movie => 
          movie.genres?.some(g => g.toLowerCase() === genre.toLowerCase())
        );
        resolve(results);
      }, 700);
    });
  }

  // Save a movie to favorites
  static addToFavorites(movieId: number): void {
    try {
      const currentFavorites = this.getFavorites();
      if (!currentFavorites.includes(movieId)) {
        const newFavorites = [...currentFavorites, movieId];
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  // Remove a movie from favorites
  static removeFromFavorites(movieId: number): void {
    try {
      const currentFavorites = this.getFavorites();
      const newFavorites = currentFavorites.filter(id => id !== movieId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }

  // Toggle favorite status
  static toggleFavorite(movieId: number): boolean {
    try {
      const currentFavorites = this.getFavorites();
      const isCurrentlyFavorite = currentFavorites.includes(movieId);
      
      if (isCurrentlyFavorite) {
        this.removeFromFavorites(movieId);
        return false;
      } else {
        this.addToFavorites(movieId);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  // Get all favorite movie IDs
  static getFavorites(): number[] {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  }

  // Get favorite movies with details
  static async getFavoriteMovies(): Promise<Movie[]> {
    const favoriteIds = this.getFavorites();
    const allMovies = await this.getMovies();
    return allMovies.filter(movie => favoriteIds.includes(movie.id));
  }
}

export default MovieService;
