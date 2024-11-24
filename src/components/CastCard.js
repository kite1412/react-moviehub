import { originalImageUrl } from "../api/tmdbService";

export default function CastCard({ cast }) {
  return (
    cast.profile_path ? <div style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "170px",
      height: "auto",
      borderRadius: "8px",
      position: "relative",
      overflow: "clip"
    }}>
      <img src={originalImageUrl(cast.profile_path)} alt="profile picture" />
      <div style={{
        backgroundColor: "rgba(20, 20, 20, 1)",
        height: "100%",
        padding: "8px",
        paddingTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
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