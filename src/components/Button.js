export function Button({
  action, 
  onClick, 
  className = "button-default", 
  style = {},
  disabled = false
}) {
  return (
    <button 
      className={className} 
      onClick={onClick} 
      style={style} 
      disabled={disabled}
    >
      {action}
    </button>
  );
}