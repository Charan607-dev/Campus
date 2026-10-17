import {
    MapPin,
    CalendarDays,
    Tag,
    PackageCheck,
} from "lucide-react";

export default function ItemCard({ item, onView }) {
    const isLost = item.type === "lost";

    const dateLabel = item.date
        ? new Date(`${item.date}T00:00:00`).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Date not provided";

    return (
        <article className="item-card">
            <div className="item-card-top">
                <span className={`item-type-badge ${isLost ? "lost" : "found"}`}>
                    {isLost ? "Lost item" : "Found item"}
                </span>
                <span className="item-category">
                    <Tag size={13} /> {item.category || "Other"}
                </span>
            </div>

            {item.imageUrl ? (
                <img
                    className="item-card-image"
                    src={item.imageUrl}
                    alt={item.title || "Reported item"}
                />
            ) : (
                <div className="item-card-placeholder">
                    <PackageCheck size={38} />
                    <span>No image provided</span>
                </div>
            )}

            <div className="item-card-body">
                <h3>{item.title}</h3>
                <p className="item-description">
                    {item.description || "No additional description."}
                </p>

                <div className="item-meta">
                    <span>
                        <MapPin size={14} />
                        {item.location || "Location not specified"}
                    </span>
                    <span>
                        <CalendarDays size={14} />
                        {dateLabel}
                    </span>
                </div>

                {item.contact && (
                    <p className="item-contact">Contact: {item.contact}</p>
                )}

                {onView && (
                    <button
                        className="button button-ghost button-full item-view-button"
                        type="button"
                        onClick={() => onView(item)}
                    >
                        View details
                    </button>
                )}
            </div>
        </article>
    );
}