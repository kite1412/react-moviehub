import { useLocation } from "react-router-dom";
import { originalImageUrl } from "../api/tmdbService";

export default function Detail() {
  const location = useLocation();
  const { media } = location.state;
  const coverUrl = originalImageUrl(media.poster_path);
  const coverYOffset = "70px";
  return (
    <div className="detail-page">
      <div style={{
        height: "40%",
        width: "100%",
        position: "relative"
      }}>
        <div style={{
          backgroundImage: `url(${coverUrl})`,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backgroundSize: "cover",
          filter: "blur(10px)",
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundPosition: "center",
          transform: "scale(1.05)",
          backgroundBlendMode: "multiply"
        }} />
        <img 
          src={coverUrl} 
          alt="cover"
          style={{
            height: "100%",
            left: 0,
            top: 0,
            position: "relative",
            borderRadius: "15px",
            marginTop: coverYOffset,
            marginLeft: "50px"
          }} 
        />
      </div>
      <div style={{
        marginTop: coverYOffset
      }}>
        {media.title}
      </div>
    </div>
  );
}