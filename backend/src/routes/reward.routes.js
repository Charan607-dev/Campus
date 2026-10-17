
import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import {
    listRewards,
    createReward
} from "../controllers/reward.controller.js";

const router = Router();

router.get("/", listRewards);
router.post("/", authenticate, createReward);

export default router;
