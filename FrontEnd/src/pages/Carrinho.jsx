import React, { useState } from 'react';
import { useCarrinho } from '../services/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaWhatsapp, FaFileAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { pedidoService } from '../services/api'; // ✅ Importação do serviço
import './Carrinho.css';

const Carrinho = () => {
  const { carrinho, add, remove, deleteItem, clear, totalItens } = useCarrinho();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    ident: '',
    numero: '',
    observacao: ''
  });

  const [enviando, setEnviando] = useState(false); // ✅ Feedback de carregamento

  // ✅ Função de download corrigida para usar o estado do formulário
  const baixarArquivoPedido = () => {
    let texto = `ORÇAMENTO PROLIMP\n`;
    texto += `====================\n`;
    texto += `Cliente: ${form.ident || 'Não identificado'}\n`;
    texto += `Contato: ${form.numero}\n`;
    texto += `Data: ${new Date().toLocaleDateString()}\n\n`;
    
    carrinho.forEach(item => {
      texto += `${item.quantidade}x ${item.nome}\n`;
    });

    const blob = new Blob([texto], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pedido_prolimp_${form.ident || 'vendas'}.txt`;
    link.click();
  };

  // ✅ Função de envio integrada ao pedidoService
  const enviarPedido = async () => {
    if (!form.ident.trim() || !form.numero.trim()) {
      alert('Por favor, preencha nome e telefone.');
      return;
    }

    setEnviando(true);

    try {
      const dadosPedido = {
        ident: form.ident,
        numero: form.numero.replace(/\D/g, ""), // ✅ Envia apenas os números ao banco
        observacao: form.observacao,
        produtos: carrinho.map(item => ({
          id: item.id,
          nome: item.nome,
          quantidade: item.quantidade,
          imagem: item.imagem
        }))
      };

      // 1. Salva no Banco de Dados (Supabase via API)
      await pedidoService.criar(dadosPedido);

      // 2. Prepara e abre o WhatsApp
      const meuNumero = "558588805100"; // Substitua pelo seu número
      let mensagem = `*SOLICITAÇÃO DE ORÇAMENTO - PROLIMP*\n\n`;
      mensagem += `*De:* ${dadosPedido.ident}\n`;
      mensagem += `*Contato:* ${form.numero}\n`;
      mensagem += `*Obs:* ${dadosPedido.observacao || 'Nenhuma'}\n\n`;
      mensagem += `*ITENS:*\n`;

      carrinho.forEach(item => {
        mensagem += `• ${item.quantidade}x ${item.nome}\n`;
      });

      const urlWhatsapp = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagem)}`;
      
      alert('Pedido enviado com sucesso!');
      window.open(urlWhatsapp, '_blank');

      // 3. Finaliza
      clear();
      navigate('/');

    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao processar pedido. Verifique sua conexão.');
    } finally {
      setEnviando(false);
    }
  };

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }
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
                src={item.imagem}
                alt={item.nome}
                className="carrinho-item-img"
                onError={(e) => e.target.src = '/img-falha.png'}
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
          <button className="btn-limpar-tudo" onClick={clear}>
            <FaTrash size={12} /> Limpar Carrinho
          </button>
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
                type="text"
                value={form.numero}
                onChange={handleTelefoneChange}
                placeholder="(85) 99999-9999"
                maxLength="15"
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

            <button 
              className="btn-action-whatsapp" 
              onClick={enviarPedido}
              disabled={enviando}
            >
              <FaWhatsapp /> {enviando ? 'Enviando...' : 'Solicitar via WhatsApp'}
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