import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../services/auth";

export default function RequireAdmin() {
    return isAdminLoggedIn()
        ? <Outlet />
        : <Navigate to="/login" replace />;
}