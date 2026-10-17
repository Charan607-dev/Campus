import { Link } from "react-router-dom";
import { GraduationCap, Search } from "lucide-react";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <Link to="/" className="brand">
                        <span className="brand-icon">
                            <GraduationCap size={22} />
                        </span>
                        <span>
                            Campus<span className="brand-accent">Find</span>
                            <small>Lost less. Find more.</small>
                        </span>
                    </Link>
                    <p>A smarter way to reunite students with their belongings.</p>
                </div>

                <div className="footer-links">
                    <h3>Explore</h3>
                    <Link to="/search"><Search size={15} /> Discover items</Link>
                    <Link to="/report-lost">Report lost item</Link>
                    <Link to="/report-found">Report found item</Link>
                    <Link to="/matches">Potential matches</Link>
                </div>

                <div className="footer-links">
                    <h3>Your account</h3>
                    <Link to="/my-reports">My reports</Link>
                    <Link to="/claims">My claims</Link>
                    <Link to="/rewards">Rewards</Link>
                    <Link to="/leaderboard">Leaderboard</Link>
                </div>
            </div>

            <div className="container footer-bottom">
                <span>© {new Date().getFullYear()} CampusFind</span>
                <span>Built for a more connected campus.</span>
            </div>
        </footer>
    );
}