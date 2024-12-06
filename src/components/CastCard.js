import { useMediaQuery } from "react-responsive";
import { originalImageUrl } from "../api/tmdbService";
import { large, medium } from "../utils/screen";

export default function CastCard({ cast }) {
  const l = useMediaQuery(large);
  const m = useMediaQuery(medium);
  return (
    cast.profile_path ? <div style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: l ? "170px" : m ? "140px" : "120px",
      height: "auto",
      borderRadius: "8px",
      position: "relative",
      overflow: "clip",
    }}>
      <img 
        src={originalImageUrl(cast.profile_path)} 
        alt="profile picture"
        style={{
          height: "70%",
          width: "auto"
        }} 
      />
      <div style={{
        backgroundColor: "rgba(20, 20, 20, 1)",
        padding: "8px",
        height: "100%",
        paddingTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px"
      }}>
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>{cast.name}</div>
        <div style={{ fontSize: "14px", fontWeight: "lighter" }}>{cast.character}</div>
      </div>
    </div> : <></>
  );
}

export const toCards = (cast) => cast.map(e => {
  return <CastCard cast={e} />
});