import jwt from "jsonwebtoken";
import { supabase } from '../../lib/supabase.js';

export async function loginAdmin(req, res) {
  const { email, senha } = req.body;

  try {
    const { data: admin, error } = await supabase
      .from('admin')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin || admin.senha !== senha) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
    );

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro interno no servidor' });
  }
}
