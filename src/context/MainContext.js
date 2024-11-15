import { createContext, useState } from "react";

export const MainContext = createContext();

export function MainProvider({ children }) {
  const menu = ["home", "favourites", "trending", "comingsoon"];
  const [currentMenu, setCurrentMenu] = useState(menu[0]);
  return (
    <MainContext.Provider value={{ currentMenu, setCurrentMenu }}>
      {children}
    </MainContext.Provider>
  );
}