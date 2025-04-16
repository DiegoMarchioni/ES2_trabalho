// src/pages/Sobre.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPizzaSlice, FaHeart, FaUsers } from 'react-icons/fa';

const Container = styled.div`
  padding: 60px 20px;
  background-color: #fff8f0;
  color: #333;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 3rem;
  color: #e63946;
  margin-bottom: 40px;
`;

const Section = styled(motion.section)`
  max-width: 1000px;
  margin: 0 auto 60px auto;
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextContent = styled.div`
  flex: 1;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #1d3557;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Image = styled.img`
  flex: 1;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  font-size: 3rem;
  color: #e63946;
  margin-bottom: 20px;
`;

function Sobre() {
  return (
    <Container>
      <Title>Sobre Nós</Title>

      <Section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TextContent>
          <Icon><FaPizzaSlice /></Icon>
          <SectionTitle>Nossa História</SectionTitle>
          <Paragraph>
            Fundada em 1958 no coração do Bixiga, a Pizzaria Speranza trouxe ao Brasil a autêntica pizza napolitana. Com receitas tradicionais e ingredientes selecionados, conquistamos gerações de clientes apaixonados pelo verdadeiro sabor italiano.
          </Paragraph>
        </TextContent>
        <Image src="/assets/historia.jpg" alt="Nossa História" />
      </Section>

      <Section
        reverse
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TextContent>
          <Icon><FaHeart /></Icon>
          <SectionTitle>Missão & Valores</SectionTitle>
          <Paragraph>
            Nossa missão é proporcionar uma experiência gastronômica inesquecível, mantendo a tradição e a qualidade em cada pizza servida. Valorizamos a autenticidade, o respeito aos nossos clientes e a paixão pela culinária italiana.
          </Paragraph>
        </TextContent>
        <Image src="/assets/missao.jpg" alt="Missão e Valores" />
      </Section>

      <Section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <TextContent>
          <Icon><FaUsers /></Icon>
          <SectionTitle>Nossa Equipe</SectionTitle>
          <Paragraph>
            Contamos com uma equipe dedicada e apaixonada pelo que faz. Nossos pizzaiolos são treinados nas tradições napolitanas, garantindo que cada pizza seja preparada com maestria e carinho.
          </Paragraph>
        </TextContent>
      </Section>
    </Container>
  );
}

export default Sobre;
