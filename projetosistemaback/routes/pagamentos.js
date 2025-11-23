import express from "express";
import {
    registrarPagamento,
    listarPagamentos,
    editarPagamento,
    deletarPagamento
} from "../controllers/pagamentos.js";

const router = express.Router();

router.post("/registrar", registrarPagamento);
router.get("/listar", listarPagamentos);
router.put("/editar/:id", editarPagamento);
router.delete("/deletar/:id", deletarPagamento);

export default router;

