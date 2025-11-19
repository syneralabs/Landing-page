//gerando codigo para conexao com o banco de dados Synera, usando sqllife3  criando login, serviços e pagamento na fdata de 19/11/2025

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/dbSynera.db');

db.serialize(() => {
    // Criar tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id int autoincrement PRIMARY KEY,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )`);

    //criar tabela clientes
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id int autoincrement PRIMARY KEY,
        nome TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        telefone TEXT,
        email TEXT UNIQUE
    )`);

    // Criar tabela de serviços
    db.run(`CREATE TABLE IF NOT EXISTS servicos (
        id int autoincrement PRIMARY KEY,
        nome TEXT NOT NULL,
        descricao TEXT,
        valor REAL NOT NULL
    )`);


    // Criar tabela de pagamentos
    db.run(`CREATE TABLE IF NOT EXISTS pagamentos (
        id int autoincrement PRIMARY KEY,
        cliente_id INTEGER,
        servico_id INTEGER,
        valor   Real not null,
        data_pagamento TEXT NOT NULL,
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id)
    )`);
});
MediaSourceHandle.exports = db;
    
        
        
        
        
        
        
        
    