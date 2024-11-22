export default function IconButton({ icon, onClick, desc = "", className = "icon-button" }) {
  return (
    <button className={className} onClick={onClick}>
      {icon}
      {desc}
    </button>
  );
}