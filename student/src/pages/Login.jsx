import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, LockKeyhole, LoaderCircle } from "lucide-react";
import { loginStudent } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const from = location.state?.from?.pathname || "/";

    if (isAuthenticated) {
        navigate(from, { replace: true });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Enter your email and password.");
            return;
        }

        setLoading(true);
        try {
            await loginStudent({ email: email.trim(), password });
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || "Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="auth-section">
            <div className="auth-decoration">
                <GraduationCap size={32} />
                <h2>Your campus community, connected.</h2>
                <p>
                    Sign in to manage your reports and keep track of items you are trying
                    to recover.
                </p>
            </div>

            <div className="container auth-container">
                <form className="form-card auth-card" onSubmit={handleSubmit}>
                    <span className="eyebrow">Welcome back</span>
                    <h1>Log in to CampusFind</h1>
                    <p className="form-intro">
                        Enter your account details to continue.
                    </p>

                    {error && <p className="form-error" role="alert">{error}</p>}

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@college.edu"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button className="button button-primary button-full" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <LoaderCircle className="loader-spinner" size={16} /> Signing in...
                            </>
                        ) : (
                            <>
                                <LockKeyhole size={16} /> Log in
                            </>
                        )}
                    </button>

                    <p className="form-bottom">
                        New to CampusFind? <Link to="/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}