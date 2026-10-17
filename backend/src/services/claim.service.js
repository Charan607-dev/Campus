
import { supabase } from "../config/supabase.js";

export async function getAllClaims() {
    const { data, error } = await supabase
        .from("claims")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function changeClaimStatus(id, status) {
    const { data, error } = await supabase
        .from("claims")
        .update({ status })
        .eq("id", id)
        .select()
        .maybeSingle();

    if (error) throw error;
    return data;
}
