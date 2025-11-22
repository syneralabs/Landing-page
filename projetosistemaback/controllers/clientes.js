import db from "../database/dbSynera.js";
import express from "express";

// Criar cliente
export const criarCliente = (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    const sql = `INSERT INTO clientes (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)`;

    db.run(sql, [nome, cpf, email, telefone], function (err) {
        if (err) {
            return res.status(500).json({ error: "Erro ao cadastrar cliente", detalhes: err });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            cpf,
            email,
            telefone
        });
    });
};

// Listar todos os clientes
export const listarClientes = (req, res) => {
    db.all(`SELECT * FROM clientes`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao listar clientes" });

        res.status(200).json(rows);
    });
};

// Editar cliente
export const editarCliente = (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, telefone } = req.body;

    const sql = `
        UPDATE clientes 
        SET nome=?, cpf=?, email=?, telefone=?
        WHERE id=?`;

    db.run(sql, [nome, cpf, email, telefone, id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao atualizar cliente" });

        if (this.changes === 0) return res.status(404).json({ error: "Cliente não encontrado" });

        res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
    });
};

// Deletar cliente
export const deletarCliente = (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM clientes WHERE id=?`, [id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao deletar cliente" });

        if (this.changes === 0) return res.status(404).json({ error: "Cliente não encontrado" });

        res.status(200).json({ mensagem: "Cliente deletado com sucesso" });
    });
};
