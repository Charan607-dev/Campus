import { MapPin, CalendarDays, ArrowRight, Send } from "lucide-react";
import MatchScore from "./MatchScore";

export default function MatchCard({ match, onClaim }) {
    const { item, score } = match;

    return (
        <article className="match-card">
            <div className="match-card-heading">
                <span className={`item-type-badge ${item.type === "lost" ? "lost" : "found"}`}>
                    {item.type === "lost" ? "Lost report" : "Found report"}
                </span>
                <span className="match-category">{item.category || "Other"}</span>
            </div>

            {item.imageUrl ? (
                <img className="match-image" src={item.imageUrl} alt={item.title} />
            ) : (
                <div className="match-image match-image-placeholder">
                    <span>{item.title?.slice(0, 1)?.toUpperCase() || "?"}</span>
                </div>
            )}

            <div className="match-card-content">
                <MatchScore score={score} />

                <h3>{item.title}</h3>
                <p>{item.description || "No description provided."}</p>

                <div className="match-details">
                    <span><MapPin size={14} /> {item.location || "Location unknown"}</span>
                    <span><CalendarDays size={14} /> {item.date || "Date unknown"}</span>
                </div>

                <button
                    className="button button-primary button-full"
                    type="button"
                    onClick={() => onClaim(item)}
                >
                    <Send size={15} /> Submit ownership claim <ArrowRight size={15} />
                </button>
            </div>
        </article>
    );
}