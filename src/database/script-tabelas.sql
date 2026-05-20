-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE IF NOT EXISTS harrypotter;

USE harrypotter;

DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	senha VARCHAR(100) NOT NULL
);

CREATE TABLE quiz_resultado (
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_usuario INT NOT NULL,
	casa VARCHAR(50) NOT NULL,
	data_resposta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

INSERT INTO usuario (nome, email, senha)
VALUES ('Usuario Teste', 'usuario@teste.com', '123456');