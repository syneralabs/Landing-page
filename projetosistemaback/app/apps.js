// iniciar o servidor, configurar as rotas, permitir que o front se conecte, fazer o json  processar, fazer a pone com o bdSinera
<<<<<<< HEAD

const express = require('express');
const cors = require('cors');
const app = express();
const bdSinera = require('./bd/bdSinera');
=======
>>>>>>> main


import express from 'express';
import cors from 'cors';

// Importando o banco (ES Module exige o .js)
import db from "../database/dbSynera.js";

// Importando as rotas (também precisam terminar com .js)
import clientesRoutes from "../routes/clientes.js";
import servicosRoutes from "../routes/servicos.js";
import pagamentosRoutes from "../routes/pagamentos.js"

// Inicializando o Express (estava faltando)
const app = express();

app.use(cors());
app.use(express.json());

//Rotas
app.use('/clientes', clientesRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pagamentos', pagamentosRoutes);

// Porta do servidor
const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`);
});

