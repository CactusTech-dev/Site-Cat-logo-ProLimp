import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import routes from "./routes/index.js";

// Configurar __dirname (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares globais
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite local
    "https://site-cat-logo-pro-limp-backend.vercel.app" // Front em produção
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (imagens)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rotas da API
app.use("/api", routes);

// Rota teste (opcional)
app.get("/", (req, res) => {
  res.json({ status: "API ProLimp rodando 🚀" });
});

export default app;
