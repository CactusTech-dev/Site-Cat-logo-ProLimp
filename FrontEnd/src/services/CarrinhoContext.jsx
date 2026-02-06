import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState(() => 
    JSON.parse(localStorage.getItem('carrinho_prolimp')) || []
  );

  // Sincronização com LocalStorage
  useEffect(() => {
    localStorage.setItem('carrinho_prolimp', JSON.stringify(carrinho));
  }, [carrinho]);

  // Função Mestre: Gerencia adição e alteração de quantidade em uma só lógica
  const updateCart = (produto, delta = 1) => {
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === produto.id);
      
      if (existe) {
        const novaQtd = existe.quantidade + delta;
        if (novaQtd <= 0) return prev.filter(item => item.id !== produto.id);
        
        return prev.map(item => 
          item.id === produto.id ? { ...item, quantidade: novaQtd } : item
        );
      }
      return delta > 0 ? [...prev, { ...produto, quantidade: 1 }] : prev;
    });
  };

  const actions = {
    carrinho,
    totalItens: useMemo(() => carrinho.reduce((acc, p) => acc + p.quantidade, 0), [carrinho]),
    add: (p) => updateCart(p, 1),
    remove: (p) => updateCart(p, -1),
    deleteItem: (id) => setCarrinho(prev => prev.filter(item => item.id !== id)),
    clear: () => setCarrinho([])
  };

  return (
    <CarrinhoContext.Provider value={actions}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);