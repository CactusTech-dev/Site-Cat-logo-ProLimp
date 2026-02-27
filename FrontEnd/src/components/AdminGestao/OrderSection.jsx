import React from 'react';
import { FaTrash, FaArrowLeft, FaCheck } from 'react-icons/fa';
import './OrderSection.css';

const OrderSection = ({ pedidos, onVoltar, onCancelar }) => {
  
  // Função auxiliar para processar o array de produtos com segurança
  const formatarProdutos = (campoProdutos) => {
    try {
      return typeof campoProdutos === 'string' 
        ? JSON.parse(campoProdutos) 
        : campoProdutos;
    } catch (e) {
      return [];
    }
  };

  return (
    <div className="admin-list-container order-section-container">
      <div className="admin-header-min">
        <button className="btn-voltar-simples" onClick={onVoltar}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>Pedidos Recebidos</h1>
      </div>

      <div className="admin-table-wrapper"> {/* Sugestão: Wrapper para scroll lateral em mobile */}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contato</th>
              <th className="hide-mobile">Observação</th>
              <th>Data</th>
              <th>Produtos</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map(p => {
              const listaDeProdutos = formatarProdutos(p.produtos);
              
              return (
                <tr key={p.id}>
                  <td className="font-bold">{p.ident}</td>
                  <td>{p.numero}</td>
                  <td className="obs-cell hide-mobile">{p.observacao || '—'}</td>
                  <td>{new Date(p.created_at).toLocaleString('pt-BR')}</td>
                  <td>
                    <ul className="order-prod-list">
                      {listaDeProdutos.map((prod, index) => (
                        <li key={index} className="order-prod-item">
                          <span className="badge-qtd">{prod.quantidade}x</span>
                          <span className="prod-name-mini">{prod.nome}</span>
                          {prod.imagem && (
                            <img 
                              className='img-admin-mini'
                              // Removido o localhost:3000 para aceitar links do Supabase
                              src={prod.imagem} 
                              alt={prod.nome}
                              onError={(e) => { e.target.style.display = 'none' }} // Esconde se a imagem falhar
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn-delete btn-concluir" 
                      onClick={() => onCancelar(p.id)}
                      title="Concluir e remover pedido"
                    >
                      <FaCheck /> Concluir
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {pedidos.length === 0 && (
        <div className="empty-state">
          <p>Nenhum pedido pendente no momento.</p>
        </div>
      )}
    </div>
  );
};

export default OrderSection;