import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../services/auth";
import {
    LayoutDashboard,
    PackageSearch,
    GitCompareArrows,
    ClipboardCheck,
    BadgeCheck,
    Users,
    MapPinned,
    LogOut,
    Menu,
    X,
    Bell,
    ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { label: "Overview", path: "/", icon: LayoutDashboard },
    { label: "Manage Items", path: "/items", icon: PackageSearch },
    { label: "Match Review", path: "/matches", icon: GitCompareArrows },
    { label: "Claim Review", path: "/claims", icon: ClipboardCheck },
    { label: "Verified Returns", path: "/returns", icon: BadgeCheck },
    { label: "User Management", path: "/users", icon: Users },
    { label: "Heatmap Analytics", path: "/analytics", icon: MapPinned },
];

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutAdmin();
        navigate("/login", { replace: true });
    };

    return (
        <div className="admin-shell">
            {sidebarOpen && (
                <button
                    className="sidebar-overlay"
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`admin-sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
                <div className="admin-brand">
                    <span className="admin-brand-icon"><ShieldCheck size={23} /></span>
                    <span>
                        <strong>CampusFind</strong>
                        <small>ADMIN CONSOLE</small>
                    </span>
                    <button
                        className="sidebar-close"
                        aria-label="Close sidebar"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="sidebar-section-label">WORKSPACE</div>

                <nav className="admin-navigation">
                    {navigation.map(({ label, path, icon: Icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === "/"}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `admin-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Icon size={19} />
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <div className="admin-profile">
                        <div className="admin-avatar">A</div>
                        <div>
                            <strong>Administrator</strong>
                            <small>CampusFind Admin</small>
                        </div>
                    </div>

                    <button className="admin-logout" onClick={handleLogout}>
                        <LogOut size={17} /> Sign out
                    </button>
                </div>
            </aside>

            <div className="admin-main">
                <header className="admin-topbar">
                    <button
                        className="sidebar-toggle"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open navigation"
                    >
                        <Menu size={22} />
                    </button>

                    <div className="topbar-context">
                        <span className="topbar-breadcrumb">CampusFind /</span>
                        <strong>Administration</strong>
                    </div>

                    <div className="topbar-right">
                        <span className="admin-status">
                            <span className="status-dot" /> Admin workspace
                        </span>
                        <span className="topbar-bell"><Bell size={19} /></span>
                    </div>
                </header>

                <main className="admin-content">
                    <Outlet />
                </main>

                <footer className="admin-footer">
                    CampusFind Admin Console · Lost-and-found operations
                </footer>
            </div>
        </div>
    );
}