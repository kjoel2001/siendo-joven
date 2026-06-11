import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Podcast from "./pages/Podcast";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/podcast/:id" element={<Podcast />} />
      <Route path="/rewards" element={<Rewards />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}