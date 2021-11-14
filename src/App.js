import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.js';
import Menu from './pages/Menu.js';
import Insights from './pages/Insights';
import TopTracks from './pages/TopTracks'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/menu"} element={<Menu />} />
          <Route path={"/insights"} element={<Insights />} />
          <Route path={"/topTracks"} element={<TopTracks />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
