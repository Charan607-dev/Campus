import { useEffect, useState } from "react";
import {
    PackageSearch,
    SearchCheck,
    ClipboardCheck,
    BadgeCheck,
    ArrowUpRight,
    Clock3,
    Activity,
    LoaderCircle,
} from "lucide-react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import api from "../services/api";

const defaultWeeklyData = [
    { day: "Mon", lost: 4, found: 6 },
    { day: "Tue", lost: 7, found: 8 },
    { day: "Wed", lost: 3, found: 9 },
    { day: "Thu", lost: 8, found: 5 },
    { day: "Fri", lost: 6, found: 11 },
    { day: "Sat", lost: 2, found: 4 },
    { day: "Sun", lost: 3, found: 5 },
];

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashboardData] = useState({
        totalReports: 0,
        pendingMatches: 0,
        pendingClaims: 0,
        totalUsers: 0,
        totalRewards: 0,
        recentItems: [],
    });

    useEffect(() => {
        let mounted = true;
        api.get("/admin/dashboard")
            .then((res) => {
                if (mounted && res?.data) {
                    setDashboardData(res.data);
                }
            })
            .catch((err) => {
                console.warn("Could not load backend dashboard statistics:", err.message);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    const stats = [
        {
            label: "Total reports",
            value: dashboardData.totalReports,
            note: "Active items",
            icon: PackageSearch,
            color: "blue",
        },
        {
            label: "Pending matches",
            value: dashboardData.pendingMatches,
            note: "Require review",
            icon: SearchCheck,
            color: "purple",
        },
        {
            label: "Pending claims",
            value: dashboardData.pendingClaims,
            note: "Awaiting decision",
            icon: ClipboardCheck,
            color: "orange",
        },
        {
            label: "Registered profiles",
            value: dashboardData.totalUsers,
            note: "Campus users",
            icon: BadgeCheck,
            color: "green",
        },
    ];

    return (
        <div className="admin-page">
            <div className="admin-page-heading">
                <div>
                    <span className="admin-eyebrow">OPERATIONS OVERVIEW</span>
                    <h1>Dashboard</h1>
                    <p>Live summary of campus reports, matching activity, and claims.</p>
                </div>
            </div>

            <section className="admin-stats-grid">
                {stats.map(({ label, value, note, icon: Icon, color }) => (
                    <article className="admin-stat-card" key={label}>
                        <div className={`admin-stat-icon ${color}`}><Icon size={21} /></div>
                        <div className="admin-stat-label">{label}</div>
                        <div className="admin-stat-value">
                            {loading ? <LoaderCircle className="loader-spinner" size={20} /> : value}
                        </div>
                        <div className="admin-stat-note">
                            {note} <ArrowUpRight size={13} />
                        </div>
                    </article>
                ))}
            </section>

            <section className="admin-dashboard-grid">
                <article className="admin-panel activity-panel">
                    <div className="admin-panel-heading">
                        <div>
                            <h2>Report activity</h2>
                            <p>Illustrative lost and found activity across campus.</p>
                        </div>
                        <Activity size={20} />
                    </div>

                    <div className="activity-chart">
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={defaultWeeklyData}>
                                <defs>
                                    <linearGradient id="lostFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7c8cf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7c8cf8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="foundFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#28b889" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#28b889" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf3" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} width={30} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="lost"
                                    name="Lost reports"
                                    stroke="#7c8cf8"
                                    fill="url(#lostFill)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="found"
                                    name="Found reports"
                                    stroke="#28b889"
                                    fill="url(#foundFill)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="chart-legend">
                        <span><i className="legend-dot lost-dot" /> Lost reports</span>
                        <span><i className="legend-dot found-dot" /> Found reports</span>
                    </div>
                </article>

                <article className="admin-panel">
                    <div className="admin-panel-heading">
                        <div>
                            <h2>Needs attention</h2>
                            <p>Items awaiting administrative review.</p>
                        </div>
                        <Clock3 size={20} />
                    </div>

                    <div className="attention-list">
                        <div>
                            <span className="attention-icon orange"><PackageSearch size={18} /></span>
                            <span><strong>Pending claims</strong><small>Require review & verification</small></span>
                            <b>{dashboardData.pendingClaims}</b>
                        </div>
                        <div>
                            <span className="attention-icon purple"><SearchCheck size={18} /></span>
                            <span><strong>Pending matches</strong><small>Heuristic item pairs</small></span>
                            <b>{dashboardData.pendingMatches}</b>
                        </div>
                        <div>
                            <span className="attention-icon blue"><ClipboardCheck size={18} /></span>
                            <span><strong>Total Campus Items</strong><small>In database</small></span>
                            <b>{dashboardData.totalReports}</b>
                        </div>
                    </div>
                </article>
            </section>

            <section className="admin-panel recent-panel">
                <div className="admin-panel-heading">
                    <div>
                        <h2>Recent reports</h2>
                        <p>Latest items recorded in the database.</p>
                    </div>
                    <PackageSearch size={20} />
                </div>

                <div className="admin-table-wrap">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Reference</th>
                                <th>Type</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dashboardData.recentItems?.length > 0 ? (
                                dashboardData.recentItems.map((item) => (
                                    <tr key={item.id}>
                                        <td><strong>{item.title}</strong><small>{item.category || "General"}</small></td>
                                        <td>{item.id?.slice(0, 8)}</td>
                                        <td><span className={`admin-type ${item.type}`}>{item.type}</span></td>
                                        <td>{item.location || "On campus"}</td>
                                        <td>{item.date || new Date(item.created_at).toLocaleDateString()}</td>
                                        <td><span className={`admin-status-badge ${item.status}`}>{item.status}</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "var(--admin-muted)" }}>
                                        {loading ? "Loading reports..." : "No items recorded in database yet."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}