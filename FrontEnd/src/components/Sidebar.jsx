import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaMapMarkerAlt, FaUserShield, FaBars, FaTimes, FaInstagram, FaInfoCircle, FaStore } from 'react-icons/fa'; 
import './Sidebar.css';
import logo from '../assets/LogoProLimp.jpg';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img 
            src={logo} 
            alt="Logo ProLimp" 
            className={`sidebar-logo ${isOpen ? 'expanded' : 'collapsed'}`} 
          />
          {isOpen && <span className="full-logo">ProLimp</span>}
        </div>

        <div className="sidebar-content">

          <Link to="/" className="social-link">
            <div className="info-item" title="Ver Catálogo">
              <FaStore className="icon"/>
              {isOpen && <span>Catálogo</span>}
            </div>
          </Link>
  
          <a href="https://api.whatsapp.com/send/?phone=558588805100&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="info-item" title="WhatsApp">
              <FaWhatsapp className="icon whatsapp-color" />
              {isOpen && <span>(85) 9 8880-5100</span>}
            </div>
          </a>
          
          <a href="https://www.google.com/maps/search/?api=1&query=R.+Cel.+José+Libânio,+398+-+Centro,+Pacatuba" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="info-item" title="Localização">
              <FaMapMarkerAlt className="icon" />
              {isOpen && <span>R. Cel. José Libânio, <br/> 398 - Centro, Pacatuba</span>}
            </div>
          </a>

          <a href="https://www.instagram.com/prolimpce/" target="_blank" rel="noopener noreferrer" className="social-link">
            <div className="info-item" title="Instagram">
              <FaInstagram className="icon instagram-color" />
              {isOpen && <span>@prolimpce</span>}
            </div>
          </a>

          <Link to="/sobre" className="social-link">
            <div className="info-item" title="Sobre Nós">
              <FaInfoCircle className="icon"/>
              {isOpen && <span>Sobre a Empresa</span>}
            </div>
          </Link>
        </div>

        <div className="sidebar-footer">
          <Link to="/login" className="admin-btn">
            <FaUserShield className="icon" />
            {isOpen && <span>Painel Admin</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;