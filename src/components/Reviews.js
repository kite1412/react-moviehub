import { originalImageUrl } from "../api/tmdbService";
import { ReactComponent as Profile } from "../assets/profile-circle.svg";

export default function Reviews({ reviews }) {
  return (
    reviews && reviews.results.length ? <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <h1 style={{
        textShadow: "3px 3px 0px #6100C2"
      }}>Reviews</h1>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px"
      }}>
        {
          reviews.results.map(e => {
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
    </div> : <></>
  );
}

function reformatDate(review) {
  const date = new Date(review.created_at);
  return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
}