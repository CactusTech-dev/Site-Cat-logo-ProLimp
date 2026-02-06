import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCarrinho } from '../services/CarrinhoContext';
import { useNavigate } from 'react-router-dom';
import './CartIcon.css';

const CartIcon = () => {
  const { totalItens } = useCarrinho(); 
  const navigate = useNavigate();

  if (totalItens === 0) return null;

  return (
    <div className="cart-floating-btn" onClick={() => navigate('/carrinho')}>
      <div className="cart-icon-wrapper">
        <FaShoppingCart />
        <span className="cart-badge-count">{totalItens}</span>
      </div>
    </div>
  );
};

export default CartIcon;