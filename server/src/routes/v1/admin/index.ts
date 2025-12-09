import { Router } from "express";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller.js";
import { handleLogout } from "../../../controllers/logout.controller.js";
import { login } from "../../../controllers/admin/auth.controller.js";
import { signup } from "../../../controllers/admin/auth.controller.js";
import { AUTH_ROLES } from "../../../types/role.type.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { getChargers } from "../../../controllers/admin/charger.controller.js";
import { getUsers } from "../../../controllers/admin/user.controller.js";
import { getDashboardStats } from "../../../controllers/admin/stats.controller.js";

const router = Router();

router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.ADMIN));
router.post("/login", login);
router.post("/signup", signup);
router.post(
  "/logout",
  authMiddleware(AUTH_ROLES.ADMIN),
  handleLogout(AUTH_ROLES.ADMIN)
);

router.get("/chargers", authMiddleware(AUTH_ROLES.ADMIN), getChargers);
router.get("/users", authMiddleware(AUTH_ROLES.ADMIN), getUsers);
router.get("/dashboard-stats", authMiddleware(AUTH_ROLES.ADMIN), getDashboardStats);

export default router;
