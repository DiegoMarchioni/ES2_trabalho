-- 1. Criação do banco de dados
CREATE DATABASE pizzaria;

-- 2. Selecionar o banco para uso
USE pizzaria;

-- 3. Tabela: users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL
);

-- 4. Tabela: dishes
CREATE TABLE dishes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL
);

-- 5. Tabela: address
CREATE TABLE address (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    zip_code VARCHAR(20),
    country VARCHAR(100),
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    resident_id BIGINT,
    FOREIGN KEY (resident_id) REFERENCES users(id)
);

-- 6. Tabela: orders
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    is_paid BOOLEAN NOT NULL,
    is_delivered BOOLEAN NOT NULL,
    user_id BIGINT,
    delivery_address_id BIGINT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (delivery_address_id) REFERENCES address(id)
);

-- 7. Tabela: orderItens
CREATE TABLE orderItens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    dish_id BIGINT,
    order_id BIGINT,
    FOREIGN KEY (dish_id) REFERENCES dishes(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- 8. Inserções iniciais
INSERT INTO users (login, password, role) 
VALUES ('admin', '$2a$10$HixbZyAlP1UeTysU.m4w6.KUCQeR3XxswRxgblg1h3dyQFCBNLPJu', 0);

INSERT INTO dishes (name, description, price)
VALUES ('Pizza de Calabresa', 'Deliciosa pizza de Calabresa', 69.99);

INSERT INTO dishes (name, description, price)
VALUES ('Pizza de Moda', 'Pizza à moda do Chef', 73.99);

INSERT INTO dishes (name, description, price)
VALUES ('Pizza de Abacaxi', 'Pizza do Hawaii de abacaxi', 3.99);
