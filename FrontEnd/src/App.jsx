import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Catalogo = () => (
  <div style={{ padding: '20px' }}>
    <h1>🏪 Catálogo ProLimp</h1>
    <p>Aqui as empresas verão os produtos.</p>
  </div>
);

const Admin = () => (
  <div style={{ padding: '20px' }}>
    <h1>🔐 Painel Administrativo</h1>
    <p>Aqui você vai cadastrar os itens do pen-drive.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota principal: o catálogo que as empresas acessam */}
        <Route path="/" element={<Catalogo />} />
        
        {/* Rota do Admin: onde você faz o cadastro */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;