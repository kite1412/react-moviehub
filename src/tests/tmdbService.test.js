import { discoverMovies, genres, searchMovies, trendingMovies } from "../api/tmdbService";

test('discover movies', async () => {
  const res = await discoverMovies(["include_adult=false", "language=en-US"]);
  expect(res.results.length != 0).toBe(true);
});

test('get genres', async () => {
  const res = await genres();
  expect(res.genres.length != 0).toBe(true);
});

test('search movies', async () => {
  const res = await searchMovies("iron man");
  expect(res.results.length != 0).toBe(true);
});

test('trending movies', async () => {
  const res = await trendingMovies();
  expect(res.results.length !== 0).toBe(true);
});