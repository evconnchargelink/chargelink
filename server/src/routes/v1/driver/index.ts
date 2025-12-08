import { Router } from "express";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller";
import { handleLogout } from "../../../controllers/logout.controller";
import { signup } from "../../../controllers/driver/auth.controller";
import { AUTH_ROLES } from "../../../types/role.type";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = Router();

router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.DRIVER));
router.post("/signup", signup);
router.post(
  "/logout",
  authMiddleware(AUTH_ROLES.DRIVER),
  handleLogout(AUTH_ROLES.DRIVER)
);

export default router;
