import React from 'react';
import { FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import './ProductList.css'; 

const ProductList = ({ produtos, aba, onVoltar, onEdit, onDelete }) => {
  return (
    <div className="admin-list-container">
      <div className="admin-header-min">
        <button className="btn-voltar-simples" onClick={onVoltar}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>{aba === 'editar' ? 'Selecione um Produto para Editar' : 'Excluir Produtos'}</h1>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Imagem</th>
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td className="product-name-cell">{p.nome}</td>
              <td>
                <img 
                  className='img-admin-container'
                  // Se p.imagem já é a URL do Supabase ou Link Externo, use ela direto.
                  src={p.imagem} 
                  alt={p.nome}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Sem+Imagem'; }}
                />
              </td>
              <td style={{ textAlign: 'right' }}>
                {aba === 'editar' ? (
                  <button className="btn-edit" onClick={() => onEdit(p)}>
                    <FaEdit /> Editar
                  </button>
                ) : (
                  <button className="btn-delete" onClick={() => onDelete(p.id)}>
                    <FaTrash /> Excluir
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;