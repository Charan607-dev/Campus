
import { Router } from "express";
import { supabase } from "../config/supabase.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("id, full_name, points")
            .order("points", { ascending: false })
            .limit(20);

        if (error) throw error;
        res.json({ success: true, data: data || [] });
    } catch (error) {
        next(error);
    }
});

export default router;
