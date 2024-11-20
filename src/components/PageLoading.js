import LoadingIndicator from "./LoadingIndicator";

export default function PageLoading() {
  return (
    <div style={{
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "65px" // navbar height
    }}>
      <LoadingIndicator />
    </div>
  );
}