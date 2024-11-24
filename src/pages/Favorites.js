import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import MovieGrid from "../components/MovieGrid";
import TVGrid from "../components/TVGrid";

export default function Favourites() {
  const {
    favoriteMovies,
    favoriteTVs,
    showMovie
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
        showMovie ? favoriteMovies.list.length ? <MovieGrid movies={favoriteMovies.list} session={"Favorite Movies"} /> 
        : <p style={emptyStyle}>No Listed Movies</p> : favoriteTVs.list.length ? <TVGrid tvs={favoriteTVs.list} session={"Favorite TV Shows"} />
        : <p style={emptyStyle}>No Listed TV Shows</p>
      }
    </div>
  );
}