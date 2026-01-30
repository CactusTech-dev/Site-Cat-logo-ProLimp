import React from 'react';

const Catalogo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#151a2d' }}>Catálogo de Produtos</h1>
        <p style={{ color: '#151a2d' }} >Bem-vindo à ProLimp! Confira nosssos produtos de limpeza abaixo.</p>
      </header>

      {/* Espaço onde os produtos aparecerão futuramente */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          border: '1px solid #007bff', 
          padding: '15px', 
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: '#007bff22'
        }}>
          <p style={{ color: '#151a2d5e' }}>Nenhum produto cadastrado ainda.</p>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;