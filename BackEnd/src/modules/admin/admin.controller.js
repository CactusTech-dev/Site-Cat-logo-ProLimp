import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AdminRepository from "./admin.repository.js";

export async function loginAdmin(req, res) {
  const { email, senha } = req.body;

  try {
    const admin = await AdminRepository.findByEmail(email);

    if (!admin) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    const senhaValida = await bcrypt.compare(senha, admin.senha);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      mensagem: "Login realizado com sucesso 🚀",
      token
    });

  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({
      erro: "Erro interno no servidor"
    });
  }
}