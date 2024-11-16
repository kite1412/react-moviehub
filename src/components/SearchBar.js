import { ReactComponent as Search } from "../assets/search.svg";

export default function SearchBar() {
  return (
    <button style={{
      all: "unset",
      height: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      border: "2px solid rgba(255, 255, 255, 0.8)",
      cursor: "pointer",
      paddingLeft: "16px",
      paddingRight: "16px",
      borderRadius: "50px",
      opacity: 0.8,
      color: "white"
    }}>
      <input placeholder="Search movies" style={{ all: "unset" }}/>
      <Search />
    </button>
  );
}