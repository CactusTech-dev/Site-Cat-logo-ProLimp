import React, { useEffect, useState } from 'react';
import ThemeToggle from '../components/ThemeToggle'; 
import { useCarrinho } from '../services/CarrinhoContext'; 
import './Catalogo.css';

const Catalogo = ({ tema, toggleTema }) => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  const { add } = useCarrinho();

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch('http://localhost:3000/api/produtos');
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
    setQuantidade(1); 
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
  };

  const handleAdicionarAoCarrinho = () => {
    for(let i = 0; i < quantidade; i++) {
      add(produtoSelecionado);
    }
    
    fecharModal(); 
  };

  if (loading) return <div className="loading">Carregando produtos...</div>;

  return (
    <div className="catalogo-page">
      <ThemeToggle tema={tema} toggleTema={toggleTema} />

      <header className="catalogo-header">
        <h1>Catálogo de Produtos</h1>
        <p>Bem-vindo à ProLimp! Confira nossos produtos de limpeza abaixo.</p>
      </header>

      {produtos.length > 0 ? (
        <div className="produtos-grid">
          {produtos.map(produto => (
            <div key={produto.id} className="card-produto" onClick={() => abrirModal(produto)}>
              <div className="img-container">
                {produto.imagem ? (
                  <img
                    src={
                      produto.imagem.startsWith('http')
                        ? produto.imagem
                        : `http://localhost:3000${produto.imagem}`
                    }
                    alt={produto.nome}
                  />
                ) : (
                  <div className="sem-foto">Sem Imagem</div>
                )}
              </div>
              <div className="card-info">
                <h3>{produto.nome}</h3>
                <div className="card-footer">
                  <button className="btn-whatsapp">Ver detalhes</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="vazio-container">
          <p>Nenhum produto cadastrado ainda.</p>
        </div>
      )}

      {produtoSelecionado && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-fechar" onClick={fecharModal}>&times;</button>
            
            <div className="modal-container">
              <div className="modal-img-box">
                <img
                    src={
                      produtoSelecionado.imagem.startsWith('http')
                        ? produtoSelecionado.imagem
                        : `http://localhost:3000${produtoSelecionado.imagem}`
                    }
                    alt={produtoSelecionado.nome}
                  />
              </div>

              <div className="modal-info">
                <h2>{produtoSelecionado.nome}</h2>
                <p className="modal-descricao">{produtoSelecionado.descricao}</p>
                
                <div className="seletor-quantidade">
                  <label>Quantidade:</label>
                  <div className="controles">
                    <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-1</button>
                    <span className="qtd-numero">{quantidade}</span>
                    <button onClick={() => setQuantidade(q => q + 1)}>+1</button>
                    <button className="btn-mais-dez" onClick={() => setQuantidade(q => q + 10)}>+10</button>
                  </div>
                </div>
                <button className="btn-confirmar" onClick={handleAdicionarAoCarrinho}>
                  Adicionar ao Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;