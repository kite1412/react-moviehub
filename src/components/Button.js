export function Button({action, onClick, className = "button-default", style = {}}) {
  return (
    <button className={className} onClick={onClick} style={style}>
      {action}
    </button>
  );
}