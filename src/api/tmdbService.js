const BASE_URL = "https://api.themoviedb.org/3";
const DISCOVER_MOVIE_URL = BASE_URL + "/discover/movie";

export const params = (params) => {
  return params.join("&");
}

const generateUrl = (url, params = "") => {
  return `${url}?api_key=${process.env.TMDB_API_KEY}&${params}`;
}

export async function discoverMovies(params) {
  try {
    const url = generateUrl(DISCOVER_MOVIE_URL, params);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fail: ${url}`);
    const json = await res.json();
    console.log(`success (${json.results.length} data): ${url}`);
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
}