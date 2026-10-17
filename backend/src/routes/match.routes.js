
import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";
import {
    listMatches,
    updateMatchStatus
} from "../controllers/match.controller.js";

const router = Router();

router.get("/", authenticate, listMatches);
router.patch("/:id/status", authenticate, authorizeAdmin, updateMatchStatus);

export default router;
