// src/pages/Pagamento.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_SUA_CHAVE_PUBLICA_DO_STRIPE');

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = location.state?.cartItems || [];

  useEffect(() => {
    const redirectToCheckout = async () => {
      if (cartItems.length === 0) {
        alert('Carrinho vazio. Redirecionando...');
        return navigate('/');
      }

      const stripe = await stripePromise;

      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });

      const session = await response.json();

      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        alert(result.error.message);
      }
    };

    redirectToCheckout();
  }, [cartItems, navigate]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Redirecionando para o pagamento...</h2>
    </div>
  );
}

export default Pagamento;
