import { createContext, useState } from "react";

export const MainContext = createContext();

export function MainProvider({ children }) {
  const menu = ["home", "favourites", "trending", "comingsoon"];
  const [currentMenu, setCurrentMenu] = useState(menu[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState([]);
  return (
    <MainContext.Provider value={{
      currentMenu,
      setCurrentMenu,
      showSearch,
      setShowSearch,
      search,
      setSearch,
      genreList,
      setGenreList
    }}>
      {children}
    </MainContext.Provider>
  );
}