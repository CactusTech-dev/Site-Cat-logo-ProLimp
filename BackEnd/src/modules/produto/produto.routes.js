import { Router } from "express";
import {
  listarProdutos,
  buscarProdutoPorId,
  criarProduto,
  atualizarProduto,
  deletarProduto
} from "../produto/produto.controller.js";

import { uploadProduto } from "../../middlewares/uploadProduto.js";

const router = Router();

// GET /api/produtos
router.get("/", listarProdutos);

// GET /api/produtos/:id
router.get("/:id", buscarProdutoPorId);

// POST /api/produtos
router.post(
  "/",
  uploadProduto.single("imagem"),
  criarProduto
);

// PUT /api/produtos/:id
router.put(
  "/:id",
  uploadProduto.single("imagem"),
  atualizarProduto
);

// DELETE /api/produtos/:id
router.delete("/:id", deletarProduto);

export default router;
