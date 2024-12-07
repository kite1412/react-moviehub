import { useContext, useRef, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { reformatDate } from "../utils/functions";
import { ReactComponent as PencilSlash } from "../assets/pencil-slash.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { ReactComponent as TrashBin } from "../assets/trash-bin.svg";
import { ReactComponent as Cancel } from "../assets/cancel.svg";
import { ReactComponent as Check } from "../assets/check.svg";
import { useMediaQuery } from "react-responsive";
import { large, small } from "../utils/screen";
import IconButton from "../components/IconButton";
import { useNavigate } from "react-router-dom";
import { detailPath } from "../utils/paths";
import { toastError } from "../utils/toast";

export default function MyReviews() {
  const { myReviews } = useContext(MainContext);
  const l = useMediaQuery(large);
  const s = useMediaQuery(small);
  const [edit, setEdit] = useState({});
  const [content, setContent] = useState("");
  const [animateOut, setAnimateOut] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState("");
  const maxIndex = Number.MAX_SAFE_INTEGER;
  const navigate = useNavigate();
  const gridRef = useRef([]);

  const clearEdit = () => {
    setContent(edit.content);
    setAnimateOut(true);
    setDeleteWarning("");
    setTimeout(() => {
      setEdit({});
      setAnimateOut(false);
    }, 300);
  };

  const removeReview = review => {
    myReviews.remove(review);
    toastError("Review deleted");
  };

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
        height: "100vh",
        width: "100vw",
        position: "fixed",
        zIndex: edit.id || animateOut ? maxIndex - 1 : -1,
        backgroundColor: "rgba(255, 255, 255, 0.01)",
        backdropFilter: "blur(5px)",
        marginLeft: l ? "-20%" : s ? "-16px" : "-104px",
        marginTop: `-97px`,
        opacity: edit.id && !animateOut ? 1 : 0,
        transition: "opacity 0.3s ease-in-out"
      }}
      onClick={clearEdit}
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
          width: "100%",
          height: "100%"
        }}>
          {
            myReviews.list.map((e, i) => {
              return <div style={{
                display: "flex",
                color: "white",
                backgroundImage: `linear-gradient(90deg, #2E0854, #4C0013)`,
                borderRadius: "10px",
                padding: "16px",
                paddingRight: s ? "8px" : "16px",
                boxSizing: "border-box",
                minWidth: edit.id === e.id && l && !animateOut ? "150%" : "0%",
                justifyContent: "space-between",
                zIndex: edit.id === e.id ? maxIndex : i + 1,
                marginLeft: edit.id === e.id && i % 2 === 1 & l && !animateOut ? "-50%" : !l && edit.id === e.id && !animateOut ? "2%" : "",
                minHeight: edit.id === e.id && !animateOut ? "200%" : "0%",
                maxWidth: edit.id === e.id && !l && !animateOut ? "95%" : "100%",
                transition: "min-width 0.3s ease, min-height 0.3s ease, max-width 0.1s linear, margin-left 0.2s ease-out",
                gap: "8px"
              }} ref={e => gridRef.current[i] = e}>
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
                    icon={edit.id !== e.id ? <Pencil /> : <Check style={{ color: "#32CD32" }} />}
                    onClick={() => {
                      setEdit(e);
                      setContent(e.content);
                      setTimeout(() => {
                        if (gridRef.current[i]) gridRef.current[i].scrollIntoView({
                          behavior: "smooth",
                          block: "nearest"
                        });
                      }, 300);
                    }}
                  />
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <IconButton 
                      icon={
                        edit.id !== e.id ? <TrashBin style={{ 
                          fill: deleteWarning === e.id ? "white" : "red",
                          transition: "fill 0.2s ease" 
                        }} /> : <Cancel style={{ color: "red" }} />
                      }
                      style={{
                        backgroundColor: deleteWarning === e.id ? "red" : "white",
                        color: "red",
                        fontSize: "12px",
                        transition: "background-color 0.2s linear"
                      }}
                      onClick={
                        edit.id === e.id ? clearEdit 
                        : deleteWarning !== e.id ? () => setDeleteWarning(e.id)  
                        : () => removeReview(e)
                      } 
                    />
                    <div className="pointer-hover" style={{
                      height: deleteWarning === e.id ? "50px" : "0px",
                      width: deleteWarning === e.id ? "50px" : "0px",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      marginTop: deleteWarning === e.id ? "4px" : "",
                      color: "#6100C2",
                      display: "flex",
                      justifyContent: "center",
                      transition: "height 0.2s ease, margin-top 0.2s linear, width 0.2s ease"
                    }} onClick={() => setDeleteWarning("")}>
                      <Cancel style={{ height: "100%" }} />
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div> : empty
    }
  </div>;
}