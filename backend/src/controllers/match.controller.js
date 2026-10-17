
import { supabase } from "../config/supabase.js";

export async function listMatches(req, res, next) {
    try {
        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function updateMatchStatus(req, res, next) {
    try {
        const { status } = req.body;

        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be pending, approved, or rejected"
            });
        }

        const { data, error } = await supabase
            .from("matches")
            .update({ status })
            .eq("id", req.params.id)
            .select()
            .maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Match not found" });

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}
