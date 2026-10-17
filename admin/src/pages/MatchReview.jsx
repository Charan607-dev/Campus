import ManagementTable, { StatusBadge } from "../components/common/ManagementTable";
import { demoMatches } from "../utils/demoData";

export default function MatchReview() {
    return (
        <ManagementTable
            title="Match Review"
            description="Review possible lost-and-found matches before confirming them."
            initialRows={demoMatches}
            searchKeys={["id", "lostTitle", "foundTitle", "lostLocation", "foundLocation"]}
            filters={["pending", "approved", "rejected"]}
            columns={[
                { key: "id", label: "Match ID" },
                { key: "lostTitle", label: "Lost item" },
                { key: "foundTitle", label: "Found item" },
                { key: "lostLocation", label: "Lost location" },
                { key: "score", label: "Similarity", render: (row) => `${row.score}%` },
                { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
            ]}
            actions={[
                { label: "Approve", icon: "✓", update: (row) => ({ ...row, status: "approved" }), className: "approve" },
                { label: "Reject", icon: "✕", update: (row) => ({ ...row, status: "rejected" }), className: "reject" },
            ]}
        />
    );
}