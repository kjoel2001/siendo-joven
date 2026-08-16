import { Routes, Route, useLocation } from "react-router-dom";

import { PlayerProvider } from "./context/PlayerContext";
import MiniPlayer from "./components/MiniPlayer";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Grabar from "./pages/Grabar";
import Podcast from "./pages/Podcast";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

// pantallas sin navegación inferior (login / registro)
const SIN_NAVBAR = ["/", "/register"];

export default function App() {
  const location = useLocation();
  const mostrarNavbar = !SIN_NAVBAR.includes(location.pathname);

  return (
    <PlayerProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explorar" element={<Explore />} />
        <Route path="/grabar" element={<Grabar />} />
        <Route path="/podcast/:id" element={<Podcast />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Login />} />
      </Routes>

      <MiniPlayer offsetForNavbar={mostrarNavbar} />
      {mostrarNavbar && <Navbar />}
    </PlayerProvider>
  );
}
