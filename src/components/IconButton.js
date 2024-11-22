export default function IconButton({ icon, onClick, desc = "", className = "icon-button", style = {} }) {
  return (
    <button className={className} onClick={onClick} style={style}>
      {icon}
      {desc}
    </button>
  );
}