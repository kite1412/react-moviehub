import MainLayout from "../layouts/MainLayout";
import { discoverMovies, topRatedMovies } from "../api/tmdbService";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCards from "../components/MovieCards";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await discoverMovies(["sort_by=popularity.desc"]);
        if (res != null) setPopular(res.results);
      } catch(e) {
        // TODO handle
      }
    };
    const fetchTopRated = async () => {
      try {
        const res = await topRatedMovies();
        if (res != null) setTopRated(res.results);
      } catch(e) {
        // TODO handle
      }
    };
    fetchPopular();
    fetchTopRated();
  }, []);  
  return (
    <MainLayout children={
      <div className="main-content">
        { popular.length != 0 ? <MovieCards session={"Popular"} movies={popular} /> : <></>}
        { topRated.length != 0 ? <MovieCards session={"Top Rated"} movies={topRated} movieCardClass="movie-card-wider" /> : <></>}
      </div> 
    } />
  );
}