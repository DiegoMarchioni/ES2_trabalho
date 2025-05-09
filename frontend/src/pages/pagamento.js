// src/pages/Pagamento.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_PUBLICKEYSTRIPE');

function Pagamento() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: 'admin', password: 'mudar123' }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch((err) => console.error('Erro ao autenticar:', err));
  }, []);

  const cartItems = location.state?.cartItems || [];

  useEffect(() => {
    const redirectToCheckout = async () => {
      if (!token) return;
      if (cartItems.length === 0) {
        alert('Carrinho vazio. Redirecionando...');
        return navigate('/');
      }

      const stripe = await stripePromise;
      console.log(token);
      const response = await fetch('http://localhost:8080/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
        body: JSON.stringify(cartItems.map(cartItem => {cartItem.order.user = null; cartItem.order.deliveryAddress = null;console.log(cartItem); return cartItem;})),
      });
      try{
        const session = await response.json();

        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          alert(result.error.message);
        }
      } catch(e){
        console.log(response);
      }


    };

    redirectToCheckout();
  }, [cartItems, token, navigate]);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Redirecionando para o pagamento...</h2>
    </div>
  );
}

export default Pagamento;
