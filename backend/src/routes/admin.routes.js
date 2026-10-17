
import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";
import {
    getDashboard,
    getUsers
} from "../controllers/analytics.controller.js";

const router = Router();

router.use(authenticate, authorizeAdmin);

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);

export default router;
