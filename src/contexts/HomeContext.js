import { createContext, useState } from "react";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTVs, setPopularTVs] = useState([]);
  const [topRatedTVs, setTopRatedTVs] = useState([]);
  return (
    <HomeContext.Provider value={{
      popularMovies,
      setPopularMovies,
      topRatedMovies,
      setTopRatedMovies,
      popularTVs,
      setPopularTVs,
      topRatedTVs,
      setTopRatedTVs
    }}>
      {children}
    </HomeContext.Provider>
  );
}