import React from 'react';

const Catalogo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#007bff' }}>🏪 Vitrine de Produtos</h1>
        <p>Bem-vindo à ProLimp! Confira nossas soluções de limpeza abaixo.</p>
      </header>

      {/* Espaço onde os produtos aparecerão futuramente */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: '#fff'
        }}>
          <p style={{ color: '#888' }}>Nenhum produto cadastrado ainda.</p>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;