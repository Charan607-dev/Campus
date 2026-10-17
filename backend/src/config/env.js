
import "dotenv/config";

export const env = {
    port: Number(process.env.PORT) || 5000,
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
    adminUrl: process.env.ADMIN_URL || "http://localhost:5174",
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey:
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.SUPABASE_ANON_KEY
};

export function validateEnv() {
    if (!env.supabaseUrl || !env.supabaseKey) {
        console.warn("Warning: Supabase environment variables are missing.");
    }
}
