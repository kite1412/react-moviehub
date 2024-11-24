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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let page;
  if (!isLoggedIn) page = Login;
  else page = Main;
  const login = () => {
    setIsLoggedIn(true);
    page = Main;
  };
  return (
    <Router>
      <MainProvider children={
        <AuthProvider children={
          <HomeProvider children={
            <Routes>
              <Route path="/" Component={page} />
              <Route path={SIGNUP_PATH} Component={SignUp}/>
              <Route path={detailPath()} Component={Detail} />
            </Routes>
          } />
        } setIsLoggedIn={login} />
      } />
    </Router>
  );
}

export default App;
