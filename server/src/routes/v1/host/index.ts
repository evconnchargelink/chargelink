import { Router } from "express";
import { AUTH_ROLES } from "../../../types/role.type";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller";
import { signup } from "../../../controllers/host/auth.controller";
import { handleLogout } from "../../../controllers/logout.controller";

const router = Router();

router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.HOST));
router.post("/signup", signup);
router.post("/logout", handleLogout(AUTH_ROLES.HOST));


export default router;
