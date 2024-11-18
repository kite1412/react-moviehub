import { toCards } from "./TVCard";

export default function TVGrid({ session, tvs = [], genres = [] }) {
  const cards = toCards(tvs, genres);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      height: "100vh",
      width: "auto",
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