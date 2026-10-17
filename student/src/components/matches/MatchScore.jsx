export default function MatchScore({ score }) {
    const value = Math.max(0, Math.min(100, Math.round(score || 0)));

    let label = "Low similarity";
    if (value >= 70) label = "Strong similarity";
    else if (value >= 40) label = "Possible match";

    return (
        <div
            className="match-score"
            title={`${value}% demo similarity score`}
            aria-label={`${value}% demo similarity score: ${label}`}
        >
            <div className="match-score-top">
                <span>{label}</span>
                <strong>{value}%</strong>
            </div>
            <div className="match-score-track">
                <span style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}