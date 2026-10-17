import ManagementTable, { StatusBadge } from "../components/common/ManagementTable";
import { demoUsers } from "../utils/demoData";

export default function UserManagement() {
    return (
        <ManagementTable
            title="User Management"
            description="Review student accounts and their reporting activity."
            initialRows={demoUsers}
            searchKeys={["id", "name", "email", "status"]}
            filters={["active", "suspended"]}
            columns={[
                { key: "id", label: "Student ID" },
                { key: "name", label: "Student" },
                { key: "email", label: "Email" },
                { key: "reports", label: "Reports" },
                { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
            ]}
            actions={[
                { label: "Suspend or activate", icon: "↻", update: (row) => ({ ...row, status: row.status === "active" ? "suspended" : "active" }), className: "approve" },
            ]}
        />
    );
}