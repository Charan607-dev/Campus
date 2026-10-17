
import { supabase } from "../config/supabase.js";

export async function listRewards(req, res, next) {
    try {
        const { data, error } = await supabase
            .from("rewards")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function createReward(req, res, next) {
    try {
        const payload = { ...req.body, user_id: req.user.id };
        delete payload.id;
        delete payload.created_at;

        const { data, error } = await supabase
            .from("rewards")
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}
