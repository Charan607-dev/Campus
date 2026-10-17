import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ClipboardList,
    Plus,
    Trash2,
    CheckCircle2,
    RotateCcw,
} from "lucide-react";
import ItemCard from "../components/items/ItemCard";
import { deleteItem, getItems, updateItem } from "../utils/itemStorage";

export default function MyReports() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");

    function refresh() {
        setItems(getItems());
    }

    useEffect(() => {
        refresh();
    }, []);

    const visibleItems = items.filter((item) => {
        if (filter === "all") return true;
        if (filter === "resolved") return item.status === "resolved";
        return item.type === filter && item.status !== "resolved";
    });

    function toggleResolved(item) {
        updateItem(item.id, {
            status: item.status === "resolved" ? "open" : "resolved",
        });
        refresh();
    }

    function removeItem(item) {
        const confirmed = window.confirm(
            `Delete the report "${item.title}"? This cannot be undone.`
        );

        if (!confirmed) return;
        deleteItem(item.id);
        refresh();
    }

    return (
        <section className="dashboard-page">
            <div className="container">
                <div className="page-header dashboard-header">
                    <span className="eyebrow"><ClipboardList size={15} /> Your activity</span>
                    <h1>My reports</h1>
                    <p>Review the lost and found reports saved in this browser.</p>
                </div>

                <div className="report-summary-grid">
                    <div className="report-summary-card">
                        <span>Total reports</span>
                        <strong>{items.length}</strong>
                    </div>
                    <div className="report-summary-card">
                        <span>Lost items</span>
                        <strong>{items.filter((item) => item.type === "lost").length}</strong>
                    </div>
                    <div className="report-summary-card">
                        <span>Found items</span>
                        <strong>{items.filter((item) => item.type === "found").length}</strong>
                    </div>
                    <div className="report-summary-card">
                        <span>Resolved</span>
                        <strong>{items.filter((item) => item.status === "resolved").length}</strong>
                    </div>
                </div>

                <div className="results-toolbar reports-toolbar">
                    <div>
                        <h2>Your saved reports</h2>
                        <p>Use the filters to review your reports.</p>
                    </div>
                    <div className="report-actions">
                        <Link to="/report-lost" className="button button-primary button-small">
                            <Plus size={15} /> Lost
                        </Link>
                        <Link to="/report-found" className="button button-secondary button-small">
                            <Plus size={15} /> Found
                        </Link>
                    </div>
                </div>

                <div className="report-tabs" role="group" aria-label="Filter reports">
                    {[
                        ["all", "All reports"],
                        ["lost", "Lost"],
                        ["found", "Found"],
                        ["resolved", "Resolved"],
                    ].map(([value, label]) => (
                        <button
                            type="button"
                            key={value}
                            className={`report-tab ${filter === value ? "selected" : ""}`}
                            onClick={() => setFilter(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {visibleItems.length ? (
                    <div className="items-grid">
                        {visibleItems.map((item) => (
                            <div className="managed-item" key={item.id}>
                                <ItemCard item={item} />
                                <div className="managed-item-actions">
                                    <button
                                        type="button"
                                        className="button button-secondary button-small"
                                        onClick={() => toggleResolved(item)}
                                    >
                                        {item.status === "resolved" ? (
                                            <><RotateCcw size={14} /> Reopen</>
                                        ) : (
                                            <><CheckCircle2 size={14} /> Mark resolved</>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="button button-ghost button-small delete-button"
                                        onClick={() => removeItem(item)}
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span className="empty-state-icon"><ClipboardList size={32} /></span>
                        <h3>No reports in this view</h3>
                        <p>Create a report or choose another filter to see your saved items.</p>
                        <Link to="/report-lost" className="button button-primary">
                            Report a lost item
                        </Link>
                    </div>
                )}

                <p className="demo-notice">
                    Demo limitation: local browser storage does not distinguish individual
                    students. These reports are not yet connected to an authenticated account.
                </p>
            </div>
        </section>
    );
}