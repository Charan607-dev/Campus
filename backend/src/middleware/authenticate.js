
import { supabase } from "../config/supabase.js";

export async function authenticate(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication token required"
            });
        }

        if (!supabase) {
            return res.status(503).json({
                success: false,
                message: "Authentication service is not configured"
            });
        }

        const token = header.slice(7);
        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data?.user) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }

        req.user = data.user;
        next();
    } catch (error) {
        next(error);
    }
}
