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

//  Permitir acesso aos arquivos do front-end (HTML, CSS, JS)
app.use(express.static('public'));

// Rotas da API
app.use('/clientes', clientesRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pagamentos', pagamentosRoutes);

// Porta do servidor
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`);
});

