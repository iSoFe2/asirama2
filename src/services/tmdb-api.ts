const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
}

export interface TMDBMovieDetails extends TMDBMovie {
  runtime: number;
  genres: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
    }[];
  };
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

export interface TMDBTVShow {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
}

export interface TMDBEpisode {
  id: number;
  name: string;
  overview: string;
  still_path: string;
  air_date: string;
  episode_number: number;
  season_number: number;
  vote_average: number;
  vote_count: number;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

// Helper function to get image URL
export const getImageUrl = (path: string | null, size: string = "w500"): string => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get trending movies
export const getTrendingMovies = async (): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=ar-SA`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// Get latest movies
export const getLatestMovies = async (): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ar-SA&sort_by=release_date.desc&include_adult=false&include_video=false&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching latest movies:", error);
    return [];
  }
};

// Get top rated movies
export const getTopRatedMovies = async (): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ar-SA&page=1`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};

// Get movie details
export const getMovieDetails = async (id: string): Promise<TMDBMovieDetails | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ar-SA&append_to_response=credits,videos`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error);
    return null;
  }
};

// Get similar movies
export const getSimilarMovies = async (id: string): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=ar-SA&page=1`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${id}:`, error);
    return [];
  }
};

// Get latest TV episodes
export const getLatestTVEpisodes = async (): Promise<{ show: TMDBTVShow; episode: TMDBEpisode }[]> => {
  try {
    // First get popular TV shows
    const showsResponse = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=ar-SA&page=1`);
    const showsData = await showsResponse.json();
    const shows = showsData.results.slice(0, 5);
    
    // For each show, get the latest episode
    const episodesWithShows = await Promise.all(
      shows.map(async (show: TMDBTVShow) => {
        try {
          // Get the latest season
          const seasonsResponse = await fetch(
            `${BASE_URL}/tv/${show.id}?api_key=${API_KEY}&language=ar-SA`
          );
          const seasonsData = await seasonsResponse.json();
          const latestSeason = seasonsData.seasons[seasonsData.seasons.length - 1];
          
          // Get episodes from the latest season
          const episodesResponse = await fetch(
            `${BASE_URL}/tv/${show.id}/season/${latestSeason.season_number}?api_key=${API_KEY}&language=ar-SA`
          );
          const episodesData = await episodesResponse.json();
          const latestEpisode = episodesData.episodes[episodesData.episodes.length - 1];
          
          return { show, episode: latestEpisode };
        } catch (error) {
          console.error(`Error fetching episodes for show ID ${show.id}:`, error);
          return null;
        }
      })
    );
    
    return episodesWithShows.filter(Boolean);
  } catch (error) {
    console.error("Error fetching latest TV episodes:", error);
    return [];
  }
};

// Get movie genres
export const getMovieGenres = async (): Promise<TMDBGenre[]> => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=ar-SA`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return [];
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=ar-SA&page=1`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};

// Get movies by country
export const getMoviesByCountry = async (countryCode: string): Promise<TMDBMovie[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ar-SA&with_original_language=${countryCode}&sort_by=popularity.desc&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching movies for country ${countryCode}:`, error);
    return [];
  }
};
