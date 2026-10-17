import { Link, NavLink } from "react-router-dom";
import {
    Search,
    Plus,
    Menu,
    X,
    GraduationCap,
    Trophy,
    Award,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="site-header">
            <div className="navbar container">
                <Link to="/" className="brand" onClick={closeMenu}>
                    <span className="brand-icon">
                        <GraduationCap size={23} />
                    </span>
                    <span>
                        Campus<span className="brand-accent">Find</span>
                        <small>Lost less. Find more.</small>
                    </span>
                </Link>

                <button
                    className="mobile-menu-button"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={23} /> : <Menu size={23} />}
                </button>

                <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
                    <NavLink to="/" end onClick={closeMenu}>
                        Home
                    </NavLink>

                    <NavLink to="/search" onClick={closeMenu}>
                        <Search size={16} /> Discover
                    </NavLink>

                    <NavLink to="/matches" onClick={closeMenu}>
                        Matches
                    </NavLink>

                    <NavLink to="/my-reports" onClick={closeMenu}>
                        My Reports
                    </NavLink>

                    <NavLink to="/claims" onClick={closeMenu}>
                        Claims
                    </NavLink>

                    <NavLink to="/rewards" onClick={closeMenu}>
                        <Award size={16} /> Rewards
                    </NavLink>

                    <NavLink to="/leaderboard" onClick={closeMenu}>
                        <Trophy size={16} /> Leaderboard
                    </NavLink>

                    <div className="nav-auth">
                        <Link
                            to="/report-lost"
                            className="button button-primary button-small"
                            onClick={closeMenu}
                        >
                            <Plus size={16} /> Report Item
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}