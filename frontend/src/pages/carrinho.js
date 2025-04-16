// src/pages/Carrinho.js
import React, { useContext } from 'react';
import { CartContext } from '../contexts/cartContexts';

function Carrinho() {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity,
    0
  );

  return (
    <div>
      <h2>Seu Carrinho</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x {item.price}
            </li>
          ))}
        </ul>
      )}
      <p>Total: R$ {total.toFixed(2).replace('.', ',')}</p>
      {/* Botão para finalizar a compra */}
    </div>
  );
}

export default Carrinho;
