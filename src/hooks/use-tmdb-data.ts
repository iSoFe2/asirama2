import React from "react";
import {
  getTrendingMovies,
  getLatestMovies,
  getTopRatedMovies,
  getLatestTVEpisodes,
  getMovieGenres,
  getUpcomingMovies,
  TMDBMovie,
  TMDBGenre,
  getImageUrl
} from "../services/tmdb-api";

export function useTMDBData() {
  const [latestMovies, setLatestMovies] = React.useState<TMDBMovie[]>([]);
  const [trendingMovies, setTrendingMovies] = React.useState<TMDBMovie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = React.useState<TMDBMovie[]>([]);
  const [latestEpisodes, setLatestEpisodes] = React.useState<any[]>([]);
  const [genres, setGenres] = React.useState<TMDBGenre[]>([]);
  const [upcomingMovies, setUpcomingMovies] = React.useState<TMDBMovie[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [
          latestMoviesData,
          trendingMoviesData,
          topRatedMoviesData,
          latestEpisodesData,
          genresData,
          upcomingMoviesData
        ] = await Promise.all([
          getLatestMovies(),
          getTrendingMovies(),
          getTopRatedMovies(),
          getLatestTVEpisodes(),
          getMovieGenres(),
          getUpcomingMovies()
        ]);
        
        setLatestMovies(latestMoviesData);
        setTrendingMovies(trendingMoviesData);
        setTopRatedMovies(topRatedMoviesData);
        setLatestEpisodes(latestEpisodesData);
        setGenres(genresData);
        setUpcomingMovies(upcomingMoviesData);
      } catch (err) {
        console.error("Error fetching TMDB data:", err);
        setError("حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Map genre IDs to genre names
  const getGenreName = (genreId: number): string => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : "";
  };

  // Map genres to icons and colors
  const genreIcons = {
    "دراما": { icon: "lucide:theater", color: "primary" },
    "أكشن": { icon: "lucide:flame", color: "danger" },
    "رعب": { icon: "lucide:skull", color: "warning" },
    "جريمة": { icon: "lucide:shield-alert", color: "danger" },
    "غموض": { icon: "lucide:search", color: "secondary" },
    "كوميديا": { icon: "lucide:smile", color: "success" },
    "رومانسية": { icon: "lucide:heart", color: "danger" },
    "خيال علمي": { icon: "lucide:rocket", color: "primary" },
    "تاريخ": { icon: "lucide:landmark", color: "warning" },
    "فانتازيا": { icon: "lucide:wand", color: "secondary" },
    "مغامرة": { icon: "lucide:map", color: "success" },
    "حرب": { icon: "lucide:swords", color: "danger" },
    "عائلي": { icon: "lucide:users", color: "primary" },
    "موسيقى": { icon: "lucide:music", color: "secondary" },
    "وثائقي": { icon: "lucide:film", color: "primary" },
    "غربي": { icon: "lucide:mountain", color: "warning" },
    "إثارة": { icon: "lucide:zap", color: "danger" },
    "رسوم متحركة": { icon: "lucide:baby", color: "success" }
  };

  // Get icon and color for a genre
  const getGenreIconAndColor = (genreName: string) => {
    return genreIcons[genreName as keyof typeof genreIcons] || { icon: "lucide:tag", color: "default" };
  };

  // Format movie data for components
  const formatMovieForCard = (movie: TMDBMovie) => {
    const primaryGenreId = movie.genre_ids[0];
    const genreName = getGenreName(primaryGenreId);
    
    return {
      id: movie.id,
      title: movie.title,
      year: movie.release_date,
      category: genreName,
      quality: "HD",
      rating: movie.vote_average,
      views: Math.floor(movie.popularity * 100),
      poster: getImageUrl(movie.poster_path),
      isExclusive: movie.vote_average > 8
    };
  };

  // Format episode data for components
  const formatEpisodeForCard = (episodeData: any) => {
    const { show, episode } = episodeData;
    const primaryGenreId = show.genre_ids[0];
    const genreName = getGenreName(primaryGenreId);
    
    return {
      id: episode.id,
      seriesName: show.name,
      season: episode.season_number,
      episode: episode.episode_number,
      year: show.first_air_date,
      category: genreName,
      quality: "HD",
      thumbnail: getImageUrl(episode.still_path, "w300")
    };
  };

  // Format genre data for category cards
  const formatGenreForCard = (genre: TMDBGenre) => {
    const { icon, color } = getGenreIconAndColor(genre.name);
    
    return {
      id: genre.id,
      name: genre.name,
      icon,
      color
    };
  };

  // Format upcoming movie data
  const formatUpcomingMovie = (movie: TMDBMovie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: getImageUrl(movie.poster_path),
      releaseDate: movie.release_date
    };
  };

  return {
    loading,
    error,
    latestMovies: latestMovies.map(formatMovieForCard),
    trendingMovies: trendingMovies.map(formatMovieForCard),
    topRatedMovies: topRatedMovies.map(formatMovieForCard),
    latestEpisodes: latestEpisodes ? latestEpisodes.map(formatEpisodeForCard) : [],
    genres: genres.map(formatGenreForCard),
    upcomingMovies: upcomingMovies.map(formatUpcomingMovie),
    getGenreName
  };
}
