import { Router } from "express";

import produtoRoutes from "../modules/produto/produto.routes.js";
import adminRoutes from "../modules/admin/admin.routes.js";

const routes = Router();

routes.use("/produtos", produtoRoutes);
routes.use("/admin", adminRoutes);

export default routes;
