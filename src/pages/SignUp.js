import { useContext, useState } from "react";
import OutlinedTextField from "../components/OutlinedTextField";
import TitleLogo from "../components/TitleLogo";
import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";
import { toastSuccess, toastError, Toast } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [complete, setComplete] = useState(false);
  const { registeredUser, addUser, setUser } = useContext(AuthContext);
  const actionDisabled = complete || !username || !password || !confirmPassword;
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
      setComplete(true);
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
  const onKeyDown = e => {
    if (e.key === "Enter") signUp();
  }; 
  return (
    <div className="login-page">
      <TitleLogo />
      <div style={{color: 'white'}}>Discover millions of movies</div>
      <OutlinedTextField 
        label="New Username" 
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
      <OutlinedTextField 
        label="Confirm Password" 
        input={confirmPassword} 
        onChange={setConfirmPassword} 
        isSensitive={true}
        onKeyDown={onKeyDown} 
      />
      <Button 
        action={"Sign up"} 
        onClick={signUp}
        disabled={actionDisabled}
        style={{
          backgroundColor: actionDisabled ? "grey" : ""
        }}
      />
      <Toast />
    </div>
  );
}