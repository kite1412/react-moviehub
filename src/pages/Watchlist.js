import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import MovieGrid from "../components/MovieGrid";
import TVGrid from "../components/TVGrid";
import { ReactComponent as BookmarkSlash } from "../assets/bookmark-slash.svg";

export default function Watchlist() {
  const {
    showMovie,
    movieGenreList,
    tvGenreList,
    movieWatchlist,
    tvWatchlist
  } = useContext(MainContext);
  const empty = <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    paddingBottom: "65px",
    boxSizing: "border-box",
    color: "#412161"
  }}>
    <BookmarkSlash style={{
      height: "170px",
      width: "170px"
    }} />
    <h2>{showMovie ? "Movie" : "TV Show"} watchlist is empty</h2>
  </div>;
  return (
    <div className="main-content">
      {
        showMovie ? movieWatchlist.list.length ? <MovieGrid 
          movies={movieWatchlist.list} 
          session={"Movie Watchlist"}
          genres={movieGenreList}
        /> 
        : empty : tvWatchlist.list.length ? <TVGrid 
          tvs={tvWatchlist.list} 
          session={"TV Show Watchlist"}
          genres={tvGenreList} 
        />
        : empty
      }
    </div>
  );
}