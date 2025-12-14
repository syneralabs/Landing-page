app.get("/api/usuario", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Não autenticado" });
    }

    res.json({
        nome: req.user.nome,
        email: req.user.email,
        foto: req.user.foto
    });
});