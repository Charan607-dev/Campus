import { useMemo } from "react";
import {
    Award,
    PackagePlus,
    Search,
    Handshake,
    ShieldCheck,
    Sparkles,
} from "lucide-react";
import PointsCard from "../components/rewards/PointsCard";
import BadgeCard from "../components/rewards/BadgeCard";
import { getItems, getClaims } from "../utils/itemStorage";

const BADGES = [
    {
        id: "first-report",
        name: "First Step",
        description: "Submit your first lost or found report.",
        requirement: "1 report",
        icon: PackagePlus,
        unlocked: (stats) => stats.reports >= 1,
    },
    {
        id: "five-reports",
        name: "Campus Observer",
        description: "Help your campus by submitting five reports.",
        requirement: "5 reports",
        icon: Search,
        unlocked: (stats) => stats.reports >= 5,
    },
    {
        id: "first-claim",
        name: "Ownership Seeker",
        description: "Submit your first ownership claim.",
        requirement: "1 claim",
        icon: ShieldCheck,
        unlocked: (stats) => stats.claims >= 1,
    },
    {
        id: "community-helper",
        name: "Community Helper",
        description: "Contribute ten reports to the community.",
        requirement: "10 reports",
        icon: Handshake,
        unlocked: (stats) => stats.reports >= 10,
    },
    {
        id: "five-claims",
        name: "Persistent Finder",
        description: "Submit five ownership claims.",
        requirement: "5 claims",
        icon: Award,
        unlocked: (stats) => stats.claims >= 5,
    },
    {
        id: "active-member",
        name: "Campus Champion",
        description: "Reach 500 demo reward points.",
        requirement: "500 points",
        icon: Sparkles,
        unlocked: (stats) => stats.points >= 500,
    },
];

export default function Rewards() {
    const stats = useMemo(() => {
        const items = getItems();
        const claims = getClaims();

        const reports = items.length;
        const claimsCount = claims.length;
        const openReports = items.filter((item) => item.status !== "resolved").length;
        const points = reports * 50 + claimsCount * 25;

        return {
            reports,
            claims: claimsCount,
            openReports,
            points,
            level: Math.floor(points / 100) + 1,
        };
    }, []);

    const unlockedCount = BADGES.filter((badge) => badge.unlocked(stats)).length;

    return (
        <main className="rewards-page container">
            <header className="page-header rewards-header">
                <div>
                    <span className="eyebrow">CAMPUS COMMUNITY</span>
                    <h1>Your rewards</h1>
                    <p>Track your contributions and the badges you have earned.</p>
                </div>
            </header>

            <PointsCard
                points={stats.points}
                reports={stats.reports}
                matches={stats.openReports}
            />

            <section className="rewards-progress">
                <div>
                    <h2>Badge collection</h2>
                    <p>Keep contributing to unlock more achievements.</p>
                </div>
                <span className="badge-count">
                    {unlockedCount} / {BADGES.length} unlocked
                </span>
            </section>

            <section className="badges-grid">
                {BADGES.map((badge) => (
                    <BadgeCard
                        key={badge.id}
                        badge={badge}
                        unlocked={badge.unlocked(stats)}
                    />
                ))}
            </section>

            <aside className="demo-notice rewards-notice">
                <Sparkles size={18} />
                <p>
                    <strong>Demo scoring:</strong> Each report earns 50 points and each
                    claim earns 25 points. These are calculated from this browser's
                    saved data; they are not official or shared campus rankings.
                </p>
            </aside>
        </main>
    );
}