import { useContext, useRef, useState } from "react";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { MainContext } from "../contexts/MainContext";

export default function SearchBar() {
  const [search, setS] = useState("");
  const { setShowSearch, setSearch, showSearch, setCurrentMenu } = useContext(MainContext);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setCurrentMenu("home");
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
          <ChevronLeft 
            className={`clear-search ${showSearch ? "clear-visible" : ""}`} 
            onClick={() => {
              setShowSearch(false);
              setS("");
              inputRef.current.blur();
            }} 
          />
        }
      <button className={`search-bar ${focus ? "focus" : "unfocus"}`}>
        <input 
          placeholder="Search by titles"
          style={{ all: "unset" }}
          value={search} 
          onKeyDown={onKeyDown}
          ref={inputRef}
          onChange={(e) => setS(e.target.value)}
          onFocus={() => {setFocus(true)}}
          onBlur={() => {setFocus(false)}}
        />
        <Search />
      </button>
    </div>
  );
}