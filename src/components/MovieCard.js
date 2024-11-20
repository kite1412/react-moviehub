import { useNavigate } from "react-router-dom";
import { originalImageUrl } from "../api/tmdbService";
import Score from "./Score";

export default function MovieCard({
  movie,
  genre = "", 
  className = "movie-card-default",
  showRating = false
}) {
  const navigate = useNavigate();
  return (
    <div className={className} onClick={() => {
      navigate(`/detail/${movie.id}`, { state: { media: movie } });
    }}>
      <div id="description">
        <p>{movie.title}</p>
        <p style={{ fontSize: "11px", fontWeight: "normal" }}>
          {movie.release_date !== undefined ? movie.release_date.slice(0, 4) : ""} { genre !== ""  ? `| ${genre}` : ""}
        </p>
      </div>
      <img src={originalImageUrl(movie.poster_path)} alt="poster" />
      { showRating ? <Score score={parseFloat(movie.vote_average.toFixed(2))} /> : <></> }
    </div>
  );
}

export const toCards = (
  movies = [], 
  genres = [], 
  movieCardClass = "movie-card-default",
  showRating = false
) => movies.map(e => {
  let g = "";
  if (e.genre_ids.length != 0) {
    genres.forEach(genre => {
      if (e.genre_ids[0] == genre.id) {
        g = genre.name;
        return;
      }
    });
  }
  return <MovieCard 
    movie={e} 
    genre={g} 
    className={movieCardClass} 
    showRating={showRating} 
  />
});