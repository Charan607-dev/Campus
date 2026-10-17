import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/auth";
import { ShieldCheck, Eye, EyeOff, LockKeyhole, LoaderCircle } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Enter your administrator email and password.");
            return;
        }

        setLoading(true);
        try {
            await loginAdmin({ email: email.trim(), password });
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.message || "Invalid administrator credentials or access denied.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="login-screen">
            <section className="login-panel">
                <div className="login-logo"><ShieldCheck size={30} /></div>
                <span className="login-eyebrow">CAMPUSFIND ADMINISTRATION</span>
                <h1>Welcome back</h1>
                <p className="login-description">
                    Sign in to manage campus reports, claims, and item returns.
                </p>

                <form onSubmit={handleSubmit} className="admin-login-form">
                    <label htmlFor="admin-email">Administrator email</label>
                    <input
                        id="admin-email"
                        type="email"
                        autoComplete="username"
                        placeholder="admin@campus.edu"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        disabled={loading}
                    />

                    <label htmlFor="admin-password">Password</label>
                    <div className="password-field">
                        <LockKeyhole size={17} />
                        <input
                            id="admin-password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            disabled={loading}
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && <p className="admin-login-error" role="alert">{error}</p>}

                    <button className="admin-login-submit" type="submit" disabled={loading}>
                        {loading ? (
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                                <LoaderCircle className="loader-spinner" size={16} /> Authenticating...
                            </span>
                        ) : (
                            "Sign in to dashboard"
                        )}
                    </button>
                </form>

                <div className="login-demo-note">
                    <strong>Administrator Account Setup</strong>
                    <p>
                        Administrator accounts are authenticated securely through Supabase Auth with an <code>admin</code> role assigned in the <code>profiles</code> table or in user <code>app_metadata</code>.
                    </p>
                </div>
            </section>
        </main>
    );
}