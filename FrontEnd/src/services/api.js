const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  
  // Se NÃO for FormData, precisamos avisar que é JSON
  // O FormData o navegador já configura o Content-Type sozinho
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

export const produtoService = {
  // Acesso Público (Catálogo e Admin List)
  listar: async () => {
    const res = await fetch(`${BASE_URL}/produtos`);
    if (!res.ok) throw new Error('Falha ao carregar produtos');
    return res.json();
  },

  // Acesso Protegido (Só Admin)
  salvar: async (formData, id = null) => {
    const url = id ? `${BASE_URL}/produtos/${id}` : `${BASE_URL}/produtos`;
    const method = id ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: getHeaders(true), // Envia o Token
      body: formData
    });
    return res.json();
  },

    excluir: async (id) => {
      const res = await fetch(`${BASE_URL}/produtos/${id}`, {
        method: 'DELETE',
        headers: getHeaders() // Já inclui o Bearer Token e o Content-Type JSON
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.erro || 'Erro ao excluir produto');
      }
      
      return res; // Retorna a resposta para o componente tratar
    }
};

export const pedidoService = {
  listar: async () => {
    const res = await fetch(`${BASE_URL}/pedidos`);
    return res.json();
  },

  criar: async (dadosPedido) => {
    const res = await fetch(`${BASE_URL}/criarPedido`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Sem token, pois o cliente não loga
      body: JSON.stringify(dadosPedido)
    });
    if (!res.ok) throw new Error('Erro ao enviar pedido');
    return res.json();
  },

  cancelar: async (id) => {
    return fetch(`${BASE_URL}/pedidos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
  }
};