import { useState, useRef, useContext, useEffect } from "react";
import { originalImageUrl } from "../api/tmdbService";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";
import { Button } from "./Button";
import { ReactComponent as Clear } from "../assets/cancel.svg";
import { AuthContext } from "../contexts/AuthContext";
import { OvalLoadingIndicator } from "./loadingIndicator";
import { toastSuccess } from "../utils/toast";
import { reformatDate } from "../utils/functions";
import { useMediaQuery } from "react-responsive";
import { small } from "../utils/screen";
import { MainContext } from "../contexts/MainContext";

export default function Reviews({ media, isMovie }) {
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef();
  const [revs, setRevs] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const s = useMediaQuery(small);
  const { myReviews } = useContext(MainContext);

  useEffect(() => {
    setRevs(media.reviews && media.reviews.results ? media.reviews.results : []);
  }, [media.reviews]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <h1 style={{
        textShadow: "3px 3px 0px #6100C2"
      }}>Reviews</h1>
      <div style={{
        display: "flex",
        gap: "16px",
        alignItems: "center"
      }}>
        <div style={{
          width: "70%",
          borderBottom: "1px solid white",
          opacity: active || inputValue ? 1 : 0.5,
          transition: "opacity 0.5s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "4px"
        }}>
          <input 
            style={{
              all: "unset",
              width: "100%"
            }}
            ref={ref}
            placeholder="Enter your review"
            onFocus={() => { setActive(true) }}
            onBlur={() => { setActive(false) }}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          {inputValue ? !submitting ? <Clear 
              onClick={() => {
                ref.current.focus();
                setInputValue("");
              }}
              style={{
                cursor: "pointer"
              }} 
            /> 
            : <OvalLoadingIndicator size="20" /> : <></>
          }
        </div>
        <Button 
          action={"Submit"} 
          style={{
            padding: "12px",
            backgroundColor: !inputValue || submitting ? "rgb(60, 60, 60)" : "",
            transition: "background-color 0.2s linear"
          }}
          onClick={() => {
            if (inputValue && !submitting) {
              setSubmitting(true);
              const review = {
                id: crypto.randomUUID(),
                author: currentUser,
                created_at: new Date(),
                content: inputValue,
                author_details: {
                  avatar_path: ""
                },
                me: true,
                media: media,
                isMovie: isMovie
              };
              myReviews.add(review);
              setTimeout(() => {
                setRevs(
                  [
                    review
                    , ...revs
                  ]
                );
                setInputValue("");
                setSubmitting(false);
                toastSuccess("Review submitted");
              }, 1500);
            }
          }} 
        />
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
        marginTop: "24px"
      }}>
        {
          revs && revs.length ? revs.map(e => {
            return <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px"
            }}>
              <div style={{ display: "flex", gap: "12px" }}>
                {
                  e.author_details.avatar_path ? 
                  <img 
                    src={originalImageUrl(e.author_details.avatar_path)} 
                    alt="profile picture"
                    style={{
                      height: "50px",
                      width: "50px",
                      borderRadius: "50px",
                      padding: "4px",
                      boxSizing: "border-box"
                    }} 
                  />
                  : <Profile style={{ height: "50px", width: "50px" }} />
                }
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>{e.author}{e.me ? <span style={{ color: "grey", fontSize: "14px", marginLeft: "8px" }}>(you)</span> : <></>}</div>
                  <div style={{ color: "gray" }}>{`Written on ${reformatDate(e.created_at)}`}</div>
                </div>
              </div>
              <div style={{
                boxSizing: "border-box",
                paddingLeft: !s ? "62px" : "",
                textAlign: "justify",
                fontSize: "14px"
              }}>{e.content}</div>
            </div>
          }) : <h3 style={{ width: "100%", display: "flex", justifyContent: "center" }}>No reviews yet</h3>
        }
      </div>
    </div>
  );
}