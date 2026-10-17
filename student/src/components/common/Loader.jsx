import { LoaderCircle } from "lucide-react";

export default function Loader({ message = "Loading..." }) {
    return (
        <div className="app-loader" role="status" aria-live="polite">
            <LoaderCircle className="loader-spinner" size={32} />
            <p>{message}</p>
        </div>
    );
}