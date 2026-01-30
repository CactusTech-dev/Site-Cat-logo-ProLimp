import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaMapMarkerAlt, FaUserShield, FaBars, FaTimes } from 'react-icons/fa'; 
import './Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

 return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="logo-text">PL</h2>
          {isOpen && <span className="full-logo">ProLimp</span>}
        </div>

        <div className="sidebar-content">
          <div className="info-item" title="WhatsApp">
            <FaWhatsapp className="icon" />
            {isOpen && <span>(85) 99999-9999</span>}
          </div>
          
          <div className="info-item" title="Localização">
            <FaMapMarkerAlt className="icon" />
            {isOpen && <span>Maracanaú, CE</span>}
          </div>
        </div>

        <div className="sidebar-footer">
          <Link to="/admin" className="admin-btn">
            <FaUserShield className="icon" />
            {isOpen && <span>Painel Admin</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;