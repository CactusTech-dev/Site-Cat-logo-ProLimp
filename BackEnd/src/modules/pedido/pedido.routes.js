import { Router } from "express";
import {
  listarPedidos,
  buscarPedidoPorId,
  criarPedido,
  cancelarPedido
} from "../pedido/pedido.controller.js";

import { authAdmin } from "../../middlewares/authAdmin.js";

const router = Router();

// GET /api/pedido
router.get("/", listarPedidos);

// GET /api/pedido/:id
router.get("/:id", authAdmin, buscarPedidoPorId);

// POST /api/pedido
router.post("/", criarPedido);

// DELETE /api/pedidos/:id
router.delete("/:id", cancelarPedido);


export default router;
