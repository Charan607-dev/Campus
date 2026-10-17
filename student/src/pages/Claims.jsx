import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileCheck2, Clock3, CheckCircle2, XCircle } from "lucide-react";
import { getClaims } from "../utils/itemStorage";

export default function Claims() {
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        setClaims(getClaims());
    }, []);

    function formatDate(value) {
        if (!value) return "Date unavailable";

        return new Date(value).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    function statusIcon(status) {
        if (status === "approved") return <CheckCircle2 size={16} />;
        if (status === "rejected") return <XCircle size={16} />;
        return <Clock3 size={16} />;
    }

    return (
        <section className="dashboard-page">
            <div className="container">
                <div className="page-header dashboard-header">
                    <span className="eyebrow"><FileCheck2 size={15} /> Ownership verification</span>
                    <h1>My claims</h1>
                    <p>
                        Review the ownership claims you submitted for potential item matches.
                    </p>
                </div>

                {claims.length ? (
                    <div className="claims-list">
                        {claims.map((claim) => (
                            <article className="claim-card" key={claim.id}>
                                <div className="claim-card-icon">
                                    <FileCheck2 size={23} />
                                </div>

                                <div className="claim-card-main">
                                    <span className="claim-reference">
                                        Submitted {formatDate(claim.createdAt)}
                                    </span>
                                    <h2>{claim.foundItemTitle || "Found item"}</h2>
                                    <p>
                                        Related lost report: {claim.lostItemTitle || "Not specified"}
                                    </p>
                                    <div className="claim-reason">
                                        <strong>Your explanation</strong>
                                        <p>{claim.reason || "No explanation provided."}</p>
                                    </div>
                                </div>

                                <span className={`claim-status ${claim.status || "pending"}`}>
                                    {statusIcon(claim.status)}
                                    {claim.status || "pending"}
                                </span>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <span className="empty-state-icon"><FileCheck2 size={33} /></span>
                        <h3>No claims submitted</h3>
                        <p>
                            Browse possible matches and submit an ownership claim when a
                            found report appears to match your lost item.
                        </p>
                        <Link to="/matches" className="button button-primary">
                            Explore matches
                        </Link>
                    </div>
                )}

                <p className="demo-notice">
                    Demo limitation: claims are saved in local browser storage. The pending
                    status is not a real review by an administrator.
                </p>
            </div>
        </section>
    );
}