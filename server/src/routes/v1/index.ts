import { Router } from "express";
import adminRoutes from "./admin/index.js";
import driverRoutes from "./driver/index.js";
import hostRoutes from "./host/index.js";
import commonRoutes from "./common/index.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/host", hostRoutes);
router.use("/", driverRoutes);
router.use("/", commonRoutes);

export default router;
