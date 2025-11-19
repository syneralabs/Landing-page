//cria rotas de pagamentos

const express = require('express');
const router = express.Router();
const bdSinera = require('../../bd/bdSinera');

//Reisratrar pagamento
router.post('/registrar', async (req, res) => {
    const { cliente_id, servico_id, valor, data_pagamento } = req.body;
    const data = new Date().toISOString;
    try { return
            const resultado = await bdSinera.query( 
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
    bdSinera.all('SELECT * FROM pagamentos', [], (err, rows) => {
        if (err) { return res.status(500).json({ error: 'Erro ao listar pagamentos' });
        }   
        res.status(200).json(rows);
    });
});

module.exports = router;