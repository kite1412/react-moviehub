import { useContext, useRef, useState } from "react";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { MainContext } from "../contexts/MainContext";

export default function SearchBar() {
  const [search, setS] = useState("");
  const { setShowSearch, setSearch, showSearch } = useContext(MainContext);
  const inputRef = useRef();
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSearch(true);
      setSearch(search);
    }
  };
  return (
    <div style={{
      display: "flex",
      gap: "16px",
      alignItems: "center"
    }}>
        {
          showSearch ? <ChevronLeft 
            className={"clear-search"} 
            onClick={() => {
              setShowSearch(false);
              setS("");
              inputRef.current.blur();
            }} 
          /> : <></>
        }
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
          value={search} 
          onKeyDown={onKeyDown}
          ref={inputRef}
          onChange={(e) => setS(e.target.value)}
        />
        <Search />
      </button>
    </div>
  );
}