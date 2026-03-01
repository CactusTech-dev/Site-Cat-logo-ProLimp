const BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // IMPORTANTE: Para FormData, o fetch define o Content-Type + Boundary automaticamente.
  // Se forçarmos 'application/json' ou deixarmos vazio, o backend não lê o arquivo.
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

export const produtoService = {
  listar: async () => {
    const res = await fetch(`${BASE_URL}/produtos`);
    if (!res.ok) throw new Error('Falha ao carregar produtos');
    return res.json();
  },

  salvar: async (formData, id = null) => {
    const url = id ? `${BASE_URL}/produtos/${id}` : `${BASE_URL}/produtos`;
    const method = id ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: getHeaders(true), // Avisa que é FormData para não setar Content-Type
      body: formData
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.erro || 'Erro ao salvar produto');
    }
    return res.json();
  },

  excluir: async (id) => {
    const res = await fetch(`${BASE_URL}/produtos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Erro ao excluir produto');
    return res;
  }
};

export const pedidoService = {
  listar: async () => {
    const res = await fetch(`${BASE_URL}/pedidos`);
    return res.json();
  },

  criar: async (dadosPedido) => {
    const res = await fetch(`${BASE_URL}/pedidos`, {
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