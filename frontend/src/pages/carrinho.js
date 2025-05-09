// src/pages/Carrinho.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  padding: 40px 20px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
`;

const CartItem = styled.div`
  display: flex;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 0 auto 20px;
  max-width: 900px;
`;

const PizzaImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const InfoArea = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PizzaName = styled.h3`
  font-size: 1.8rem;
  color: #e63946;
  margin: 0 0 10px;
`;

const PizzaDetails = styled.p`
  font-size: 1rem;
  color: #555;
`;

const ItemTotal = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #e63946;
  margin-top: auto;
`;

const TotalPrice = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-top: 30px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

const CheckoutButton = styled.button`
  display: block;
  margin: 20px auto 0;
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #d62828;
  }
`;

function Carrinho() {
  const [token, setToken] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Autentica e busca token
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

  // Busca os pedidos com token
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:8080/orders', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((orders) => {
        // Pega o último pedido com items
        let formattedOrders = [];
        orders.forEach(order => {
            let index = formattedOrders.findIndex(formatOrder => order.dish.id === formatOrder.dish.id);
            if(index === -1)formattedOrders.push(order);
            else {
              formattedOrders[index].quantity += 1;
            }
        });
        setCartItems(formattedOrders);
        
      })
      .catch((err) => console.error('Erro ao buscar pedidos:', err));
  }, [token]);

  const total = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat((item.price + "").replace('R$', '').replace(',', '.')) * item.quantity,
    0
  );

  const handleGoToPayment = () => {
    navigate('/pagamento', { state: { cartItems } });
  };

  return (
    <PageContainer>
      <Title>Seu Carrinho</Title>

      {cartItems.length === 0 ? (
        <EmptyMessage>O carrinho está vazio.</EmptyMessage>
      ) : (
        <>
          {cartItems.map((item) => {
            const subtotal =
              parseFloat((item.price + "").replace('R$', '').replace(',', '.')) * item.quantity;

            return (
              <CartItem key={item.id}>
                <PizzaImage src="https://pizzapoint.com.br/wp-content/uploads/2024/05/pizza.png" alt={item.name} />
                <InfoArea>
                  <PizzaName>{item.dish.name}</PizzaName>
                  <PizzaDetails>
                    {item.price} x {item.quantity}
                  </PizzaDetails>
                  <ItemTotal>
                    R$ {subtotal.toFixed(2).replace('.', ',')}
                  </ItemTotal>
                </InfoArea>
              </CartItem>
            );
          })}

          <TotalPrice>Total: R$ {total.toFixed(2).replace('.', ',')}</TotalPrice>
          <CheckoutButton onClick={handleGoToPayment}>
            Finalizar Compra
          </CheckoutButton>
        </>
      )}
    </PageContainer>
  );
}

export default Carrinho;
