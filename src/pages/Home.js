import MainLayout from "../layouts/MainLayout";
import { 
  popularMovies as popularsM,
  movieGenres, 
  topRatedMovies as topMovies, 
  tvGenres,
  popoularTVs as popularsT,
  topRatedTVs as topTVs 
} from "../api/tmdbService";
import { useContext, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCards from "../components/MovieCards";
import { MainContext } from "../contexts/MainContext";
import SearchResult from "./SearchResult";
import TVCards from "../components/TVCards";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTVs, setPopularTVs] = useState([]);
  const [topRatedTVs, setTopRatedTVs] = useState([]);
  const {
    showSearch,
    movieGenreList, 
    setMovieGenreList, 
    showMovie,
    tvGenreList,
    setTVGenreList 
  } = useContext(MainContext);
  useEffect(() => {
    const fetchMovieGenres = async (successCallback) => {
      try {
        const res = await movieGenres();
        setMovieGenreList(res.genres);
        successCallback();
      } catch (e) {
        console.error("fail to fetch movie genres");
      }
    };
    const fetchTVGenres = async (successCallback) => {
      try {
        const res = await tvGenres();
        setTVGenreList(res.genres);
        successCallback();
      } catch(e) {
        console.error("fail to fetch tv genres")
      }
    };
    const fetchPopularMovies = async () => {
      try {
        const res = await popularsM();
        if (res != null) setPopularMovies(res.results);
      } catch(e) {
        // TODO handle
      }
    };
    const fetchTopRatedMovies = async () => {
      try {
        const res = await topMovies();
        if (res != null) setTopRatedMovies(res.results);
      } catch(e) {
        // TODO handle
      }
    };
    const fetchPopularTVs = async () => {
      try {
        const res = await popularsT();
        if (res != null) setPopularTVs(res.results);
      } catch(e) {
        // TODO handle
      }
    };
    const fetchTopRatedTVs = async () => {
      try {
        const res = await topTVs();
        if (res != null) setTopRatedTVs(res.results);
      } catch(e) {
        // TODO handle
      }
    };
    if (movieGenreList.length == 0 && showMovie) fetchMovieGenres(() => {
      fetchPopularMovies();
      fetchTopRatedMovies();
    });
    if (tvGenreList.length == 0 && !showMovie) fetchTVGenres(() => {
      fetchPopularTVs();
      fetchTopRatedTVs();
    });
  }, [showMovie]);  
  return (
    <MainLayout children={
      <div className="main-content">
        {
          showSearch ? <SearchResult /> : showMovie ? <>
            { popularMovies.length == 0 && topRatedMovies.length == 0 ? <LoadingIndicator /> : <></> }
            { popularMovies.length != 0 ? <MovieCards session={"Popular"} genres={movieGenreList} movies={popularMovies} /> : <></>}
            { topRatedMovies.length != 0 ?
              <MovieCards session={"Top Rated"} genres={movieGenreList} movies={topRatedMovies} movieCardClass="movie-card-wider" /> 
              : <></>}
          </> : <>
            { popularTVs.length == 0 && topRatedTVs.length == 0 ? <LoadingIndicator /> : <></> }
            { popularTVs.length != 0 ? <TVCards session={"Popular"} genres={tvGenreList} tvs={popularTVs} /> : <></>}
            { topRatedTVs.length != 0 ?
              <TVCards session={"Top Rated"} genres={tvGenreList} tvs={topRatedTVs} tvCardClass="movie-card-wider" /> 
              : <></>}
          </>
        }
      </div> 
    } />
  );
}