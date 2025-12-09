import express from "express";
import session from "express-session";

import {
    criarCliente,
    listarClientes,
    editarCliente,
    deletarCliente,
    loginCliente
} from "../controllers/clientes.js";

const router = express.Router();

router.post("/cadastro", criarCliente);
router.post("/login", loginCliente);

router.get("/listar", listarClientes);
router.put("/editar/:id", editarCliente);
router.delete("/deletar/:id", deletarCliente);

export default router;
