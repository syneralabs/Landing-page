//criando rota para clientes

const express = require('express');
const router = express.Router();
const bdSinera = require('../../bd/bdSinera');

//cadastrar cliente

router.post('/cadastrar', async (req, res) => {
    const { nome, cpf, email, telefone } = req.body;
    try {
        const resultado = await bdSinera.query(
            'INSERT INTO clientes (nome, cpf, email, telefone) VALUES (?, ?, ?, ?) RETURNING *',
            [nome, cpf, email, telefone]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

//listar todos os clientes

router.get('/listar', async (req, res) => {
   db.all('SELECT * FROM clientes', [], (err, rows) => {
        if (err) {
            console.error('Erro ao listar clientes:', err);
            return res.status(500).json({ error: 'Erro ao listar clientes' });
        }
        res.status(200).json(rows);
    });
});

module.exports = router;

