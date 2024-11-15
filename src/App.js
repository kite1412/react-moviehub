import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let page;
  if (!isLoggedIn) page = Login
  else page = Home
  return (
    <Router>
      <AuthProvider children={
        <Routes>
          <Route path="/" Component={page} />
          <Route path="/signup" Component={SignUp}/>
        </Routes>
      } />
    </Router>
  );
}

export default App;
