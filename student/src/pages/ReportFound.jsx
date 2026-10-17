import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, PackageCheck, Upload } from "lucide-react";
import { ITEM_CATEGORIES } from "../components/items/ItemFilters";
import { saveItem } from "../utils/itemStorage";

const initialForm = {
    title: "",
    category: "",
    description: "",
    location: "",
    date: "",
    contact: "",
    imageUrl: "",
};

export default function ReportFound() {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function updateField(event) {
        setForm((previous) => ({
            ...previous,
            [event.target.name]: event.target.value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setSuccess(false);

        if (!form.title.trim() || !form.category || !form.location.trim() || !form.date) {
            setError("Complete all required fields before submitting.");
            return;
        }

        saveItem({
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
            location: form.location.trim(),
            contact: form.contact.trim(),
            type: "found",
            reportedBy: "Student",
        });

        setSuccess(true);
        setForm(initialForm);
        window.setTimeout(() => navigate("/search"), 900);
    }

    return (
        <section className="report-page">
            <div className="container">
                <div className="page-header">
                    <span className="eyebrow">
                        <PackageCheck size={15} /> Help someone recover an item
                    </span>
                    <h1>Report a found item</h1>
                    <p>
                        Found something on campus? Report it so its owner has a better
                        chance of finding it.
                    </p>
                </div>

                <form className="form-card report-card" onSubmit={handleSubmit}>
                    <h2>Found item details</h2>
                    <p className="form-intro">Fields marked * are required.</p>

                    {error && <p className="form-error" role="alert">{error}</p>}
                    {success && (
                        <p className="form-success" role="status">
                            <CheckCircle2 size={16} /> Found-item report saved. Opening reports...
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="found-title">Item name *</label>
                        <input
                            id="found-title"
                            name="title"
                            value={form.title}
                            onChange={updateField}
                            placeholder="e.g. Blue student ID card"
                            maxLength={100}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="found-category">Category *</label>
                        <select
                            id="found-category"
                            name="category"
                            value={form.category}
                            onChange={updateField}
                            required
                        >
                            <option value="">Select a category</option>
                            {ITEM_CATEGORIES.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="found-description">Description</label>
                        <textarea
                            id="found-description"
                            name="description"
                            value={form.description}
                            onChange={updateField}
                            placeholder="Describe the item without revealing private details that only its owner should know..."
                            maxLength={1000}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="found-location">Location found *</label>
                        <input
                            id="found-location"
                            name="location"
                            value={form.location}
                            onChange={updateField}
                            placeholder="e.g. Cafeteria entrance"
                            maxLength={150}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="found-date">Date found *</label>
                        <input
                            id="found-date"
                            name="date"
                            type="date"
                            max={new Date().toLocaleDateString("en-CA")}
                            value={form.date}
                            onChange={updateField}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="found-contact">Contact information</label>
                        <input
                            id="found-contact"
                            name="contact"
                            value={form.contact}
                            onChange={updateField}
                            placeholder="Email or another contact method"
                            maxLength={150}
                        />
                        <span className="field-hint">
                            Demo note: contact details are stored in this browser. Avoid
                            entering sensitive personal details.
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="found-image">Image URL (optional)</label>
                        <input
                            id="found-image"
                            name="imageUrl"
                            type="url"
                            value={form.imageUrl}
                            onChange={updateField}
                            placeholder="https://example.com/item-image.jpg"
                        />
                    </div>

                    <button className="button button-primary button-full" type="submit">
                        <Upload size={17} /> Submit found-item report
                    </button>

                    <p className="form-bottom">
                        Lost an item instead? <Link to="/report-lost">Report it here</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}