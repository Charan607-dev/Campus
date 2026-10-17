import { useMemo, useState } from "react";
import { Search, Check, X, RefreshCw } from "lucide-react";

export default function ManagementTable({
    title,
    description,
    initialRows,
    columns,
    searchKeys = [],
    actions = [],
    filters = [],
}) {
    const [rows, setRows] = useState(initialRows);
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            const searchable = searchKeys
                .map((key) => String(row[key] ?? ""))
                .join(" ")
                .toLowerCase();

            const matchesSearch = searchable.includes(query.toLowerCase());
            const matchesFilter =
                filter === "all" ||
                String(row.status).toLowerCase() === filter.toLowerCase();

            return matchesSearch && matchesFilter;
        });
    }, [rows, query, filter, searchKeys]);

    function runAction(action, row) {
        const updated = action.update ? action.update(row) : row;
        if (!action.update) return;

        setRows((current) =>
            current.map((item) => (item.id === row.id ? updated : item))
        );
    }

    return (
        <section className="admin-page">
            <div className="admin-page-heading">
                <div>
                    <span className="admin-eyebrow">CAMPUS OPERATIONS</span>
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
                <span className="demo-data-badge">DEMO DATA</span>
            </div>

            <div className="admin-panel">
                <div className="management-toolbar">
                    <div className="management-search">
                        <Search size={17} />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search records..."
                            aria-label="Search records"
                        />
                    </div>

                    {filters.length > 0 && (
                        <select
                            value={filter}
                            onChange={(event) => setFilter(event.target.value)}
                            aria-label="Filter records by status"
                            className="management-select"
                        >
                            <option value="all">All statuses</option>
                            {filters.map((value) => (
                                <option key={value} value={value}>
                                    {value.charAt(0).toUpperCase() + value.slice(1)}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th key={column.key}>{column.label}</th>
                                ))}
                                {actions.length > 0 && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRows.map((row) => (
                                <tr key={row.id}>
                                    {columns.map((column) => (
                                        <td key={column.key}>
                                            {column.render
                                                ? column.render(row)
                                                : String(row[column.key] ?? "—")}
                                        </td>
                                    ))}
                                    {actions.length > 0 && (
                                        <td>
                                            <div className="management-actions">
                                                {actions.map((action) => (
                                                    <button
                                                        key={action.label}
                                                        type="button"
                                                        className={`management-action ${action.className || ""}`}
                                                        title={action.label}
                                                        aria-label={`${action.label}: ${row.id}`}
                                                        onClick={() => runAction(action, row)}
                                                    >
                                                        {action.icon}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                            {filteredRows.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length + 1} className="management-empty">
                                        No records match your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="management-footer">
                    Showing {filteredRows.length} of {rows.length} records
                    <button
                        type="button"
                        className="management-reset"
                        onClick={() => {
                            setRows(initialRows);
                            setQuery("");
                            setFilter("all");
                        }}
                    >
                        <RefreshCw size={14} /> Reset demo data
                    </button>
                </div>
            </div>
        </section>
    );
}

export function StatusBadge({ status }) {
    return (
        <span className={`admin-status-badge ${String(status).toLowerCase()}`}>
            {status}
        </span>
    );
}

export function ReviewActions({ onApprove, onReject }) {
    return (
        <>
            <button className="management-action approve" onClick={onApprove} title="Approve">
                <Check size={15} />
            </button>
            <button className="management-action reject" onClick={onReject} title="Reject">
                <X size={15} />
            </button>
        </>
    );
}