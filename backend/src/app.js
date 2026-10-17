
import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import itemRoutes from "./routes/item.routes.js";
import matchRoutes from "./routes/match.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import rewardRoutes from "./routes/reward.routes.js";
import searchRoutes from "./routes/search.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";

import {
    notFoundHandler,
    errorHandler
} from "./middleware/errorHandler.js";

const app = express();

app.use(cors({
    origin: [
        process.env.FRONTEND_URL || "http://localhost:5173",
        process.env.ADMIN_URL || "http://localhost:5174"
    ],
    credentials: true
}));

app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        name: "CampusFind API",
        version: "1.0.0",
        health: "/api/v1/health"
    });
});

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/items", itemRoutes);
app.use("/api/v1/matches", matchRoutes);
app.use("/api/v1/claims", claimRoutes);
app.use("/api/v1/rewards", rewardRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/leaderboard", leaderboardRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
