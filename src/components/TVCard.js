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

export default function TVCard({
  tv, 
  genre = "", 
  className = "movie-card-default",
  showRating = false 
}) {
  const navigate = useNavigate();
  const { favoriteTVs } = useContext(MainContext);
  const favorited = favoriteTVs.contains(tv);
  return (
    <div className={className} onClick={() => {
      navigate(detailPath(tv.id), { state: { media: tv, isMovie: false } })
    }}>
      <div id="description">
        <div>{tv.name}</div>
        <div style={{ fontSize: "11px", fontWeight: "normal" }}>
          {tv.first_air_date !== undefined ? getYear(tv.first_air_date) : ""} { genre !== ""  ? `| ${genre}` : ""}
        </div>
      </div>
      <img src={originalImageUrl(tv.poster_path)} alt="poster" />
      { showRating ? <Score score={fixedRating(tv.vote_average)} /> : <></> }
      <IconButton 
        icon={<Heart style={{
          fill: `${ favorited ? "#6100C2" : "transparent"}`
        }} />} 
        className={`favorite-button ${favorited ? "favorited" : "not-favorited"}`} 
        onClick={e => {
          e.stopPropagation();
          favorited ? favoriteTVs.remove(tv) : favoriteTVs.add(tv);
          favorited ? toastError(`${tv.name} removed from favorites`) : toastSuccess(`${tv.name} added to favorites`);
        }}
      />
    </div>
  );
}

export const toCards = (
  tvs = [], 
  genres = [], 
  tvCardClass = "movie-card-default", 
  showRating = false
) => tvs.map(e => {
  let g = "";
  if (e.genre_ids && e.genre_ids.length) {
    genres.forEach(genre => {
      if (e.genre_ids[0] == genre.id) {
        g = genre.name;
        return;
      }
    });
  }
  return <TVCard tv={e} genre={g} className={tvCardClass} showRating={showRating} />
});