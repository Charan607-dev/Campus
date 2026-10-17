const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api/v1";

export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("campusfind_admin_token");

    const headers = {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    if (!response.ok) {
        const message =
            typeof data === "object" && data !== null
                ? data.message || data.error
                : data;

        throw new Error(message || `Request failed (${response.status})`);
    }

    return data;
}

export const api = {
    get: (endpoint) => apiRequest(endpoint),

    post: (endpoint, body) =>
        apiRequest(endpoint, {
            method: "POST",
            body: JSON.stringify(body),
        }),

    patch: (endpoint, body) =>
        apiRequest(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body),
        }),

    put: (endpoint, body) =>
        apiRequest(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        }),

    delete: (endpoint) =>
        apiRequest(endpoint, { method: "DELETE" }),
};

export default api;