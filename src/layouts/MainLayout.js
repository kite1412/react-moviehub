import TitleLogo from "../components/TitleLogo";
import { ReactComponent as Film } from "../assets/film.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Calendar } from "../assets/calendar.svg";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../contexts/AuthContext";
import { Toast } from "../utils/toast";

export default function MainLayout({ children }) {
  const { 
    currentMenu,
    setCurrentMenu, 
    setShowMovie,
    selectedType,
    setSelectedType
  } = useContext(MainContext);
  const { currentUser } = useContext(AuthContext);
  const menuItemStyle = (menu) => {
    return {
      all: "unset",
      color: "white",
      cursor: "pointer",
      display: "flex",
      gap: "16px",
      opacity: currentMenu == menu ? 1 : 0.7
    };
  };
  return (
    <div className="main-layout">
      <div id="navbar">
        <div style={{
          width: "100%",
          paddingTop: "22px",
          paddingLeft: "32px"
        }}><TitleLogo /></div>
        <div id="menu">
          <button style={menuItemStyle("home")} onClick={function() {
            setCurrentMenu("home")
          }}>
            <Film />
            Home
          </button>
          <button style={menuItemStyle("favorites")} onClick={function() {
            setCurrentMenu("favorites")
          }}>
            <Heart />
            Favorites
          </button>
          <button style={menuItemStyle("comingsoon")} onClick={function() {
            setCurrentMenu("comingsoon")
          }}>
            <Calendar />
            Coming Soon
          </button>
        </div>
      </div>
      <div id="header">
        <div style={{
          display: "flex",
          gap: "32px",
          alignItems: "center"
        }}>
          <button 
            className={`media-type ${selectedType == "movie" ? "type-selected" : "type-unselected"}`}
            onClick={() => {
              setSelectedType("movie") 
              setShowMovie(true);
            }}
          >
            Movies
          </button>
          <button 
            className={`media-type ${selectedType == "tv" ? "type-selected" : "type-unselected"}`}
            onClick={() => {
              setSelectedType("tv")
              setShowMovie(false);
             }}
          >
            TV Shows
          </button>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "24px"
        }}>
          <SearchBar />
          <Profile style={{
            height: "45px",
            width: "45px"
          }} />
          {currentUser}
        </div>
      </div>
      <div id="main-content">
        {children}
        <Toast />
      </div>
    </div>
  );
}