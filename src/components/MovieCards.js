import { toCards } from "./MovieCard";

export default function MovieCards({ 
  session,
  movies = [], 
  genres = [],
  movieCardClass = "movie-card-default"
}) {
  const cards = toCards(movies, genres, movieCardClass);
  return (
    <div className="movie-cards-parent">
      <div style={{
        textShadow: "1px 1px 4px rgba(255, 255, 255, 0.7)",
        fontWeight: "500"
       }}>{session}</div>
      <div className="movie-cards" style={{ color: "black" }}>
        {cards}    
      </div>
    </ div>
  );
}