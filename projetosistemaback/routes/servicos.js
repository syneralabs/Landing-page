// criando rota para serviços

import express from "express";
import db from "../database/dbSynera.js";

const router = express.Router();

// Criar serviço
router.post('/criar', (req, res) => {
    const { nome, descricao, preco } = req.body;

    const sql = `
        INSERT INTO servicos (nome, descricao, preco)
        VALUES (?, ?, ?)
    `;

    // NÃO usar arrow function aqui para acessar this.lastID
    db.run(sql, [nome, descricao, preco], function (err) {
        if (err) {
            console.error("Erro ao criar serviço:", err);
            return res.status(500).json({ error: "Erro ao criar serviço" });
        }

        // Buscar o serviço recém-inserido
        db.get('SELECT * FROM servicos WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                console.error("Erro ao buscar serviço:", err);
                return res.status(500).json({ error: "Erro ao buscar serviço após criação" });
            }

            res.status(201).json(row);
        });
    });
});

// Listar todos os serviços
router.get('/listar', (req, res) => {
    db.all('SELECT * FROM servicos', [], (err, rows) => {
        if (err) {
            console.error("Erro ao listar serviços:", err);
            return res.status(500).json({ error: "Erro ao listar serviços" });
        }
        res.status(200).json(rows);
    });
});

export default router;
