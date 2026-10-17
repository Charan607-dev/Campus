
import { supabase } from "../config/supabase.js";

export async function getAnalytics() {
    const tables = ["items", "matches", "claims", "rewards"];

    const counts = await Promise.all(
        tables.map(async (table) => {
            const { count, error } = await supabase
                .from(table)
                .select("*", { count: "exact", head: true });

            if (error) throw error;
            return [table, count || 0];
        })
    );

    return Object.fromEntries(counts);
}
