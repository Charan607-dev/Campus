import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeftRight, Send, X } from "lucide-react";
import MatchCard from "../components/matches/MatchCard";
import { getItems, saveClaim } from "../utils/itemStorage";
import { calculateMatchScore } from "../utils/matching";

export default function Matches() {
    const [items, setItems] = useState([]);
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");

    function refresh() {
        setItems(getItems());
    }

    useEffect(() => {
        refresh();
    }, []);

    const matches = useMemo(() => {
        const lostItems = items.filter(
            (item) => item.type === "lost" && item.status !== "resolved"
        );
        const foundItems = items.filter(
            (item) => item.type === "found" && item.status !== "resolved"
        );

        const results = [];

        for (const lostItem of lostItems) {
            for (const foundItem of foundItems) {
                const score = calculateMatchScore(lostItem, foundItem);

                if (score >= 15) {
                    results.push({
                        item: foundItem,
                        lostItem,
                        score,
                    });
                }
            }
        }

        return results.sort((a, b) => b.score - a.score);
    }, [items]);

    function openClaim(foundItem, lostItem) {
        setSelectedMatch({ foundItem, lostItem });
        setReason("");
        setMessage("");
    }

    function submitClaim(event) {
        event.preventDefault();

        if (!selectedMatch) return;

        if (!reason.trim()) {
            setMessage("Describe why you believe this item belongs to you.");
            return;
        }

        saveClaim({
            foundItemId: selectedMatch.foundItem.id,
            lostItemId: selectedMatch.lostItem.id,
            foundItemTitle: selectedMatch.foundItem.title,
            lostItemTitle: selectedMatch.lostItem.title,
            reason: reason.trim(),
        });

        setSelectedMatch(null);
        setReason("");
        setMessage("Claim saved in this browser.");
    }

    return (
        <section className="dashboard-page">
            <div className="container">
                <div className="page-header dashboard-header">
                    <span className="eyebrow"><Sparkles size={15} /> Smart matching demo</span>
                    <h1>Possible matches</h1>
                    <p>
                        Compare lost reports against found reports using item descriptions,
                        categories, locations, and dates.
                    </p>
                </div>

                {message && (
                    <div className="form-success claim-feedback" role="status">
                        {message}
                        <button
                            type="button"
                            onClick={() => setMessage("")}
                            aria-label="Dismiss message"
                        >
                            <X size={15} />
                        </button>
                    </div>
                )}

                <div className="match-explainer">
                    <ArrowLeftRight size={21} />
                    <div>
                        <strong>How the score works</strong>
                        <p>
                            Category, text similarity, location, and date contribute to a
                            heuristic score. It is a suggestion, not proof that two reports
                            describe the same item.
                        </p>
                    </div>
                </div>

                {matches.length ? (
                    <>
                        <div className="results-toolbar">
                            <div>
                                <h2>Potential matches</h2>
                                <p>{matches.length} report pairs found</p>
                            </div>
                        </div>

                        <div className="items-grid">
                            {matches.map((match) => (
                                <article className="match-pair" key={`${match.lostItem.id}-${match.item.id}`}>
                                    <div className="match-pair-label">
                                        <span>Lost report</span>
                                        <strong>{match.lostItem.title}</strong>
                                    </div>
                                    <div className="match-pair-connector">
                                        <ArrowLeftRight size={16} />
                                        <span>Possible match</span>
                                    </div>
                                    <MatchCard
                                        match={match}
                                        onClaim={(foundItem) => openClaim(foundItem, match.lostItem)}
                                    />
                                </article>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="empty-state">
                        <span className="empty-state-icon"><Sparkles size={33} /></span>
                        <h3>No potential matches yet</h3>
                        <p>
                            You need at least one open lost report and one open found report
                            with enough similarity to generate a suggestion.
                        </p>
                        <div className="empty-state-actions">
                            <Link to="/report-lost" className="button button-primary">
                                Report lost
                            </Link>
                            <Link to="/report-found" className="button button-ghost">
                                Report found
                            </Link>
                        </div>
                    </div>
                )}

                {selectedMatch && (
                    <div className="modal-backdrop">
                        <form
                            className="item-modal claim-modal"
                            onSubmit={submitClaim}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="claim-title"
                        >
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setSelectedMatch(null)}
                                aria-label="Close claim form"
                            >
                                <X size={20} />
                            </button>

                            <span className="eyebrow">Ownership verification</span>
                            <h2 id="claim-title">Submit a claim</h2>
                            <p>
                                Potential found item: <strong>{selectedMatch.foundItem.title}</strong>
                            </p>
                            <p>
                                Your related lost report: <strong>{selectedMatch.lostItem.title}</strong>
                            </p>

                            <div className="form-group">
                                <label htmlFor="claim-reason">
                                    Why do you believe this item is yours? *
                                </label>
                                <textarea
                                    id="claim-reason"
                                    value={reason}
                                    onChange={(event) => setReason(event.target.value)}
                                    placeholder="Describe identifying details that establish ownership..."
                                    maxLength={1000}
                                    required
                                />
                            </div>

                            <p className="field-hint">
                                Avoid sharing passwords, financial details, or other sensitive
                                information. In this demo, the claim is stored locally only.
                            </p>

                            <button type="submit" className="button button-primary button-full">
                                <Send size={16} /> Save claim
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </section>
    );
}