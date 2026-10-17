
import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorizeAdmin } from "../middleware/authorizeAdmin.js";
import {
    listClaims,
    createClaim,
    updateClaimStatus
} from "../controllers/claim.controller.js";

const router = Router();

router.get("/", authenticate, listClaims);
router.post("/", authenticate, createClaim);
router.patch("/:id/status", authenticate, authorizeAdmin, updateClaimStatus);

export default router;
