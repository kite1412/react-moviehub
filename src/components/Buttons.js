export function Button({action, onClick, className = "button-default"}) {
  return (
    <button className={className} onClick={onClick}>
      {action}
    </button>
  );
}