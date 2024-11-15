import { discoverMovies, params } from "../api/tmdbService";

test('discover movies', async () => {
  const res = await discoverMovies(params(["include_adult=false", "language=en-US"]));
  expect(res.results.length != 0).toBe(true);
});