const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export async function apiRequest(path, options = {}) {
    const token = options.token;

    const headers = {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Request failed");
    }

    return data;
}

export const api = {
    // Items
    getItems: () => apiRequest("/items"),
    getItem: (id) => apiRequest(`/items/${id}`),
    createItem: (itemData, token) => apiRequest("/items", {
        method: "POST",
        body: JSON.stringify(itemData),
        token,
    }),
    updateItem: (id, itemData, token) => apiRequest(`/items/${id}`, {
        method: "PATCH",
        body: JSON.stringify(itemData),
        token,
    }),
    deleteItem: (id, token) => apiRequest(`/items/${id}`, {
        method: "DELETE",
        token,
    }),
    searchItems: (query) => apiRequest(`/search?q=${encodeURIComponent(query)}`),

    // Claims
    getClaims: (token) => apiRequest("/claims", { token }),
    createClaim: (claimData, token) => apiRequest("/claims", {
        method: "POST",
        body: JSON.stringify(claimData),
        token,
    }),

    // Matches
    getMatches: (token) => apiRequest("/matches", { token }),

    // Rewards & Leaderboard
    getRewards: () => apiRequest("/rewards"),
    getLeaderboard: () => apiRequest("/leaderboard"),
};