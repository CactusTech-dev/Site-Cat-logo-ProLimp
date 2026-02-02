import admins from "./admin.model.js";

export function loginAdmin(req, res) {
  const { email, senha } = req.body;

  const admin = admins.find(
    (a) => a.email === email && a.senha === senha
  );

  if (!admin) {
    return res.status(401).json({ erro: "Credenciais inválidas" });
  }

  res.json({ mensagem: "Login realizado com sucesso" });
}
