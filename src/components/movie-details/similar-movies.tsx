import React from "react";
import { MovieCard } from "../movie-card";
import { Icon } from "@iconify/react";
import { getImageUrl } from "../../services/tmdb-api";

interface SimilarMoviesProps {
  similarMovies: any[];
}

export function SimilarMovies({ similarMovies }: SimilarMoviesProps) {
  // Format similar movies for MovieCard component
  const formattedSimilarMovies = similarMovies.map(movie => ({
    id: movie.id,
    title: movie.title || "",
    year: movie.release_date?.substring(0, 4) || "",
    category: movie.genres?.[0]?.name || "",
    quality: "HD",
    rating: movie.vote_average || 0,
    views: Math.floor((movie.popularity || 0) * 100),
    poster: getImageUrl(movie.poster_path)
  }));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Icon icon="lucide:film" className="text-primary" />
        <span>قد يعجبك أيضًا</span>
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {formattedSimilarMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
}