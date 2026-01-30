import React, { useState, useEffect } from 'react'; // 1. Adicionei o useEffect aqui
import './Admin.css'; 
import logo from '../assets/LogoProLimp.jpg';

const Admin = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState(''); 
  const [tipoImagem, setTipoImagem] = useState('link');
  const [imagem, setImagem] = useState('');

  useEffect(() => {
    document.body.style.backgroundColor = "#151a2d"; 
    return () => {
      document.body.style.backgroundColor = "white";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, descricao, imagem, tipoImagem });
    alert("Produto salvo com sucesso!");
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="logo-container">
          <img src={logo} alt="Logo ProLimp" className="admin-logo" />
        </div>
        <h1>Cadastro de Produtos ProLimp</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome do Produto</label>
            <input 
              type="text" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              required 
              placeholder="Ex: Detergente 5L"
            />
          </div>

          <div className="radio-group">
            <label style={{fontWeight: 'bold', display: 'block', marginBottom: '10px'}}>Origem da Imagem</label>
            <label><input type="radio" name="tipo" checked={tipoImagem === 'link'} onChange={() => setTipoImagem('link')} /> Link Web</label>
            <label style={{marginLeft: '15px'}}><input type="radio" name="tipo" checked={tipoImagem === 'arquivo'} onChange={() => setTipoImagem('arquivo')} /> Upload</label>
          </div>

          <div className="form-group">
            {tipoImagem === 'link' ? (
              <input type="url" placeholder="URL da Imagem" onChange={(e) => setImagem(e.target.value)} />
            ) : (
              <input type="file" accept="image/*" onChange={(e) => setImagem(e.target.files[0])} />
            )}
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input 
              type="text" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              required 
              placeholder="Campo opcional"
            />
          </div>

          <button type="submit" className="btn-salvar">Salvar Produto</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;