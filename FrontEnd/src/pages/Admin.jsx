import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/LogoProLimp.jpg';
import './Admin.css';

const Admin = ({ setAutenticado }) => {
  const [aba, setAba] = useState('menu');
  const [produtos, setProdutos] = useState(JSON.parse(localStorage.getItem('prods')) || []);
  const [form, setForm] = useState({ id: null, nome: '', desc: '', img: '', tipo: 'link' });
  const navigate = useNavigate();

  useEffect(() => localStorage.setItem('prods', JSON.stringify(produtos)), [produtos]);

  const handleLogout = () => { localStorage.removeItem('token'); setAutenticado(false); navigate('/login'); };
  
  const handleFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => setForm({...form, img: reader.result});
    reader.readAsDataURL(e.target.files[0]);
  };

  const save = (e) => {
    e.preventDefault();
    if (form.id) setProdutos(produtos.map(p => p.id === form.id ? form : p));
    else setProdutos([...produtos, { ...form, id: Date.now() }]);
    setAba('menu'); setForm({ id: null, nome: '', desc: '', img: '', tipo: 'link' });
  };

  // --- Sub-Componentes para reduzir o JSX principal ---
  const Header = ({ title }) => (
    <div className="admin-header-min">
      <button className="btn-voltar-simples" onClick={() => setAba('menu')}><FaArrowLeft /> Voltar</button>
      <h1>{title}</h1>
    </div>
  );

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="btn-logout">Sair</button>

      {/* VIEW: MENU PRINCIPAL */}
      {aba === 'menu' && (
        <div className="admin-dashboard">
          <img src={logo} alt="Logo" className="admin-logo" />
          <h1>Gestão de Produtos</h1>
          <p className="admin-subtitle">O que você deseja fazer hoje?</p>
          <div className="admin-grid">
            {[ {a: 'add', i: <FaPlus />, t: 'Adicionar', c: 'adicionar'}, 
            {a: 'edit', i: <FaEdit />, t: 'Editar', c: 'editar'}, {a: 'del', i: <FaTrash />, t: 'Excluir', c: 'excluir'} ].map(item => (
              <div key={item.a} className="action-card" onClick={() => setAba(item.c)}>
                <div className={`icon-box ${item.a}`}>{item.i}</div>
                <div className="card-info"><h3>{item.t}</h3><p>Clique para gerenciar</p></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: FORMULÁRIO (ADICIONAR/EDITAR) */}
      {(aba === 'adicionar' || aba === 'edit-form') && (
        <div className="admin-card">
          <Header title={form.id ? "Editar" : "Novo Produto"} />
          <form onSubmit={save}>
            <input placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
            <input placeholder="Descrição" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} required />
            <div className="radio-group-min">
              <input type="radio" checked={form.tipo === 'link'} onChange={() => setForm({...form, tipo: 'link'})} /> Link
              <input type="radio" checked={form.tipo === 'arquivo'} onChange={() => setForm({...form, tipo: 'arquivo'})} /> Arquivo
            </div>
            {form.tipo === 'link' ? 
              <input placeholder="URL" value={form.img} onChange={e => setForm({...form, img: e.target.value})} /> :
              <input type="file" onChange={handleFile} />
            }
            <button type="submit" className="btn-salvar">Salvar</button>
          </form>
        </div>
      )}

      {/* VIEW: LISTAGEM */}
      {(aba === 'editar' || aba === 'excluir') && (
        <div className="admin-list-container">
          <Header title={aba === 'editar' ? "Editar" : "Excluir"} />
          <table className="admin-table">
            <tbody>
              {produtos.map(p => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td style={{textAlign: 'right'}}>
                    {aba === 'editar' ? 
                      <button className="btn-edit" onClick={() => { setForm(p); setAba('edit-form'); }}>Editar</button> :
                      <button className="btn-delete" onClick={() => setProdutos(produtos.filter(i => i.id !== p.id))}>Excluir</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;