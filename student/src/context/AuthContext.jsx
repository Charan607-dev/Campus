import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getUserProfile, logoutStudent } from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    async function refreshProfile(currentUser) {
        if (!currentUser) {
            setProfile(null);
            return;
        }
        try {
            const userProfile = await getUserProfile(currentUser.id);
            setProfile(userProfile);
        } catch {
            setProfile(null);
        }
    }

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
            if (!mounted) return;
            setSession(initialSession);
            const currentUser = initialSession?.user ?? null;
            setUser(currentUser);
            if (currentUser) {
                refreshProfile(currentUser).finally(() => {
                    if (mounted) setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, newSession) => {
                if (!mounted) return;
                setSession(newSession);
                const currentUser = newSession?.user ?? null;
                setUser(currentUser);
                if (currentUser) {
                    await refreshProfile(currentUser);
                } else {
                    setProfile(null);
                }
                setLoading(false);
            }
        );

        return () => {
            mounted = false;
            subscription?.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await logoutStudent();
        setUser(null);
        setProfile(null);
        setSession(null);
    };

    const value = {
        user,
        profile,
        session,
        token: session?.access_token || null,
        loading,
        isAuthenticated: Boolean(user),
        logout,
        refreshProfile: () => refreshProfile(user),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
