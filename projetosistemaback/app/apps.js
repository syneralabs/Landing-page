import express from 'express';
import cors from 'cors';

// Importando as rotas
import clientesRoutes from "../routes/clientes.js";
import servicosRoutes from "../routes/servicos.js";
import pagamentosRoutes from "../routes/pagamentos.js";

// Inicializando o Express
const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/clientes', clientesRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pagamentos', pagamentosRoutes);

import { Createtables } from '../database/dbSynera.js';

Createtables();

// Porta do servidor
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`);
});
