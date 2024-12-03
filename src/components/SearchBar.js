import { useContext, useRef, useState } from "react";
import { ReactComponent as Search } from "../assets/search.svg";
import { ReactComponent as ChevronLeft } from "../assets/chevron-left.svg";
import { MainContext } from "../contexts/MainContext";
import { useMediaQuery } from "react-responsive";
import { small } from "../utils/screen";

export default function SearchBar() {
  const { 
    setShowSearch, 
    setSearch, 
    showSearch, 
    setCurrentMenu, 
    search
  } = useContext(MainContext);
  const [s, setS] = useState(search);
  const [focus, setFocus] = useState(false);
  const inputRef = useRef();
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setCurrentMenu("home");
      setShowSearch(true);
      setSearch(s);
    }
  };
  const sm = useMediaQuery(small);
  return (
    <div style={{
      display: "flex",
      gap: !sm ? "16px" : "",
      alignItems: "center"
    }}>
        {
          <ChevronLeft 
            className={`clear-search ${showSearch ? "clear-visible" : ""}`} 
            onClick={() => {
              setShowSearch(false);
              setS("");
              setSearch("");
              inputRef.current.blur();
            }} 
          />
        }
      <button className={`search-bar ${focus ? "focus" : "unfocus"}`} style={sm ? {
        paddingLeft: "8px",
        paddingRight: "8px"
      } : {}}>
        <input 
          placeholder="Search by titles"
          style={{ all: "unset", width: sm ? "80px" : "", fontSize: sm ? "10px" : "" }}
          value={s} 
          onKeyDown={onKeyDown}
          ref={inputRef}
          onChange={(e) => setS(e.target.value)}
          onFocus={() => {setFocus(true)}}
          onBlur={() => {setFocus(false)}}
        />
        <Search style={ sm ? {
          height: "20px",
          width: "20px"
        } : {}} />
      </button>
    </div>
  );
}