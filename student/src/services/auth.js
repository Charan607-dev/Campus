import { supabase } from "./supabase";

export async function registerStudent({ email, password, name, college, studentId }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: name,
                college,
                studentId,
            },
        },
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function loginStudent({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function logoutStudent() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        throw new Error(error.message);
    }
}

export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw new Error(error.message);
    }
    return data.session;
}

export async function getUserProfile(userId) {
    if (!userId) return null;
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

    if (error) {
        console.warn("Could not fetch user profile:", error.message);
        return null;
    }
    return data;
}

export async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw new Error(error.message);
    return data;
}
