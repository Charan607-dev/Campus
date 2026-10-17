
import { supabase } from "../config/supabase.js";

export async function getAllMatches() {
    const { data, error } = await supabase
        .from("matches")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function createMatch(payload) {
    const { data, error } = await supabase
        .from("matches")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}
