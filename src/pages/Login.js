import { useState, useContext } from "react";
import backgroundImage from "../assets/loginBackground.png";
import TitleLogo from "../components/TitleLogo";
import OutlinedTextField from "../components/OutlinedTextField";
import { Button } from "../components/Button";
import { Toast, toastError, toastSuccess } from "../utils/toast";
import { AuthContext } from "../contexts/AuthContext";
import { Fade } from "react-awesome-reveal";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [complete, setComplete] = useState(false);
  const actionDisabled = complete || !username || !password || (!isLogin ? !confirmPassword : false);
  const { registeredUser, setUser, addUser } = useContext(AuthContext);
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
  const signUp = () => {
    if (username == "" || password == "") {
      toastError("Field can't be empty!");
      return;
    }
    for (let i = 0; i < registeredUser.users.length; i++) {
      if (registeredUser.users[i] && registeredUser.users[i].username == username) {
        toastError("Username has already taken");
        return;
      }
    } 
    if (password === confirmPassword) {
      setComplete(true);
      toastSuccess("You are signed up");
      addUser({ 
        username: username,
        password: password
      });
      setTimeout(() => {
        setUser(username);
      }, 2500);
    }
    else toastError("Password doesn't match!");
  };
  const onKeyDown = e => {
    if (e.key === "Enter") isLogin ? login() : signUp();
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
        width: "65%",
        backgroundBlendMode: "multiply",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transform: `translateX(${!isLogin ? "35vw" : "0"})`,
        transition: "transform 0.5s ease"
      }}>
        <div style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
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
          {
            !isLogin ? <OutlinedTextField 
              label="Confirm Password" 
              input={confirmPassword} 
              onChange={setConfirmPassword} 
              isSensitive={true}
              onKeyDown={onKeyDown} 
            /> : <></>
          }
          <div style={{
            marginTop: "32px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px", 
            alignItems: "center"
          }}>
            <Button 
              action={isLogin ? "Log in" : "Sign Up"} onClick={login} 
              style={{
                backgroundColor: actionDisabled ? "grey" : "",
              }}
              disabled={actionDisabled}
            />
          </div>
        </div>
      </div>
      <div style={{
        height: "100%",
        width: "35%",
        backgroundImage: `linear-gradient(${isLogin ? "120deg" : "-120deg"}, #191817, #191817 65%, #2A241D)`,
        transform: `translateX(${!isLogin ? "-65vw" : "0"})`,
        transition: "transform 0.5s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        paddingBottom: "50px",
        boxSizing: "border-box"
      }}>
        <Fade delay={300} damping={0.1} cascade style={{
          fontSize: "32px",
          color: "white",
          fontWeight: "bold",
          textShadow: "2px 2px 0px #6100C2"
        }}>
          Welcome to MovieHub
        </Fade>
        <Fade delay={2000} style={{
          color: "white",
          display: "flex"
        }}>
          <span>
            {`${isLogin ? "Don't" : "Already"} have an account?`} <button 
              style={{
                all: "unset",
                textDecoration: "underline",
                cursor: "pointer",
                color: "#6100C2"
              }} 
              onClick={() => {
                setIsLogin(!isLogin);
                setUsername("");
                setPassword("");
                setConfirmPassword("");
              }}>
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </span> 
        </Fade>
      </div>
      <Toast />
    </div>
  );
}