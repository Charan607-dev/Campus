import { MapPin, CalendarDays, Image as ImageIcon } from "lucide-react";

export default function ItemCard({ item, onClick }) {
    if (!item) return null;

    const isLost = item.type === "lost";

    return (
        <article
            className="item-card"
            onClick={() => onClick?.(item)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onClick?.(item);
                }
            }}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            {item.imageUrl ? (
                <img
                    className="item-card-image"
                    src={item.imageUrl}
                    alt={item.title || "Reported item"}
                    loading="lazy"
                />
            ) : (
                <div className="item-card-image item-card-placeholder">
                    <ImageIcon size={32} />
                    <span>No image available</span>
                </div>
            )}

            <div className="item-card-body">
                <div className="item-card-top">
                    <span className={`item-type-badge ${isLost ? "lost" : "found"}`}>
                        {isLost ? "Lost" : "Found"}
                    </span>
                    <span className="item-category">{item.category || "Other"}</span>
                </div>

                <h3>{item.title || "Untitled item"}</h3>

                <p className="item-description">
                    {item.description || "No description provided."}
                </p>

                <div className="item-meta">
                    <span>
                        <MapPin size={15} />
                        {item.location || "Location unknown"}
                    </span>

                    <span>
                        <CalendarDays size={15} />
                        {item.date || "Date unknown"}
                    </span>
                </div>

                {item.status === "resolved" && (
                    <span className="item-resolved-label">Resolved</span>
                )}
            </div>
        </article>
    );
}