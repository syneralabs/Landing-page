import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from "passport";
import session from "express-session";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});

// import db, { Createtables } from "../database/dbSynera.js";

// Createtables();

import clientesRoutes from "../routes/clientes.js";
import servicosRoutes from "../routes/servicos.js";
import pagamentosRoutes from "../routes/pagamentos.js";

const app = express();
app.use(cors());
app.use(express.json());

// SESSÃO - uma única vez
app.use(session({
    secret: process.env.SESSION_SECRET || "chave-super-secreta",
    resave: false,
    saveUninitialized: false
}));

// PASSPORT - uma única vez
app.use(passport.initialize());
app.use(passport.session());

// ESTRATÉGIA GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const nome = profile.displayName;
    const googleId = profile.id;
    const foto = profile.photos[0]?.value;

    db.get(`SELECT * FROM clientes WHERE email = ?`, [email], (err, user) => {
        if (err) return done(err);

        if (user) return done(null, user);

        const sql = `
            INSERT INTO clientes (nome, email, senha, google_id, foto)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.run(sql, [nome, email, null, googleId, foto], function (err) {
            if (err) return done(err);

            db.get(`SELECT * FROM clientes WHERE id = ?`, [this.lastID], (err, newUser) => {
                if (err) return done(err);
                return done(null, newUser);
            });
        });
    });
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// 🚀 LOGIN GOOGLE
app.get("/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// Rotas API
app.use('/clientes', clientesRoutes);
app.use('/servicos', servicosRoutes);
app.use('/pagamentos', pagamentosRoutes);

const Port = process.env.PORT || 3000;
app.listen(Port, () => console.log(`Servidor rodando na porta ${Port}`));
