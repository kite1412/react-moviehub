import { createContext, useState } from "react";

export const MainContext = createContext();

export function MainProvider({ children }) {
  const menu = ["home", "favourites", "trending", "comingsoon"];
  const [currentMenu, setCurrentMenu] = useState(menu[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [tvGenreList, setTVGenreList] = useState([]);
  const [showMovie, setShowMovie] = useState(true);
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
      setTVGenreList
    }}>
      {children}
    </MainContext.Provider>
  );
}