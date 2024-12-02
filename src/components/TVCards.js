import { toCards } from "./TVCard";

export default function TVCards({ 
  session,
  tvs = [], 
  genres = [],
  tvCardClass = "movie-card-default",
  showRating = false
}) {
  const cards = toCards(tvs, genres, tvCardClass, showRating);
  return (
    <div className="movie-cards-parent">
      <div style={{
        textShadow: "1px 1px 4px rgba(255, 255, 255, 0.7)",
        fontWeight: "500",
        fontSize: "24px"
       }}>{session}</div>
      <div className="movie-cards" style={{ color: "black" }}>
        {cards}    
      </div>
    </ div>
  );
}