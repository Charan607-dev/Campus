
import { supabase } from "../config/supabase.js";

export async function getAllItems() {
    const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function getItemById(id) {
    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (error) throw error;
    return data;
}
