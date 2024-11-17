import { toCards } from "./TVCard";

export default function TVCards({ 
  session,
  tvs = [], 
  genres = [],
  tvCardClass = "movie-card-default"
}) {
  const cards = toCards(tvs, genres, tvCardClass);
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