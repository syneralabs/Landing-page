import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Importar rotas
import clientesRoutes from './routes/clientes.js';
import servicosRoutes from './routes/servicos.js';
import pagamentosRoutes from './routes/pagamentos.js';


import { Createtables } from "./database/dbSynera.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Corrigir __dirname em ES modules e servir frontend a partir da pasta pai
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos do diretório pai (raiz do projeto Landing-page)
app.use(express.static(path.join(__dirname, "..")));

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
