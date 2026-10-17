import { supabase } from "./supabase";

const ADMIN_TOKEN_KEY = "campusfind_admin_token";
const ADMIN_USER_KEY = "campusfind_admin_user";

/**
 * Sign in admin via Supabase Auth and verify admin privileges
 */
export async function loginAdmin({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    const user = data.user;
    const token = data.session?.access_token;

    // Check admin role via app_metadata or profiles table
    let isAdmin = user?.app_metadata?.role === "admin";

    if (!isAdmin) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .maybeSingle();

        if (profile?.role === "admin") {
            isAdmin = true;
        }
    }

    if (!isAdmin) {
        // Sign out user immediately if they lack admin privileges
        await supabase.auth.signOut();
        throw new Error("Access denied. Your account does not have administrator privileges.");
    }

    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));

    return { token, user };
}

export function getAdminUser() {
    try {
        return JSON.parse(localStorage.getItem(ADMIN_USER_KEY) || "null");
    } catch {
        return null;
    }
}

export async function checkAdminSession() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
        logoutAdmin();
        return false;
    }

    const user = session.user;
    if (user.app_metadata?.role === "admin") return true;

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

    if (profile?.role === "admin") return true;

    logoutAdmin();
    return false;
}

export function isAdminLoggedIn() {
    return Boolean(localStorage.getItem(ADMIN_TOKEN_KEY));
}

export async function logoutAdmin() {
    try {
        await supabase.auth.signOut();
    } catch (e) {
        console.warn("Logout note:", e.message);
    }
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
}