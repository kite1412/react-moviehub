import { createContext } from "react"

const registeredUser = {
  count: 0,
  users: []
};

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const addUser = (newUser) => {
    registeredUser.users[registeredUser.count] = newUser;
    registeredUser.count++; 
  };
  return (
    <AuthContext.Provider value={{ registeredUser, addUser }}>
      {children}
    </AuthContext.Provider>
  );
}