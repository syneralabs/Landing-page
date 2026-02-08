import db from "../database/dbSynera.js";
import fs from 'fs';
import sharp from 'sharp';
import bcrypt from 'bcryptjs';

// Criar cliente
export const criarCliente = (req, res) => {
    const { nome, cpf, email, telefone } = req.body;
    const senha = req.body.senha || '';

    // validação básica de campos
    if (!nome || !email || !senha) return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });

    // política de senha: mínimo 8 caracteres, letras e números
    if (senha.length < 8 || !/[A-Za-z]/.test(senha) || !/[0-9]/.test(senha)) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 8 caracteres e incluir letras e números' });
    }

    // hash da senha
    const salt = bcrypt.genSaltSync(10);
    const senhaHash = bcrypt.hashSync(senha, salt);

    // tratar foto enviada via multer (req.file)
    let fotoPath = null;
    if (req.file) {
        fotoPath = `/img/uploads/${req.file.filename}`;
        // redimensionar/imagem para 600x600 max
        const fileOnDisk = req.file.path;
        (async () => {
            try {
                const meta = await sharp(fileOnDisk).metadata();
                if (meta.width < 100 || meta.height < 100) {
                    // apagar arquivo e rejeitar (pequeno demais)
                    try { await fs.promises.unlink(fileOnDisk); } catch(e){}
                    fotoPath = null;
                } else {
                    await sharp(fileOnDisk).resize(600, 600, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(fileOnDisk);
                }
            } catch (err) {
                console.error('Sharp error', err);
            }
        })();
    }

    const sql = `INSERT INTO clientes (nome, cpf, email, telefone, senha, foto) VALUES (?, ?, ?, ?, ?, ?)`;

    db.run(sql, [nome, cpf, email, telefone, senhaHash, fotoPath], function (err) {
        if (err) {
            console.error('criarCliente - erro ao inserir no DB:', err);
            if (err.message && err.message.includes("UNIQUE constraint failed: clientes.cpf")) {
                return res.status(400).json({ error: "CPF já cadastrado" });
            }

            if (err.message && err.message.includes("UNIQUE constraint failed: clientes.email")) {
                return res.status(400).json({ error: "E-mail já cadastrado" });
            }

            return res.status(500).json({ error: "Erro ao cadastrar cliente" });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            cpf,
            email,
            telefone,
            foto: fotoPath
        });
    });
};

export const loginCliente = (req, res) => {
    const { email, senha } = req.body;

    const sql = `SELECT * FROM clientes WHERE email = ?`;

    db.get(sql, [email], (err, user) => {
        if (err) {
            console.error('loginCliente - erro ao buscar no DB:', err);
            return res.status(500).json({ error: "Erro ao buscar usuário" });
        }

        if (!user) {
            return res.status(401).json({ error: "Email ou senha incorretos" });
        }

        // comparar senha com hash
        const match = bcrypt.compareSync(senha, user.senha);
        if (!match) return res.status(401).json({ error: 'Email ou senha incorretos' });

        // Retornar dados do usuário (sem senha) para o cliente poder manter sessão local
        const userData = {
            id: user.id,
            nome: user.nome,
            cpf: user.cpf,
            telefone: user.telefone,
            email: user.email,
            foto: user.foto || null
        };

        res.status(200).json({ mensagem: "Login realizado", user: userData });
    });
};

// Listar todos os clientes
export const listarClientes = (req, res) => {
    db.all(`SELECT * FROM clientes`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: "Erro ao listar clientes" });

        res.status(200).json(rows);
    });
};

// Editar cliente
export const editarCliente = (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, telefone, foto } = req.body;

    const sql = `
        UPDATE clientes 
        SET nome=?, cpf=?, email=?, telefone=?, foto=?
        WHERE id=?`;

    db.run(sql, [nome, cpf, email, telefone, foto, id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao atualizar cliente" });

        if (this.changes === 0) return res.status(404).json({ error: "Cliente não encontrado" });

        // retornar versão atualizada do usuário (sem senha)
        db.get(`SELECT id, nome, cpf, telefone, email, foto FROM clientes WHERE id = ?`, [id], (err, row) => {
            if (err) return res.status(500).json({ error: "Erro ao buscar usuário atualizado" });
            res.status(200).json({ mensagem: "Cliente atualizado com sucesso", user: row });
        });
    });
};

// Deletar cliente
export const deletarCliente = (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM clientes WHERE id=?`, [id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao deletar cliente" });

        if (this.changes === 0) return res.status(404).json({ error: "Cliente não encontrado" });

        res.status(200).json({ mensagem: "Cliente deletado com sucesso" });
    });
};

// Upload de foto de perfil
export const uploadPhoto = (req, res) => {
    const { id } = req.params;

    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    // caminho público que será salvo no DB
    const fileOnDisk = req.file.path;
    (async () => {
        try {
            const meta = await sharp(fileOnDisk).metadata();
            if (meta.width < 100 || meta.height < 100) {
                try { await fs.promises.unlink(fileOnDisk); } catch(e){}
                return res.status(400).json({ error: 'Imagem muito pequena (mínimo 100x100)' });
            }

            // redimensionar e comprimir
            await sharp(fileOnDisk).resize(600, 600, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(fileOnDisk);

            const publicPath = `/img/uploads/${req.file.filename}`;
            const sql = `UPDATE clientes SET foto = ? WHERE id = ?`;
            db.run(sql, [publicPath, id], function (err) {
                if (err) return res.status(500).json({ error: 'Erro ao salvar foto' });
                // retornar caminho novo
                return res.status(200).json({ mensagem: 'Foto atualizada', foto: publicPath });
            });
        } catch (err) {
            console.error('uploadPhoto error', err);
            try { await fs.promises.unlink(fileOnDisk); } catch(e){}
            return res.status(500).json({ error: 'Erro ao processar imagem' });
        }
    })();
};
