import db from "../database/dbSynera.js";

// Criar cliente
export const criarCliente = (req, res) => {
    const { nome, cpf, email, telefone, senha } = req.body;

    const sql = `INSERT INTO clientes (nome, cpf, email, telefone, senha) VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [nome, cpf, email, telefone, senha], function (err) {
        if (err) {
            return res.status(500).json({ error: "Erro ao cadastrar cliente", detalhes: err });
        }

        res.status(201).json({
            id: this.lastID,
            nome,
            cpf,
            email,
            telefone,
            senha
        });
    });
};

export const loginCliente = (req, res) => {
    const { email, senha } = req.body;

    const sql = `SELECT * FROM clientes WHERE email = ? AND senha = ?`;

    db.get(sql, [email, senha], (err, user) => {
        if (err) return res.status(500).json({ error: "Erro ao buscar usuário" });

        if (!user) {
            return res.status(401).json({ error: "Email ou senha incorretos" });
        }

        res.status(200).json({ mensagem: "Login realizado", user });
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
    const { nome, cpf, email, telefone } = req.body;

    const sql = `
        UPDATE clientes 
        SET nome=?, cpf=?, email=?, telefone=?
        WHERE id=?`;

    db.run(sql, [nome, cpf, email, telefone, id], function (err) {
        if (err) return res.status(500).json({ error: "Erro ao atualizar cliente" });

        if (this.changes === 0) return res.status(404).json({ error: "Cliente não encontrado" });

        res.status(200).json({ mensagem: "Cliente atualizado com sucesso" });
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
