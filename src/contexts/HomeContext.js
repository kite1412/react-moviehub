import { createContext, useState } from "react";

export const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTVs, setPopularTVs] = useState([]);
  const [topRatedTVs, setTopRatedTVs] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTVs, setTrendingTVs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <HomeContext.Provider value={{
      popularMovies,
      setPopularMovies,
      topRatedMovies,
      setTopRatedMovies,
      popularTVs,
      setPopularTVs,
      topRatedTVs,
      setTopRatedTVs,
      trendingMovies,
      setTrendingMovies,
      trendingTVs,
      setTrendingTVs,
      currentSlide, 
      setCurrentSlide
    }}>
      {children}
    </HomeContext.Provider>
  );
}