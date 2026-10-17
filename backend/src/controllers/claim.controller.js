
import { supabase } from "../config/supabase.js";

export async function listClaims(req, res, next) {
    try {
        const { data, error } = await supabase
            .from("claims")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function createClaim(req, res, next) {
    try {
        const payload = { ...req.body, user_id: req.user.id };
        delete payload.id;
        delete payload.created_at;

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
        const { status } = req.body;

        if (!["pending", "approved", "rejected", "verified"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid claim status"
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
