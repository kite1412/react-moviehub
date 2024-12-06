import { useMediaQuery } from "react-responsive";
import { originalImageUrl } from "../api/tmdbService";
import { large } from "../utils/screen";
import noImage from "../assets/no-profile.png";

export default function CastCard({ cast }) {
  const l = useMediaQuery(large);
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: l ? "170px" :  "140px",
      height: "auto",
      borderRadius: "8px",
      position: "relative",
      overflow: "clip"
    }}>
      <img 
        src={originalImageUrl(cast.profile_path) || noImage} 
        alt="profile picture"
        style={{
          minHeight: "70%",
          width: "auto",
          objectPosition: "center",
          objectFit: "cover"
        }} 
      />
      <div style={{
        backgroundColor: "rgba(20, 20, 20, 1)",
        padding: "8px",
        height: "100%",
        paddingTop: l ? "16px" : "8px",
        display: "flex",
        flexDirection: "column",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px"
      }}>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>{cast.name}</div>
        <div style={{ fontSize: "14px", fontWeight: "lighter" }}>{cast.character}</div>
      </div>
    </div>
  );
}

export const toCards = (cast) => cast.map(e => {
  return <CastCard cast={e} />
});