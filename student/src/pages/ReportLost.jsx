import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2, Upload, LoaderCircle } from "lucide-react";
import { ITEM_CATEGORIES } from "../components/items/ItemFilters";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import { saveItem as saveLocalItem } from "../utils/itemStorage";

const initialForm = {
    title: "",
    category: "",
    description: "",
    location: "",
    date: new Date().toLocaleDateString("en-CA"),
    contact: "",
    imageUrl: "",
};

export default function ReportLost() {
    const navigate = useNavigate();
    const { token, isAuthenticated } = useAuth();
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    function updateField(event) {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess(false);

        if (!form.title.trim() || !form.category || !form.location.trim() || !form.date) {
            setError("Complete all required fields before submitting.");
            return;
        }

        const payload = {
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
            location: form.location.trim(),
            date: form.date,
            contact: form.contact.trim(),
            image_url: form.imageUrl.trim() || null,
            imageUrl: form.imageUrl.trim() || null,
            type: "lost",
            status: "available",
        };

        setSubmitting(true);
        try {
            if (token) {
                await api.createItem(payload, token);
            }
            // Always keep local storage in sync as well for resilient client-side experience
            saveLocalItem({
                ...payload,
                reportedBy: "Student",
            });

            setSuccess(true);
            setForm(initialForm);
            window.setTimeout(() => navigate("/search"), 900);
        } catch (err) {
            // If backend throws an error, also save locally and alert
            saveLocalItem({
                ...payload,
                reportedBy: "Student",
            });
            setError(`Note: Saved locally. Backend notice: ${err.message}`);
            window.setTimeout(() => navigate("/search"), 1200);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className="report-page">
            <div className="container">
                <div className="page-header">
                    <span className="eyebrow">
                        <AlertCircle size={15} /> Lost something?
                    </span>
                    <h1>Report a lost item</h1>
                    <p>
                        Share the details so your campus community can help you find it.
                        Include an accurate location and date to make searching easier.
                    </p>
                </div>

                <form className="form-card report-card" onSubmit={handleSubmit}>
                    <h2>Item details</h2>
                    <p className="form-intro">Fields marked * are required.</p>

                    {error && <p className="form-error" role="alert">{error}</p>}
                    {success && (
                        <p className="form-success" role="status">
                            <CheckCircle2 size={16} /> Report saved. Opening reports...
                        </p>
                    )}

                    {!isAuthenticated && (
                        <div className="demo-notice" style={{ marginBottom: "1.2rem" }}>
                            You are not signed in. Items reported while signed in will be linked to your student profile.
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="lost-title">Item name *</label>
                        <input
                            id="lost-title"
                            name="title"
                            value={form.title}
                            onChange={updateField}
                            placeholder="e.g. Black wireless earbuds"
                            maxLength={100}
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lost-category">Category *</label>
                        <select
                            id="lost-category"
                            name="category"
                            value={form.category}
                            onChange={updateField}
                            required
                            disabled={submitting}
                        >
                            <option value="">Select a category</option>
                            {ITEM_CATEGORIES.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lost-description">Description</label>
                        <textarea
                            id="lost-description"
                            name="description"
                            value={form.description}
                            onChange={updateField}
                            placeholder="Color, brand, distinctive marks, or other useful details..."
                            maxLength={1000}
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lost-location">Last seen location *</label>
                        <input
                            id="lost-location"
                            name="location"
                            value={form.location}
                            onChange={updateField}
                            placeholder="e.g. Library, second floor"
                            maxLength={150}
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lost-date">Date lost *</label>
                        <input
                            id="lost-date"
                            name="date"
                            type="date"
                            max={new Date().toLocaleDateString("en-CA")}
                            value={form.date}
                            onChange={updateField}
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lost-contact">Contact information</label>
                        <input
                            id="lost-contact"
                            name="contact"
                            value={form.contact}
                            onChange={updateField}
                            placeholder="Email or phone number"
                            maxLength={150}
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lost-image">Image URL (optional)</label>
                        <input
                            id="lost-image"
                            name="imageUrl"
                            type="url"
                            value={form.imageUrl}
                            onChange={updateField}
                            placeholder="https://images.unsplash.com/..."
                            disabled={submitting}
                        />
                    </div>

                    <button className="button button-primary button-full" type="submit" disabled={submitting}>
                        {submitting ? (
                            <>
                                <LoaderCircle className="loader-spinner" size={17} /> Submitting report...
                            </>
                        ) : (
                            <>
                                <Upload size={17} /> Submit lost-item report
                            </>
                        )}
                    </button>

                    <p className="form-bottom">
                        Found an item instead? <Link to="/report-found">Report it here</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}