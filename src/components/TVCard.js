import { useNavigate } from "react-router-dom";
import { originalImageUrl } from "../api/tmdbService"; 
import Score from "./Score";
import { detailPath } from "../utils/paths";
import { fixedRating, getYear } from "../utils/functions";

export default function TVCard({
  tv, 
  genre = "", 
  className = "movie-card-default",
  showRating = false 
}) {
  const navigate = useNavigate();
  return (
    <div className={className} onClick={() => {
      navigate(detailPath(tv.id), { state: { media: tv, isMovie: false } })
    }}>
      <div id="description">
        <p>{tv.name}</p>
        <p style={{ fontSize: "11px", fontWeight: "normal" }}>
          {tv.first_air_date !== undefined ? getYear(tv.first_air_date) : ""} { genre !== ""  ? `| ${genre}` : ""}
        </p>
      </div>
      <img src={originalImageUrl(tv.poster_path)} alt="poster" />
    { showRating ? <Score score={fixedRating(tv.vote_average)} /> : <></> }
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
  if (e.genre_ids.length != 0) {
    genres.forEach(genre => {
      if (e.genre_ids[0] == genre.id) {
        g = genre.name;
        return;
      }
    });
  }
  return <TVCard tv={e} genre={g} className={tvCardClass} showRating={showRating} />
});