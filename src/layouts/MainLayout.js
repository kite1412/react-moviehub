import TitleLogo from "../components/TitleLogo";
import { ReactComponent as Film } from "../assets/film.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Calendar } from "../assets/calendar.svg";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";
import { ReactComponent as Exit } from "../assets/exit.svg";
import { ReactComponent as Bookmark } from "../assets/bookmark.svg";
import { ReactComponent as Chevron } from "../assets/chevron-left.svg";
import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../contexts/AuthContext";
import { Toast } from "../utils/toast";
import { medium, small } from "../utils/screen";
import { useMediaQuery } from "react-responsive";
import { bottomNavBarHeight, navigationRailWidth } from "../utils/const";
import { ReactComponent as Write } from "../assets/write.svg";
import IconButton from "../components/IconButton";

export default function MainLayout({ 
  children, 
  logout, 
  applyMargin = true, 
  translucentHeader = false,
  applyHeaderMargin = false
}) {
  const { 
    currentMenu,
    setCurrentMenu, 
    setShowMovie,
    selectedType,
    setSelectedType
  } = useContext(MainContext);
  const s = useMediaQuery(small);
  const m = useMediaQuery(medium);
  const { currentUser } = useContext(AuthContext);
  const [logoutWarning, setLogoutWarning] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [expandMenu, setExpandMenu] = useState(false);
  const dismissLogout = (loggedOut = false) => {
    setAnimateOut(true);
    setTimeout(() => {
      setLogoutWarning(false);
      setAnimateOut(false);
      if (loggedOut) {
        setCurrentMenu("home");
        logout();
      }
    }, 300);
  };
  const menuItemStyle = (menu) => {
    return {
      all: "unset",
      color: "white",
      cursor: "pointer",
      display: "flex",
      gap: "16px",
      opacity: currentMenu == menu ? 1 : 0.4,
      transition: "opacity 0.4s linear"
    };
  };
  const menus = (showLabel) => [
    <button style={menuItemStyle("home")} onClick={function() {
      setCurrentMenu("home");
    }}>
      <Film />
      { showLabel ? "Home" : "" }
    </button>,
    <button style={menuItemStyle("favorites")} onClick={function() {
      setCurrentMenu("favorites");
    }}>
      <Heart />
      { showLabel ? "Favorites" : "" }
    </button>,
    <button style={menuItemStyle("upcoming")} onClick={function() {
      setCurrentMenu("upcoming");
    }}>
      <Calendar />
      { showLabel ? "Upcoming" : "" }
    </button>,
    <button style={menuItemStyle("watchlist")} onClick={function() {
      setCurrentMenu("watchlist");
    }}>
      <Bookmark />
      { showLabel ? "Watchlist" : "" }
    </button>,
    <button style={menuItemStyle("myreviews")} onClick={function() {
      setCurrentMenu("myreviews");
    }}>
      <Write style={{  }} />
      { showLabel ? "My Reviews" : "" }
    </button>,
    <div style={{ marginTop: showLabel ? "32px" : "" }}>
      <button style={{
        all: "unset",
        color: "#DC143C",
        cursor: "pointer",
        display: "flex",
        gap: "16px"
      }} onClick={function() {
        setLogoutWarning(true);
      }}>
        <Exit style={{ height: "28px", width: "28px" }} />
        { showLabel ? "Logout" : ""}
      </button>
    </div>
  ];
  return (
    <div className="main-layout" style={{
      overflow: logoutWarning ? "hidden" : ""
    }}>
      {
        !s ? <div id="navbar" style={{
          marginTop: !applyHeaderMargin && m ? "65px" : "",
          transition: "margin-top 0.2s ease"
        }}>
          {
            !m ? <div style={{
              width: "100%",
              paddingTop: "22px",
              paddingLeft: "10%"
            }}><TitleLogo /></div> : <></>
          }
          <div id="menu" style={{ paddingLeft: "10%" }}>
            { menus(!m) }
          </div>
        </div> : <></>
      }
      <div id="header" style={{
        backgroundImage: translucentHeader ? "none" : "",
        marginLeft: applyHeaderMargin ? navigationRailWidth : "",
        zIndex: Number.MAX_SAFE_INTEGER + 1
      }}>
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
            { !s ? "TV Shows" : "TVs" }
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
          {!s ? currentUser : ""}
        </div>
      </div>
      {
        s ? <div style={{
          position: "fixed",
          bottom: 0,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: bottomNavBarHeight,
          boxSizing: "border-box",
          backgroundColor: "rgb(96, 48, 143)",
          padding: "16px",
          zIndex: Number.MAX_SAFE_INTEGER + 1
        }}>
          { menus(false).slice(0, 4) }
          <div style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: "center"
          }}>
            <div style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              bottom: "100%",
              gap: "8px",
              marginBottom: expandMenu ? "24px" : "-32px",
              opacity: expandMenu ? 1 : 0,
              transition: "opacity 0.2s linear, margin-bottom 0.2s ease-out",
            }}>
              { expandMenu ? menus(false).slice(4, 6).map((e, i) => <IconButton 
                icon={e}
                style={{
                  boxShadow: "-2px 2px 10px black",
                  backgroundColor: i === 0 ? "#6100C2" : "",
                  display: "flex"
                }}
                onClick={() => i === 0 ? setCurrentMenu("myreviews") : setLogoutWarning(true)}
              />) : <></> }
            </div>
            <button 
              style={{ 
                ...menuItemStyle("-"), 
                opacity: 1,
                transform: expandMenu ? "rotate(90deg)" : "",
                transition: "transform 0.2s ease-out"
              }}
              onClick={() => setExpandMenu(!expandMenu)}
            >
              <Chevron  />
            </button>
          </div>
        </div> : <></>
      }
      <div id="main-content" style={{
        paddingLeft: applyMargin ? !s ? !m ? "18%" : navigationRailWidth : "" : "",
        paddingTop: applyMargin ? "65px" : "",
        boxSizing: "border-box"
      }}>
        {children}
      </div>
      <Toast />
      <div style={{
        position: "absolute",
        opacity: logoutWarning && !animateOut ? 1 : 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: "opacity 0.3s ease-in-out",
        zIndex: logoutWarning ? Number.MAX_SAFE_INTEGER : -2,
        backdropFilter: "blur(10px)",
        overflow: "hidden"
      }}>
        <div style={{
          backgroundColor: "rgb(40, 40, 40)",
          borderRadius: "16px",
          padding: "16px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <h4>Are you sure you want to log out?</h4>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-around",
            paddingBottom: "8px" 
          }}>
            <span style={{ cursor: "pointer" }} onClick={() => {
              dismissLogout();
            }}>Cancel</span>
            <span style={{ color: "red", cursor: "pointer" }} onClick={() => {
              dismissLogout(true);
            }}>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
}