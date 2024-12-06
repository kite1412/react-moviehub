import { createContext, useState } from "react";
import Collection from "../models/Collection";

export const MainContext = createContext({
  movieGenreList: [],
  tvGenreList: []
});

export function MainProvider({ children }) {
  const menu = ["home", "favorites", "comingsoon"];
  const [currentMenu, setMenu] = useState(menu[0]);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [movieGenreList, setMovieGenreList] = useState([]);
  const [tvGenreList, setTVGenreList] = useState([]);
  const [showMovie, setShowMovie] = useState(true);
  const [selectedType, setSelectedType] = useState("movie");
  const [favMovies, setFavMovies] = useState([]);
  const [favTVs, setFavTVs] = useState([]);
  const [mWatchlist, setMWatchlist] = useState([]);
  const [tWatchlist, setTWatchlist] = useState([]);
  const favoriteMovies = new Collection(favMovies, setFavMovies);
  const favoriteTVs = new Collection(favTVs, setFavTVs);
  const movieWatchlist = new Collection(mWatchlist, setMWatchlist);
  const tvWatchlist = new Collection(tWatchlist, setTWatchlist);
  const [languages, setLanguages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const myReviews = new Collection(reviews, setReviews);
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
      favoriteTVs,
      languages,
      setLanguages,
      movieWatchlist,
      tvWatchlist,
      myReviews
    }}>
      {children}
    </MainContext.Provider>
  );
}