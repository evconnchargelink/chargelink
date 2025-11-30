import { Router } from "express";
import { AUTH_ROLES } from "../../../types/role.type";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller";
import { signup } from "../../../controllers/host/auth.controller";
import { handleLogout } from "../../../controllers/logout.controller";
import { getDashboardData } from "../../../controllers/host/dashboard.controller";
import {
  addCharger,
  getChargers,
} from "../../../controllers/host/charger.controller";
import { fileUpload } from "../../../utils/multer.util";

const router = Router();

// Auth Routes
router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.HOST));
router.post("/signup", signup);
router.post("/logout", handleLogout(AUTH_ROLES.HOST));

// Dashboard Routes
router.get("/dashboard", getDashboardData);

// Charger Routes
router.get("/chargers", getChargers);
router.post("/charger", fileUpload.single("file"), addCharger);

export default router;
