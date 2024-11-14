import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let page;
  if (!isLoggedIn) page = <Login/>
  else page = <Home/>

  return (
    <div>
      {page}
    </div>
  );
}

export default App;
