import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin.jsx';
import Sidebar from './components/Sidebar.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Sobre from './pages/Sobre.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Recupera o tema salvo ou inicia como 'light'
  const [tema, setTema] = useState(localStorage.getItem('tema') || 'light');

  // Função para alternar entre light e dark
  const toggleTema = () => {
    const novoTema = tema === 'light' ? 'dark' : 'light';
    setTema(novoTema);
    localStorage.setItem('tema', novoTema); // Persiste a escolha do usuário
  };

  return (
    <div className={`app-wrapper ${tema}`}>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="layout-container" style={{ display: 'flex' }}>
                <Sidebar 
                  isOpen={isMenuOpen} 
                  setIsOpen={setIsMenuOpen} 
                  tema={tema} 
                  toggleTema={toggleTema} 
                /> 
                
                <main style={{ 
                  marginLeft: isMenuOpen ? '260px' : '70px', 
                  width: '100%', 
                  padding: '20px',
                  transition: 'margin-left 0.3s ease',
                  backgroundColor: 'var(--bg-page)', 
                  minHeight: '100vh'
                }}>
                  {/* Passando as props para o Catalogo usar o ThemeToggle */}
                  <Catalogo tema={tema} toggleTema={toggleTema} />
                </main>
              </div>
            } 
          />
          <Route 
            path="/sobre" 
            element={
              <div className="layout-container" style={{ display: 'flex' }}>
                <Sidebar 
                  isOpen={isMenuOpen} 
                  setIsOpen={setIsMenuOpen} 
                  tema={tema} 
                  toggleTema={toggleTema} 
                /> 
                <main style={{ 
                  marginLeft: isMenuOpen ? '260px' : '70px', 
                  transition: '0.3s', 
                  width: '100%',
                  backgroundColor: 'var(--bg-page)',
                  minHeight: '100vh'
                }}>
                  <Sobre />
                </main>
              </div>
            } 
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;