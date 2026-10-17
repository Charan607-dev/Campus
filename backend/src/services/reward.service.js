
import { supabase } from "../config/supabase.js";

export async function getAllRewards() {
    const { data, error } = await supabase
        .from("rewards")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function addReward(payload) {
    const { data, error } = await supabase
        .from("rewards")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;
    return data;
}
