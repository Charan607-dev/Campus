import { Search, SlidersHorizontal } from "lucide-react";

export const ITEM_CATEGORIES = [
    "Electronics",
    "ID Cards",
    "Books & Notes",
    "Bags",
    "Clothing",
    "Keys",
    "Wallets",
    "Water Bottles",
    "Accessories",
    "Other",
];

export default function ItemFilters({
    searchTerm = "",
    setSearchTerm = () => { },
    category = "All",
    setCategory = () => { },
    type = "all",
    setType = () => { },
}) {
    return (
        <section className="item-filters">
            <div className="filter-search">
                <Search size={18} />
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by item, description, or location..."
                    aria-label="Search items"
                />
            </div>

            <div className="filter-control">
                <SlidersHorizontal size={17} />
                <select
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    aria-label="Filter by report type"
                >
                    <option value="all">All reports</option>
                    <option value="lost">Lost items</option>
                    <option value="found">Found items</option>
                </select>
            </div>

            <div className="filter-control">
                <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    aria-label="Filter by category"
                >
                    <option value="All">All categories</option>
                    {ITEM_CATEGORIES.map((itemCategory) => (
                        <option key={itemCategory} value={itemCategory}>
                            {itemCategory}
                        </option>
                    ))}
                </select>
            </div>
        </section>
    );
}