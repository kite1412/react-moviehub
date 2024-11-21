export const fixedRating = (raw) => {
  return parseFloat(raw.toFixed(2));
};

export const getYear = (date) => {
  return date.slice(0, 4);
};