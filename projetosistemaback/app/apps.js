// iniciar o servidor, configurar as rotas, permitir que o front se conecte, fazer o json  processar, fazer a pone com o bdSinera
const express = require('express');
const cors = require('cors');
const app = express();
const bdSinera = require('./bd/bdSinera');

const clientesRoutes = require('./routes/clientesRoutes');
const servicosRoutes = require('./routes/servicosRoutes');
const pagamentosRoutes = require('./routes/pagamentosRoutes');

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

