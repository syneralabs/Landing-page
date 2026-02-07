import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import session from "express-session";
import db from "../database/dbSynera.js";

import path from "path";
import { fileURLToPath } from "url";
import https from 'https';
import http from 'http';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "..", "..", ".env")
});

// Variáveis de ambiente carregadas (logging removido em produção)

// import db, { Createtables } from "../database/dbSynera.js";
// Createtables();

import clientesRoutes from "../routes/clientes.js";
import servicosRoutes from "../routes/servicos.js";
import pagamentosRoutes from "../routes/pagamentos.js";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// SESSÃO - uma única vez
app.use(session({
    secret: process.env.SESSION_SECRET || "chave-super-secreta",
    resave: false,
    saveUninitialized: false
}));

// PASSPORT - uma única vez
// Passport permanece disponível apenas para compatibilidade de sessão
try{
    if (passport && passport.initialize) {
        app.use(passport.initialize());
        app.use(passport.session());
    }
}catch(e){}

// (Login social via providers foi removido conforme requisitado)

app.use(express.static(path.join(__dirname, "..", "public")));

// Servir assets que estão na raiz do projeto (script, style, img)
app.use('/script', express.static(path.join(__dirname, '..', '..', 'script')));
app.use('/style', express.static(path.join(__dirname, '..', '..', 'style')));
app.use('/img', express.static(path.join(__dirname, '..', '..', 'img')));

// garantir que pasta de uploads exista
try {
    const uploadsDir = path.join(__dirname, '..', '..', 'img', 'uploads');
    fs.mkdirSync(uploadsDir, { recursive: true });
} catch (e) {
    console.error('Erro ao criar pasta de uploads', e);
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Logout route
app.get('/logout', (req, res, next) => {
    if (req.logout) {
        req.logout(function(err) {
            if (err) return next(err);
            req.session.destroy(() => res.redirect('/'));
        });
    } else {
        // fallback
        req.session.destroy(() => res.redirect('/'));
    }
});

// Rotas de login via social removidas

// Rota de API para retorno dos dados do usuário (usada pelo front-end)
app.get('/api/me', (req, res) => {
    // debug logs removed for /api/me

    if (!req.user) return res.status(401).json({ error: 'Não autenticado' });

    // Buscar usuário atualizado diretamente no DB para garantir que a foto esteja presente
    db.get(`SELECT id, nome, email, foto FROM clientes WHERE id = ?`, [req.user.id], (err, row) => {
        if (err) return res.status(500).json({ error: 'Erro interno' });
        if (!row) return res.status(404).json({ error: 'Usuário não encontrado' });

        res.json({
            nome: row.nome,
            email: row.email,
            foto: row.foto
        });
    });
});

// Endpoint para servir a foto do usuário por proxy (evita bloqueio por hotlink)
app.get('/avatar', (req, res) => {
    if (!req.user) return res.status(401).end();

    db.get(`SELECT foto FROM clientes WHERE id = ?`, [req.user.id], (err, row) => {
        if (err) return res.status(500).end();
        if (!row || !row.foto) return res.status(404).end();

        let imageUrl;
        try {
            imageUrl = new URL(row.foto);
        } catch (e) {
            console.error('/avatar - invalid URL in DB:', row.foto, e);
            return res.status(502).end();
        }

        const lib = imageUrl.protocol === 'https:' ? https : http;
        const opts = {
            hostname: imageUrl.hostname,
            path: imageUrl.pathname + (imageUrl.search || ''),
            headers: {
                'User-Agent': 'Synera-Image-Proxy'
            }
        };

        const upstreamReq = lib.get(imageUrl.href, (upstreamRes) => {
            if (upstreamRes.statusCode !== 200) {
                console.error('/avatar - upstream responded with', upstreamRes.statusCode);
                upstreamRes.resume();
                return res.status(502).end();
            }

            const contentType = upstreamRes.headers['content-type'] || 'image/jpeg';
            res.setHeader('content-type', contentType);
            upstreamRes.pipe(res);
        });

        upstreamReq.on('error', (e) => {
            console.error('/avatar - upstream request error', e);
            return res.status(502).end();
        });
    });
});

// Rotas API
app.use('/clientes', clientesRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pagamentos', pagamentosRoutes);

const Port = process.env.PORT || 3000;
app.listen(Port, () =>
    console.log(`Servidor rodando na porta ${Port}`)
); 
