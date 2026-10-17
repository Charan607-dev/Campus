import api from "./api";

const ADMIN_TOKEN_KEY = "campusfind_admin_token";
const ADMIN_USER_KEY = "campusfind_admin_user";

export async function loginAdmin(credentials) {
    // Change this endpoint to match your backend's actual login route.
    const response = await api.post("/auth/login", credentials);

    const token = response.token || response.accessToken;
    const user = response.user || response.admin;

    if (!token) {
        throw new Error("The login response did not contain an authentication token.");
    }

    if (user?.role && user.role !== "admin") {
        throw new Error("This account does not have administrator access.");
    }

    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user || {}));

    return { token, user };
}

export function getAdminUser() {
    try {
        return JSON.parse(localStorage.getItem(ADMIN_USER_KEY) || "null");
    } catch {
        return null;
    }
}

export function isAdminLoggedIn() {
    return Boolean(localStorage.getItem(ADMIN_TOKEN_KEY));
}

export function logoutAdmin() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
    localStorage.removeItem("campusfind_admin");
}