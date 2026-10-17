import { supabase } from "../config/supabase.js";

export async function listClaims(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        let query = supabase
            .from("claims")
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

export async function createClaim(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const { item_id, itemId, foundItemId, lostItemId, reason } = req.body;
        const targetItemId = item_id || itemId || foundItemId;

        const payload = {
            item_id: targetItemId || null,
            found_item_id: foundItemId || targetItemId || null,
            lost_item_id: lostItemId || null,
            reason: reason?.trim() || null,
            status: "pending",
            user_id: req.user.id,
        };

        const { data, error } = await supabase
            .from("claims")
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function updateClaimStatus(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const { status } = req.body;
        if (!["pending", "approved", "rejected", "verified"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid claim status. Must be pending, approved, rejected, or verified",
            });
        }

        const { data, error } = await supabase
            .from("claims")
            .update({ status })
            .eq("id", req.params.id)
            .select()
            .maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Claim not found" });

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}
