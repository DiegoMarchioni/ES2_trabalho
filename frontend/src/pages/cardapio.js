import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: #f9f9f9;
  padding: 40px 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.5rem;
  color: #333;
`;

// const CartInfo = styled.div`
//   text-align: center;
//   margin-bottom: 20px;
//   font-size: 1.2rem;
//   color: #555;
// `;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuItemCard = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const PizzaImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PizzaInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PizzaTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.8rem;
  color: #e63946;
`;

const PizzaDescription = styled.p`
  flex: 1;
  font-size: 1rem;
  color: #555;
  margin-bottom: 15px;
`;

const PizzaPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

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
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  // Autentica e busca o token ao montar
  useEffect(() => {
    // Login e obtenção do token
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ login: 'admin', password: 'mudar123' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        console.log(data.token);
      })
      .catch((err) => console.error('Erro ao autenticar:', err));
  }, []);

  // Busca as pizzas
  useEffect(() => {
    fetch('http://localhost:8080/dishes')
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar pizzas:', err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (pizza) => {
    setCart((prevCart) => [...prevCart, pizza]);

    const body = {
      quantity: 1,
      price: pizza.price,
      dish: pizza, // estrutura esperada no backend
    };
    fetch('http://localhost:8080/order-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.status === 417) throw new Error('Erro ao enviar item ao pedido');
        return res.json();
      })
      .then((data) => {
        console.log('Item adicionado ao pedido com sucesso:', data);
      })
      .catch((error) => {
        navigate("/cadastro-endereco");
      });
  };

  return (
    <PageContainer>
      <Title>Nosso Cardápio</Title>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Carregando pizzas...</p>
      ) : (
        <MenuGrid>
          {pizzas.map((pizza, index) => (
            <MenuItemCard
              key={pizza.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <PizzaImage
                src={`https://pizzapoint.com.br/wp-content/uploads/2024/05/pizza.png`}
                alt={pizza.name}
              />
              <PizzaInfo>
                <PizzaTitle>{pizza.name}</PizzaTitle>
                <PizzaDescription>{pizza.description}</PizzaDescription>
                <PizzaPrice>
                  R$ {Number(pizza.price).toFixed(2).replace('.', ',')}
                </PizzaPrice>
                <AddButton onClick={() => handleAddToCart(pizza)}>
                  Adicionar ao Carrinho
                </AddButton>
              </PizzaInfo>
            </MenuItemCard>
          ))}
        </MenuGrid>
      )}
    </PageContainer>
  );
}

export default Cardapio;