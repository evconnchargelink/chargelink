import { Router } from "express";
import { handleRefreshAccessToken } from "../../../controllers/refreshToken.controller";
import { handleLogout } from "../../../controllers/logout.controller";
import { signup } from "../../../controllers/driver/auth.controller";
import { AUTH_ROLES } from "../../../types/role.type";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { planTrip } from "../../../controllers/driver/plan.controller";
import { addCar, getCars } from "../../../controllers/driver/car.controller";
import { fileUpload } from "../../../utils/multer.util";

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



export default router;
