import { Router } from "express";
import adminRoutes from "./admin"
import userRoutes from "./driver"
import hostRoutes from "./host"

const router = Router()

router.use("/admin", adminRoutes)
router.use("/host", hostRoutes)
router.use("/",userRoutes)

export default router;