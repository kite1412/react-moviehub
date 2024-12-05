import { useContext, useEffect } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { MainContext } from "../contexts/MainContext";
import { originalImageUrl, trendingMovies as trendingM, trendingTVs as trendingT } from "../api/tmdbService"; 
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import 'swiper/css/bundle';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import IconButton from "./IconButton";
import { Button } from "./Button";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { getYear, resolveGenres } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { detailPath } from "../utils/paths";
import { ReactComponent as Trending } from "../assets/trending-up.svg";
import { toastError, toastSuccess } from "../utils/toast";
import { useMediaQuery } from "react-responsive";
import { medium, small } from "../utils/screen";

export default function TrendingHeader() {
  const {
    trendingMovies,
    setTrendingMovies,
    trendingTVs,
    setTrendingTVs,
    currentSlide,
    setCurrentSlide
  } = useContext(HomeContext);
  const { 
    showMovie, 
    movieGenreList, 
    tvGenreList, 
    showSearch
  } = useContext(MainContext);
  const s = useMediaQuery(small);
  const m = useMediaQuery(medium);
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
  const slideStyle = (e) => {
    return {
      color: "white",
      position: "relative",
      backgroundImage: `linear-gradient(120deg, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.7) 80%), 
        url(${originalImageUrl(e.backdrop_path)})`,
      height: "100%",
      width: "100%",
      backgroundSize: "cover",
      backgroundBlendMode: "multiply",
      backgroundPosition: s ? "center" : "",
      boxSizing: "border-box",
      paddingBottom: s || m ? "12px" : ""
    };
  };
  return (
    !showSearch ? <div style={{ position: "relative" }}>
      <div style={{
        position: "absolute",
        zIndex: 2,
        color: "white",
        textShadow: "2px 2px 2px #6100C2",
        marginLeft: "48px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <h1>
          Trending Now
        </h1>
        <Trending style={{
          strokeWidth: "3px",
          height: "32px",
          width: "auto",
          filter: "drop-shadow(2px 2px 0px #6100C2)"
        }} />
      </div>
      <Swiper
        className="trending-header"
        modules={[Navigation, Pagination, Autoplay]}
        grabCursor={true}
        pagination={true}
        navigation={true}
        slidesPerView={1}
        style={{
          "--swiper-navigation-size": "24px",
          "--swiper-navigation-color": "#6100C2",
          backgroundColor: "rgb(35, 35, 35)",
          width: "100%"
        }}
        onSlideChange={(s) => {
          setCurrentSlide(s.activeIndex);
        }}
        initialSlide={currentSlide}
        autoplay={{
          delay: currentSlide === 0 ? 5000 : 3000,
        }}
      >
        <Reset />
        {
          showMovie ? trendingMovies.length ? trendingMovies.map(e => {
            return <SwiperSlide style={slideStyle(e)}>
              <Content s={s} m={m} e={e} genreList={movieGenreList} showMovie={showMovie} />
            </SwiperSlide>
          })
          : <></> : trendingTVs.length ? trendingTVs.map(e => {
            return <SwiperSlide style={slideStyle(e)}>
              <Content s={s} m={m} e={e} genreList={tvGenreList} showMovie={showMovie} />
            </SwiperSlide>
          }) : <></>
        }
      </Swiper>
    </div> : <></>
  );
}

function Content({ e, genreList, showMovie, s, m }) {
  const navigate = useNavigate();
  const { favoriteMovies, favoriteTVs } = useContext(MainContext);
  const favorited = showMovie ? favoriteMovies.contains(e) : favoriteTVs.contains(e);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "end",
      height: "95%",
      marginLeft: "48px",
      gap: "8px"
    }}>
      <span style={{ fontSize: !s && !m ? "32px" : "24px", fontWeight: 500 }}>{showMovie ? e.title : e.name}</span>
      <span style={{ color: "lightgray", fontSize: s || m ? "12px" : "" }}>
        {getYear(showMovie ? e.release_date : e.first_air_date)}
        {e.genre_ids.length ? ` | ${resolveGenres(e.genre_ids, genreList)}` : ""}
      </span>
      <div style={{ marginTop: "30px", display: "flex", gap: "16px" }}>
        <Button action={"Detail"} style={{
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "16px",
          paddingBottom: "16px",
          fontSize: "16px"
        }} onClick={() => {
          navigate(detailPath(e.id), { state: { media: e, isMovie: showMovie } });
        }} />
        <IconButton 
          icon={<Heart style={{
            fill: `${ favorited ? "#6100C2" : "transparent"}`,
            transition: "fill 0.3s ease"
          }} />} 
          style={{ 
            borderRadius: "14px", 
            backgroundColor: "white", 
            color: "#6100C2"
          }}
          onClick={() => {
            showMovie ? favorited ? favoriteMovies.remove(e) : favoriteMovies.add(e)
            : favorited ? favoriteTVs.remove(e) : favoriteTVs.add(e);
            favorited ? toastError(`${showMovie ? e.title : e.name} removed from favorites`) : 
              toastSuccess(`${showMovie ? e.title : e.name} added to favorites`)
          }} 
        />
      </div>
    </div>
  );
}

function Reset() {
  const { showMovie } = useContext(MainContext);
  const swiper = useSwiper();
  useEffect(() => {
    swiper.slideTo(0);
  }, [showMovie]);
  return <></>;
}