// src/pages/Acompanhamento.js
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

const DeliveryInfo = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Status = styled.p`
  font-size: 1.5rem;
  color: #e63946;
`;

const EstimatedTime = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #777;
`;

const HomeButton = styled.button`
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

function Acompanhamento() {
  const [orderStatus, setOrderStatus] = useState(null);
  const navigate = useNavigate();

  // Simulando dados de um pedido
  /*const pedido = {
    id: 12345,
    status: 'Em andamento',
    estimated_delivery_time: '30-40 minutos',
  };*/
  const pedido = null; // Não há pedido para acompanhamento

  useEffect(() => {
    if (pedido) {
      // Aqui você pode fazer a chamada para a API da Uber
      fetchDeliveryStatus();
    }
  }, [pedido]);

  const fetchDeliveryStatus = async () => {
    try {
      const response = await fetch('https://api.uber.com/v1/delivery_status', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer SUA_CHAVE_DE_AUTENTICAÇÃO',
        },
      });
      const data = await response.json();
      setOrderStatus(data);
    } catch (error) {
      console.error('Erro ao buscar o status da entrega:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <Title>Acompanhamento da Entrega</Title>

      {!pedido ? (
        <EmptyMessage>Não há pedidos para acompanhar. <br />Volte à página inicial.</EmptyMessage>
      ) : (
        <DeliveryInfo>
          <Status>Status do Pedido: {orderStatus ? orderStatus.status : pedido.status}</Status>
          <EstimatedTime>
            Tempo estimado para entrega: {orderStatus ? orderStatus.estimated_delivery_time : pedido.estimated_delivery_time}
          </EstimatedTime>
        </DeliveryInfo>
      )}

      <HomeButton onClick={handleGoHome}>Voltar para a Página Inicial</HomeButton>
    </PageContainer>
  );
}

export default Acompanhamento;
