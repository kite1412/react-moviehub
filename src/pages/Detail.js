import { useLocation } from "react-router-dom";
import { originalImageUrl } from "../api/tmdbService";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { ReactComponent as Star } from "../assets/star.svg";
import { fixedRating, getYear } from "../utils/functions";
import IconButton from "../components/IconButton";
import { ReactComponent as Heart } from "../assets/heart.svg";
import { ReactComponent as Play } from "../assets/play.svg";

export default function Detail() {
  const location = useLocation();
  const { media, isMovie } = location.state;
  const { movieGenreList, tvGenreList } = useContext(MainContext);
  const genres = resolveGenres(media.genre_ids, isMovie ? movieGenreList : tvGenreList);
  const coverUrl = originalImageUrl(media.poster_path);
  const backdropUrl = originalImageUrl(media.backdrop_path || media.poster_path);
  const title = isMovie ? media.title : media.name;
  const releaseYear = isMovie ? media.release_date : media.first_release_date;
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
              <div style={{ display: "flex", gap: "16px" }}>
                <IconButton icon={<><Heart /></>} onClick={() => {

                }} />
                <IconButton icon={<><Play /></>} desc="Watch Trailer" onClick={() => {

                }} />
              </div>
            </div>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)"
            }}>
              <div>
                <div style={{ fontSize: "18px", fontWeight: 500, color: "white" }}>Overview</div>
                <div style={{ fontSize: "14px", paddingTop: "4px" }}>
                  {media.overview}
                </div>
              </div>
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

function resolveGenres(genreIds, genres) {
  if (genreIds.length == 0) return "";
  return genreIds.map(e => {
    let g = "";
    genres.forEach(element => {
      if (element.id == e) {
        g = element.name;
        return;
      }
    });
    return g;
  }).join(" | ");
}