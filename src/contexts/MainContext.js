import { createContext, useState } from "react";
import MediaCollection from "../model/MediaCollection";

export const MainContext = createContext({
  movieGenreList: [],
  tvGenreList: []
});

export function MainProvider({ children }) {
  const menu = ["home", "favorites", "trending", "comingsoon"];
  const [currentMenu, setMenu] = useState(menu[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [tvGenreList, setTVGenreList] = useState([]);
  const [showMovie, setShowMovie] = useState(true);
  const [selectedType, setSelectedType] = useState("movie");
  const [favMovies, setFavMovies] = useState([]);
  const [favTVs, setFavTVs] = useState([]);
  const favoriteMovies = new MediaCollection(favMovies, setFavMovies);
  const favoriteTVs = new MediaCollection(favTVs, setFavTVs);
  const setCurrentMenu = (m) => {
    window.scrollTo(0, 0);
    setMenu(m);
  }
  return (
    <MainContext.Provider value={{
      currentMenu,
      setCurrentMenu,
      showSearch,
      setShowSearch,
      search,
      setSearch,
      movieGenreList,
      setMovieGenreList,
      showMovie,
      setShowMovie,
      tvGenreList,
      setTVGenreList,
      selectedType,
      setSelectedType,
      favoriteMovies,
      favoriteTVs
    }}>
      {children}
    </MainContext.Provider>
  );
}