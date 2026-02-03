import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoProlimp from '../assets/LogoProLimp.jpg'; 
import { FaArrowLeft } from 'react-icons/fa';

const Login = ({ setAutenticado }) => { 
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "teste" && senha === "12345") {
      localStorage.setItem('autenticado', 'true');
      setAutenticado(true);
      navigate('/admin');
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logoProlimp} alt="Logo ProLimp" className="login-logo" />
        
        <h2>Painel Administrativo</h2>
        <p>Acesse para gerenciar os produtos ProLimp</p>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Usuário</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Digite seu usuário"
              required 
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              placeholder="Digite sua senha"
              required 
            />

            <div className="login-actions-group">
              <button type="submit" className="btn-login-main">Entrar</button>
              <button 
                type="button" 
                className="btn-back-catalogo" 
                onClick={() => navigate('/')} 
                title="Voltar ao Catálogo"
              >
                <FaArrowLeft />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;