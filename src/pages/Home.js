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
import MovieCards from "../components/MovieCards";
import { MainContext } from "../contexts/MainContext";
import SearchResult from "./SearchResult";
import TVCards from "../components/TVCards";
import PageLoading from "../components/PageLoading";
import { HomeContext } from "../contexts/HomeContext";
import TrendingHeader from "../components/TrendingHeader";

export default function Home() {
  const {
    popularMovies,
    setPopularMovies,
    topRatedMovies,
    setTopRatedMovies,
    popularTVs,
    setPopularTVs,
    topRatedTVs,
    setTopRatedTVs
  } = useContext(HomeContext);
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
      const res = await movieGenres();
      setMovieGenreList(res.genres);
      successCallback();
    };
    const fetchTVGenres = async (successCallback) => {
      const res = await tvGenres();
      setTVGenreList(res.genres);
      successCallback();
    };
    const fetchPopularMovies = async () => {
      const res = await popularsM();
      if (res != null) setPopularMovies(res.results);
    };
    const fetchTopRatedMovies = async () => {
      const res = await topMovies();
      if (res != null) setTopRatedMovies(res.results);
    };
    const fetchPopularTVs = async () => {
      const res = await popularsT();
      if (res != null) setPopularTVs(res.results);
    };
    const fetchTopRatedTVs = async () => {
      const res = await topTVs();
      if (res != null) setTopRatedTVs(res.results);
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
    <>
      <TrendingHeader />
      <div className="main-content" style={{ overflowY: !showSearch ? "hidden" : "" }}>
        {
          showSearch ? <SearchResult /> : showMovie ? <>
            { popularMovies.length == 0 && topRatedMovies.length == 0 ? <PageLoading /> : <></> }
            { popularMovies.length != 0 ? <MovieCards 
                session={"Popular"} 
                genres={movieGenreList} 
                movies={popularMovies} 
              /> : <></>
            }
            { topRatedMovies.length != 0 ?
              <MovieCards 
                session={"Top Rated"}
                genres={movieGenreList} 
                movies={topRatedMovies} 
                movieCardClass="movie-card-wider" 
                showRating={true} 
              /> 
              : <></>}
          </> : <>
            { popularTVs.length == 0 && topRatedTVs.length == 0 ? <PageLoading /> : <></> }
            { popularTVs.length != 0 ? <TVCards session={"Popular"} genres={tvGenreList} tvs={popularTVs} /> : <></>}
            { topRatedTVs.length != 0 ?
              <TVCards session={"Top Rated"} genres={tvGenreList} tvs={topRatedTVs} tvCardClass="movie-card-wider" showRating={true} /> 
              : <></>}
          </>
          }  
      </div>
    </>
  );
}