// src/pages/Carrinho.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContexts';
import { useNavigate } from 'react-router-dom';


const simulatedCartItems = [
  {
    id: 1,
    name: 'Pizza Margherita',
    price: 'R$ 39,90',
    quantity: 2,
    image: '/assets/pizza1.jpg',
  },
  {
    id: 2,
    name: 'Pizza Pepperoni',
    price: 'R$ 49,90',
    quantity: 1,
    image: '/assets/pizza2.jpg',
  },
  {
    id: 3,
    name: 'Pizza Quatro Queijos',
    price: 'R$ 59,90',
    quantity: 3,
    image: '/assets/pizza3.jpg',
  },
];

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
  //const { cartItems } = useContext(CartContext);  
  const cartItems = simulatedCartItems;

  const total = cartItems.reduce(
    (acc, item) =>
      acc + parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity,
    0
  );

  const navigate = useNavigate();

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
              parseFloat(item.price.replace('R$', '').replace(',', '.')) * item.quantity;

            return (
              <CartItem key={item.id}>
                <PizzaImage src={item.image} alt={item.name} />
                <InfoArea>
                  <PizzaName>{item.name}</PizzaName>
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
