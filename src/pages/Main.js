import { useContext } from "react"
import { MainContext } from "../contexts/MainContext"
import MainLayout from "../layouts/MainLayout";
import Home from "./Home";
import Favourites from "./Favourites";

export default function Main() {
  const { currentMenu } = useContext(MainContext);
  const currentPage = () => {
    switch (currentMenu) {
      case "favourites":
        return <Favourites />
      default:
        return <Home />;
    }
  };
  return (
    <MainLayout children={currentPage()}/>
  );
}