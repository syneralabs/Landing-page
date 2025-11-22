import db from "../database/dbSynera.js";
import express from "express";

// Criar serviço
export const criarServico = (req, res) => {
    const { nome, descricao, preco } = req.body;

    const sql = `INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)`;

    db.run(sql, [nome, descricao, preco], function (err) {
        if (err) {
            return res.status(500).json({ error: "Erro ao criar serviço", detalhes: err });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            descricao,
            preco
        });
    });
};

// Listar serviços
export const listarServicos = (req, res) => {
    db.all(`SELECT * FROM servicos`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao listar serviços" });
        res.status(200).json(rows);
    });
};

// Editar serviço
export const editarServico = (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    const sql = `UPDATE servicos SET nome=?, descricao=?, preco=? WHERE id=?`;

    db.run(sql, [nome, descricao, preco, id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao editar serviço" });

        if (this.changes === 0) return res.status(404).json({ error: "Serviço não encontrado" });

        res.status(200).json({ mensagem: "Serviço atualizado com sucesso" });
    });
};

// Deletar serviço
export const deletarServico = (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM servicos WHERE id=?`;

    db.run(sql, [id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao deletar serviço" });

        if (this.changes === 0) return res.status(404).json({ error: "Serviço não encontrado" });

        res.status(200).json({ mensagem: "Serviço deletado com sucesso" });
    });
};
