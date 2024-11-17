import TitleLogo from "../components/TitleLogo";
import { ReactComponent as Film } from "../assets/film.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as TrendingUp } from "../assets/trending-up.svg";
import { ReactComponent as Calendar } from "../assets/calendar.svg";
import profPic from "../assets/profPic.png";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../contexts/AuthContext";

export default function MainLayout({ children }) {
  const { currentMenu, setCurrentMenu } = useContext(MainContext);
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
          <button style={menuItemStyle("favourites")} onClick={function() {
            setCurrentMenu("favourites")
          }}>
            <Heart />
            Favourites
          </button>
          <button style={menuItemStyle("trending")} onClick={function() {
            setCurrentMenu("trending");
          }}>
            <TrendingUp />
            Trending
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
          <span>Movies</span>
          <span>TVs</span>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "24px"
        }}>
          <SearchBar />
          <img src={profPic} alt="profile picture" />
          {currentUser}
        </div>
      </div>
      <div id="main-content">
        {children}
      </div>
    </div>
  );
}