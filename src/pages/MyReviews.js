import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { reformatDate } from "../utils/functions";
import { ReactComponent as PencilSlash } from "../assets/pencil-slash.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { ReactComponent as TrashBin } from "../assets/trash-bin.svg";
import { useMediaQuery } from "react-responsive";
import { large, small } from "../utils/screen";
import IconButton from "../components/IconButton";

export default function MyReviews() {
  const { myReviews } = useContext(MainContext);
  const l = useMediaQuery(large);
  const s = useMediaQuery(small);
  const [edit, setEdit] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const bBlurIndex = 2;
  const empty = <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
    width: "100%",
    paddingBottom: "65px",
    boxSizing: "border-box",
    color: "#412161",
    textAlign: "center"
  }}>
    <PencilSlash style={{
      height: "170px",
      width: "170px"
    }} />
    <h2>You haven't write any reviews</h2>
  </div>;

  return <div className="main-content" style={{
    alignItems: "start",
    position: "relative"
  }}>
    <div 
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        zIndex: edit || animateOut ? bBlurIndex : Number.MIN_SAFE_INTEGER,
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(5px)",
        marginLeft: l ? "-32px" : s ? "-16px" : "-24px",
        marginTop: `-32px`,
        opacity: edit && !animateOut ? 1 : 0,
        transition: "opacity 0.3s ease-in-out"
      }}
      onClick={() => {
        setAnimateOut(true);
        setTimeout(() => {
          setEdit("");
          setAnimateOut(false);
        }, 300)
      }}
    />
    {
      myReviews.list.length ? <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}>
        <h1 style={{
          color: "white",
          textShadow: "2px 2px 1px #6100C2"
        }}>My Reviews</h1>
        <div style={{
          display: !l ? "flex" : "grid",
          flexDirection: "column",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          width: "100%"
        }}>
          {
            myReviews.list.map((e, i) => {
              return <div style={{
                display: "flex",
                color: "white",
                backgroundImage: `linear-gradient(90deg, rgb(20, 20, 20), #180C24)`,
                borderRadius: "10px",
                padding: "16px",
                boxSizing: "border-box",
                minWidth: edit === e.id && l && !animateOut ? "150%" : "100%",
                justifyContent: "space-between",
                zIndex: edit === e.id ? bBlurIndex + 1 : 1 - i,
                marginLeft: edit === e.id && i % 2 === 1 & l && !animateOut ? "-50%" : "",
                minHeight: edit === e.id && !animateOut ? "200%" : "0%",
                transition: "min-width 0.2s ease, min-height 0.2s ease, margin-left 0.2s ease-out",
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                  overflow: "clip"
                }}>
                  <div style={{ 
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    {e.isMovie ? e.media.title : e.media.name} <span style={{ color: "grey", fontSize: "14px" }}>
                      {e.isMovie ? "(Movie)" : "(TV Show)"}
                    </span>
                  </div>
                  <div style={{ fontSize: "14px", color: "grey" }}>
                    <div>created on: {reformatDate(e.created_at)}</div>
                    <div>updated on: {reformatDate(e.updated_on || e.created_at)}</div>
                    <div style={{ paddingTop: "8px" }}>
                      content:
                      <div style={{ fontSize: "16px", color: "white" }}>
                        {e.content}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <IconButton 
                    icon={<Pencil />}
                    onClick={() => {
                      setEdit(e.id);
                    }} 
                  />
                  <IconButton 
                    icon={
                      <TrashBin style={{ fill: "red" }} />
                    }
                    style={{
                      backgroundColor: "white"
                    }} 
                  />
                </div>
              </div>
            })
          }
        </div>
      </div> : empty
    }
  </div>;
}