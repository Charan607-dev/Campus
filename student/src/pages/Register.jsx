import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRoundPlus, CheckCircle2, LoaderCircle } from "lucide-react";
import { registerStudent } from "../services/auth";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        college: "",
        studentId: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function updateField(event) {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const data = await registerStudent({
                email: form.email.trim(),
                password: form.password,
                name: form.name.trim(),
                college: form.college.trim(),
                studentId: form.studentId.trim(),
            });

            // If email confirmation is required by Supabase settings:
            if (data.session) {
                setSuccessMessage("Account created successfully! Redirecting...");
                setTimeout(() => navigate("/"), 1200);
            } else {
                setSuccessMessage(
                    "Registration successful! Please check your email to confirm your account, then log in."
                );
            }
        } catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="auth-section register-section">
            <div className="container auth-container">
                <form className="form-card auth-card register-card" onSubmit={handleSubmit}>
                    <span className="eyebrow">Join your campus community</span>
                    <h1>Create your account</h1>
                    <p className="form-intro">
                        Set up your student profile to report and recover lost belongings.
                    </p>

                    {error && <p className="form-error" role="alert">{error}</p>}
                    {successMessage && (
                        <p className="form-success" role="status">
                            <CheckCircle2 size={16} /> {successMessage}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            name="name"
                            autoComplete="name"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={updateField}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-email">College email</label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@college.edu"
                            value={form.email}
                            onChange={updateField}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="college">College name</label>
                        <input
                            id="college"
                            name="college"
                            placeholder="Enter your college"
                            value={form.college}
                            onChange={updateField}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="studentId">Student ID</label>
                        <input
                            id="studentId"
                            name="studentId"
                            placeholder="Enter your student ID"
                            value={form.studentId}
                            onChange={updateField}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">Password</label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            minLength={8}
                            placeholder="At least 8 characters"
                            value={form.password}
                            onChange={updateField}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            value={form.confirmPassword}
                            onChange={updateField}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button className="button button-primary button-full" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <LoaderCircle className="loader-spinner" size={17} /> Creating account...
                            </>
                        ) : (
                            <>
                                <UserRoundPlus size={17} /> Create account
                            </>
                        )}
                    </button>

                    <p className="form-bottom">
                        Already registered? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}