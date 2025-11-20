//cria rotas de pagamentos

import express from "express";
const router = express.Router();
import bd from "../database/dbSynera.js"

//Reisratrar pagamento
router.post('/registrar', async (req, res) => {
    const { cliente_id, servico_id, valor, data_pagamento } = req.body;
    const data = new Date().toISOString;
    try {
            bd.all( 
            'INSERT INTO pagamentos (cliente_id, servico_id, valor, data_pagamento) VALUES (?, ?, ?, ?) RETURNING *',   
            [cliente_id, servico_id, valor, data_pagamento]
        );
        res.status(201).json(resultado.rows[0]);        
    }
    catch (error) {
        console.error('Erro ao registrar pagamento:', error);
        res.status(500).json({ error: 'Erro ao registrar pagamento' });
    }
});

//Listar todos os pagamentos
router.get('/listar', async (req, res) => {
    bd.all('SELECT * FROM pagamentos', [], (err, rows) => {
        if (err) { return res.status(500).json({ error: 'Erro ao listar pagamentos' });
        }   
        res.status(200).json(rows);
    });
});

export default router;