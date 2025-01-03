import { useLocation } from "react-router-dom";
import { movieDetails, originalImageUrl, tvDetails, languages as getLanguages } from "../api/tmdbService";
import { useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { ReactComponent as Star } from "../assets/star.svg";
import { fixedRating, getYear } from "../utils/functions";
import IconButton from "../components/IconButton";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Bookmark } from "../assets/bookmark.svg";
import { OvalLoadingIndicator } from "../components/loadingIndicator";
import { resolveGenres } from "../utils/functions";
import CastCards from "../components/CastCards";
import Reviews from "../components/Reviews";
import MovieCards from "../components/MovieCards";
import TVCards from "../components/TVCards";
import { Toast, toastError, toastSuccess } from "../utils/toast";
import { useMediaQuery } from "react-responsive";
import { large, small } from "../utils/screen";

export default function Detail() {
  const location = useLocation();
  const ref = useRef();
  const [trailerId, setTrailerId] = useState("");
  const [showTrailerButton, setShowTrailerButton] = useState(0);
  const { media, isMovie } = location.state;
  const { 
    movieGenreList, 
    tvGenreList, 
    favoriteMovies, 
    favoriteTVs,
    languages,
    setLanguages,
    movieWatchlist,
    tvWatchlist,
    myReviews
  } = useContext(MainContext);
  const [currentMedia, setCurrentMedia] = useState(media);
  const [language, setLanguage] = useState("");
  const genres = media.genre_ids ? resolveGenres(media.genre_ids, isMovie ? movieGenreList : tvGenreList)
    : "";
  const coverUrl = originalImageUrl(media.poster_path);
  const backdropUrl = originalImageUrl(media.backdrop_path || media.poster_path);
  const title = isMovie ? media.title : media.name;
  const releaseYear = isMovie ? media.release_date ? media.release_date : "-" 
    : media.first_air_date ? media.first_air_date : "-";
  const favorited = isMovie ? favoriteMovies.contains(media) : favoriteTVs.contains(media);
  const watchlisted = isMovie ? movieWatchlist.contains(currentMedia) : tvWatchlist.contains(currentMedia);
  const l = useMediaQuery(large);
  const s = useMediaQuery(small);
  const iconButtonSize = `${s ? "30px" : ""}`;
  
  const score = () => <div style={{ 
    display: "flex", 
    alignItems: "center",
    fontSize: s ? "18px" : "24px",
    gap: s ? "4px" : "8px" 
  }}>
    <Star style={{ height: !s ? "40px" : "24px", width: !s ? "40px" : "24px", opacity: 0.9 }} />
    {currentMedia.vote_average ? fixedRating(currentMedia.vote_average) : "NR"}
    <div style={{ fontSize: !s ? "18px" : "12px", opacity: 0.6 }}>
      {`(${currentMedia.vote_count} votes)`}
    </div>
  </div>;
  
  const overview = () => <div>
    <div style={{ 
      fontSize: l ? "18px" : "24px", 
      fontWeight: 500, 
      color: "white",
      textShadow: !l ? "2px 2px 1px #6100C2" : "" 
    }}>
      Overview
    </div>
    <div style={{ fontSize: "14px", paddingTop: "4px" }}>
      {currentMedia.overview}
    </div>
  </div>;

  const actions = () => <div style={{ 
    display: "flex", 
    gap: !s ? "16px" : "8px", 
    alignItems: "center",
    flexWrap: "wrap" 
  }}>
    <IconButton
      icon={<Heart style={{
        fill: `${ favorited ? "#6100C2" : "transparent"}`,
        stroke: `${ favorited ? "#6100C2" : "" }`,
        transition: "fill 0.3s ease"
      }} />} 
      onClick={() => {
        isMovie ? favorited ? favoriteMovies.remove(media) : favoriteMovies.add(media)
        : favorited ? favoriteTVs.remove(media) : favoriteTVs.add(media);
        favorited ? toastError(`${isMovie ? media.title : media.name} removed from favorites`) : 
          toastSuccess(`${isMovie ? media.title : media.name} added to favorites`);
      }}
      style={{
        backgroundColor: `${favorited ? "white" : ""}`,
        height: iconButtonSize,
        width: iconButtonSize,
        minWidth: iconButtonSize
      }} 
    />
    <IconButton
      icon={<Bookmark style={{
        fill: watchlisted ? "#6100C2" : "transparent",
        color: watchlisted ? "#6100C2" : "",
        transition: "fill 0.3s ease"
      }} />}
      onClick={() => {
        isMovie ? watchlisted ? movieWatchlist.remove(media) : movieWatchlist.add(media)
        : watchlisted ? tvWatchlist.remove(media) : tvWatchlist.add(media);
        watchlisted ? toastError(`${isMovie ? media.title : media.name} removed from watchlist`) : 
          toastSuccess(`${isMovie ? media.title : media.name} added to watchlist`)
      }} 
      style={{
        backgroundColor: `${watchlisted ? "white" : ""}`,
        height: iconButtonSize,
        width: iconButtonSize,
        minWidth: iconButtonSize
      }}
    />
    {
      !showTrailerButton ? <div style={{
          width: !s ? "120px" : iconButtonSize,
          display: "flex",
          justifyContent: "center"
        }}><OvalLoadingIndicator />
      </div> : showTrailerButton === 1 ?
      <IconButton 
        icon={<Play />} 
        desc={!s ? "Watch Trailer" : ""} 
        onClick={() => {
          window.open(`https://www.youtube.com/watch?v=${trailerId}`, "_blank", "noopener,noreferrer");
        }}
        style={{
          height: iconButtonSize,
          width: iconButtonSize,
          minWidth: iconButtonSize
        }} 
      /> : <></>
    }
  </div>

  const details = () => <div style={{
    display: l ? "flex" : "grid",
    flexDirection: "column",
    gap: "32px",
    height: "100%",
    gridTemplateColumns: !l ? "repeat(2, 1fr)" : ""
  }}>
    {
      currentMedia.status ? <div>
        <div style={{ fontWeight: "bold" }}>Status</div>
        <div>{currentMedia.status}</div>
      </div> : <></>
    }
    {
      language ? <div>
        <div style={{ fontWeight: "bold" }}>Original Language</div>
        <div>{language}</div>
      </div> : <></>
    }
    {
      !isMovie ? currentMedia.networks && currentMedia.networks.length ? <div>
        <div style={{ fontWeight: "bold" }}>Available On</div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2px"
        }}>
          {
            currentMedia.networks.map(e => {
              return <>
                <img src={originalImageUrl(e.logo_path)} alt="logo" style={{
                  height: "24px",
                  width: "auto",
                  backgroundColor: "white",
                  padding: "2px"
                }} />
              </>
            })
          }
        </div>
      </div> : <></> : <></>
    }
    {
      isMovie ? <div>
        <div style={{ fontWeight: "bold" }}>Budget</div>
        <div>{toDollar(currentMedia.budget)}</div>
      </div> : <></>
    }
    {
      isMovie ? <div>
        <div style={{ fontWeight: "bold" }}>Revenue</div>
        <div>{toDollar(currentMedia.revenue)}</div>
      </div> : <></>
    }
    {
      isMovie ? currentMedia.runtime ? <div>
        <div style={{ fontWeight: "bold" }}>Duration</div>
        <div>{resolveRuntime(currentMedia.runtime)}</div>
      </div> : <></> : <></>
    }
    {
      currentMedia.keywords && 
        (isMovie ? currentMedia.keywords.keywords.length : currentMedia.keywords.results.length) ? <div>
          <div style={{ fontWeight: "bold", paddingBottom: "4px" }}>Keywords</div>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px"
          }}>
            {
              (isMovie ? currentMedia.keywords.keywords : currentMedia.keywords.results).map(e => {
                return <div style={{
                  border: "2px solid #6100C2",
                  borderRadius: "8px",
                  padding: "6px",
                  fontSize: "14px"
                }}>
                  {e.name}
                </div>
              })
            }
          </div>
        </div> : <></>
    }
  </div>

  useEffect(() => {
    setCurrentMedia(media);
    const getDetails = async () => {
      const res = isMovie ? await movieDetails(media.id) : await tvDetails(media.id);
      const setOLanguage = async () => {
        const res = await resolveLanguage(
          media.original_language, 
          languages,
          setLanguages
        );
        setLanguage(res);
      };
      if (res) {
        setCurrentMedia(res);
        setOLanguage();
        if (res.videos.results) {
          const id = resolveVideo(res.videos.results);
          setTrailerId(id);
          setShowTrailerButton(id ? 1 : -1);
        } else setShowTrailerButton(-1);
      } else setShowTrailerButton(-1);
      const m = myReviews.list.filter(e => e.media.id === media.id && e.isMovie === isMovie).reverse();
      if (m.length) setCurrentMedia({ 
        ...(res || currentMedia), reviews: { 
          ...(res.reviews || currentMedia.reviews || {}), results: 
            [...m, ...(res || currentMedia || { reviews: { results: [] } }).reviews.results]  
        } 
      });
    };
    getDetails();
    ref.current.scrollTo(0, 0);
  }, [media]);
  return (
    <div className="detail-page" ref={ref}>
      <div style={{
        height: l ? "70%" : "50%",
        width: "100%",
        position: "relative"
      }}>
        <div style={{
          backgroundImage: `url(${backdropUrl}), linear-gradient(135deg, white, rgba(0, 0, 0, 0.7))`,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundSize: "cover",
          filter: "blur(3px)",
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }} />
        <div style={{
          height: "90%",
          width: "100%",
          display: "flex",
          left: 0,
          top: 0,
          gap: l ? "30px" : s ? "16px" : "24px",
          position: "absolute",
          padding: l ? "40px" : "20px",
          boxSizing: "border-box"
        }}>
          <img 
            src={coverUrl} 
            alt="cover"
            style={{
              height: !s ? "100%" : "80%",
              borderRadius: "15px",
            }} 
          />
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            paddingTop: "16px",
            paddingBottom: "16px",
            justifyContent: "space-between",
            boxSizing: "border-box",
            gap: "16px"
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "16px" 
            }}>
              <div style={{ 
                fontSize: l ? "40px" : s ? "24px" : "30px", 
                fontWeight: "bold", 
                display: "flex", 
                alignItems: "center",
                gap: "8px",
                flexWrap: "wrap"
              }}>
                {title} <span style={{ 
                  fontSize: l ? "24px" : s ? "12px" : "16px", 
                  color: "rgb(150, 150, 150)",
                  fontWeight: 500
                }}>
                  {`(${getYear(releaseYear)})`}
                </span>
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>{genres}</div>
              {actions()}
              { !l ? score() : <></> }
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)"
            }}>
              { currentMedia.overview && l ? overview() : <></> }
              { l ? score() : <></> }
            </div>
          </div>
        </div>
      </div>
      <div style={{
        paddingLeft: l ? "64px" : "16px",
        paddingTop: "24px",
        paddingBottom: "32px",
        paddingRight: l ? "64px" : "16px",
        gap: "40px",
        display: "flex",
        flexDirection: "column"
      }}>
        { currentMedia.overview && !l ? overview() : <></> }
        { !l ? details() : <></> }
        <div style={{
          display: "flex"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            width: l ? "74vw" : "100%",
            gap: "40px",
            boxSizing: "border-box",
            paddingBottom: "64px",
          }}>
            {
              currentMedia.credits ? currentMedia.credits.cast.length ? <div>
                <h1 style={{
                  textShadow: "3px 3px 0px #6100C2"
                }}>Actors</h1>
                <CastCards cast={resolveActors(currentMedia.credits.cast)} />
              </div> : <></> : <></>
            }
            {
              currentMedia.recommendations && currentMedia.recommendations.results.length ? <div style={{
                backgroundImage: "linear-gradient(120deg, rgba(30, 30, 30, 0.5), rgba(0, 0, 0, 0.4))",
                borderRadius: "10px",
                padding: "24px",
                boxSizing: "border-box"
              }}>
                <div style={{
                  textShadow: "2px 2px 0px #6100C2",
                  fontSize: "24px",
                  fontWeight: "bold"
                }}>Recommendations</div>
                {
                  isMovie ? <MovieCards movies={currentMedia.recommendations.results} genres={movieGenreList} /> :
                  <TVCards tvs={currentMedia.recommendations.results} genres={tvGenreList} />
                }
              </div> : <></>
            }
            <Reviews media={currentMedia} isMovie={isMovie} />
          </div>
          {
            l ? <div style={{
              right: 0,
              top: 0,
              height: "100%",
              width: "25vw",
              paddingTop: "24px",
              paddingLeft: "16px",
              boxSizing: "border-box"
            }}>
              {details()}
            </div> : <></>
          }
        </div>
      </div>
      <Toast />
    </div>
  );
}

function resolveVideo(videos) {
  let trailerId = "";
  if (videos) {
    videos.forEach(e => {
      if (e.type === "Trailer" && e.site === "YouTube") {
        trailerId = e.key;
        return;
      }
    });
  }
  return trailerId;
}

function resolveActors(cast) {
  if (!cast && !cast.length) return [];
  return cast.filter(e => e.known_for_department === "Acting");
}

async function resolveLanguage(original, languages, onFetch = () => {}) {
  let ls = languages;
  if (!ls.length) {
    const res = await getLanguages();
    if (res.length) {
      ls = res;
      onFetch(res);
    }
  }
  for (let i = 0; i < ls.length; i++) if (ls[i].iso_639_1 === original) 
    return ls[i].english_name;
  return "";
}

const toDollar = (value) => value ? new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
}).format(value) : "-";

const resolveRuntime = runtime => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours} ${hours > 1 ? "hours" : "hour"} ${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
}