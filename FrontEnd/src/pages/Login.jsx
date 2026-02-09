import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logoProlimp from '../assets/LogoProLimp.jpg';
import { FaArrowLeft } from 'react-icons/fa';

const Login = ({ setAutenticado }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // 🔐 Verifica se já está logado ao entrar na tela
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setAutenticado(true);
      navigate('/admin');
    }
  }, [navigate, setAutenticado]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.erro || 'Email e/ou senha incorretos(s)');
        return;
      }

      // ✅ Login OK
      localStorage.setItem('token', data.token);
      setAutenticado(true);
      navigate('/admin');

    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <a href='http://localhost:5173/'>
        <img
          src={logoProlimp}
          alt="Logo ProLimp"
          className="login-logo"
        />
        </a>
        <h2>Painel Administrativo</h2>
        <p>Acesse para gerenciar os produtos ProLimp</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
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
              <button type="submit" className="btn-login-main">
                Entrar
              </button>

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
