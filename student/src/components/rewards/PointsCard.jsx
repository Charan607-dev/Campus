import { Trophy, Star, Target, Zap } from "lucide-react";

export default function PointsCard({ points = 0, reports = 0, matches = 0 }) {
    return (
        <section className="points-card">
            <div className="points-card-top">
                <span className="points-icon"><Trophy size={24} /></span>
                <span className="points-label">Your CampusFind score</span>
            </div>

            <div className="points-total">{points.toLocaleString()} <span>pts</span></div>
            <p className="points-description">Every useful report helps your campus community.</p>

            <div className="points-stats">
                <div>
                    <Target size={17} />
                    <strong>{reports}</strong>
                    <span>Reports</span>
                </div>
                <div>
                    <Zap size={17} />
                    <strong>{matches}</strong>
                    <span>Potential matches</span>
                </div>
                <div>
                    <Star size={17} />
                    <strong>{Math.floor(points / 100)}</strong>
                    <span>Level</span>
                </div>
            </div>
        </section>
    );
}