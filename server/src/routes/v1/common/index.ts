import { Router } from "express";
import { getIdentity } from "../../../controllers/identity.controller.js";
import { login } from "../../../controllers/login.controller.js";

const router = Router();

router.get("/identity", getIdentity);
router.post("/login", login);

export default router;
