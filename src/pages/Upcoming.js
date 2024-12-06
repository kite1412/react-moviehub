import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { onTheAirTVs, originalImageUrl, tvGenres } from "../api/tmdbService";
import 'swiper/css/bundle';
import { upcomingMovies as getUpcomingMovies } from "../api/tmdbService";
import { Navigation } from "swiper/modules";
import { reformatDate, resolveGenres } from "../utils/functions";
import PageLoading from "../components/PageLoading";
import IconButton from "../components/IconButton";
import { ReactComponent as Bookmark } from "../assets/bookmark.svg";
import { toastError, toastSuccess } from "../utils/toast";
import { useMediaQuery } from "react-responsive";
import { large, medium, small } from "../utils/screen";
import { bottomNavBarHeight, navigationRailWidth } from "../utils/const";

export default function Upcoming() {
  const { 
    showMovie, 
    movieWatchlist, 
    tvWatchlist,
    movieGenreList,
    tvGenreList,
    setTVGenreList
  } = useContext(MainContext);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingTVs, setUpcomingTVs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const backgroundBlur = "3px";
  const m = useMediaQuery(medium);
  const s = useMediaQuery(small);
  const l = useMediaQuery(large);

  const genres = (index) => {
    return resolveGenres(
      (showMovie ? upcomingMovies : upcomingTVs)[index].genre_ids, 
      showMovie ? movieGenreList : tvGenreList
    );
  };
  
  const watchlisted = (index) => (showMovie ? movieWatchlist : tvWatchlist).contains(
    (showMovie ? upcomingMovies : upcomingTVs)[index]
  );
  
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getUpcomingMovies();
      if (!upcomingMovies.length) setUpcomingMovies(res.results);
    };
    const fetchTVs = async () => {
      const res = await onTheAirTVs();
      if (!upcomingTVs.length) setUpcomingTVs(res.results);
    };
    const fetchTVGenreList = async (callback) => {
      if (tvGenreList && !tvGenreList.length) {
        const res = await tvGenres();
        setTVGenreList(res.genres);
      }
      callback();
    };
    showMovie ? fetchMovies() : fetchTVGenreList(() => fetchTVs());
  }, [showMovie]);

  const overview = (e) => <div className="scrollbarc" style={{ 
    maxHeight: !s ? "20%" : "80%",
    overflowY: "auto",
    paddingRight: "8px",
    marginTop: "16px",
    color: "white",
    width: "100%",
    textAlign: "justify"
  }}>{e.overview}</div>;
  
  const bookmark = (e, i, withDesc = true, size = "") => <IconButton 
    icon={<Bookmark style={{
      fill: `${watchlisted(i) ? "#6100C2" : "transparent"}`,
      transition: "fill 0.2s ease",
      height: size ? size : "",
      width: size ? size : ""
    }} />} 
    desc={`${withDesc ? !watchlisted(i) ? "Add to watchlist" : "Remove from watchlist" : ""}`}
    style={{
      borderRadius: "16px",
      backgroundColor: `${watchlisted(i) ? "white" : ""}`,
      color: `${watchlisted(i) ? "#6100C2" : ""}`,
      height: size ? size : "",
      width: size ? size : ""
    }}
    onClick={() => {
      watchlisted(i) ? function() {
        (showMovie ? movieWatchlist : tvWatchlist).remove(e);
        toastError(`${showMovie ? e.title : e.name} removed from watchlist`);
      }()
      : function() {
        (showMovie ? movieWatchlist : tvWatchlist).add(e);
        toastSuccess(`${showMovie ? e.title : e.name} added to watchlist`);
      }()
    }}
  />;
  return (
    <div className="main-content" style={{ 
      padding: "0px",
      marginLeft: m ? navigationRailWidth : !s ? "18%" : "",
      position: "relative",
      alignItems: "start",
      overflow: "clip"
    }} >
      <h1 style={{
        position: "absolute",
        zIndex: 2,
        marginTop: "89px",
        marginLeft: "40px",
        color: "white",
        textShadow: "2px 2px 2px #6100C2"
      }}>
        {showMovie ? "Upcoming Movies" : "Airing TV Shows"}
      </h1>
      {
        (showMovie ? upcomingMovies.length : upcomingTVs) ? <Swiper 
          slidesPerView={1} 
          style={{
            height: "100%",
            width: "100%",
            "--swiper-navigation-size": "24px",
            "--swiper-navigation-color": "#6100C2",
            cursor: "grab",
            boxSizing: "border-box",
            paddingBottom: s ? bottomNavBarHeight : ""
          }}
          onSlideChange={s => {
            setCurrentIndex(s.activeIndex);
          }}
          modules={[Navigation]}
          navigation={true}
        >
          <Reset />
          {
            (showMovie ? upcomingMovies : upcomingTVs).map((e, i) => {
              return e.id !== 933260 ? <SwiperSlide style={{
                position: "relative", 
                height: "100%",
                width: "100%",
              }}>
                <div className="blurred" style={{
                  backgroundImage: `linear-gradient(120deg, white, black),
                    url(${originalImageUrl(e.backdrop_path)})`,
                  backgroundSize: "cover",
                  backgroundBlendMode: "multiply",
                  height: "100%",  
                  width: "100%",
                  position: "absolute",
                  filter: `blur(${backgroundBlur})`,
                  marginRight: `${backgroundBlur}`,
                  zIndex: -1,
                  backgroundPosition: "center"
                }} />
                <div style={{ 
                  display: "flex", 
                  height: "100%", 
                  width: "100%",
                  paddingTop: "164px",
                  paddingLeft: "40px",
                  boxSizing: "border-box",
                  gap: l ? "40px" : "16px"
                }}>
                  <div style={{ 
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: s ? "100%" : "",
                    position: "relative"
                  }}>
                    <img src={`${originalImageUrl(e.poster_path)}`} alt="cover" style={{
                      height: !l ? "50%" : "60%",
                      width: "auto",
                      borderRadius: "24px"
                    }} /> 
                    {
                      s ? <div style={{
                        position: "absolute",
                        right: -10,
                        color: "white"
                      }}>
                        {bookmark(e, i, false, "16px")}
                      </div> : <></>
                    }
                    {
                      s ? <div style={{ width: "180%", height: "50%" }}>
                        {overview(e)}
                      </div> : ""
                    }
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    paddingRight: "10%",
                    gap: "8px",
                    width: "100%"
                  }}>
                    <h1 style={{ fontSize: m ? "30px" : s ? "20px" : "" }}>{showMovie ? e.title : e.name}</h1>
                    {
                      genres(i) ? <div style={{ fontSize: !l ? "12px" : "" }}>{genres(i)}</div> : <></>
                    }
                    {
                      showMovie ? <div style={{ 
                        fontStyle: "italic", 
                        color: "#c68eff",
                        fontWeight: "bold",
                        fontSize: !l ? "12px" : "" 
                      }}>
                        Release Date: {`${reformatDate(e.release_date)}`}
                      </div> : <></>
                    }
                    {l || m ? overview(e) : <></>}
                    {
                      !s ? <div style={{ display: "flex", justifyContent: "end" }}>
                        {bookmark(e, i)}
                      </div> : <></>
                    }
                  </div>
                </div>
              </SwiperSlide> : <></>
            })
          }
        </Swiper> : <PageLoading />
      }
      {
        (showMovie ? upcomingMovies.length : upcomingTVs.length) ? <Indicator 
          list={showMovie ? upcomingMovies : upcomingTVs} 
          currentIndex={currentIndex}
        />
        : <></>
      }
    </div>
  );
}

