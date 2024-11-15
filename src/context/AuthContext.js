import { createContext } from "react"

const registeredUser = {
  count: 1,
  users: [{
    username: "asd",
    password: "asd"
  }]
};

export const AuthContext = createContext();

export const AuthProvider = ({children, setIsLoggedIn}) => {
  const addUser = (newUser) => {
    registeredUser.users[registeredUser.count] = newUser;
    registeredUser.count++; 
  };
  return (
    <AuthContext.Provider value={{ registeredUser, addUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}