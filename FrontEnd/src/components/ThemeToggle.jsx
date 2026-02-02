import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

const ThemeToggle = ({ tema, toggleTema }) => {
  return (
    <button className="theme-toggle-float" onClick={toggleTema} title="Trocar Tema">
      {tema === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;