import { useContext, useState } from "react";
import { ReactComponent as Search } from "../assets/search.svg";
import { MainContext } from "../context/MainContext";

export default function SearchBar() {
  const [search, setS] = useState("");
  const { setShowSearch, setSearch } = useContext(MainContext);
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSearch(true);
      setSearch(search);
    }
  };
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
      <input 
        placeholder="Search movies"
        style={{ all: "unset" }} 
        onKeyDown={onKeyDown}
        onChange={(e) => setS(e.target.value)}
      />
      <Search />
    </button>
  );
}