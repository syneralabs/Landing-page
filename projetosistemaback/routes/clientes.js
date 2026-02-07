import express from "express";
import session from "express-session";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
    criarCliente,
    listarClientes,
    editarCliente,
    deletarCliente,
    loginCliente,
    uploadPhoto
} from "../controllers/clientes.js";

const router = express.Router();

// configurar multer para salvar uploads em /img/uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', '..', 'img', 'uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
        cb(null, safeName);
    }
});

function fileFilter (req, file, cb) {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Apenas imagens são permitidas'), false);
    }
    cb(null, true);
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

// rota para upload de foto (multipart/form-data)
router.post('/upload-photo/:id', upload.single('foto'), uploadPhoto);

// permitir envio de foto já no cadastro
router.post('/cadastro', upload.single('foto'), criarCliente);
router.post('/login', loginCliente);

router.get("/listar", listarClientes);
router.put("/editar/:id", editarCliente);
router.delete("/deletar/:id", deletarCliente);

export default router;
