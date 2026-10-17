import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";

import Login from "./pages/Login";
import RequireAdmin from "./routes/RequireAdmin";
import Dashboard from "./pages/Dashboard";
import ManageItems from "./pages/ManageItems";
import MatchReview from "./pages/MatchReview";
import ClaimReview from "./pages/ClaimReview";
import VerifiedReturns from "./pages/VerifiedReturns";
import UserManagement from "./pages/UserManagement";
import HeatmapAnalytics from "./pages/HeatmapAnalytics";

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/items" element={<ManageItems />} />
                <Route path="/matches" element={<MatchReview />} />
                <Route path="/claims" element={<ClaimReview />} />
                <Route path="/returns" element={<VerifiedReturns />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/analytics" element={<HeatmapAnalytics />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}