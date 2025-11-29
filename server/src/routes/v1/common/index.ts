import { Router } from "express";
import { getIdentity } from "../../../controllers/identity.controller";
import { login } from "../../../controllers/login.controller";

const router = Router();

router.get("/identity", getIdentity);
router.post("/login", login);

export default router;
