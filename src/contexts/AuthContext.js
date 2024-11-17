import { createContext, useState } from "react"

const registeredUser = {
  count: 1,
  users: [{
    username: "Natha",
    password: "asd"
  }]
};

export const AuthContext = createContext();

export const AuthProvider = ({children, setIsLoggedIn}) => {
  const addUser = (newUser) => {
    registeredUser.users[registeredUser.count] = newUser;
    registeredUser.count++; 
  };
  const [currentUser, setCurrentUser] = useState("");
  const setUser = (username) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };
  return (
    <AuthContext.Provider value={{ registeredUser, addUser, currentUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}