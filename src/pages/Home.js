import MainLayout from "../layouts/MainLayout";
import { discoverMovies, genres, topRatedMovies } from "../api/tmdbService";
import { useContext, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCards from "../components/MovieCards";
import { MainContext } from "../contexts/MainContext";
import SearchResult from "./SearchResult";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const { showSearch, genreList, setGenreList } = useContext(MainContext);
  useEffect(() => {
    const fetchGenres = async (successCallback) => {
      try {
        const res = await genres();
        setGenreList(res.genres);
        successCallback();
      } catch (e) {
        console.error("fail to fetch genres");
      }
    };
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
    fetchGenres(() => {
      fetchPopular();
      fetchTopRated();
    });
  }, []);  
  return (
    <MainLayout children={
      <div className="main-content">
        {
          showSearch ? <SearchResult /> : <>
            { popular.length == 0 || topRated.length == 0 ? <LoadingIndicator /> : <></> }
            { popular.length != 0 ? <MovieCards session={"Popular"} genres={genreList} movies={popular} /> : <></>}
            { topRated.length != 0 ?
              <MovieCards session={"Top Rated"} genres={genreList} movies={topRated} movieCardClass="movie-card-wider" /> 
              : <></>}
          </> 
        }
      </div> 
    } />
  );
}