import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './pages/Admin.jsx';
import Sidebar from './components/Sidebar.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Sobre from './pages/Sobre.jsx';
import Login from './pages/Login.jsx';
import Carrinho from './pages/Carrinho.jsx';
import { CarrinhoProvider } from './services/CarrinhoContext'; 
import { useCarrinho } from './services/CarrinhoContext';
import CartIcon from './components/CartIcon.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tema, setTema] = useState(localStorage.getItem('tema') || 'light');
  const [autenticado, setAutenticado] = useState(false);

  const toggleTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light';
    setTema(novoTema);
    localStorage.setItem('tema', novoTema);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAutenticado(true);
  }, []);

  return (
    <div className={`app-wrapper ${tema}`}>
      <CarrinhoProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <div className="layout-container" style={{ display: 'flex' }}>
                <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} tema={tema} toggleTema={toggleTema} /> 
                <main style={{ marginLeft: isMenuOpen ? '260px' : '70px', width: '100%', padding: '20px', transition: '0.3s', backgroundColor: 'var(--bg-page)', minHeight: '100vh' }}>
                  <Catalogo tema={tema} toggleTema={toggleTema} />
                </main>
              </div>
            } />

            <Route path="/carrinho" element={
              <div className="layout-container" style={{ display: 'flex' }}>
                <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} tema={tema} toggleTema={toggleTema} /> 
                <main style={{ marginLeft: isMenuOpen ? '260px' : '70px', width: '100%', padding: '20px', transition: '0.3s', backgroundColor: 'var(--bg-page)', minHeight: '100vh' }}>
                  <Carrinho />
                </main>
              </div>
            } />

            <Route path="/sobre" element={
              <div className="layout-container" style={{ display: 'flex' }}>
                <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} tema={tema} toggleTema={toggleTema} /> 
                <main style={{ marginLeft: isMenuOpen ? '260px' : '70px', transition: '0.3s', width: '100%', backgroundColor: 'var(--bg-page)', minHeight: '100vh' }}>
                  <Sobre />
                </main>
              </div>
            } />

            <Route path="/login" element={<Login setAutenticado={setAutenticado} />} />

            <Route path="/admin" element={
              autenticado ? <Admin setAutenticado={setAutenticado} /> : <Navigate to="/login" />
            } />
          </Routes>
          <CartIcon />
        </Router>
      </CarrinhoProvider>
    </div>
  );
}

export default App;