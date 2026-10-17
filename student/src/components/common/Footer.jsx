import { Link } from "react-router-dom";
import { GraduationCap, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container footer-inner">
                <Link to="/" className="brand footer-brand">
                    <span className="brand-icon">
                        <GraduationCap size={21} />
                    </span>
                    <span>
                        Campus<span className="brand-accent">Find</span>
                    </span>
                </Link>

                <p>
                    Built for campus communities, with <Heart size={13} /> in mind.
                </p>

                <span className="footer-copy">
                    © {new Date().getFullYear()} CampusFind
                </span>
            </div>
        </footer>
    );
}