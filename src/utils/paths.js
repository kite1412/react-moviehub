export const detailPath = (id = "") => {
  return `/detail/${id === "" ? ":id" : id}`
}