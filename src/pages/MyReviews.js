import { useContext, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { reformatDate } from "../utils/functions";
import { ReactComponent as PencilSlash } from "../assets/pencil-slash.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { ReactComponent as TrashBin } from "../assets/trash-bin.svg";
import { useMediaQuery } from "react-responsive";
import { large, small } from "../utils/screen";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";
import { detailPath } from "../utils/paths";

export default function MyReviews() {
  const { myReviews } = useContext(MainContext);
  const l = useMediaQuery(large);
  const s = useMediaQuery(small);
  const [edit, setEdit] = useState({});
  const [content, setContent] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const maxIndex = Number.MAX_SAFE_INTEGER;
  const navigate = useNavigate();
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
    position: "relative",
  }}>
    <div 
      style={{
        height: "100%",
        width: "100%",
        position: "fixed",
        zIndex: edit.id || animateOut ? maxIndex - 1 : 0,
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(5px)",
        marginLeft: l ? "-32px" : s ? "-16px" : "-24px",
        marginTop: `-32px`,
        opacity: edit.id && !animateOut ? 1 : 0,
        transition: "opacity 0.3s ease-in-out"
      }}
      onClick={() => {
        setContent(edit.content);
        setAnimateOut(true);
        setTimeout(() => {
          setEdit({});
          setAnimateOut(false);
        }, 300)
      }}
    />
    {
      myReviews.list.length ? <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingBottom: !s ? "200px" : "278px",
        boxSizing: "border-box"
      }}>
        <h1 style={{
          color: "white",
          textShadow: "2px 2px 1px #6100C2"
        }}>My Reviews</h1>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${l ? 2 : 1}, 1fr)`,
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
                minWidth: edit.id === e.id && l && !animateOut ? "150%" : "0%",
                justifyContent: "space-between",
                zIndex: edit.id === e.id ? maxIndex : i + 1,
                marginLeft: edit.id === e.id && i % 2 === 1 & l && !animateOut ? "-50%" : "",
                minHeight: edit.id === e.id && !animateOut ? "200%" : "0%",
                transition: "min-width 0.2s ease, min-height 0.2s ease, margin-left 0.2s ease-out",
                gap: "4px"
              }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "70%",
                  height: "100%",
                  overflow: "clip"
                }}>
                  <div style={{ 
                    alignItems: "center",
                    display: "flex",
                    gap: "4px"
                  }}>
                    <span 
                      className="underline-text" 
                      style={{
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                      onClick={() => {
                        navigate(detailPath(e.id), { state: { media: e.media, isMovie: e.isMovie } });
                      }}
                    >
                      {e.isMovie ? e.media.title : e.media.name}
                    </span> <span style={{ 
                      color: "grey", 
                      fontSize: "14px"
                    }}>
                      {e.isMovie ? "(Movie)" : "(TV Show)"}
                    </span>
                  </div>
                  <div style={{ 
                    fontSize: "14px", 
                    color: "grey", 
                    height: "100%",
                    display: "flex",
                    flexDirection: "column" 
                  }}>
                    <div>created on: {reformatDate(e.created_at)}</div>
                    <div>updated on: {reformatDate(e.updated_on || e.created_at)}</div>
                    <div style={{
                      paddingTop: "8px", 
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px" 
                    }}>
                      <span>content:</span>
                      {
                        edit.id !== e.id || animateOut ? <div style={{ fontSize: "16px", color: "white" }}>
                          {e.content}
                        </div> : <div style={{
                          height: "100%",
                          display: "flex",
                          border: "1px solid white",
                          padding: "4px",
                          boxSizing: "border-box",
                          borderRadius: "8px"
                        }}>
                          <textarea
                            wrap="hard"
                            value={content}
                            onChange={e => {
                              setContent(e.target.value);
                            }}
                            style={{ 
                              all: "unset",
                              fontSize: "16px", 
                              color: "white",
                              width: "100%",
                              wordWrap: "break-word",
                              height: "100%",
                            }}
                          />
                        </div> 
                      }
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
                      setEdit(e);
                      setContent(e.content);
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