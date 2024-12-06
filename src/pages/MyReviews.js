import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";
import { reformatDate } from "../utils/functions";
import { ReactComponent as PencilSlash } from "../assets/pencil-slash.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { ReactComponent as TrashBin } from "../assets/trash-bin.svg";
import { useMediaQuery } from "react-responsive";
import { large } from "../utils/screen";
import IconButton from "../components/IconButton";

export default function MyReviews() {
  const { myReviews } = useContext(MainContext);
  const l = useMediaQuery(large);
  const empty = <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
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

  return <div className="main-content">
    {
      myReviews.list.length ? <div style={{
        display: "flex",
        flexDirection: "column"
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
            myReviews.list.map(e => {
              return <div style={{
                display: "flex",
                gap: "12px",
                color: "white",
                backgroundImage: `linear-gradient(90deg, rgba(20, 20, 20, 1), rgba(20, 20, 20, 0.7))`,
                borderRadius: "10px",
                padding: "16px",
                boxSizing: "border-box",
                minWidth: "100%"
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
                  width: "30%",
                  alignItems: "center"
                }}>
                  <IconButton icon={<Pencil />} />
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