//criando rota para serviços

import express from "express";
const router = express.Router();
const bdSinera = require('../database/dbSynera.js');

//criar serviços
router.post('/criar', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    
    db.run(
        'INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?) RETURNING *',
        [nome, descricao, preco],
        (err, resultado) => {
            if (err) return res.status(500).json({ error: 'Erro ao criar serviço' });
            res.status(201).json({id: this.lastID, nome, descricao, valor});
        }
    );
});

//listar todos os serviços
router.get('/listar', async (req, res) => {
    bdSinera.all('SELECT * FROM servicos', [], (err, rows) => {
        if (err) { return res.status(500).json({ error: 'Erro ao listar serviços' }); 
        }
        res.status(200).json(rows);
    });
});

export default router;