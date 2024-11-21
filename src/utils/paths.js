export const SIGNUP_PATH = "/signup";
export const detailPath = (id = "") => {
  return `/detail/${id === "" ? ":id" : id}`
}