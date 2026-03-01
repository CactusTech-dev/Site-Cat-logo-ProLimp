import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaPager, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/LogoProLimp.jpg';
import './Admin.css';

// Importando os Componentes
import OrderSection from '../components/AdminGestao/OrderSection';
import ProductForm from '../components/AdminGestao/ProductForm';
import ProductList from '../components/AdminGestao/ProductList';

// Importando os Serviços da API
import { produtoService, pedidoService } from '../services/api';

const Admin = ({ setAutenticado }) => {
  const [aba, setAba] = useState('menu');
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({ id: null, nome: '', desc: '', tipo: 'link', imagemUrl: '', file: null });

  const navigate = useNavigate();

  /* ============================
     CARREGAMENTO DE DADOS
  ============================ */
  const carregarDados = async () => {
    try {
      const listaProds = await produtoService.listar();
      setProdutos(listaProds);
      
      // Só carrega pedidos se estiver na aba de pedidos
      if (aba === 'pedido') {
        const listaPedidos = await pedidoService.listar();
        setPedidos(listaPedidos);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [aba]);

  /* ============================
     AÇÕES (PRODUTOS E PEDIDOS)
  ============================ */
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nome', form.nome);
      formData.append('descricao', form.desc); // Verifique se o backend espera 'desc' ou 'descricao'
      formData.append('preco', "0"); // Envie como string se for FormData

      if (form.tipo === 'arquivo') {
        if (form.file) {
          formData.append('imagem', form.file); // Envia o arquivo físico
        }
      } else {
        formData.append('imagemUrl', form.imagemUrl); // Envia a URL como string
      }

      // O segredo: passe o formData e o id
      await produtoService.salvar(formData, form.id);
      
      alert('Sucesso!');
      setForm({ id: null, nome: '', desc: '', tipo: 'link', imagemUrl: '', file: null });
      setAba('menu');
      carregarDados();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar: ' + (error.message || 'Verifique os campos'));
    }
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este produto?")) return;
    try {
      await produtoService.excluir(id);
      setProdutos(produtos.filter(p => p.id !== id));
    } catch (error) {
      alert('Erro ao excluir');
    }
  };

  const handleCancelarPedido = async (id) => {
    if (!window.confirm("Deseja realmente finalizar esse pedido?")) return;
    try {
      await pedidoService.cancelar(id);
      setPedidos(pedidos.filter(p => p.id !== id));
    } catch (error) {
      alert('Erro ao cancelar pedido');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAutenticado(false);
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <button onClick={handleLogout} className="btn-logout">Sair</button>

      {/* MENU PRINCIPAL */}
      {aba === 'menu' && (
        <div className="admin-dashboard">
          <a href='/'>
          <img src={logo} alt="Logo" className="admin-logo" />
          </a>
          <h1>Gestão de Produtos</h1>
          <p className="admin-subtitle">O que você deseja fazer?</p>
          <div className="admin-grid">
            <div className="action-card" onClick={() => setAba('adicionar')}><div className="icon-box add"><FaPlus /></div><h3>Adicionar</h3></div>
            <div className="action-card" onClick={() => setAba('editar')}><div className="icon-box edit"><FaEdit /></div><h3>Editar</h3></div>
            <div className="action-card" onClick={() => setAba('excluir')}><div className="icon-box del"><FaTrash /></div><h3>Excluir</h3></div>
            <div className="action-card" onClick={() => setAba('pedido')}><div className="icon-box del"><FaPager /></div><h3>Pedidos</h3></div>
          </div>
        </div>
      )}

      {/* FORMULÁRIO */}
      {(aba === 'adicionar' || aba === 'edit-form') && (
        <ProductForm 
          form={form} setForm={setForm} onSave={handleSave} 
          onVoltar={() => setAba('menu')} handleFile={(e) => setForm({ ...form, file: e.target.files[0] })} 
        />
      )}

      {/* LISTAGEM */}
      {(aba === 'editar' || aba === 'excluir') && (
        <ProductList 
          produtos={produtos} aba={aba} onVoltar={() => setAba('menu')} 
          onDelete={handleExcluir} onEdit={(p) => {
            setForm({ id: p.id, nome: p.nome, desc: p.descricao, tipo: p.imagem?.startsWith('http') ? 'link' : 'arquivo', imagemUrl: p.imagem?.startsWith('http') ? p.imagem : '', file: null });
            setAba('edit-form');
          }} 
        />
      )}

      {/* PEDIDOS */}
      {aba === 'pedido' && (
        <OrderSection pedidos={pedidos} onVoltar={() => setAba('menu')} onCancelar={handleCancelarPedido} />
      )}
    </div>
  );
};

export default Admin;
