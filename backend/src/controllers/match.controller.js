import { supabase } from "../config/supabase.js";

export async function listMatches(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        let query = supabase
            .from("matches")
            .select("*, item:item_id(*)")
            .order("created_at", { ascending: false })
            .limit(200);

        const isAdmin = req.user?.app_metadata?.role === "admin";
        if (!isAdmin) {
            query = query.eq("user_id", req.user.id);
        }

        const { data, error } = await query;

        if (error) throw error;
        res.json({ success: true, data: data || [] });
    } catch (error) {
        next(error);
    }
}

export async function updateMatchStatus(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const { status } = req.body;
        if (!["pending", "approved", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be pending, approved, or rejected",
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
