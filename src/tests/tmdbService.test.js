import { discoverMovies } from "../api/tmdbService";

test('discover movies', async () => {
  const res = await discoverMovies(["include_adult=false", "language=en-US"]);
  expect(res.results.length != 0).toBe(true);
});