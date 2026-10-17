import { supabase } from "../config/supabase.js";

export async function listItems(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        const { category, type, status, q } = req.query;
        let query = supabase
            .from("items")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200);

        if (category && category !== "all" && category !== "All") {
            query = query.ilike("category", category);
        }
        if (type && type !== "all") {
            query = query.eq("type", type);
        }
        if (status && status !== "all") {
            query = query.eq("status", status);
        }
        if (q && q.trim()) {
            const safe = q.trim().replace(/[,%()]/g, " ");
            query = query.or(`title.ilike.%${safe}%,description.ilike.%${safe}%,location.ilike.%${safe}%`);
        }

        const { data, error } = await query;

        if (error) throw error;
        res.json({ success: true, data: data || [] });
    } catch (error) {
        next(error);
    }
}

export async function getItem(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

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
        if (!supabase) throw new Error("Supabase is not configured");

        const { title, description, category, location, date, contact, type, imageUrl, image_url, status } = req.body;

        if (!title || !location) {
            return res.status(400).json({
                success: false,
                message: "Title and location are required",
            });
        }

        const payload = {
            title: title.trim(),
            description: description?.trim() || null,
            category: category || "Other",
            location: location.trim(),
            date: date || new Date().toISOString().split("T")[0],
            contact: contact?.trim() || null,
            image_url: image_url || imageUrl || null,
            type: type === "found" ? "found" : "lost",
            status: status || "available",
            user_id: req.user?.id || null,
        };

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
        if (!supabase) throw new Error("Supabase is not configured");

        const payload = { ...req.body };
        delete payload.id;
        delete payload.user_id;
        delete payload.created_at;

        if (payload.imageUrl && !payload.image_url) {
            payload.image_url = payload.imageUrl;
            delete payload.imageUrl;
        }

        // Ordinary users can only update items they own
        let query = supabase
            .from("items")
            .update(payload)
            .eq("id", req.params.id);

        const isAdmin = req.user?.app_metadata?.role === "admin";
        if (!isAdmin) {
            query = query.eq("user_id", req.user.id);
        }

        const { data, error } = await query.select().maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Item not found or update not permitted" });

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
}

export async function deleteItem(req, res, next) {
    try {
        if (!supabase) throw new Error("Supabase is not configured");

        let query = supabase
            .from("items")
            .delete()
            .eq("id", req.params.id);

        const isAdmin = req.user?.app_metadata?.role === "admin";
        if (!isAdmin) {
            query = query.eq("user_id", req.user.id);
        }

        const { data, error } = await query.select().maybeSingle();

        if (error) throw error;
        if (!data) return res.status(404).json({ success: false, message: "Item not found or delete not permitted" });

        res.json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        next(error);
    }
}
