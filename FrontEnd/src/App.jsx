import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin.jsx';
import Sidebar from './components/Sidebar.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Sobre from './pages/Sobre.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="layout-container" style={{ display: 'flex' }}>
              <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} /> 
              
              <main style={{ 
                marginLeft: isMenuOpen ? '260px' : '70px', 
                width: '100%', 
                padding: '20px',
                transition: 'margin-left 0.3s ease' 
              }}>
                <Catalogo />
              </main>
            </div>
          } 
        />
        <Route 
          path="/sobre" 
          element={
            <div className="layout-container" style={{ display: 'flex' }}>
              <Sidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} /> 
              <main style={{ marginLeft: isMenuOpen ? '260px' : '70px', transition: '0.3s', width: '100%' }}>
                <Sobre />
              </main>
            </div>
          } 
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;