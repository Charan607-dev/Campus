import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;

// Check if service role key is a real key (not the template placeholder)
const rawServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isPlaceholderKey = !rawServiceKey || rawServiceKey.includes("YOUR_SERVER_ONLY") || rawServiceKey.startsWith("YOUR_");
const serviceKey = isPlaceholderKey ? null : rawServiceKey;

const anonKey = process.env.SUPABASE_ANON_KEY;
const effectiveKey = serviceKey || anonKey;

if (!url || !effectiveKey) {
    console.warn("[CampusFind] Warning: SUPABASE_URL or API keys are missing in backend/.env");
}

/**
 * Default backend Supabase client.
 * Uses service_role key if available for elevated admin actions,
 * otherwise falls back to anon key.
 */
export const supabase = url && effectiveKey
    ? createClient(url, effectiveKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    })
    : null;

/**
 * Creates a scoped Supabase client executing on behalf of an authenticated user's JWT.
 * Enforces database Row Level Security (RLS) properly for user requests.
 */
export function createUserClient(token) {
    if (!url || !anonKey) return null;
    return createClient(url, anonKey, {
        global: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}
