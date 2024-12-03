import { 
  popularMovies as popularsM,
  movieGenres, 
  topRatedMovies as topMovies, 
  tvGenres,
  popoularTVs as popularsT,
  topRatedTVs as topTVs 
} from "../api/tmdbService";
import { useContext, useEffect } from "react";
import MovieCards from "../components/MovieCards";
import { MainContext } from "../contexts/MainContext";
import SearchResult from "./SearchResult";
import TVCards from "../components/TVCards";
import PageLoading from "../components/PageLoading";
import { HomeContext } from "../contexts/HomeContext";
import TrendingHeader from "../components/TrendingHeader";
import { useMediaQuery } from "react-responsive";
import { small } from "../utils/screen";
import { bottomNavBarHeight } from "../utils/const";

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
    const fetchMovieGenres = async (callback) => {
      if (!movieGenreList.length) {
        const res = await movieGenres();
        setMovieGenreList(res.genres);
      }
      callback();
    };
    const fetchTVGenres = async (callback) => {
      if (!tvGenreList.length) {
        const res = await tvGenres();
        setTVGenreList(res.genres);  
      }
      callback();
    };
    const fetchPopularMovies = async () => {
      if (!popularMovies.length) {
        const res = await popularsM();
        if (res != null) setPopularMovies(res.results);
      }
    };
    const fetchTopRatedMovies = async () => {
      if (!topRatedMovies.length) {
        const res = await topMovies();
        if (res != null) setTopRatedMovies(res.results);
      }
    };
    const fetchPopularTVs = async () => {
      if (!popularTVs.length) {
        const res = await popularsT();
        if (res != null) setPopularTVs(res.results);
      }
    };
    const fetchTopRatedTVs = async () => {
      if (!topRatedTVs.length) {
        const res = await topTVs();
        if (res != null) setTopRatedTVs(res.results);  
      }
    };
    if (showMovie) fetchMovieGenres(() => {
      fetchPopularMovies();
      fetchTopRatedMovies();
    });
    if (!showMovie) fetchTVGenres(() => {
      fetchPopularTVs();
      fetchTopRatedTVs();
    });
  }, [showMovie]);  
  const s = useMediaQuery(small);
  const sectionStyle = {
    paddingBottom: s ? bottomNavBarHeight : "32px",
    display: "flex",
    flexDirection: "column",
    gap: "32px"
  }
  return (
    <>
      <TrendingHeader />
      <div className="main-content">
        {
          showSearch ? <SearchResult /> : showMovie ? <div style={sectionStyle}>
            { !popularMovies.length && !topRatedMovies.length ? <PageLoading /> : <></> }
            { popularMovies.length ? <MovieCards 
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
          </div> : <div style={sectionStyle}>
            { popularTVs.length == 0 && topRatedTVs.length == 0 ? <PageLoading /> : <></> }
            { popularTVs.length != 0 ? <TVCards session={"Popular"} genres={tvGenreList} tvs={popularTVs} /> : <></>}
            { topRatedTVs.length != 0 ?
              <TVCards session={"Top Rated"} genres={tvGenreList} tvs={topRatedTVs} tvCardClass="movie-card-wider" showRating={true} /> 
              : <></>}
          </div>
        }
      </div>
    </>
  );
}