function Reset() {
  const swiper = useSwiper();
  const { showMovie } = useContext(MainContext);
  useEffect(() => {
    swiper.slideTo(0);
  }, [showMovie]);
  return <></>;
}

function Indicator({ list, currentIndex }) {
  const [show, setShow] = useState(true);
  const selected = (index) => index === currentIndex;
  const refs = useRef([]);
  const s = useMediaQuery(small);
  const l = useMediaQuery(large);
  useEffect(() => {
    setShow(true);
    const t1 = setTimeout(() => {
      if (refs.current[currentIndex]) refs.current[currentIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });  
    }, 300);
    const t2 = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentIndex]);
  return (
    <div style={{
      width: "100%",
      height: "15%",
      position: "absolute",
      zIndex: 2,
      bottom: 0,
      transform: `translate(0, ${show ? !s ? "-16px" : "-94px" : "100%"})`,
      transition: "transform 0.5s ease",
      display: "flex",
      justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "white",
        height: "100%",
        width: l ? "50%" : "70%",
        opacity: 0.5,
        borderRadius: "20px",
        position: "absolute"
      }} />
      <div style={{
        display: "flex",
        gap: "6px",
        position: "absolute",
        paddingTop: "8px",
        paddingBottom: "8px",
        padding: "4px",
        boxSizing: "border-box",
        height: "100%",
        width: l ? "48%" : "68%",
        overflow: "hidden",
        borderRadius: "20px"
      }}>
        {
          list.filter(e => e.id !== 933260).map((e, i) => {
            return <img 
              src={`${originalImageUrl(e.poster_path)}`}
              alt="cover"
              style={{
                borderRadius: "12px",
                outline: `${selected(i) ? "2px solid white" : ""}`,
                opacity: `${selected(i) ? 1 : 0.7}`
              }}
              ref={e => refs.current[i] = e}
            /> 
          }) 
        }
      </div>
    </div>
  );
}