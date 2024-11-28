import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { onTheAirTVs, originalImageUrl } from "../api/tmdbService";
import 'swiper/css/bundle';
import { upcomingMovies as getUpcomingMovies } from "../api/tmdbService";

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
  const backgroundBlur = "2px";
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
            width: "100%"
          }}
        >
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
                  marginLeft: `${backgroundBlur}`
                }} />
                
              </SwiperSlide> : <></>
            })
          }
        </Swiper>
      }
    </div>
  );
}