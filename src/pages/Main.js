import { useContext } from "react"
import { MainContext } from "../contexts/MainContext"
import MainLayout from "../layouts/MainLayout";
import Home from "./Home";
import Favourites from "./Favorites";
import { HomeContext } from "../contexts/HomeContext";
import Watchlist from "./Watchlist";
import Upcoming from "./Upcoming";

export default function Main({logout}) {
  const { currentMenu } = useContext(MainContext);
  const { setCurrentSlide } = useContext(HomeContext);
  const currentPage = () => {
    switch (currentMenu) {
      case "favorites":
        return <Favourites />
      case "watchlist":
        return <Watchlist />
      case "upcoming":
        return <Upcoming />
      default:
        return <Home />;
    }
  };
  const isUpcoming = currentMenu === "upcoming";
  return (
    <MainLayout 
      children={currentPage()} 
      logout={() => {
        logout();
        setCurrentSlide(0);
      }}
      applyMargin={!isUpcoming}
      translucentHeader={isUpcoming} 
    />
  );
}