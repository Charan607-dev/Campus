import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRoundPlus } from "lucide-react";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        college: "",
        studentId: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    function updateField(event) {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setError(
            "Registration is not connected yet. Account creation will be enabled after backend integration."
        );
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
                        />
                    </div>

                    <button className="button button-primary button-full" type="submit">
                        <UserRoundPlus size={17} /> Create account
                    </button>

                    <p className="form-bottom">
                        Already registered? <Link to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}