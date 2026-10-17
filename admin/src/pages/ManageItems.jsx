import { useState } from "react";
import ManagementTable, { StatusBadge } from "../components/common/ManagementTable";
import { demoItems } from "../utils/demoData";

export default function ManageItems() {
    const [items, setItems] = useState(demoItems);

    return (
        <ManagementTable
            title="Manage Items"
            description="Review and moderate lost-and-found submissions."
            initialRows={items}
            searchKeys={["id", "title", "category", "location", "reportedBy"]}
            filters={["pending", "open", "resolved", "rejected"]}
            columns={[
                { key: "id", label: "Reference" },
                { key: "title", label: "Item" },
                { key: "type", label: "Type" },
                { key: "category", label: "Category" },
                { key: "location", label: "Location" },
                { key: "reportedBy", label: "Reporter" },
                { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
            ]}
            actions={[
                { label: "Approve", icon: "✓", update: (row) => ({ ...row, status: "open" }), className: "approve" },
                { label: "Reject", icon: "✕", update: (row) => ({ ...row, status: "rejected" }), className: "reject" },
            ]}
        />
    );
}