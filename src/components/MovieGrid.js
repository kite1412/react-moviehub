import { toCards } from "./MovieCard";

export default function MovieGrid({ session, movies, genres = [] }) {
  const cards = toCards(movies, genres);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      height: "100%",
      width: "100%",
    }}>
      <div style={{
        textShadow: "1px 1px 4px rgba(255, 255, 255, 0.7)",
        fontWeight: "500",
        color: "white"
      }}>{session}</div>
      <div className="movie-grid">
        {cards}
      </div>
    </div>
  );
}