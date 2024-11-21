export default function IconButton({ icon, onClick, desc = "", className = "icon-button" }) {
  return (
    <div className={className} onClick={onClick}>
      {icon}
      {desc}
    </div>
  );
}