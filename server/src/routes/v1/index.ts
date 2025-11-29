import { Router } from "express";
import adminRoutes from "./admin";
import driverRoutes from "./driver";
import hostRoutes from "./host";
import commonRoutes from "./common";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/host", hostRoutes);
router.use("/", driverRoutes);
router.use("/", commonRoutes);

export default router;
