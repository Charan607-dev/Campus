import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkAdminSession, isAdminLoggedIn } from "../services/auth";

export default function RequireAdmin() {
    const [status, setStatus] = useState(isAdminLoggedIn() ? "checking" : "unauthorized");

    useEffect(() => {
        if (!isAdminLoggedIn()) {
            setStatus("unauthorized");
            return;
        }

        checkAdminSession().then((isValid) => {
            setStatus(isValid ? "authorized" : "unauthorized");
        });
    }, []);

    if (status === "checking") {
        return (
            <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", color: "var(--admin-muted)" }}>
                Checking administrator authorization...
            </div>
        );
    }

    return status === "authorized" ? <Outlet /> : <Navigate to="/login" replace />;
}