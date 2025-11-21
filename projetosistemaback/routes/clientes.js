import express from "express";
import bd from "../database/dbSynera.js";

const router = express.Router();

// Cadastrar cliente
router.post("/cadastrar", (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    const query = `
        INSERT INTO clientes (nome, cpf, email, telefone)
        VALUES (?, ?, ?, ?)
    `;

    bd.run(query, [nome, cpf, email, telefone], function (err) {
        if (err) {
            console.error("Erro ao cadastrar cliente:", err.message);
            return res.status(500).json({ error: "Erro ao cadastrar cliente" });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            cpf,
            email,
            telefone
        });
    });
});

// Listar clientes
router.get("/listar", (req, res) => {
    const query = "SELECT * FROM clientes";

    bd.all(query, [], (err, rows) => {
        if (err) {
            console.error("Erro ao listar clientes:", err.message);
            return res.status(500).json({ error: "Erro ao listar clientes" });
        }

        res.status(200).json(rows);
    });
});

export default router;
