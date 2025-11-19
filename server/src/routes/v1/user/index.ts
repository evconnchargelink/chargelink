import { Router } from "express";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller";
import { handleLogout } from "../../../controllers/logout.controller";
import { login } from "../../../controllers/user/auth.controller";
import { signup } from "../../../controllers/user/auth.controller";
import { AUTH_ROLES } from "../../../types/role.type";

const router = Router();

router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.USER));
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", handleLogout(AUTH_ROLES.USER));

export default router;
