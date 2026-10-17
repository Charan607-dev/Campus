import ManagementTable, { StatusBadge } from "../components/common/ManagementTable";
import { demoClaims } from "../utils/demoData";

export default function ClaimReview() {
    return (
        <ManagementTable
            title="Claim Review"
            description="Review ownership claims and record a decision."
            initialRows={demoClaims}
            searchKeys={["id", "item", "claimant"]}
            filters={["pending", "approved", "rejected"]}
            columns={[
                { key: "id", label: "Claim ID" },
                { key: "item", label: "Item" },
                { key: "claimant", label: "Claimant" },
                { key: "submitted", label: "Submitted" },
                { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
            ]}
            actions={[
                { label: "Approve", icon: "✓", update: (row) => ({ ...row, status: "approved" }), className: "approve" },
                { label: "Reject", icon: "✕", update: (row) => ({ ...row, status: "rejected" }), className: "reject" },
            ]}
        />
    );
}