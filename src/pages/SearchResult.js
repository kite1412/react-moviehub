import { useContext, useEffect, useState } from "react";
import { searchMovies } from "../api/tmdbService";
import { MainContext } from "../context/MainContext";
import MovieCards from "../components/MovieCards";
import LoadingIndicator from "../components/LoadingIndicator";

export default function SearchResult() {
  const [result, setResult] = useState({data: [], status: 0});
  const { search } = useContext(MainContext);
  useEffect(() => {
    setResult({ status: 0 })
    const fetchResult = async () => {
      try {
        const res = await searchMovies(search);
        setResult({
          data: res.results,
          status: res.results.length != 0 ? 1 : -1,
          title: search
        });
      } catch(e) {
        // TODO handle
      }
    };
    fetchResult();
  }, [search]);
  return (
    result.status === 0 ? <LoadingIndicator /> : result.status === -1 ? <p>No results</p> :
    <MovieCards session={`Results for "${result.title}"`} movies={result.data}/>
  );
}