import { useContext, useEffect } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { MainContext } from "../contexts/MainContext";
import { originalImageUrl, trendingMovies as trendingM, trendingTVs as trendingT } from "../api/tmdbService"; 
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css/bundle';
import { Navigation, Pagination } from "swiper/modules";
import IconButton from "./IconButton";
import { Button } from "./Button";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { getYear, resolveGenres } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { detailPath } from "../utils/paths";

export default function TrendingHeader() {
  const navigate = useNavigate();
  const {
    trendingMovies,
    setTrendingMovies,
    trendingTVs,
    setTrendingTVs
  } = useContext(HomeContext);
  const  { 
    showMovie, 
    movieGenreList, 
    tvGenreList, 
    showSearch
  } = useContext(MainContext);
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
    !showSearch ? showMovie ? trendingMovies.length ? <>
      <h1 style={{
        position: "absolute",
        zIndex: 2,
        color: "white",
        marginLeft: "16px",
        textShadow: "2px 2px 2px #6100C2",
        marginLeft: "48px"
      }}>Trending Now</h1>
      <Swiper
        className="trending-header"
        modules={[Navigation, Pagination]}
        grabCursor={true}
        pagination={true}
        navigation={true}
        slidesPerView={1}
        style={{
          "--swiper-navigation-size": "24px",
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
            }} onClick={() => {
              navigate(detailPath(e.id), { state: { media: e, isMovie: showMovie } })
            }}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                height: "95%",
                marginLeft: "48px",
                gap: "8px"
              }}>
                <span style={{ fontSize: "32px", fontWeight: 500 }}>{showMovie ? e.title : e.name}</span>
                <span style={{ color: "lightgray" }}>
                  {getYear(showMovie ? e.release_date : e.first_air_date)}
                  {e.genre_ids.length ? ` | ${resolveGenres(e.genre_ids, showMovie ? movieGenreList : tvGenreList)}` : ""}
                </span>
                <div style={{ marginTop: "30px", display: "flex", gap: "16px" }}>
                  <Button action={"Detail"} style={{
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    fontSize: "16px"
                  }} />
                  <IconButton icon={<Heart />} style={{ 
                    borderRadius: "14px", 
                    backgroundColor: "white", 
                    color: "#6100C2"
                  }} />
                </div>
              </div>
            </SwiperSlide>
          })
        }
      </Swiper>
    </> : <></> : <></> : <></>
  );
}