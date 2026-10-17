function tokenize(value = "") {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 1);
}

function keywordSimilarity(first, second) {
    const a = new Set(tokenize(first));
    const b = new Set(tokenize(second));

    if (a.size === 0 || b.size === 0) return 0;

    const common = [...a].filter((word) => b.has(word)).length;
    return common / new Set([...a, ...b]).size;
}

function sameCategory(first, second) {
    return Boolean(first.category) &&
        first.category.toLowerCase() === second.category?.toLowerCase();
}

function sameLocation(first, second) {
    const a = tokenize(first.location).join(" ");
    const b = tokenize(second.location).join(" ");

    return Boolean(a && b) && (a.includes(b) || b.includes(a));
}

export function calculateMatchScore(first, second) {
    if (!first || !second || first.id === second.id) return 0;
    if (first.type === second.type) return 0;

    let score = 0;

    if (sameCategory(first, second)) score += 35;

    const titleSimilarity = keywordSimilarity(first.title, second.title);
    const descriptionSimilarity = keywordSimilarity(
        `${first.title || ""} ${first.description || ""}`,
        `${second.title || ""} ${second.description || ""}`
    );

    score += Math.round(Math.max(titleSimilarity, descriptionSimilarity) * 40);

    if (sameLocation(first, second)) score += 20;

    if (first.date && second.date) {
        const daysApart = Math.abs(
            new Date(`${first.date}T00:00:00`).getTime() -
            new Date(`${second.date}T00:00:00`).getTime()
        ) / (1000 * 60 * 60 * 24);

        if (daysApart <= 1) score += 5;
        else if (daysApart <= 7) score += 3;
    }

    return Math.min(score, 100);
}

export function findMatches(item, allItems, minimumScore = 15) {
    if (!item) return [];

    return allItems
        .filter(
            (candidate) =>
                candidate.id !== item.id &&
                candidate.type !== item.type &&
                candidate.status !== "resolved"
        )
        .map((candidate) => ({
            item: candidate,
            score: calculateMatchScore(item, candidate),
        }))
        .filter((match) => match.score >= minimumScore)
        .sort((a, b) => b.score - a.score);
}