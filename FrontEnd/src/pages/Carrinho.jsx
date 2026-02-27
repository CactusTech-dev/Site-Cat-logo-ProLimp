import React, { useState } from 'react';
import { useCarrinho } from '../services/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaWhatsapp, FaFileAlt, FaPlus, FaMinus } from 'react-icons/fa';
import './Carrinho.css';

const Carrinho = () => {
  const { carrinho, add, remove, deleteItem, clear, totalItens } = useCarrinho();
  const navigate = useNavigate();
  
  // Estados locais apenas para o formulário de envio
  const [form, setForm] = useState({
    ident: '',
    numero: '',        // ✅ ADICIONE ISTO
    observacao: ''
  });

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

const enviarPedido = async () => {
  // 1. Validações básicas
  if (!form.ident.trim()) {
    alert('Por favor, informe seu nome ou empresa.');
    return;
  }
  if (!form.numero.trim()) {
    alert('Informe um telefone para contato.');
    return;
  }
  if (carrinho.length === 0) return;

  try {
    // 2. Montagem do objeto (igual ao que o seu Controller espera)
    const pedido = {
      ident: form.ident,
      numero: form.numero,
      observacao: form.observacao,
      // Convertemos o array para string se o seu banco não for JSONB, 
      // mas o ideal é enviar como objeto e o repository tratar.
      produtos: carrinho.map(item => ({
        id: item.id,
        nome: item.nome,
        quantidade: item.quantidade,
        imagem: item.imagem
      }))
    };

    // 3. Envio para a API (Ajuste a URL conforme seu BASE_URL do services/api.js)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    
    const response = await fetch(`${API_URL}/api/pedido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) {
      throw new Error('Falha ao registrar pedido no servidor.');
    }

    // 4. Se deu certo no banco, agora abre o WhatsApp
    const meuNumero = "5585999999999"; // Substitua pelo seu número real
    let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO - PROLIMP*\n\n`;
    mensagem += `*De:* ${pedido.ident}\n`;
    mensagem += `*Contato:* ${pedido.numero}\n`;
    mensagem += `*Obs:* ${pedido.observacao || 'Nenhuma'}\n\n`;
    mensagem += `*ITENS:*\n`;

    carrinho.forEach(item => {
      mensagem += `• ${item.quantidade}x ${item.nome}\n`;
    });

    const urlWhatsapp = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagem)}`;
    
    alert('Pedido registrado com sucesso! Redirecionando para o WhatsApp...');
    window.open(urlWhatsapp, '_blank');

    // 5. Limpa o carrinho e volta para o início
    clear();
    navigate('/');

  } catch (error) {
    console.error('Erro no checkout:', error);
    alert('Ocorreu um erro ao processar seu pedido. Tente novamente.');
  }
};

const handleTelefoneChange = (e) => {
  let value = e.target.value;

  // 1. Remove tudo que não for número
  value = value.replace(/\D/g, "");

  // 2. Aplica a máscara (XX) XXXXX-XXXX
  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
  }

  // 3. Limita a 11 dígitos (DDD + 9 dígitos)
  if (value.length > 15) value = value.slice(0, 15);

  setForm({ ...form, numero: value });
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
              <img
                src={item.imagem} // Simplificado, pois o link agora é absoluto do Supabase
                alt={item.nome}
                className="carrinho-item-img"
                onError={(e) => e.target.src = '/caminho/para/imagem-padrao.png'}
              />
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
                value={form.ident}
                onChange={(e) => setForm({ ...form, ident: e.target.value })}
                placeholder="Ex: Supermercado Pacatuba"
              />
            </div>
            <div className="input-group">
              <label>Telefone / WhatsApp:</label>
              <input
                type="text" // Usamos text para a máscara funcionar visualmente
                value={form.numero}
                onChange={handleTelefoneChange}
                placeholder="(85) 99999-9999"
                maxLength="15" // Previne entradas gigantes
              />
            </div>
            <div className="input-group">
              <label>Observações Adicionais:</label>
              <textarea
                value={form.observacao}
                onChange={(e) => setForm({ ...form, observacao: e.target.value })}
                placeholder="Ex: Entregar após as 14h..."
              />
            </div>

            <div className="total-resumo">
              <span>Total de itens:</span>
              <strong>{totalItens}</strong>
            </div>

            <button className="btn-action-whatsapp" onClick={enviarPedido}>
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