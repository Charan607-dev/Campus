import { useState } from "react";
import { apiRequest } from "../services/api";

export default function ReportLost() {
    const [itemName, setItemName] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            // Obtain this token from the current Supabase Auth session.
            const token = "ACCESS_TOKEN_FROM_AUTH_SESSION";

            const result = await apiRequest("/items", {
                method: "POST",
                token,
                body: JSON.stringify({
                    item_name: itemName,
                    item_type: "lost",
                }),
            });

            setMessage(result.message || "Report submitted");
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
                placeholder="Enter item name"
                required
            />
            <button type="submit">Submit report</button>
            <p>{message}</p>
        </form>
    );
}