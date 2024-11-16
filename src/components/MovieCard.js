import { originalImageUrl } from "../api/tmdbService";

export default function MovieCard({ movie, genre = "", className = "movie-card-default"}) {
  return (
    <div className={className}>
      <div id="description">
        <p>{movie.title}</p>
        <p style={{ fontSize: "11px", fontWeight: "normal" }}>
          {movie.release_date.slice(0, 4)} | {genre}
        </p>
      </div>
      <img src={originalImageUrl(movie.poster_path)} alt="poster" />
    </div>
  );
}