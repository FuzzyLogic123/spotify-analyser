import './App.css';
import './LoginHero/LoginHero.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.js';
import Menu from './pages/Menu.js';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/menu"} element={<Menu />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
