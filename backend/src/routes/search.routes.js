
import { Router } from "express";
import { searchItems } from "../services/search.service.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const q = String(req.query.q || "").trim();

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query q is required"
            });
        }

        const data = await searchItems(q);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
});

export default router;
