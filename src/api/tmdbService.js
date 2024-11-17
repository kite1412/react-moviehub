const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_MOVIE_URL = BASE_URL + "/discover/movie";
const MOVIE_URL = BASE_URL + "/movie";
const TV_URL = BASE_URL + "/tv";
const TOP_RATED_MOVIE_URL = MOVIE_URL + "/top_rated"
const TOP_RATED_TV_URL = TV_URL + "/top_rated"
const MOVIE_GENRES = BASE_URL + "/genre/movie/list";
const TV_GENRES = BASE_URL + "/genre/tv/list";
const SEARCH_MOVIE_URL = BASE_URL + "/search/movie";
const POPULAR_MOVIE_URL = MOVIE_URL + "/popular";
const POPULAR_TV_URL = TV_URL + "/popular";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const unincludeAdult = "include_adult=false";

const generateUrl = (url, params = []) => {
  return `${url}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&${params.join("&")}`;
}

export const originalImageUrl = (filePath) => {
  return `${IMAGE_BASE_URL}/original/${filePath}`;
}

async function get(url, params = []) {
  const u = generateUrl(url, params);
  try {
    const res = await fetch(u);
    if (!res.ok) throw new Error(`fail: ${u}`);
    const json = await res.json();
    console.log(`success: ${u}`);
    return json;
  } catch (err) {
    console.error(`${err}: ${u}`);
    throw err;
  }
}

export async function discoverMovies(params = [unincludeAdult]) {
  return get(DISCOVER_MOVIE_URL, params);
}

export async function topRatedMovies(params = [unincludeAdult]) {
  return get(TOP_RATED_MOVIE_URL, params);
}

export async function movieGenres() {
  return get(MOVIE_GENRES, []);
}

export async function searchMovies(title) {
  return get(SEARCH_MOVIE_URL, [unincludeAdult, `query=${title}`])
}

export async function popularMovies(params = [unincludeAdult]) {
  return get(POPULAR_MOVIE_URL, params);
}

export async function tvGenres() {
  return get(TV_GENRES, []);
}

export async function popoularTVs(params = [unincludeAdult]) {
  return get(POPULAR_TV_URL, params);
}

export async function topRatedTVs(params = [unincludeAdult]) {
  return get(TOP_RATED_TV_URL, params);
}