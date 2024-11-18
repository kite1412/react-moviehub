import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useState } from 'react';
import { MainProvider } from './contexts/MainContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let page;
  if (!isLoggedIn) page = Login
  else page = Home
  const login = () => {
    setIsLoggedIn(true);
    page = Home;
  };
  return (
    <Router>
      <MainProvider children={
        <AuthProvider children={
          <Routes>
            <Route path="/" Component={page} />
            <Route path="/signup" Component={SignUp}/>
          </Routes>
        } setIsLoggedIn={login} />
      } />
    </Router>
  );
}

export default App;
