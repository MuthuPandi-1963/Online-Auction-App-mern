import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import DBConnection from './database/db.js';
import authRoutes from "./Router/AuthenticationRoutes.js";
import "./Oauth/Github.js";
import "./Oauth/Google.js";
import passport from "passport";
import GoogleRoutes from "./Router/GoogleRoutes.js";
import GitHubRoutes from "./Router/GitHubRoutes.js";
import AuctionRoutes from './Router/AuctionRoutes.js';

dotenv.config();

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        name: "token",
        secret: process.env.SESSION_SECRET || "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Secure cookies in production
            sameSite:  "None",
        },
    })
);
app.use(
    cors({
        origin: process.env.FRONTEND_URL_LOCAL,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/auth", GoogleRoutes);
app.use("/auth", GitHubRoutes);
app.use("/api/auctions",AuctionRoutes)

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Online Auction Page",
    });
});

// Start Server
app.listen(PORT, async () => {
    await DBConnection();
    console.log(`Server is running on http://localhost:${PORT}`);
});
