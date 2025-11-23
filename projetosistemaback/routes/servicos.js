import express from "express";
import {
    criarServico,
    listarServicos,
    editarServico,
    deletarServico
} from "../controllers/servicos.js";

const router = express.Router();

router.post('/criar', criarServico);
router.get('/listar', listarServicos);
router.put('/editar/:id', editarServico);
router.delete('/deletar/:id', deletarServico);

export default router;
