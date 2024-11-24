import { toCards } from "./CastCard";

export default function CastCards({ cast }) {
  return (
    <div className="movie-cards">
      { toCards(cast) }
    </div>
  );
}