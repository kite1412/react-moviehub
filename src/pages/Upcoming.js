import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { onTheAirTVs, originalImageUrl } from "../api/tmdbService";
import 'swiper/css/bundle';
import { upcomingMovies as getUpcomingMovies } from "../api/tmdbService";
import { Navigation } from "swiper/modules";
import { reformatDate } from "../utils/functions";

export default function Upcoming() {
  const { showMovie } = useContext(MainContext);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [upcomingTVs, setUpcomingTVs] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getUpcomingMovies();
      if (!upcomingMovies.length) setUpcomingMovies(res.results);
    };
    const fetchTVs = async () => {
      const res = await onTheAirTVs();
      if (!upcomingTVs.length) setUpcomingTVs(res.results);
    };
    showMovie ? fetchMovies() : fetchTVs();
  }, [showMovie]);
  const backgroundBlur = "3px";
  return (
    <div className="main-content" style={{ 
      padding: "0px",
      marginLeft: "18%",
      position: "relative",
      alignItems: "start"
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
        <Swiper 
          slidesPerView={1} 
          style={{
            height: "100%",
            width: "100%",
            "--swiper-navigation-size": "24px",
            "--swiper-navigation-color": "#6100C2",
            cursor: "grab"
          }}
          onSlideChange={s => {
            
          }}
          modules={[Navigation]}
          navigation={true}
        >
          <Reset />
          {
            (showMovie ? upcomingMovies : upcomingTVs).map(e => {
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
                  boxSizing: "border-box",
                  marginLeft: `${backgroundBlur}`,
                  zIndex: -1
                }} />
                <div style={{ 
                  display: "flex", 
                  height: "100%", 
                  width: "100%", 
                  paddingTop: "164px",
                  paddingLeft: "40px",
                  boxSizing: "border-box",
                  gap: "40px"
                }}>
                  <img src={`${originalImageUrl(e.poster_path)}`} alt="cover" style={{
                    height: "60%",
                    width: "auto",
                    borderRadius: "24px"
                  }} />
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "white",
                    paddingRight: "10%",
                    textAlign: "justify",
                    gap: "16px"
                  }}>
                    <h1>{showMovie ? e.title : e.name}</h1>
                    {
                      showMovie ? <div style={{ 
                        fontStyle: "italic", 
                        color: "rgb(180, 180, 180)",
                        fontWeight: 500 
                      }}>
                        Release Date: {`${reformatDate(e.release_date)}`}
                      </div> : <></>
                    }
                    <div className="scrollbarc" style={{ 
                      maxHeight: "20%",
                      overflowY: "auto",
                      paddingRight: "8px"
                    }}>{e.overview}</div>
                    
                  </div>
                </div>
              </SwiperSlide> : <></>
            })
          }
        </Swiper>
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