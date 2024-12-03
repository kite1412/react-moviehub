import { useMediaQuery } from "react-responsive";
import { toCards } from "./MovieCard";
import { small } from "../utils/screen";
import { bottomNavBarHeight } from "../utils/const";

export default function MovieGrid({ session, movies = [], genres = [] }) {
  const cards = toCards(movies, genres);
  const s = useMediaQuery(small);
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
        {
          s ? <div style={{
            height: bottomNavBarHeight
          }} /> : <></>
        }
      </div>
    </div>
  );
}