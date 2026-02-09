import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/LogoProLimp.jpg';
import './Admin.css';

const Admin = ({ setAutenticado }) => {

  /* ============================
     ESTADOS PRINCIPAIS
  ============================ */

  // Controla qual tela (aba) está visível
  const [aba, setAba] = useState('menu');

  // Lista de produtos VINDOS DO BACKEND
  const [produtos, setProdutos] = useState([]);

  // Estado do formulário (criar / editar)
  const [form, setForm] = useState({
    id: null,
    nome: '',
    desc: '',
    tipo: 'link',
    file: null
  });

  const navigate = useNavigate();

  /* ============================
     BUSCAR PRODUTOS (GET)
  ============================ */
  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await fetch('http://localhost:3000/api/produtos');
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      }
    }

    carregarProdutos();
  }, []);

  /* ============================
     LOGOUT
  ============================ */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setAutenticado(false);
    navigate('/login');
  };

  /* ============================
     UPLOAD DE ARQUIVO
  ============================ */
  const handleFile = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  /* ============================
     CRIAR / EDITAR PRODUTO
  ============================ */
  const save = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      // FormData é obrigatório para upload de arquivos
      const formData = new FormData();
      formData.append('nome', form.nome);
      formData.append('descricao', form.desc);
      formData.append('preco', 10); // pode virar input depois

      if (form.tipo === 'arquivo' && form.file) {
        formData.append('imagem', form.file);
      }

      const url = form.id
        ? `http://localhost:3000/api/produtos/${form.id}`
        : `http://localhost:3000/api/produtos`;

      const method = form.id ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      // Recarrega a lista após salvar
      const res = await fetch('http://localhost:3000/api/produtos');
      const data = await res.json();
      setProdutos(data);

      // Limpa formulário e volta ao menu
      setForm({ id: null, nome: '', desc: '', tipo: 'link', file: null });
      setAba('menu');

    } catch (error) {
      console.error('Erro ao salvar produto', error);
    }
  };

  /* ============================
     EXCLUIR PRODUTO (DELETE)
  ============================ */
  const excluirProduto = async (id) => {
    try {
      const token = localStorage.getItem('token');

      await fetch(`http://localhost:3000/api/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Atualiza lista local
      setProdutos(produtos.filter(p => p.id !== id));

    } catch (error) {
      console.error('Erro ao excluir produto', error);
    }
  };

  /* ============================
     HEADER REUTILIZÁVEL
  ============================ */
  const Header = ({ title }) => (
    <div className="admin-header-min">
      <button
        className="btn-voltar-simples"
        onClick={() => setAba('menu')}
      >
        <FaArrowLeft /> Voltar
      </button>
      <h1>{title}</h1>
    </div>
  );

  /* ============================
     RENDER
  ============================ */
  return (
    <div className="admin-container">

      <button onClick={handleLogout} className="btn-logout">
        Sair
      </button>

      {/* MENU PRINCIPAL */}
      {aba === 'menu' && (
        <div className="admin-dashboard">
          <a href='http://localhost:5173/'><img src={logo} alt="Logo" className="admin-logo" /></a>
          <h1>Gestão de Produtos</h1>
          <p className="admin-subtitle">O que você deseja fazer?</p>

          <div className="admin-grid">
            <div className="action-card" onClick={() => setAba('adicionar')}>
              <div className="icon-box add"><FaPlus /></div>
              <h3>Adicionar</h3>
            </div>

            <div className="action-card" onClick={() => setAba('editar')}>
              <div className="icon-box edit"><FaEdit /></div>
              <h3>Editar</h3>
            </div>

            <div className="action-card" onClick={() => setAba('excluir')}>
              <div className="icon-box del"><FaTrash /></div>
              <h3>Excluir</h3>
            </div>
          </div>
        </div>
      )}

      {/* FORMULÁRIO */}
      {(aba === 'adicionar' || aba === 'edit-form') && (
        <div className="admin-card">
          <Header title={form.id ? 'Editar Produto' : 'Novo Produto'} />

          <form onSubmit={save}>
            <input
              placeholder="Nome"
              value={form.nome}
              onChange={e => setForm({ ...form, nome: e.target.value })}
              required
            />

            <textarea
              placeholder="Descrição"
              value={form.desc}
              onChange={e => setForm({ ...form, desc: e.target.value })}
              required
            />

            <div className="radio-group-min">
              <label>
                <input
                  type="radio"
                  checked={form.tipo === 'link'}
                  onChange={() => setForm({ ...form, tipo: 'link' })}
                />
                Link
              </label>

              <label>
                <input
                  type="radio"
                  checked={form.tipo === 'arquivo'}
                  onChange={() => setForm({ ...form, tipo: 'arquivo' })}
                />
                Arquivo
              </label>
            </div>

            {form.tipo === 'arquivo' && (
              <input type="file" onChange={handleFile} />
            )}

            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </form>
        </div>
      )}

      {/* LISTAGEM */}
      {(aba === 'editar' || aba === 'excluir') && (
        <div className="admin-list-container">
          <Header title={aba === 'editar' ? 'Editar' : 'Excluir'} />

          <table className="admin-table">
            <tbody>
              {produtos.map(p => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <img className='img-admin-container'
                    src={
                      p.imagem.startsWith('http')
                        ? p.imagem
                        : `http://localhost:3000${p.imagem}`
                    }
                    alt={p.nome}
                  />
                  <td style={{ textAlign: 'right' }}>
                    {aba === 'editar' ? (
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setForm({
                            id: p.id,
                            nome: p.nome,
                            desc: p.descricao,
                            tipo: 'link'
                          });
                          setAba('edit-form');
                        }}
                      >
                        Editar
                      </button>
                    ) : (
                      <button
                        className="btn-delete"
                        onClick={() => excluirProduto(p.id)}
                      >
                        Excluir
                      </button>
                    )}
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
