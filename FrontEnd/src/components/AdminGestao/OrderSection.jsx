import React from 'react';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import './OrderSection.css';

const OrderSection = ({ pedidos, onVoltar, onCancelar }) => {
  return (
    <div className="admin-list-container order-section-container">
      <div className="admin-header-min">
        <button className="btn-voltar-simples" onClick={onVoltar}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>Pedidos Recebidos</h1>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Contato</th>
            <th>Observação</th>
            <th>Data</th>
            <th>Produtos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.ident}</td>
              <td>{p.numero}</td>
              <td className="obs-cell">{p.observacao || '—'}</td>
              <td>{new Date(p.created_at).toLocaleString()}</td>
              <td>
                <ul className="order-prod-list">
                  {p.produtos.map((prod, index) => (
                    <li key={index}>
                      <span className="badge-qtd">{prod.quantidade}x</span> {prod.nome}
                      <img 
                        className='img-admin-mini'
                        src={prod.imagem.startsWith('http') ? prod.imagem : `http://localhost:3000${prod.imagem}`}
                        alt={prod.nome}
                      />
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn-delete" onClick={() => onCancelar(p.id)}>
                  Concluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSection;