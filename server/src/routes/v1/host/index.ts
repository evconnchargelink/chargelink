import { Router } from "express";
import { AUTH_ROLES } from "../../../types/role.type.js";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller.js";
import { signup } from "../../../controllers/host/auth.controller.js";
import { handleLogout } from "../../../controllers/logout.controller.js";
import { getDashboardData } from "../../../controllers/host/dashboard.controller.js";
import {
  addCharger,
  getChargers,
} from "../../../controllers/host/charger.controller.js";
import { fileUpload } from "../../../utils/multer.util.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";

const router = Router();

// Auth Routes
router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.HOST));
router.post("/signup", signup);
router.post(
  "/logout",
  authMiddleware(AUTH_ROLES.HOST),
  handleLogout(AUTH_ROLES.HOST)
);

// Dashboard Routes
router.get("/dashboard", getDashboardData);

// Charger Routes
router.get("/chargers", authMiddleware(AUTH_ROLES.HOST), getChargers);
router.post(
  "/charger",
  authMiddleware(AUTH_ROLES.HOST),
  fileUpload.single("file"),
  addCharger
);

export default router;
