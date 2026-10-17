import ManagementTable from "../components/common/ManagementTable";
import { demoReturns } from "../utils/demoData";

export default function VerifiedReturns() {
    return (
        <ManagementTable
            title="Verified Returns"
            description="Track items recorded as successfully returned to their owners."
            initialRows={demoReturns}
            searchKeys={["id", "item", "owner", "verifiedBy"]}
            columns={[
                { key: "id", label: "Return ID" },
                { key: "item", label: "Item" },
                { key: "owner", label: "Owner" },
                { key: "verifiedBy", label: "Verified by" },
                { key: "date", label: "Return date" },
            ]}
        />
    );
}