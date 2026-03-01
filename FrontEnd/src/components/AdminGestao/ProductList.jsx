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
                  src={p.imagem.startsWith('http') ? p.imagem : `${BASE_URL}/produtos`}
                  alt={p.nome}
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