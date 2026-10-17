import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { MapPinned, MapPin, TrendingUp } from "lucide-react";

const locationData = [
    { location: "Library", reports: 28 },
    { location: "Main Block", reports: 22 },
    { location: "Cafeteria", reports: 18 },
    { location: "Sports Ground", reports: 13 },
    { location: "Parking", reports: 9 },
];

export default function HeatmapAnalytics() {
    return (
        <section className="admin-page">
            <div className="admin-page-heading">
                <div>
                    <span className="admin-eyebrow">CAMPUS INTELLIGENCE</span>
                    <h1>Heatmap Analytics</h1>
                    <p>Identify high-activity locations and patterns in item reports.</p>
                </div>
                <span className="demo-data-badge">DEMO DATA</span>
            </div>

            <div className="analytics-summary-grid">
                <article className="admin-stat-card">
                    <div className="admin-stat-icon blue"><MapPinned size={21} /></div>
                    <div className="admin-stat-label">Tracked locations</div>
                    <div className="admin-stat-value">{locationData.length}</div>
                    <div className="admin-stat-note">Sample campus areas</div>
                </article>

                <article className="admin-stat-card">
                    <div className="admin-stat-icon green"><TrendingUp size={21} /></div>
                    <div className="admin-stat-label">Sample reports</div>
                    <div className="admin-stat-value">
                        {locationData.reduce((sum, location) => sum + location.reports, 0)}
                    </div>
                    <div className="admin-stat-note">Illustrative dataset</div>
                </article>
            </div>

            <div className="admin-panel analytics-chart-panel">
                <div className="admin-panel-heading">
                    <div>
                        <h2>Reports by campus location</h2>
                        <p>Higher values indicate areas with more sample reports.</p>
                    </div>
                    <MapPin size={20} />
                </div>

                <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={locationData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8edf3" />
                        <XAxis dataKey="location" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Bar dataKey="reports" name="Reports" fill="#16845b" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="analytics-location-list">
                {locationData.map((location, index) => (
                    <article className="admin-panel analytics-location" key={location.location}>
                        <span className="analytics-location-rank">{index + 1}</span>
                        <div className="analytics-location-info">
                            <strong>{location.location}</strong>
                            <div className="analytics-bar-track">
                                <span style={{ width: `${(location.reports / locationData[0].reports) * 100}%` }} />
                            </div>
                        </div>
                        <strong>{location.reports}</strong>
                    </article>
                ))}
            </div>

            <div className="demo-notice-admin">
                This is a location-frequency visualization, not a geographic map. A real campus heatmap requires verified campus coordinates and real report data from the backend.
            </div>
        </section>
    );
}