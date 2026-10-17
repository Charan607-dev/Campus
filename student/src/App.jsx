import { Navigate, Route, Routes } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";

import Home from "./pages/Home";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import SearchResults from "./pages/SearchResults";
import MyReports from "./pages/MyReports";
import Matches from "./pages/Matches";
import Claims from "./pages/Claims";
import Rewards from "./pages/Rewards";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
    return (
        <Routes>
            <Route element={<StudentLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/report-lost" element={<ReportLost />} />
                <Route path="/report-found" element={<ReportFound />} />
                <Route path="/my-reports" element={<MyReports />} />
                <Route path="/matches" element={<Matches />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/leaderboard" element={<Leaderboard />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}