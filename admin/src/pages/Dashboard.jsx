import {
    PackageSearch,
    SearchCheck,
    ClipboardCheck,
    BadgeCheck,
    ArrowUpRight,
    Clock3,
    Activity,
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
import { demoItems, demoMatches, demoClaims, demoReturns } from "../utils/demoData";

const weeklyData = [
    { day: "Mon", lost: 12, found: 18 },
    { day: "Tue", lost: 17, found: 21 },
    { day: "Wed", lost: 10, found: 24 },
    { day: "Thu", lost: 22, found: 17 },
    { day: "Fri", lost: 19, found: 27 },
    { day: "Sat", lost: 8, found: 13 },
    { day: "Sun", lost: 11, found: 16 },
];

export default function Dashboard() {
    const stats = [
        {
            label: "Total reports",
            value: demoItems.length,
            note: "Sample records",
            icon: PackageSearch,
            color: "blue",
        },
        {
            label: "Pending matches",
            value: demoMatches.filter((item) => item.status === "pending").length,
            note: "Require review",
            icon: SearchCheck,
            color: "purple",
        },
        {
            label: "Pending claims",
            value: demoClaims.filter((item) => item.status === "pending").length,
            note: "Awaiting decision",
            icon: ClipboardCheck,
            color: "orange",
        },
        {
            label: "Verified returns",
            value: demoReturns.length,
            note: "Sample records",
            icon: BadgeCheck,
            color: "green",
        },
    ];

    const recentItems = [...demoItems]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5);

    return (
        <div className="admin-page">
            <div className="admin-page-heading">
                <div>
                    <span className="admin-eyebrow">OPERATIONS OVERVIEW</span>
                    <h1>Dashboard</h1>
                    <p>Monitor reports, matching activity, and ownership claims.</p>
                </div>
                <span className="demo-data-badge">DEMO DATA</span>
            </div>

            <section className="admin-stats-grid">
                {stats.map(({ label, value, note, icon: Icon, color }) => (
                    <article className="admin-stat-card" key={label}>
                        <div className={`admin-stat-icon ${color}`}><Icon size={21} /></div>
                        <div className="admin-stat-label">{label}</div>
                        <div className="admin-stat-value">{value}</div>
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
                            <p>Illustrative lost and found reports over seven days.</p>
                        </div>
                        <Activity size={20} />
                    </div>

                    <div className="activity-chart">
                        <ResponsiveContainer width="100%" height={260}>
                            <AreaChart data={weeklyData}>
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
                            <span><strong>Item reports</strong><small>Pending moderation</small></span>
                            <b>{demoItems.filter((item) => item.status === "pending").length}</b>
                        </div>
                        <div>
                            <span className="attention-icon purple"><SearchCheck size={18} /></span>
                            <span><strong>Match suggestions</strong><small>Pending review</small></span>
                            <b>{demoMatches.filter((item) => item.status === "pending").length}</b>
                        </div>
                        <div>
                            <span className="attention-icon blue"><ClipboardCheck size={18} /></span>
                            <span><strong>Ownership claims</strong><small>Need a decision</small></span>
                            <b>{demoClaims.filter((item) => item.status === "pending").length}</b>
                        </div>
                    </div>
                </article>
            </section>

            <section className="admin-panel recent-panel">
                <div className="admin-panel-heading">
                    <div>
                        <h2>Recent reports</h2>
                        <p>Latest items in the sample dataset.</p>
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
                            {recentItems.map((item) => (
                                <tr key={item.id}>
                                    <td><strong>{item.title}</strong><small>{item.category}</small></td>
                                    <td>{item.id}</td>
                                    <td><span className={`admin-type ${item.type}`}>{item.type}</span></td>
                                    <td>{item.location}</td>
                                    <td>{item.date}</td>
                                    <td><span className={`admin-status-badge ${item.status}`}>{item.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}