import { useMemo } from "react";
import { Trophy, Medal, Users, TrendingUp } from "lucide-react";
import { getItems, getClaims } from "../utils/itemStorage";

const DEMO_STUDENTS = [
    { name: "Aarav Sharma", department: "Computer Science", points: 450 },
    { name: "Diya Reddy", department: "Information Science", points: 375 },
    { name: "Ishaan Kumar", department: "Electronics", points: 300 },
    { name: "Ananya Rao", department: "Mechanical Engineering", points: 250 },
    { name: "Rahul Nair", department: "Computer Science", points: 200 },
];

export default function Leaderboard() {
    const leaderboard = useMemo(() => {
        const items = getItems();
        const claims = getClaims();

        const localPoints = items.length * 50 + claims.length * 25;

        const currentUser = {
            name: "You (this browser)",
            department: "Your account",
            points: localPoints,
            isCurrentUser: true,
        };

        return [...DEMO_STUDENTS, currentUser]
            .sort((a, b) => b.points - a.points)
            .map((student, index) => ({ ...student, rank: index + 1 }));
    }, []);

    const topThree = leaderboard.slice(0, 3);

    return (
        <main className="leaderboard-page container">
            <header className="page-header">
                <span className="eyebrow">CAMPUS COMMUNITY</span>
                <h1>Leaderboard</h1>
                <p>Recognising students who help keep the campus community connected.</p>
            </header>

            <section className="leaderboard-summary">
                <div className="leaderboard-summary-icon"><Trophy size={24} /></div>
                <div>
                    <span>Community contributors</span>
                    <strong>{leaderboard.length}</strong>
                </div>
                <div className="leaderboard-summary-icon"><TrendingUp size={24} /></div>
                <div>
                    <span>Scoring system</span>
                    <strong>Demo</strong>
                </div>
            </section>

            <section className="leaderboard-podium">
                {topThree.map((student) => (
                    <article
                        key={student.name}
                        className={`podium-card podium-rank-${student.rank} ${student.isCurrentUser ? "podium-current-user" : ""
                            }`}
                    >
                        <div className="podium-medal">
                            {student.rank === 1 ? (
                                <Trophy size={24} />
                            ) : (
                                <Medal size={24} />
                            )}
                        </div>
                        <span className="podium-rank">#{student.rank}</span>
                        <h3>{student.name}</h3>
                        <p>{student.department}</p>
                        <strong>{student.points.toLocaleString()} pts</strong>
                    </article>
                ))}
            </section>

            <section className="leaderboard-table-section">
                <div className="leaderboard-section-heading">
                    <div>
                        <h2>Rankings</h2>
                        <p>Sorted by demo contribution points.</p>
                    </div>
                    <Users size={22} />
                </div>

                <div className="leaderboard-list">
                    {leaderboard.map((student) => (
                        <article
                            key={student.name}
                            className={`leaderboard-row ${student.isCurrentUser ? "leaderboard-current-user" : ""
                                }`}
                        >
                            <span className="leaderboard-rank">{student.rank}</span>
                            <div className="leaderboard-avatar">
                                {student.name.charAt(0)}
                            </div>
                            <div className="leaderboard-student">
                                <strong>{student.name}</strong>
                                <span>{student.department}</span>
                            </div>
                            <strong className="leaderboard-points">
                                {student.points.toLocaleString()} pts
                            </strong>
                        </article>
                    ))}
                </div>
            </section>

            <aside className="demo-notice">
                <Trophy size={18} />
                <p>
                    This leaderboard combines sample students with points calculated
                    from your browser's local reports and claims. It is not a real
                    campus-wide ranking until user accounts and a shared database are
                    connected.
                </p>
            </aside>
        </main>
    );
}