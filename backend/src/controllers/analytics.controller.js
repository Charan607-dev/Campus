import { supabase } from "../config/supabase.js";

async function countRows(table, filterFn = (q) => q) {
    if (!supabase) return 0;
    try {
        const { count, error } = await filterFn(
            supabase.from(table).select("*", { count: "exact", head: true })
        );
        if (error) return 0;
        return count || 0;
    } catch {
        return 0;
    }
}

export async function getDashboard(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const [items, claims, matches, rewards, users] = await Promise.all([
            countRows("items"),
            countRows("claims"),
            countRows("matches"),
            countRows("rewards"),
            countRows("profiles"),
        ]);

        const [pendingClaims, pendingMatches] = await Promise.all([
            countRows("claims", (q) => q.eq("status", "pending")),
            countRows("matches", (q) => q.eq("status", "pending")),
        ]);

        // Recent items
        const { data: recentItems } = await supabase
            .from("items")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(6);

        res.json({
            success: true,
            data: {
                totalReports: items,
                pendingClaims,
                pendingMatches,
                totalUsers: users,
                totalRewards: rewards,
                recentItems: recentItems || [],
            },
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
