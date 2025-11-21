// rotas de pagamentos

import express from "express";
const router = express.Router();
import bd from "../database/dbSynera.js";

// Registrar pagamento
router.post('/registrar', (req, res) => {
    const { cliente_id, servico_id, valor, data_pagamento } = req.body;
    const dataISO = new Date().toISOString();

    const sql = `
        INSERT INTO pagamentos (cliente_id, servico_id, valor, data_pagamento)
        VALUES (?, ?, ?, ?)
    `;

    bd.run(sql, [cliente_id, servico_id, valor, data_pagamento || dataISO], function (err) {
        if (err) {
            console.error('Erro ao registrar pagamento:', err);
            return res.status(500).json({ error: 'Erro ao registrar pagamento' });
        }

        // Buscar o registro inserido
        bd.get('SELECT * FROM pagamentos WHERE id = ?', [this.lastID], (err, row) => {
            if (err) {
                console.error("Erro ao buscar pagamento:", err);
                return res.status(500).json({ error: "Erro ao buscar pagamento" });
            }

            res.status(201).json(row);
        });
    });
});

// Listar todos os pagamentos
router.get('/listar', (req, res) => {
    bd.all('SELECT * FROM pagamentos', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao listar pagamentos' });
        }
        res.status(200).json(rows);
    });
});

export default router;
