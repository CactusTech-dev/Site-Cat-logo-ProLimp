import React, { useState } from 'react';
import { useCarrinho } from '../services/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaWhatsapp, FaFileAlt, FaPlus, FaMinus } from 'react-icons/fa';
import './Carrinho.css';

const Carrinho = () => {
  const { carrinho, add, remove, deleteItem, clear, totalItens } = useCarrinho();
  const navigate = useNavigate();
  
  // Estados locais apenas para o formulário de envio
  const [nomeCliente, setNomeCliente] = useState('');
  const [observacoes, setObservacoes] = useState('');

  //Formata o texto e abre o link do WhatsApp
  const enviarOrçamentoWhatsApp = () => {
    const meuNumero = "5585999999999"; // Seu número comercial
    let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO - PROLIMP*\n\n`;
    mensagem += `*De:* ${nomeCliente || 'Cliente não identificado'}\n`;
    mensagem += `*Obs:* ${observacoes || 'Nenhuma'}\n\n`;
    mensagem += `*ITENS:*\n`;

    carrinho.forEach(item => {
      mensagem += `• ${item.quantidade}x ${item.nome}\n`;
    });

    // O encodeURIComponent transforma espaços e quebras de linha para formato de URL
    const url = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  //Gera um arquivo TXT para download imediato
  const baixarArquivoPedido = () => {
    let texto = `ORÇAMENTO PROLIMP\n`;
    texto += `====================\n`;
    texto += `Cliente: ${nomeCliente}\n`;
    texto += `Data: ${new Date().toLocaleDateString()}\n\n`;
    carrinho.forEach(item => {
      texto += `${item.quantidade}x ${item.nome}\n`;
    });

    const blob = new Blob([texto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pedido_prolimp_${nomeCliente || 'vendas'}.txt`;
    link.click();
  };

  if (carrinho.length === 0) {
    return (
      <div className="carrinho-vazio-state">
        <h2>Seu carrinho está vazio 😕</h2>
        <p>Adicione produtos no catálogo para solicitar um orçamento.</p>
        <button onClick={() => navigate('/')} className="btn-voltar-catalogo">
          Explorar Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="carrinho-main-container">
      <header className="carrinho-top-bar">
        <button className="btn-back" onClick={() => navigate('/')}>
          <FaArrowLeft /> Voltar ao Catálogo
        </button>
        <h1>Finalizar Orçamento</h1>
      </header>

      <div className="carrinho-layout">
        <section className="lista-produtos-orcamento">
          {carrinho.map(item => (
            <div key={item.id} className="item-orcamento-card">
              <img src={item.imagem || 'https://via.placeholder.com/80'} alt={item.nome} />
              <div className="item-detalhes">
                <h3>{item.nome}</h3>
                <div className="item-qtd-control">
                  <button onClick={() => remove(item)}><FaMinus /></button>
                  <span>{item.quantidade}</span>
                  <button onClick={() => add(item)}><FaPlus /></button>
                </div>
              </div>
              <button className="btn-delete-item" onClick={() => deleteItem(item.id)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <button className="btn-limpar-tudo" onClick={clear}>Limpar Carrinho</button>
        </section>
        <aside className="checkout-sidebar">
          <div className="checkout-card">
            <h3>Dados do Pedido</h3>
            <div className="input-group">
              <label>Nome ou Empresa:</label>
              <input 
                type="text" 
                value={nomeCliente} 
                onChange={(e) => setNomeCliente(e.target.value)}
                placeholder="Ex: Supermercado Pacatuba"
              />
            </div>
            <div className="input-group">
              <label>Observações Adicionais:</label>
              <textarea 
                value={observacoes} 
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Ex: Entregar após as 14h..."
              />
            </div>

            <div className="total-resumo">
              <span>Total de itens:</span>
              <strong>{totalItens}</strong>
            </div>

            <button className="btn-action-whatsapp" onClick={enviarOrçamentoWhatsApp}>
              <FaWhatsapp /> Solicitar via WhatsApp
            </button>
            <button className="btn-action-txt" onClick={baixarArquivoPedido}>
              <FaFileAlt /> Salvar em .TXT
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Carrinho;