import { Router } from "express";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller";
import { handleLogout } from "../../../controllers/logout.controller";
import { login } from "../../../controllers/admin/auth.controller";
import { signup } from "../../../controllers/admin/auth.controller";
import { AUTH_ROLES } from "../../../types/role.type";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { getChargers } from "../../../controllers/admin/charger.controller";
import { getUsers } from "../../../controllers/admin/user.controller";

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

export default router;
