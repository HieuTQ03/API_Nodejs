import express from "express";
import { getAll, get, create, remove, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/categorys", getAll);
router.get("/categorys/:id", get);
router.post("/categorys/add", checkPermission, create);
router.delete("/categorys/:id", checkPermission, remove);
router.patch("/categorys/:id/update", checkPermission, update);

export default router;
