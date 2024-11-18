import { originalImageUrl } from "../api/tmdbService"; 

export default function TVCard({ tv, genre = "", className = "movie-card-default" }) {
  return (
    <div className={className}>
      <div id="description">
        <p>{tv.name}</p>
        <p style={{ fontSize: "11px", fontWeight: "normal" }}>
          {tv.first_air_date !== undefined ? tv.first_air_date.slice(0, 4) : ""} { genre !== ""  ? `| ${genre}` : ""}
        </p>
      </div>
      <img src={originalImageUrl(tv.poster_path)} alt="poster" />
    </div>
  );
}

export const toCards = (tvs = [], genres = [], tvCardClass = "movie-card-default") => tvs.map(e => {
  let g = "";
  if (e.genre_ids.length != 0) {
    genres.forEach(genre => {
      if (e.genre_ids[0] == genre.id) {
        g = genre.name;
        return;
      }
    });
  }
  return <TVCard tv={e} genre={g} className={tvCardClass} />
});