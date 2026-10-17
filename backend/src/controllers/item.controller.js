
import { supabase } from "../config/supabase.js";

export async function listItems(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const { data, error } = await supabase
            .from("items")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200);

        if (error) throw error;
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function getItem(req, res, next) {
    try {
        const { data, error } = await supabase
            .from("items")
            .select("*")
            .eq("id", req.params.id)
            .maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Item not found" });

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function createItem(req, res, next) {
    try {
        const payload = { ...req.body, user_id: req.user.id };

        delete payload.id;
        delete payload.created_at;

        const { data, error } = await supabase
            .from("items")
            .insert(payload)
            .select()
            .single();

        if (error) throw error;
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function updateItem(req, res, next) {
    try {
        const payload = { ...req.body };
        delete payload.id;
        delete payload.user_id;
        delete payload.created_at;

        const { data, error } = await supabase
            .from("items")
            .update(payload)
            .eq("id", req.params.id)
            .select()
            .maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Item not found or update not permitted" });

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function deleteItem(req, res, next) {
    try {
        const { data, error } = await supabase
            .from("items")
            .delete()
            .eq("id", req.params.id)
            .select()
            .maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Item not found" });

        res.json({ success: true, message: "Item deleted" });
    } catch (error) {
        next(error);
    }
}
