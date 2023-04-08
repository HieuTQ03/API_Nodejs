import express from "express";
import { getAll, get, create, remove, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.route("/categorys").get(getAll).post(checkPermission, create);
router
  .route("/categorys/:id")
  .get(get)
  .delete(checkPermission, remove)
  .patch(checkPermission, update);

export default router;
