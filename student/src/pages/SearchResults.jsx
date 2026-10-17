import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, PackageSearch, ArrowRight, X } from "lucide-react";
import ItemCard from "../components/items/ItemCard";
import ItemFilters from "../components/items/ItemFilters";
import { getItems } from "../utils/itemStorage";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [items, setItems] = useState([]);
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [category, setCategory] = useState(
        searchParams.get("category") || "all"
    );
    const [type, setType] = useState("all");
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setItems(getItems());
    }, []);

    useEffect(() => {
        const nextParams = new URLSearchParams();

        if (search.trim()) nextParams.set("q", search.trim());
        if (category !== "all") nextParams.set("category", category);

        setSearchParams(nextParams, { replace: true });
    }, [search, category, setSearchParams]);

    const filteredItems = useMemo(() => {
        const query = search.trim().toLowerCase();

        return items.filter((item) => {
            const matchesSearch =
                !query ||
                [
                    item.title,
                    item.description,
                    item.location,
                    item.category,
                ].some((value) => String(value || "").toLowerCase().includes(query));

            const matchesCategory =
                category === "all" || item.category === category;

            const matchesType = type === "all" || item.type === type;

            return matchesSearch && matchesCategory && matchesType;
        });
    }, [items, search, category, type]);

    function refreshItems() {
        setItems(getItems());
    }

    return (
        <section className="search-page">
            <div className="container">
                <div className="page-header">
                    <span className="eyebrow">
                        <Search size={15} /> Campus item directory
                    </span>
                    <h1>Find what you're looking for.</h1>
                    <p>
                        Search lost and found reports by item, category, description, or
                        campus location.
                    </p>
                </div>

                <ItemFilters
                    search={search}
                    onSearchChange={setSearch}
                    category={category}
                    onCategoryChange={setCategory}
                    type={type}
                    onTypeChange={setType}
                />

                <div className="results-toolbar">
                    <div>
                        <h2>Recent reports</h2>
                        <p>
                            {filteredItems.length}{" "}
                            {filteredItems.length === 1 ? "result" : "results"} found
                        </p>
                    </div>

                    <button
                        className="button button-ghost button-small"
                        onClick={() => {
                            setSearch("");
                            setCategory("all");
                            setType("all");
                        }}
                        type="button"
                    >
                        Clear filters
                    </button>
                </div>

                {filteredItems.length > 0 ? (
                    <div className="items-grid">
                        {filteredItems.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                onView={setSelectedItem}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span className="empty-state-icon">
                            <PackageSearch size={34} />
                        </span>
                        <h3>No matching reports yet</h3>
                        <p>
                            Try a different search term or category. If your item is missing,
                            create a report so your campus community can help.
                        </p>
                        <div className="empty-state-actions">
                            <Link to="/report-lost" className="button button-primary">
                                Report lost item <ArrowRight size={16} />
                            </Link>
                            <Link to="/report-found" className="button button-ghost">
                                Report found item
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {selectedItem && (
                <div
                    className="modal-backdrop"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            setSelectedItem(null);
                        }
                    }}
                >
                    <section
                        className="item-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="item-modal-title"
                    >
                        <button
                            className="modal-close"
                            type="button"
                            onClick={() => setSelectedItem(null)}
                            aria-label="Close item details"
                        >
                            <X size={20} />
                        </button>

                        <span
                            className={`item-type-badge ${selectedItem.type === "lost" ? "lost" : "found"
                                }`}
                        >
                            {selectedItem.type === "lost" ? "Lost item" : "Found item"}
                        </span>

                        <h2 id="item-modal-title">{selectedItem.title}</h2>
                        {selectedItem.imageUrl && (
                            <img
                                className="modal-item-image"
                                src={selectedItem.imageUrl}
                                alt={selectedItem.title}
                            />
                        )}

                        <p>{selectedItem.description || "No description provided."}</p>

                        <dl className="item-detail-list">
                            <div>
                                <dt>Category</dt>
                                <dd>{selectedItem.category || "Other"}</dd>
                            </div>
                            <div>
                                <dt>Location</dt>
                                <dd>{selectedItem.location || "Not specified"}</dd>
                            </div>
                            <div>
                                <dt>Date</dt>
                                <dd>{selectedItem.date || "Not specified"}</dd>
                            </div>
                            <div>
                                <dt>Contact</dt>
                                <dd>{selectedItem.contact || "No contact provided"}</dd>
                            </div>
                        </dl>

                        <p className="field-hint">
                            This is a local demo report. Contact information is not verified.
                            Confirm ownership carefully before returning an item.
                        </p>

                        <button
                            className="button button-primary button-full"
                            type="button"
                            onClick={() => {
                                setSelectedItem(null);
                                refreshItems();
                            }}
                        >
                            Close details
                        </button>
                    </section>
                </div>
            )}
        </section>
    );
}