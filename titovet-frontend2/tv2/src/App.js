
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Navigation from './layout/Navigation';
import Home from './components/Home';
import { CreateTurno } from './components/NuevoTurno';

function App() {
  return (
     <BrowserRouter>      
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-turno" element={<CreateTurno />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
