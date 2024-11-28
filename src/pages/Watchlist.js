import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import MovieGrid from "../components/MovieGrid";
import TVGrid from "../components/TVGrid";

export default function Watchlist() {
  const {
    showMovie,
    movieGenreList,
    tvGenreList,
    movieWatchlist,
    tvWatchlist
  } = useContext(MainContext);
  const emptyStyle = {
    color: "white",
    fontSize: "24px",
    fontStyle: "italic",
    fontWeight: "bold"
  };
  return (
    <div className="main-content">
      {
        showMovie ? movieWatchlist.list.length ? <MovieGrid 
          movies={movieWatchlist.list} 
          session={"Movie Watchlist"}
          genres={movieGenreList}
        /> 
        : <p style={emptyStyle}>Watchlist is empty</p> : tvWatchlist.list.length ? <TVGrid 
          tvs={tvWatchlist.list} 
          session={"TV Show Watchlist"}
          genres={tvGenreList} 
        />
        : <p style={emptyStyle}>Watchlist is empty</p>
      }
    </div>
  );
}