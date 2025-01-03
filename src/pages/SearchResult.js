import { useContext, useEffect, useState } from "react";
import { searchMovies, searchTVs, tvGenres } from "../api/tmdbService";
import { MainContext } from "../contexts/MainContext";
import LoadingIndicator from "../components/loadingIndicator";
import MovieGrid from "../components/MovieGrid";
import TVGrid from "../components/TVGrid";
import PageLoading from "../components/PageLoading";
import { ReactComponent as VideoSlash } from "../assets/video-slash.svg";

export default function SearchResult() {
  const [result, setResult] = useState({data: [], status: 0});
  const { 
    search,
    movieGenreList,
    tvGenreList,
    setTVGenreList,
    showMovie
  } = useContext(MainContext);
  useEffect(() => {
    setResult({ status: 0 })
    const fetchResult = async () => {
      if (!showMovie) if (tvGenreList.length == 0) {
        const res = await tvGenres();
        setTVGenreList(res.genres); 
      }
      const res = showMovie ? await searchMovies(search) : await searchTVs(search);
      setResult({
        data: res.results,
        status: res.results.length != 0 ? 1 : -1,
        title: search
      });
    };
    fetchResult();
  }, [search, showMovie]);
  return (
    result.status === 0 ? <PageLoading /> : result.status === -1 ? <div style={{
      color: "#412161",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "90%",
      boxSizing: "border-box",
      paddingBottom: "65px"
    }}>
      <VideoSlash style={{ height: "170px", width: "170px" }} />
      <h2>No results found</h2>
    </div> :
    <div className="search-result">
      {
        showMovie ? <MovieGrid session={`Results for "${result.title}"`} movies={result.data} genres={movieGenreList} />
        : tvGenreList.length !== 0 ? <TVGrid session={`Results for "${result.title}"`} tvs={result.data} genres={tvGenreList} />
        : <LoadingIndicator />
      }
    </div>
  );
}