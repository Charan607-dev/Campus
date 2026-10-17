
import { supabase } from "../config/supabase.js";

export async function searchItems(query) {
    const safeQuery = query.replace(/[,%()]/g, " ").trim();

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .or(`title.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%`)
        .limit(50);

    if (error) throw error;
    return data || [];
}
