
import { supabase } from "../config/supabase.js";

async function countRows(table, query = (q) => q) {
    if (!supabase) throw new Error("Supabase is not configured");

    const { count, error } = await query(
        supabase.from(table).select("*", { count: "exact", head: true })
    );

    if (error) throw error;
    return count || 0;
}

export async function getDashboard(req, res, next) {
    try {
        const [items, claims, matches, rewards] = await Promise.all([
            countRows("items"),
            countRows("claims"),
            countRows("matches"),
            countRows("rewards")
        ]);

        res.json({
            success: true,
            data: { items, claims, matches, rewards }
        });
    } catch (error) {
        next(error);
    }
}

export async function getUsers(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(500);

        if (error) throw error;

        res.json({ success: true, data: data || [] });
    } catch (error) {
        next(error);
    }
}
