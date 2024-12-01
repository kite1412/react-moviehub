import { useState, useContext } from "react";
import backgroundImage from "../assets/loginBackground.png";
import TitleLogo from "../components/TitleLogo";
import OutlinedTextField from "../components/OutlinedTextField";
import { Button } from "../components/Button";
import { Toast, toastError, toastSuccess } from "../utils/toast";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [complete, setComplete] = useState(false);
  const actionDisabled = complete || !username || !password;
  const { registeredUser, setUser } = useContext(AuthContext);
  const login = () => {
    for (let i = 0; i <= registeredUser.users.length; i++) {
      const user = registeredUser.users[i];
      if (user && user.username == username) {
        if (user.password == password) {
          setComplete(true);
          toastSuccess("Logged in");
          setTimeout(() => {
            setUser(username);
          }, 2500);
          return;
        }
        toastError("Password does not match");
        return;
      }
    }
    toastError("Username not found");
  };
  const onKeyDown = e => {
    if (e.key === "Enter") login();
  };
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      backgroundColor: "#191817"
    }}>
      <div style={{
        backgroundImage: `linear-gradient(120deg, #6100C2 50%, #191817 90%), 
          url(${backgroundImage})`,
        height: "100%",
        width: "60%",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `translateX(${!isLogin ? "40vw" : "0"})`,
        transition: "transform 0.5s ease"
      }}>
        <div style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <TitleLogo/>
          <div style={{color: 'white'}}>Discover millions of movies</div>
          <OutlinedTextField 
            label="Username" 
            input={username} 
            onChange={setUsername}
            onKeyDown={onKeyDown}
          />
          <OutlinedTextField 
            label="Password" 
            input={password} 
            onChange={setPassword} 
            isSensitive={true}
            onKeyDown={onKeyDown} 
          />
          <div style={{
            marginTop: "32px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px", 
            alignItems: "center"
          }}>
            <Button 
              action={"Log in"} onClick={login} 
              style={{
                backgroundColor: actionDisabled ? "grey" : ""
              }}
              disabled={actionDisabled}
            />
          </div>
        </div>
      </div>
      <div style={{
        height: "100%",
        width: "40%",
        backgroundColor: "#191817",
        transform: `translateX(${!isLogin ? "-60vw" : "0"})`,
        transition: "transform 0.5s ease"
      }}>
        
      </div>
      <Toast />
    </div>
  );
}