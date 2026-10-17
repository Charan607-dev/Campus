import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/auth";
import { ShieldCheck, Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Enter your email and password.");
            return;
        }

        // Temporary demo login. Replace with backend authentication.
        if (
            email.trim().toLowerCase() === "admin@campusfind.com" &&
            password === "Admin@123"
        ) {
            localStorage.setItem("campusfind_admin", "demo-admin");
            navigate("/");
            return;
        }

        setError("Invalid demo credentials.");
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
                        placeholder="admin@campusfind.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
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
                        />
                        <button
                            type="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {error && <p className="admin-login-error">{error}</p>}

                    <button className="admin-login-submit" type="submit">
                        Sign in to dashboard
                    </button>
                </form>

                <div className="login-demo-note">
                    <strong>Temporary demo access</strong>
                    <span>Email: admin@campusfind.com</span>
                    <span>Password: Admin@123</span>
                    <p>Replace this demo login with secure backend authentication before deployment.</p>
                </div>
            </section>
        </main>
    );
}