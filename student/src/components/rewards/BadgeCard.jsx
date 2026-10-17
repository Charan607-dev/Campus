import { Lock, CheckCircle2 } from "lucide-react";

export default function BadgeCard({ badge, unlocked = false }) {
    const Icon = badge.icon || CheckCircle2;

    return (
        <article className={`badge-card ${unlocked ? "badge-unlocked" : "badge-locked"}`}>
            <div className="badge-icon">
                {unlocked ? <Icon size={25} /> : <Lock size={22} />}
            </div>

            <div className="badge-content">
                <h3>{badge.name}</h3>
                <p>{badge.description}</p>
                <span className="badge-requirement">
                    {unlocked ? "Unlocked" : badge.requirement}
                </span>
            </div>
        </article>
    );
}