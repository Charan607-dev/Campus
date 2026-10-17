import { Link } from "react-router-dom";
import {
    ArrowRight,
    Search,
    ShieldCheck,
    Clock3,
    HeartHandshake,
    Smartphone,
    BookOpen,
    KeyRound,
    Headphones,
    Wallet,
    CheckCircle2,
    Sparkles,
    MapPin,
    PackageSearch,
} from "lucide-react";

const categories = [
    { name: "Electronics", icon: Smartphone, color: "purple" },
    { name: "Books & Notes", icon: BookOpen, color: "blue" },
    { name: "Keys & ID Cards", icon: KeyRound, color: "orange" },
    { name: "Accessories", icon: Headphones, color: "pink" },
    { name: "Wallets", icon: Wallet, color: "green" },
];

const steps = [
    {
        number: "01",
        title: "Report an item",
        description:
            "Lost something or found an item on campus? Share its details in a few steps.",
    },
    {
        number: "02",
        title: "Discover possible matches",
        description:
            "Browse reports and identify items that could match what you lost or found.",
    },
    {
        number: "03",
        title: "Verify and recover",
        description:
            "Connect with the other student and verify ownership before returning the item.",
    },
];

export default function Home() {
    return (
        <>
            <section className="hero-section">
                <div className="container hero-grid">
                    <div className="hero-copy">
                        <span className="eyebrow">
                            <Sparkles size={15} /> Made for campus communities
                        </span>

                        <h1>
                            Lost something?
                            <br />
                            <span>Let's bring it</span>
                            <br />
                            back to you.
                        </h1>

                        <p className="hero-description">
                            Your campus has a community. Now it has a smarter way to reunite
                            students with the things they lose.
                        </p>

                        <div className="hero-actions">
                            <Link to="/report-lost" className="button button-primary">
                                Report lost item <ArrowRight size={17} />
                            </Link>
                            <Link to="/search" className="button button-ghost">
                                <Search size={17} /> Explore reports
                            </Link>
                        </div>

                        <div className="hero-trust">
                            <span>
                                <ShieldCheck size={17} /> Community-based recovery
                            </span>
                            <span>
                                <Clock3 size={17} /> Simple reporting
                            </span>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="visual-orbit orbit-one" />
                        <div className="visual-orbit orbit-two" />

                        <div className="hero-note note-top">
                            <span className="note-icon note-green">
                                <CheckCircle2 size={19} />
                            </span>
                            <span>
                                <strong>Found something?</strong>
                                <small>Help its owner find it.</small>
                            </span>
                        </div>

                        <div className="hero-illustration">
                            <div className="illustration-top">
                                <span className="illustration-dot" />
                                <span className="illustration-dot" />
                                <span className="illustration-dot" />
                                <span className="illustration-label">CAMPUSFIND</span>
                            </div>

                            <div className="illustration-content">
                                <div className="illustration-icon">
                                    <PackageSearch size={48} strokeWidth={1.4} />
                                </div>
                                <p>Every item has a way home.</p>
                                <span>LOST • FOUND • REUNITED</span>
                            </div>

                            <div className="illustration-bottom">
                                <span>
                                    <MapPin size={14} /> Your campus
                                </span>
                                <span className="online-indicator">Community powered</span>
                            </div>
                        </div>

                        <div className="hero-note note-bottom">
                            <span className="note-icon note-yellow">
                                <HeartHandshake size={20} />
                            </span>
                            <span>
                                <strong>Small act, big impact</strong>
                                <small>One report can help someone.</small>
                            </span>
                        </div>

                        <div className="floating-spark spark-one">✳</div>
                        <div className="floating-spark spark-two">✦</div>
                    </div>
                </div>
            </section>

            <section className="category-section">
                <div className="container">
                    <div className="section-heading">
                        <span className="eyebrow">Browse by category</span>
                        <h2>What are you looking for?</h2>
                        <p>Start with a category to narrow down the search.</p>
                    </div>

                    <div className="category-grid">
                        {categories.map(({ name, icon: Icon, color }) => (
                            <Link
                                to={`/search?category=${encodeURIComponent(name)}`}
                                className="category-card"
                                key={name}
                            >
                                <span className={`category-icon ${color}`}>
                                    <Icon size={23} />
                                </span>
                                <strong>{name}</strong>
                                <ArrowRight className="category-arrow" size={17} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="how-section">
                <div className="container">
                    <div className="section-heading text-center centered-heading">
                        <span className="eyebrow">How it works</span>
                        <h2>Three steps. One less worry.</h2>
                        <p>
                            A straightforward way for students to report and recover
                            belongings.
                        </p>
                    </div>

                    <div className="steps-grid">
                        {steps.map((step) => (
                            <article className="step-card" key={step.number}>
                                <span className="step-number">{step.number}</span>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="container">
                    <div className="cta-panel">
                        <div>
                            <span className="eyebrow">Be part of the solution</span>
                            <h2>Found something that isn't yours?</h2>
                            <p>
                                Give it a better chance of getting back to its rightful owner.
                            </p>
                        </div>

                        <Link to="/report-found" className="button button-primary cta-button">
                            Report a found item <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}