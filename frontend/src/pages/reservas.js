// src/pages/ReservationPage.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animação simples usando keyframes do styled-components
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Container da página com fundo moderno e centralização
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// Formulário com animação de entrada (usando framer-motion e styled-components)
const ReservationForm = styled(motion.form)`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 500px;
  width: 100%;
  animation: ${fadeIn} 0.8s ease-out;
`;

// Título do formulário
const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

// Estilização dos grupos de formulário
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// Rótulo dos campos
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

// Input com foco com transição
const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #e63946;
    outline: none;
  }
`;

// Botão de envio estilizado com hover
const SubmitButton = styled.button`
  background: #e63946;
  color: #fff;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #d62828;
  }
`;

// Mensagem de sucesso após o envio
const SuccessMessage = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #dff0d8;
  color: #3c763d;
  border: 1px solid #d6e9c6;
  border-radius: 8px;
  text-align: center;
`;

function ReservationPage() {
  // Estado para armazenar os campos do formulário
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Atualiza o estado conforme o usuário digita nos inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Ao enviar o formulário, exibe um feedback e simula o envio dos dados
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulário enviado:", form);
    setSubmitted(true);
    // Aqui você pode integrar uma chamada à API para processar a reserva
  };

  return (
    <PageContainer>
      <ReservationForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormTitle>Reserve sua Mesa</FormTitle>
        
        <FormGroup>
          <Label htmlFor="name">Nome Completo</Label>
          <Input 
            type="text" 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            placeholder="Seu Nome"
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input 
            type="email" 
            id="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="seuemail@exemplo.com"
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone">Telefone</Label>
          <Input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={form.phone} 
            onChange={handleChange} 
            placeholder="(xx) xxxxx-xxxx"
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Data</Label>
          <Input 
            type="date" 
            id="date" 
            name="date" 
            value={form.date} 
            onChange={handleChange}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="time">Horário</Label>
          <Input 
            type="time" 
            id="time" 
            name="time" 
            value={form.time} 
            onChange={handleChange}
            required 
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="guests">Número de Pessoas</Label>
          <Input 
            type="number" 
            id="guests" 
            name="guests" 
            value={form.guests} 
            onChange={handleChange} 
            placeholder="Quantidade"
            required 
          />
        </FormGroup>

        <SubmitButton type="submit">Reservar Agora</SubmitButton>

        {submitted && (
          <SuccessMessage>
            Reserva realizada com sucesso! Em breve entraremos em contato.
          </SuccessMessage>
        )}
      </ReservationForm>
    </PageContainer>
  );
}

export default ReservationPage;
