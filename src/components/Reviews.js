import { useState, useRef, useContext, useEffect } from "react";
import { originalImageUrl } from "../api/tmdbService";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";
import { Button } from "./Button";
import { ReactComponent as Clear } from "../assets/cancel.svg";
import { AuthContext } from "../contexts/AuthContext";
import { OvalLoadingIndicator } from "./loadingIndicator";
import { Toast, toastSuccess } from "../utils/toast";

export default function Reviews({ reviews }) {
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef();
  const [revs, setRevs] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setRevs(reviews && reviews.results ? reviews.results : []);
  }, [reviews]);

  return (
    revs && revs.length ? <div style={{
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
              setTimeout(() => {
                setRevs(
                  [
                    {
                      author: currentUser,
                      created_at: new Date(),
                      content: inputValue,
                      author_details: {
                        avatar_path: ""
                      }
                    } 
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
          revs.map(e => {
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
                  <div>{e.author}</div>
                  <div style={{ color: "gray" }}>{`Written on ${reformatDate(e)}`}</div>
                </div>
              </div>
              <div style={{
                boxSizing: "border-box",
                paddingLeft: "62px",
                textAlign: "justify",
                fontSize: "14px"
              }}>{e.content}</div>
            </div>
          })
        }
      </div>
      <Toast />
    </div> : <></>
  );
}

function reformatDate(review) {
  const date = new Date(review.created_at);
  return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
}