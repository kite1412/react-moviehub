const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_MOVIE_URL = BASE_URL + "/discover/movie";
const MOVIE_URL = BASE_URL + "/movie";
const TOP_RATED_URL = MOVIE_URL + "/top_rated"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

const generateUrl = (url, params = []) => {
  return `${url}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_adult=false&${params.join("&")}`;
}

export const originalImageUrl = (filePath) => {
  return `${IMAGE_BASE_URL}/original/${filePath}`;
}

async function get(url, params = []) {
  try {
    const u = generateUrl(url, params);
    const res = await fetch(u);
    if (!res.ok) throw new Error(`fail: ${u}`);
    const json = await res.json();
    console.log(`success (${json.results.length} data): ${u}`);
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function discoverMovies(params = []) {
  return get(DISCOVER_MOVIE_URL, params);
}

export async function topRatedMovies(params = []) {
  return get(TOP_RATED_URL, params);
}