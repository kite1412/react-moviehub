import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import MovieGrid from "../components/MovieGrid";
import TVGrid from "../components/TVGrid";
import { ReactComponent as HeartOff } from "../assets/heart-off.svg";

export default function Favourites() {
  const {
    favoriteMovies,
    favoriteTVs,
    showMovie,
    movieGenreList,
    tvGenreList
  } = useContext(MainContext);
  const emptyStyle = {
    color: "white",
    fontSize: "24px",
    fontStyle: "italic",
    fontWeight: "bold"
  };
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
    <HeartOff style={{
      height: "170px",
      width: "170px"
    }} />
    <h2>No {showMovie ? "movies" : "TV show"} found</h2>
  </div>;
  return (
    <div className="main-content">
      {
        showMovie ? favoriteMovies.list.length ? <MovieGrid 
          movies={favoriteMovies.list} 
          session={"Favorite Movies"}
          genres={movieGenreList}
        /> 
        : empty : favoriteTVs.list.length ? <TVGrid 
          tvs={favoriteTVs.list} 
          session={"Favorite TV Shows"}
          genres={tvGenreList} 
        />
        : empty
      }
    </div>
  );
}