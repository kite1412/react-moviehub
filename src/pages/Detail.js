import { useLocation } from "react-router-dom";
import { movieVideos, originalImageUrl, tvVideos } from "../api/tmdbService";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { ReactComponent as Star } from "../assets/star.svg";
import { fixedRating, getYear } from "../utils/functions";
import IconButton from "../components/IconButton";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { OvalLoadingIndicator } from "../components/loadingIndicator";
import { resolveGenres } from "../utils/functions";

export default function Detail() {
  const location = useLocation();
  const [trailerId, setTrailerId] = useState("");
  const [showTrailerButton, setShowTrailerButton] = useState(0);
  const { media, isMovie } = location.state;
  const { 
    movieGenreList, 
    tvGenreList, 
    favoriteMovies, 
    favoriteTVs 
  } = useContext(MainContext);
  const genres = resolveGenres(media.genre_ids, isMovie ? movieGenreList : tvGenreList);
  const coverUrl = originalImageUrl(media.poster_path);
  const backdropUrl = originalImageUrl(media.backdrop_path || media.poster_path);
  const title = isMovie ? media.title : media.name;
  const releaseYear = isMovie ? media.release_date : media.first_air_date;
  const favorited = isMovie ? favoriteMovies.contains(media) : favoriteTVs.contains(media);
  
  useEffect(() => {
    const getTrailerLink = async () => {
      const id = await getVideos(media.id, isMovie);
      if (id) {
        setTrailerId(id);
        setShowTrailerButton(1);
      } else setShowTrailerButton(-1);
    };
    getTrailerLink();
  }, []);
  return (
    <div className="detail-page">
      <div style={{
        height: "70%",
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
          height: "80%",
          display: "flex",
          position: "absolute",
          left: 0,
          top: 0,
          gap: "30px",
          padding: "40px",
          paddingRight: "5vw"
        }}>
          <img 
            src={coverUrl} 
            alt="cover"
            style={{
              height: "100%",
              borderRadius: "15px",
            }} 
          />
          <div style={{ 
            display: "flex",
            flexDirection: "column",
            paddingTop: "16px",
            paddingBottom: "16px",
            justifyContent: "space-between" 
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ 
                fontSize: "40px", 
                fontWeight: "bold", 
                display: "flex", 
                alignItems: "center",
                gap: "8px"
              }}>
                {title} <span style={{ 
                  fontSize: "24px", 
                  color: "rgb(150, 150, 150)",
                  fontWeight: 500
                }}>
                  {`(${getYear(releaseYear)})`}
                </span>
              </div>
              <div style={{ color: "rgba(255, 255, 255, 0.7)" }}>{genres}</div>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <IconButton
                  icon={<Heart style={{
                    fill: `${ favorited ? "#6100C2" : "transparent"}`,
                    stroke: `${ favorited ? "#6100C2" : "" }`
                  }} />} 
                  onClick={() => {
                    isMovie ? favorited ? favoriteMovies.remove(media) : favoriteMovies.add(media)
                    : favorited ? favoriteTVs.remove(media) : favoriteTVs.add(media);
                  }}
                  style={{
                    backgroundColor: `${favorited ? "white" : ""}`
                  }} 
                />
                {
                  !showTrailerButton ? <div style={{
                      width: "120px",
                      display: "flex",
                      justifyContent: "center"
                    }}><OvalLoadingIndicator />
                  </div> : showTrailerButton === 1 ?
                  <IconButton icon={<Play />} desc="Watch Trailer" onClick={() => {
                    window.open(`https://www.youtube.com/watch?v=${trailerId}`, "_blank", "noopener,noreferrer");
                  }} /> : <></>
                }
              </div>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)"
            }}>
              {
                media.overview ? <div>
                  <div style={{ fontSize: "18px", fontWeight: 500, color: "white" }}>Overview</div>
                  <div style={{ fontSize: "14px", paddingTop: "4px" }}>
                    {media.overview}
                  </div>
                </div> : <></>
              }
              <div style={{ display: "flex", alignItems: "center" }}>
                <Star style={{ height: "40px", height: "40px", opacity: 0.9 }} />
                {fixedRating(media.vote_average)}
                <div style={{ fontSize: "18px", opacity: 0.6, marginLeft: "8px" }}>
                  {`(${media.vote_count} votes)`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function getVideos(id, isMovie) {
  const videos = isMovie ? await movieVideos(id) : await tvVideos(id);
  if (!videos) return "";
  let trailerId = "";
  if (videos.results) {
    videos.results.forEach(e => {
      if (e.type === "Trailer" && e.site === "YouTube") {
        trailerId = e.key;
        return;
      }
    });
  }
  return trailerId;
}