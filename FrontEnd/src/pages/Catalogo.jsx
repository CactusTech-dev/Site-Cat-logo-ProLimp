import React from 'react';
import { useEffect, useState } from 'react'



const Catalogo = () => {
  const [produtos, setProdutos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await fetch('http://localhost:3000/api/produtos')
        const data = await response.json()
        setProdutos(data)
      } catch (error) {
        console.error('Erro ao buscar produtos', error)
      } finally {
        setLoading(false)
      }
    }

    carregarProdutos()
  }, [])

  if (loading) {
    return <p>Carregando produtos...</p>
  }
  if(produtos.length > 0){ return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#151a2d' }}>Catálogo de Produtos</h1>
        <p style={{ color: '#151a2d' }} >Bem-vindo à ProLimp! Confira nosssos produtos de limpeza abaixo.</p>
      </header>

      <div> 
      <div className="catalogo">
        {produtos.map(produto => (
          <div key={produto.id} className="card-produto">
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <strong>R$ {produto.preco}</strong>

            {produto.imagem && (
              <img src={produto.imagem} 
              alt={produto.nome}
              style={{ width: '25%', borderRadius: '8px'}}/>
            )}
          </div>
        ))}
      </div>
      </div>

    </div>
  )}else{
    return (
    <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          border: '1px solid #007bff', 
          padding: '15px', 
          borderRadius: '10px',
          textAlign: 'center',
          backgroundColor: '#007bff22'
        }}>
          <p style={{ color: '#151a2d5e' }}>Nenhum produto cadastrado ainda.</p>
        </div>
      </div>
    )};
};

export default Catalogo;