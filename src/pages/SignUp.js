import { useContext, useState } from "react";
import OutlinedTextField from "../components/OutlinedTextField";
import TitleLogo from "../components/TitleLogo";
import { Button } from "../components/Buttons";
import { AuthContext } from "../contexts/AuthContext";
import { toastSuccess, toastError, Toast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { registeredUser, addUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
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
      toastSuccess("You are signed up");
      addUser({ 
        username: username,
        password: password
      });
      setTimeout(() => {
        setUser(username);
        navigate("/");
      }, 2500);
    }
    else toastError("Password doesn't match!");
  };
  return (
    <div className="login-page">
      <TitleLogo />
      <div style={{color: 'white'}}>Discover millions of movies</div>
      <OutlinedTextField label="New Username" input={username} onChange={setUsername} />
      <OutlinedTextField label="Password" input={password} onChange={setPassword} isSensitive={true} />
      <OutlinedTextField label="Confirm Password" input={confirmPassword} onChange={setConfirmPassword} isSensitive={true} />
      <Button action={"Sign up"} onClick={signUp} />
      <Toast />
    </div>
  );
}