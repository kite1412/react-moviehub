import { useContext } from "react"
import { MainContext } from "../contexts/MainContext"
import MainLayout from "../layouts/MainLayout";
import Home from "./Home";
import Favourites from "./Favorites";
import { HomeContext } from "../contexts/HomeContext";

export default function Main({logout}) {
  const { currentMenu } = useContext(MainContext);
  const { setCurrentSlide } = useContext(HomeContext);
  const currentPage = () => {
    switch (currentMenu) {
      case "favorites":
        return <Favourites />
      default:
        return <Home />;
    }
  };
  return (
    <MainLayout children={currentPage()} logout={() => {
      logout();
      setCurrentSlide(0);
    }} />
  );
}