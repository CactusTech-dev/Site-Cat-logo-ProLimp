import React from 'react';
import logo from '../assets/LogoProLimp.jpg';
import './Manutencao.css';

const Manutencao = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-card">
        <img src={logo} alt="ProLimp Logo" className="maintenance-logo" />
        <h1>Estamos em Manutenção</h1>
        <p>Estamos preparando novidades para você! Voltaremos em breve com um catálogo ainda melhor.</p>
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
        <p className="contact-info">Precisa de algo urgente? <br/> 
          <strong>(85) 9 8880-5100</strong>
        </p>
      </div>
    </div>
  );
};

export default Manutencao;