import { Router } from "express";

import pedidoRoutes from "../modules/pedido/pedido.routes.js";
import produtoRoutes from "../modules/produto/produto.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const routes = Router();

routes.use("/pedidos", pedidoRoutes);
routes.use("/produtos", produtoRoutes);
routes.use("/admin", adminRoutes);

export default routes;
