import MovieCard from "./MovieCard";

export default function MovieCards({ 
  session,
  movies = [], 
  genres = [],
  movieCardClass = "movie-card-default"
}) {
  const toCard = movies.map(e => {
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
  return (
    <div className="movie-cards-parent">
      <div style={{
        textShadow: "1px 1px 4px rgba(255, 255, 255, 0.7)",
        fontWeight: "500"
       }}>{session}</div>
      <div className="movie-cards" style={{ color: "black" }}>
        {toCard}    
      </div>
    </ div>
  );
}