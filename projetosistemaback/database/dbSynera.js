// Conexão com SQLite - Synera Database
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Corrigindo __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho correto do banco (na mesma pasta deste arquivo)
const dbPath = path.join(__dirname, "dbSynera.db");

sqlite3.verbose();

// Criando/abrindo o arquivo do banco
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco:", err.message);
    } else {
        console.log("Banco Synera conectado com sucesso!");
    }
});

db.serialize(() => {
    // Criar tabela de usuários
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        senha TEXT NOT NULL
    )`);

    // Criar tabela clientes
    db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf TEXT NOT NULL UNIQUE,
        telefone TEXT,
        email TEXT UNIQUE
    )`);

    // Criar tabela de serviços
    db.run(`CREATE TABLE IF NOT EXISTS servicos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        valor REAL NOT NULL
    )`);

    // Criar tabela de pagamentos
    db.run(`CREATE TABLE IF NOT EXISTS pagamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        servico_id INTEGER,
        valor REAL NOT NULL,
        data_pagamento TEXT NOT NULL,
        FOREIGN KEY(cliente_id) REFERENCES clientes(id),
        FOREIGN KEY(servico_id) REFERENCES servicos(id)
    )`);
});

// Exportando corretamente
export default db;
