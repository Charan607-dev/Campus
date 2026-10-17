import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import {
    notFoundHandler,
    errorHandler
} from "./middleware/errorHandler.js";

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
].filter(Boolean);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Origin not allowed by CORS"));
        }
    })
);

app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "CampusFind API",
        version: "1.0.0",
        health: "/api/v1/health"
    });
});

app.use("/api/v1/health", healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;