import express from "express";
import cors from "cors";

// Importar rotas
import clientesRoutes from './routes/clientes.js';
import servicosRoutes from './routes/servicos.js';
import pagamentosRoutes from './routes/pagamentos.js';


import { Createtables } from "./database/dbSynera.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos (páginas HTML, CSS, JS, imagens)
app.use(express.static("public"));

// Rotas da API
app.use("/clientes", clientesRoutes);
app.use("/servicos", servicosRoutes);
app.use("/pagamentos", pagamentosRoutes);

// Criar tabelas
Createtables();

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
