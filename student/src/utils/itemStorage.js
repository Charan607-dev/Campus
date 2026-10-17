const ITEMS_KEY = "campusfind_items";
const CLAIMS_KEY = "campusfind_claims";

function readArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function writeArray(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function makeId() {
    return globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getItems() {
    return readArray(ITEMS_KEY);
}

export function saveItem(item) {
    const items = getItems();

    const newItem = {
        id: makeId(),
        createdAt: new Date().toISOString(),
        status: "open",
        ...item,
    };

    writeArray(ITEMS_KEY, [newItem, ...items]);
    return newItem;
}

export function updateItem(id, changes) {
    const items = getItems();
    const updatedItems = items.map((item) =>
        item.id === id ? { ...item, ...changes, id: item.id } : item
    );

    writeArray(ITEMS_KEY, updatedItems);
    return updatedItems.find((item) => item.id === id) ?? null;
}

export function deleteItem(id) {
    const remaining = getItems().filter((item) => item.id !== id);
    writeArray(ITEMS_KEY, remaining);
    return remaining;
}

export function getClaims() {
    return readArray(CLAIMS_KEY);
}

export function saveClaim(claim) {
    const claims = getClaims();

    const newClaim = {
        id: makeId(),
        createdAt: new Date().toISOString(),
        status: "pending",
        ...claim,
    };

    writeArray(CLAIMS_KEY, [newClaim, ...claims]);
    return newClaim;
}

export function updateClaim(id, changes) {
    const claims = getClaims();
    const updatedClaims = claims.map((claim) =>
        claim.id === id ? { ...claim, ...changes, id: claim.id } : claim
    );

    writeArray(CLAIMS_KEY, updatedClaims);
    return updatedClaims.find((claim) => claim.id === id) ?? null;
}