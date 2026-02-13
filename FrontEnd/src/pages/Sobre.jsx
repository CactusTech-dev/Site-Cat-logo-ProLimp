import React from 'react';
import { FaRocket, FaShieldAlt, FaHandshake, FaMapMarkerAlt } from 'react-icons/fa';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-container">
      <header className="sobre-header">
        <h1>Sobre a <span className="highlight">ProLimp</span></h1>
        <p className="subtitle">Excelência em saneantes e soluções de limpeza em Pacatuba e região.</p>
      </header>

      <section className="sobre-grid">
        <div className="sobre-card main-info">
          <h2>Quem Somos</h2>
          <p>
            A <strong>ProLimp</strong> nasceu da necessidade de oferecer ao mercado de Pacatuba e adjacências 
            produtos de limpeza que unam alta performance e custo-benefício. Somos especialistas 
            em entender a dor de nossos clientes e entregar a solução exata para cada tipo de ambiente.
          </p>
        </div>

        <div className="sobre-card location-info">
          <div className="icon-box"><FaMapMarkerAlt /></div>
          <h3>Onde Atuamos</h3>
          <p>Sediados em Pacatuba, atendemos toda a região metropolitana com agilidade e compromisso na entrega.</p>
        </div>
      </section>

      <div className="valores-container">
        <div className="valor-item">
          <FaRocket className="v-icon" />
          <h3>Missão</h3>
          <p>Proporcionar eficiência e economia através de produtos de alto desempenho.</p>
        </div>
        <div className="valor-item">
          <FaShieldAlt className="v-icon" />
          <h3>Qualidade</h3>
          <p>Trabalhamos apenas com fórmulas testadas e aprovadas para garantir sua segurança.</p>
        </div>
        <div className="valor-item">
          <FaHandshake className="v-icon" />
          <h3>Compromisso</h3>
          <p>Parceria real com o cliente, garantindo estoque e suporte técnico especializado.</p>
        </div>
      </div>
    </div>
  );
};

export default Sobre;