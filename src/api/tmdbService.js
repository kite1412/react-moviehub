const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_MOVIE_URL = BASE_URL + "/discover/movie";
const MOVIE_URL = BASE_URL + "/movie";
const TV_URL = BASE_URL + "/tv";
const TOP_RATED_MOVIE_URL = MOVIE_URL + "/top_rated"
const TOP_RATED_TV_URL = TV_URL + "/top_rated"
const MOVIE_GENRES = BASE_URL + "/genre/movie/list";
const TV_GENRES = BASE_URL + "/genre/tv/list";
const SEARCH_MOVIE_URL = BASE_URL + "/search/movie";
const SEARCH_TV_URL = BASE_URL + "/search/tv";
const POPULAR_MOVIE_URL = MOVIE_URL + "/popular";
const POPULAR_TV_URL = TV_URL + "/popular";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const movieVideosUrl = (id) => {
  return `${MOVIE_URL}/${id}/videos`;
};

const tvVideosUrl = (id) => {
  return `${TV_URL}/${id}/videos`;
};

const weekTrendingUrl = (isMovie = true) => {
  return `${BASE_URL}/trending/${isMovie ? "movie" : "tv"}/week`;
};

const unincludeAdult = "include_adult=false";

const generateUrl = (url, params = []) => {
  return `${url}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&${params.join("&")}`;
}

export const originalImageUrl = (filePath) => {
  return `${IMAGE_BASE_URL}/original/${filePath}`;
}

async function get(url, params = [], onFail) {
  const u = generateUrl(url, params);
  try {
    const res = await fetch(u);
    if (!res.ok) throw new Error(`fail: ${u}`);
    const json = await res.json();
    console.log(`success: ${u}`);
    return json;
  } catch (err) {
    console.error(`${err}: ${u}`);
    onFail(err);
  }
}

export async function discoverMovies(params = [unincludeAdult], onFail = () => {}) {
  return await get(DISCOVER_MOVIE_URL, params, onFail);
}

export async function topRatedMovies(params = [unincludeAdult], onFail = () => {}) {
  return await get(TOP_RATED_MOVIE_URL, params, onFail);
}

export async function movieGenres(onFail = () => {}) {
  return await get(MOVIE_GENRES, [], onFail);
}

export async function searchMovies(title, onFail = () => {}) {
  return await get(SEARCH_MOVIE_URL, [unincludeAdult, `query=${title}`], onFail)
}

export async function popularMovies(params = [unincludeAdult], onFail = () => {}) {
  return await get(POPULAR_MOVIE_URL, params, onFail);
}

export async function tvGenres(onFail = () => {}) {
  return await get(TV_GENRES, [], onFail);
}

export async function popoularTVs(params = [unincludeAdult], onFail = () => {}) {
  return await get(POPULAR_TV_URL, params, onFail);
}

export async function topRatedTVs(params = [unincludeAdult], onFail = () => {}) {
  return await get(TOP_RATED_TV_URL, params, onFail);
}

export async function searchTVs(title, onFail = () => {}) {
  return await get(SEARCH_TV_URL, [unincludeAdult, `query=${title}`], onFail)
}

export async function movieVideos(id, onFail = () => {}) {
  return await get(movieVideosUrl(id), [], onFail);
}

export async function tvVideos(id, onFail = () => {}) {
  return await get(tvVideosUrl(id), [], onFail);
}

export async function trendingMovies(onFail = () => {}) {
  return await get(weekTrendingUrl(), [], onFail);
}

export async function trendingTVs(onFail = () => {}) {
  return await get(weekTrendingUrl(false), [], onFail);
}