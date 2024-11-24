import { useContext } from "react"
import { MainContext } from "../contexts/MainContext"
import MainLayout from "../layouts/MainLayout";
import Home from "./Home";
import Favourites from "./Favorites";

export default function Main() {
  const { currentMenu } = useContext(MainContext);
  const currentPage = () => {
    switch (currentMenu) {
      case "favorites":
        return <Favourites />
      default:
        return <Home />;
    }
  };
  return (
    <MainLayout children={currentPage()}/>
  );
}