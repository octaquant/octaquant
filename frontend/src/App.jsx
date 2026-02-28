import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import JoinBeta from './pages/JoinBeta';
import Architecture from './pages/Architecture';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/join-beta" element={<JoinBeta />} />
      <Route path="/architecture" element={<Architecture />} />
    </Routes>
  );
}
