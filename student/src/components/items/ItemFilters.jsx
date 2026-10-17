import { Search, SlidersHorizontal } from "lucide-react";

export const ITEM_CATEGORIES = [
    "Electronics",
    "Books & Notes",
    "Keys & ID Cards",
    "Accessories",
    "Wallets",
    "Clothing",
    "Bags",
    "Other",
];

export default function ItemFilters({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    type,
    onTypeChange,
}) {
    return (
        <div className="item-filters">
            <div className="filter-search">
                <Search size={18} />
                <input
                    type="search"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Search by item, description or location..."
                    aria-label="Search reports"
                />
            </div>

            <div className="filter-control">
                <SlidersHorizontal size={17} />
                <select
                    value={category}
                    onChange={(event) => onCategoryChange(event.target.value)}
                    aria-label="Filter by category"
                >
                    <option value="all">All categories</option>
                    {ITEM_CATEGORIES.map((name) => (
                        <option value={name} key={name}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-control">
                <select
                    value={type}
                    onChange={(event) => onTypeChange(event.target.value)}
                    aria-label="Filter by report type"
                >
                    <option value="all">Lost & found</option>
                    <option value="lost">Lost items</option>
                    <option value="found">Found items</option>
                </select>
            </div>
        </div>
    );
}