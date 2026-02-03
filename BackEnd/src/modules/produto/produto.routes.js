import { Router } from "express";
import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../produto/produto.controller.js";

import { uploadProduto } from "../../middlewares/uploadProduto.js";
import { authAdmin } from "../../middlewares/authAdmin.js";

const router = Router();

// GET /api/produtos
router.get("/", listarProdutos);

// GET /api/produtos/:id
router.get("/:id", authAdmin, buscarProdutoPorId);

// POST /api/produtos
router.post(
  "/", authAdmin,
  uploadProduto.single("imagem"),
  criarProduto
);

// PUT /api/produtos/:id
router.put(
  "/:id", authAdmin,
  uploadProduto.single("imagem"),
  atualizarProduto
);

// DELETE /api/produtos/:id
router.delete("/:id", authAdmin, deletarProduto);

export default router;
