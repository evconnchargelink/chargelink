import { Router } from "express";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller.js";
import { handleLogout } from "../../../controllers/logout.controller.js";
import { signup } from "../../../controllers/driver/auth.controller.js";
import { AUTH_ROLES } from "../../../types/role.type.js";
import { authMiddleware } from "../../../middlewares/auth.middleware.js";
import { planTrip } from "../../../controllers/driver/plan.controller.js";
import { addCar, getCars } from "../../../controllers/driver/car.controller.js";
import { fileUpload } from "../../../utils/multer.util.js";
import { getSingleCharger, nearestChargers } from "../../../controllers/driver/charger.controller.js";

const router = Router();

router.post("/refresh-token", handleRefreshAccessToken(AUTH_ROLES.DRIVER));
router.post("/signup", signup);
router.post(
  "/logout",
  authMiddleware(AUTH_ROLES.DRIVER),
  handleLogout(AUTH_ROLES.DRIVER)
);
router.post("/plan-trip", planTrip);
router.get("/cars", authMiddleware(AUTH_ROLES.DRIVER), getCars);
router.post("/add-car", authMiddleware(AUTH_ROLES.DRIVER), fileUpload.single('file'), addCar);
router.get("/chargers", nearestChargers);
router.get("/chargers/:id", getSingleCharger);




export default router;
