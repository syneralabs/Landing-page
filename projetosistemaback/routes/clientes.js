import express from "express";
import {
    criarCliente,
    listarClientes,
    editarCliente,
    deletarCliente
} from "../controllers/clientes.js";

const router = express.Router();

router.post("/cadastrar", criarCliente);
router.get("/listar", listarClientes);
router.put("/editar/:id", editarCliente);
router.delete("/deletar/:id", deletarCliente);

export default router;
