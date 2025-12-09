import { Router } from "express";
import adminRoutes from "./admin/index";
import driverRoutes from "./driver/index";
import hostRoutes from "./host/index";
import commonRoutes from "./common/index";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/host", hostRoutes);
router.use("/", driverRoutes);
router.use("/", commonRoutes);

export default router;
