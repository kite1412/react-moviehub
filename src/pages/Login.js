import { useState } from "react";
import OutlinedTextField from "../components/OutlinedTextField";
import TitleLogo from "../components/TitleLogo";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login-page">
      <TitleLogo/>
      <div style={{color: 'white'}}>Discover millions of movies</div>
      <OutlinedTextField label="Username" input={username} onChange={setUsername}/>
      <OutlinedTextField label="Password" input={password} onChange={setPassword}/>
    </div>
  );
}