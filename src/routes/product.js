import express from "express";
import { getAll, get, create, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", get);
router.post("/products/add", checkPermission, create);
router.delete("/products/:id", checkPermission, remove);
router.patch("/products/:id/update", checkPermission, update);

export default router;
