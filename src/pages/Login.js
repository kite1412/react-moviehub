import { useContext, useState } from "react";
import OutlinedTextField from "../components/OutlinedTextField";
import TitleLogo from "../components/TitleLogo";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toastError, toastSuccess, Toast } from "../utils/toast";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { registeredUser, setUser } = useContext(AuthContext);
  const toSignUp = () => {
    navigate("/signup")
  };
  const login = () => {
    for (let i = 0; i <= registeredUser.users.length; i++) {
      const user = registeredUser.users[i];
      if (user && user.username == username) {
        if (user.password == password) {
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
  return (
    <div className="login-page">
      <TitleLogo/>
      <div style={{color: 'white'}}>Discover millions of movies</div>
      <OutlinedTextField label="Username" input={username} onChange={setUsername}/>
      <OutlinedTextField label="Password" input={password} onChange={setPassword} isSensitive={true} />
      <div style={{marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center"}}>
        <Button action={"Log in"} onClick={login}/>
        <div style={{color: "white", fontSize: "14px"}}>
          No Account? <a onClick={toSignUp}>Sign Up</a>
        </div>
        <Toast />
      </div>
    </div>
  );
}