
);

app.get("/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    (req, res) => {
        res.sendFile(path.join(__dirname, "..", "..", "public", "dashb