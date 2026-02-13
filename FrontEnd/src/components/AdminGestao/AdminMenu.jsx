import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaPager } from 'react-icons/fa';

const AdminMenu = ({ logo, setAba }) => {
  return (
    <div className="admin-dashboard">
      <a href='http://localhost:5173/'>
        <img src={logo} alt="Logo" className="admin-logo" />
      </a>
      <h1>Gestão de Produtos</h1>
      <p className="admin-subtitle">O que você deseja fazer?</p>

      <div className="admin-grid">
        <div className="action-card" onClick={() => setAba('adicionar')}>
          <div className="icon-box add"><FaPlus /></div>
          <h3>Adicionar</h3>
        </div>
        <div className="action-card" onClick={() => setAba('editar')}>
          <div className="icon-box edit"><FaEdit /></div>
          <h3>Editar</h3>
        </div>
        <div className="action-card" onClick={() => setAba('excluir')}>
          <div className="icon-box del"><FaTrash /></div>
          <h3>Excluir</h3>
        </div>
        <div className="action-card" onClick={() => setAba('pedido')}>
          <div className="icon-box del"><FaPager /></div>
          <h3>Pedidos</h3>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;