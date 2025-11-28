import express from 'express';
import cors from 'cors';

// Importando as rotas
import clientesRoutes from "../routes/clientes.js";
import servicosRoutes from "../routes/servicos.js";
import pagamentosRoutes from "../routes/pagamentos.js";

import express from 'express';
import cors from 'cors';

// rotas
import clientesRoutes from './routes/clientesRoutes.js';
import servicosRoutes from './routes/servicosRoutes.js';
import pagamentosRoutes from './routes/pagamentosRoutes.js';

import { Createtables } from '../database/dbSynera.js';

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

Createtables();

// Porta do servidor
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log(`Servidor rodando na porta ${Port}`);
});

router.post("/", (req, res) => {
    const { nome, email, password } = req.body;

    db.run(
        `INSERT INTO clientes (nome, email, senha) VALUES (?, ?, ?)`,
        [nome, email, password],
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Erro ao cadastrar cliente", detalhes: err });
            }
            res.json({ mensagem: "Usuário cadastrado", id: this.lastID });
        }
    );
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        `SELECT * FROM clientes WHERE email = ? AND senha = ?`,
        [email, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: "Erro no login" });
            }
            if (!row) {
                return res.status(401).json({ error: "Email ou senha inválidos" });
            }
            res.json({ mensagem: "Login OK", user: row });
        }
    );
});

export default app;