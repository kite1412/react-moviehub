export const fixedRating = (raw) => {
  return parseFloat(raw.toFixed(2));
};

export const getYear = (date) => {
  return date.slice(0, 4);
};

export function resolveGenres(genreIds, genres) {
  if (genreIds && genreIds.length == 0) return "";
  return genreIds.map(e => {
    let g = "";
    genres.forEach(element => {
      if (element.id == e) {
        g = element.name;
        return;
      }
    });
    return g;
  }).join(" | ");
}