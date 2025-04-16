import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Container principal da página
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  padding: 40px 20px;
`;

// Título da página
const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
`;

// Exibição simples do carrinho
const CartInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #555;
`;

// Grid responsivo para os itens do cardápio
const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

// Card de cada item com animação
const MenuItemCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

// Imagem do item
const PizzaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Container com as informações do item
const PizzaInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Nome do item
const PizzaTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.8rem;
  color: #e63946;
`;

// Descrição do item
const PizzaDescription = styled.p`
  flex: 1;
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
`;

// Preço do item
const PizzaPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

// Botão para adicionar ao carrinho
const AddButton = styled.button`
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-top: 15px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #d62828;
  }
`;

function Cardapio() {
  // Estado para o carrinho
  const [cart, setCart] = useState([]);

  // Dados fictícios dos itens do cardápio
  const pizzas = [
    {
      id: 1,
      name: 'Pizza Margherita',
      description: 'Molho de tomate artesanal, mussarela de alta qualidade e folhas de manjericão fresco.',
      price: 'R$ 39,90',
      image: '/assets/pizza1.jpg',
    },
    {
      id: 2,
      name: 'Pizza Pepperoni',
      description: 'Fatias suculentas de pepperoni, mussarela e molho especial da casa.',
      price: 'R$ 49,90',
      image: '/assets/pizza2.jpg',
    },
    {
      id: 3,
      name: 'Pizza Quatro Queijos',
      description: 'Uma combinação irresistível de mussarela, cheddar, gorgonzola e parmesão.',
      price: 'R$ 59,90',
      image: '/assets/pizza3.jpg',
    },
    {
      id: 4,
      name: 'Pizza Vegetariana',
      description: 'Mix de legumes frescos, azeitonas, cebola roxa e pimentões, tudo sobre uma base leve.',
      price: 'R$ 44,90',
      image: '/assets/pizza4.jpg',
    },
  ];

  // Função para adicionar um item ao carrinho
  const handleAddToCart = (pizza) => {
    setCart((prevCart) => [...prevCart, pizza]);
    console.log('Carrinho atual:', [...cart, pizza]);
  };

  return (
    <PageContainer>
      <Title>Nosso Cardápio</Title>

      {/* Exibe a quantidade atual de itens no carrinho */}
      <CartInfo>Total de Itens no Carrinho: {cart.length}</CartInfo>

      <MenuGrid>
        {pizzas.map((pizza, index) => (
          <MenuItemCard
            key={pizza.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <PizzaImage src={pizza.image} alt={pizza.name} />
            <PizzaInfo>
              <PizzaTitle>{pizza.name}</PizzaTitle>
              <PizzaDescription>{pizza.description}</PizzaDescription>
              <PizzaPrice>{pizza.price}</PizzaPrice>
              <AddButton onClick={() => handleAddToCart(pizza)}>
                Adicionar ao Carrinho
              </AddButton>
            </PizzaInfo>
          </MenuItemCard>
        ))}
      </MenuGrid>
    </PageContainer>
  );
}

export default Cardapio;
