import { createContext, useState } from "react";
import Collection from "../models/Collection";

export const MainContext = createContext({
  movieGenreList: [],
  tvGenreList: []
});

const mockReviews = () => {
  const arr = [];
  for (let i = 0; i < 5; i++) arr.push(
    {
      id: crypto.randomUUID(),
      author: "kite",
      created_at: new Date(),
      content: "bad",
      author_details: {
        avatar_path: ""
      },
      me: true,
      media: {
        "adult": false,
        "backdrop_path": "/tElnmtQ6yz1PjN1kePNl8yMSb59.jpg",
        "genre_ids": [
          16,
          12,
          10751,
          35
        ],
        "id": 1241982,
        "original_language": "en",
        "original_title": "Moana 2",
        "overview": "After receiving an unexpected call from her wayfinding ancestors, Moana journeys alongside Maui and a new crew to the far seas of Oceania and into dangerous, long-lost waters for an adventure unlike anything she's ever faced.",
        "popularity": 5620.23,
        "poster_path": "/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg",
        "release_date": "2024-11-27",
        "title": "Moana 2",
        "video": false,
        "vote_average": 6.904,
        "vote_count": 349
      },
      isMovie: true
    }
  ); 
  return arr;
};

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
  const [reviews, setReviews] = useState(mockReviews());
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