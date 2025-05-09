# Tecnologias Utilizadas

Backend: Springboot
Frontend: React
APIs: Stripe
Banco de dados: MySQL

#Requisitos para a Aplicação

Para rodar a aplicação é necessário ter o NPM e o MySQL instalados no seu computador, além disso, é preciso uma secret key e uma public key do Stripe para pagamentos não recorrentes.
Toda a documentação requisitada para a atividade está presente na pasta "docs" deste repositório.

#Configurações Iniciais

No caminho /backend/src/main/resources/application.properties:
 - Altere as informações do usuário do banco de dados para as informações do seu usuário MySQL (alterar apenas o username, password e a porta caso ela não seja a padrão do MySQL)
 - Colocar sua secret key do Stripe no valor da propriedade "stripe.api.key"

No caminho /frontend/src/pages/pagamento.js:
  - Altere a linha 6 `loadStripe('pk_test_PUBLICKEYSTRIPE');` substituindo 'pk_test_PUBLICKEYSTRIPE' pela sua public key do Stripe

No caminho /docs/script.sql: 
  - Execute o script sql no seu banco de dados MySQL

# Como Usar

- Para iniciar o backend, entre na pasta backend e execute o comando "./gradlew bootRun"
- Para iniciar o frontend, entre na pasta frontend e execute os comandos: "npm install" para baixar as dependências e "npm start" para iniciar o react de fato.
- Por fim, no React, a aba "Cardápio" pode ser utilizada para adicionar os items ao carrinho
- Ao adicionar itens ao carrinho, podemos visualiza-los na aba "Carrinho" onde podemos, também, iniciar o pagamento

