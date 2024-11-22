import { useContext, useEffect } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { MainContext } from "../contexts/MainContext";
import { originalImageUrl, trendingMovies as trendingM, trendingTVs as trendingT } from "../api/tmdbService"; 
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import { Navigation, Pagination } from "swiper/modules";

export default function TrendingHeader() {
  const {
    trendingMovies,
    setTrendingMovies,
    trendingTVs,
    setTrendingTVs
  } = useContext(HomeContext);
  const  { showMovie } = useContext(MainContext);
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      if (!trendingMovies.length) {
        const res = await trendingM();
        setTrendingMovies(res.results);
      } 
    };
    const fetchTrendingTVs = async () => {
      if (!trendingTVs.length) {
        const res = await trendingT();
        setTrendingTVs(res.results);
      }
    };
    fetchTrendingMovies();
    fetchTrendingTVs();
  }, [showMovie]);
  return (
    showMovie ? trendingMovies.length ? <Swiper
      className="trending-header"
      modules={[Navigation, Pagination]}
      grabCursor={true}
      pagination={true}
      navigation={true}
      slidesPerView={1}
      style={{
        "--swiper-navigation-size": "40px",
        "--swiper-navigation-color": "#6100C2"
      }}
    >
      {
        trendingMovies.map(e => {
          return <SwiperSlide style={{
            color: "white",
            position: "relative",
            backgroundImage: `linear-gradient(120deg, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 80%), 
              url(${originalImageUrl(e.backdrop_path)})`,
            height: "100%",
            width: "100%",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply"
          }}>
            {showMovie ? e.title : e.name}
          </SwiperSlide>
        })
      }
    </Swiper> : <></> : <></>
  );
}