import { Router } from "express";
import adminRoutes from "./admin"
import userRoutes from "./user"
import providerRoutes from "./provider"

const router = Router()

router.use("/admin", adminRoutes)
router.use("/provider",providerRoutes)
router.use("/",userRoutes)

export default router;