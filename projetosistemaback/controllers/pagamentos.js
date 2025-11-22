import db from "../database/dbSynera.js";
import express from "express";

const router = express.Router();

// Registrar pagamento
export const registrarPagamento = (req, res) => {
    const { cliente_id, servico_id, valor, data_pagamento } = req.body;

    const sql = `
        INSERT INTO pagamentos (cliente_id, servico_id, valor, data_pagamento)
        VALUES (?, ?, ?, ?)
    `;

    db.run(sql, [cliente_id, servico_id, valor, data_pagamento], function (err) {
        if (err) {
            return res.status(500).json({
                error: "Erro ao registrar pagamento",
                detalhes: err
            });
        }

        res.status(201).json({
            id: this.lastID,
            cliente_id,
            servico_id,
            valor,
            data_pagamento
        });
    });
};

// Listar pagamentos
export const listarPagamentos = (req, res) => {
    db.all(`SELECT * FROM pagamentos`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao listar pagamentos" });

        res.status(200).json(rows);
    });
};

// Editar pagamento
export const editarPagamento = (req, res) => {
    const { id } = req.params;
    const { cliente_id, servico_id, valor, data_pagamento } = req.body;

    const sql = `
        UPDATE pagamentos 
        SET cliente_id=?, servico_id=?, valor=?, data_pagamento=?
        WHERE id=?`;

    db.run(sql, [cliente_id, servico_id, valor, data_pagamento, id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao atualizar pagamento" });

        if (this.changes === 0) return res.status(404).json({ error: "Pagamento não encontrado" });

        res.status(200).json({ mensagem: "Pagamento atualizado com sucesso" });
    });
};

// Deletar pagamento
export const deletarPagamento = (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM pagamentos WHERE id=?`, [id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao deletar pagamento" });

        if (this.changes === 0) return res.status(404).json({ error: "Pagamento não encontrado" });

        res.status(200).json({ mensagem: "Pagamento deletado com sucesso" });
    });
};
