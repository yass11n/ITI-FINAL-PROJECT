// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Calendar from './components/Calendar';

const App = () => {
  return (
    <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/Calendar" element={<Calendar/>} />
    </Routes>
  );
};

export default App;
