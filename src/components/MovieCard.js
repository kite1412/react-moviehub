import { originalImageUrl } from "../api/tmdbService";

export default function MovieCard({ movie, genre = "", className = "movie-card-default"}) {
  return (
    <div className={className}>
      <div id="description">
        <p>{movie.title}</p>
        <p style={{ fontSize: "11px", fontWeight: "normal" }}>
          {movie.release_date !== undefined ? movie.release_date.slice(0, 4) : ""} { genre !== ""  ? `| ${genre}` : ""}
        </p>
      </div>
      <img src={originalImageUrl(movie.poster_path)} alt="poster" />
    </div>
  );
}

export const toCards = (movies = [], genres = [], movieCardClass = "movie-card-default") => movies.map(e => {
  let g = "";
  if (e.genre_ids.length != 0) {
    genres.forEach(genre => {
      if (e.genre_ids[0] == genre.id) {
        g = genre.name;
        return;
      }
    });
  }
  return <MovieCard movie={e} genre={g} className={movieCardClass} />
});