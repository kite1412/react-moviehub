import { ReactComponent as Star } from "../assets/star.svg";

export default function Score({score}) {
  return (
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderBottomRightRadius: "10px",
      display: "flex",
      gap: "8px",
      padding: "4px",
      paddingRight: "8px",
      color: "white"
    }}>
      <Star style={{
        height: "20px",
        width: "20px"
      }} />
      {score}
    </div>
  );
}