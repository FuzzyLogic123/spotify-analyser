import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages//Login/Login.js';
import Menu from './pages//Menu/Menu.js';
import Insights from './pages/Insights/Insights';
import TopTracks from './pages//TopTracks/TopTracks';
import TopArtists from './pages/TopArtists/TopArtists';
import PageNotFound from './pages/PageNotFound/PageNotFound';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path={"/"} element={<Menu />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/insights"} element={<Insights />} />
          <Route path={"/topTracks"} element={<TopTracks />} />
          <Route path={"/topArtists"} element={<TopArtists />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
