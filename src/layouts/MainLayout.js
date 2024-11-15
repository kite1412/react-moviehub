import TitleLogo from "../components/TitleLogo";

export default function MainLayout({ children }) {
  return (
    <div className="main-layout">
      <div id="navbar">
        <TitleLogo />
      </div>
      {children}
    </div>
  );
}