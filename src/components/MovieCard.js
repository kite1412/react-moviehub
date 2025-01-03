import { useNavigate } from "react-router-dom";
import { originalImageUrl } from "../api/tmdbService";
import Score from "./Score";
import { detailPath } from "../utils/paths";
import { fixedRating, getYear } from "../utils/functions";
import IconButton from "./IconButton";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { toastError, toastSuccess } from "../utils/toast";
import { useMediaQuery } from "react-responsive";
import { small } from "../utils/screen";

export default function MovieCard({
  movie,
  genre = "", 
  className = "movie-card-default",
  showRating = false
}) {
  const navigate = useNavigate();
  const { favoriteMovies } = useContext(MainContext);
  const favorited = favoriteMovies.contains(movie);
  const s = useMediaQuery(small);

  return (
    movie.id !== 179387 ? <div className={className} onClick={() => {
      navigate(detailPath(movie.id), { state: { media: movie, isMovie: true } });
    }}>
      <div id="description" style={{
        gap: s ? "4px" : "",
        fontSize: s ? "12px" : ""
      }}> 
        <div>{movie.title}</div>
        <div style={{ fontSize: !s ? "11px" : "10px", fontWeight: "normal" }}>
          {movie.release_date !== undefined ? getYear(movie.release_date) : ""} { genre !== ""  ? `| ${genre}` : ""}
        </div>
      </div>
      <img src={originalImageUrl(movie.poster_path)} alt="poster" />
      { showRating ? <Score score={fixedRating(movie.vote_average)} /> : <></> }
      <IconButton 
        icon={<Heart style={{
          fill: `${ favorited ? "#6100C2" : "transparent"}`
        }} />} 
        className={`favorite-button ${favorited ? "favorited" : "not-favorited"}`} 
        onClick={e => {
          e.stopPropagation();
          favorited ? favoriteMovies.remove(movie) : favoriteMovies.add(movie);
          favorited ? toastError(`${movie.title} removed from favorites`) : toastSuccess(`${movie.title} added to favorites`);
        }}
      />
    </div> : <></>
  );
}

export const toCards = (
  movies = [], 
  genres = [], 
  movieCardClass = "movie-card-default",
  showRating = false
) => movies.map(e => {
  let g = "";
  if (e.genre_ids && e.genre_ids.length) {
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