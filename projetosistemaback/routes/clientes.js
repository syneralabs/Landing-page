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

// middleware que permite upload opcionalmente
const uploaderOptional = (req, res, next) => {
    upload.single('foto')(req, res, (err) => {
        if (err && err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Erro ao fazer upload: ' + err.message });
        } else if (err) {
            return res.status(400).json({ error: 'Erro ao fazer upload' });
        }
        next();
    });
};

// rotas
router.post('/cadastro', uploaderOptional, criarCliente);
router.post('/login', loginCliente);
router.post('/upload-photo/:id', upload.single('foto'), uploadPhoto);

router.get("/listar", listarClientes);
router.put("/editar/:id", editarCliente);
router.delete("/deletar/:id", deletarCliente);

export default router;
