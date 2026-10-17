import { supabase } from "../config/supabase.js";

export async function authorizeAdmin(req, res, next) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // 1. Check trusted app_metadata
        if (user.app_metadata?.role === "admin") {
            return next();
        }

        // 2. Check trusted profiles table
        if (supabase) {
            const { data: profile } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", user.id)
                .maybeSingle();

            if (profile?.role === "admin") {
                return next();
            }
        }

        return res.status(403).json({
            success: false,
            message: "Administrator access required",
        });
    } catch (error) {
        next(error);
    }
}
