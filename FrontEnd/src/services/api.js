const BASE_URL = '/api';

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
  listar: async () => {
    const res = await fetch(`${BASE_URL}/produtos`);
    return res.json();
  },

  salvar: async (formData, id = null) => {
    const url = id ? `${BASE_URL}/produtos/${id}` : `${BASE_URL}/produtos`;
    const method = id ? 'PUT' : 'POST';
    
    const res = await fetch(url, {
      method,
      headers: getHeaders(true), 
      body: formData
    });
    return res.json();
  },

  excluir: async (id) => {
    return fetch(`${BASE_URL}/produtos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
  }
};

export const pedidoService = {
  listar: async () => {
    const res = await fetch(`${BASE_URL}/pedidos`);
    return res.json();
  },

  cancelar: async (id) => {
    return fetch(`${BASE_URL}/pedidos/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
  }
};