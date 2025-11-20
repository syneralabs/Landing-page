// iniciar o servidor, configurar as rotas, permitir que o front se conecte, fazer o json  processar, fazer a pone com o bdSinera
import express from 'express';
import cors from 'cors';
import db from "../database/dbSynera.js";

import clientesRoutes from "../routes/clientes.js";
import servicosRoutes from "../routes/servicos.js";
import pagamentosRoutes from "../routes/pagamentos.js"

app.use(cors());
app.use(express.json());

//Rotas
app.use('/clientes', clientesRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pagamentos', pagamentosRoutes);

const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`);
});

