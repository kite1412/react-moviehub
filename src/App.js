import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react';
import { MainProvider } from './contexts/MainContext';
import Detail from './pages/Detail';
import { HomeProvider } from './contexts/HomeContext';
import { SIGNUP_PATH, detailPath } from "./utils/paths"
import Main from './pages/Main';
import { toastError } from './utils/toast';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = () => {
    setIsLoggedIn(false);
    setTimeout(() => toastError("Logged out"), 100);
  };
  const login = () => {
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <MainProvider children={
        <AuthProvider children={
          <HomeProvider children={
            <Routes>
              <Route path="/" element={<>
                {
                  isLoggedIn ? <Main logout={logout} /> : <Login />
                }
              </>} />
              <Route path={SIGNUP_PATH} element={<SignUp />} />
              <Route path={detailPath()} Component={Detail} />
            </Routes>
          } />
        } setIsLoggedIn={login} />
      } />
    </Router>
  );
}

export default App;
