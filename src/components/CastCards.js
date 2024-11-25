import { toCards } from "./CastCard";

export default function CastCards({ cast }) {
  return (
    <div className="movie-cards" style={{ gap: "8px" }}>
      { toCards(cast) }
    </div>
  );
}