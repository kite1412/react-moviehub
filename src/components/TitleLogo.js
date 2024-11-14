import logo from "../assets/logo.svg";

export default function TitleLogo() {
  return (
    <div className="title-logo">
      <img src={logo} height="30px" width="30px" alt="Logo"/>
      <div style={{fontWeight: 'bold', fontSize: '20px'}}>MOVIEHUB</div>
    </div>
  );
}