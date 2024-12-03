import { ReactComponent as Eye } from "../assets/eye.svg";
import { ReactComponent as EyeOff } from "../assets/eye-off.svg";
import { useState } from "react";

export default function OutlinedTextField({
  label, 
  input, 
  onChange, 
  onKeyDown,
  isSensitive = false,
  style = {}
}) {
  const handleChange = (event) => {
    onChange(event.target.value);
  }
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const visibilityIconStyle = {
    stroke: "white",
    height: "24px",
    width: "28px",
    position: "absolute",
    transform: "translate(-130%, 50%)"
  };
  return (
    <div className="outlined-text-field" style={style}>
      <label >{label}</label>
      <input 
        type={
          isSensitive ? !visible ? "password" : "text" : "text"
        } value={input} onChange={handleChange}
        onKeyDown={onKeyDown}
      />
      {isSensitive ? visible ? <EyeOff style={visibilityIconStyle} onClick={toggleVisibility} /> 
      : <Eye style={visibilityIconStyle} onClick={toggleVisibility} /> : <></>}
    </div>
  );
}