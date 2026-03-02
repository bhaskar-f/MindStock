import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authrouter from "./routes/auth.routes.js";
import idearouter from "./routes/idea.routes.js";

dotenv.config();

const app = express();
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.length > 0 && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      message: "CORS origin not allowed.",
    });
  }

  res.setHeader(
    "Access-Control-Allow-Origin",
    allowedOrigins.length > 0 && origin ? origin : "*",
  );
  if (allowedOrigins.length > 0) {
    res.setHeader("Vary", "Origin");
  }
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return next();
});

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("api is running");
});

app.get("/api", (_req, res) => {
  res.send("api is running");
});

const ensureDbConnection = async (_req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return res.status(500).json({
      message: "Database connection is unavailable.",
    });
  }
};

app.use("/api/ideas", ensureDbConnection, idearouter);
app.use("/api/auth", ensureDbConnection, authrouter);

if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log("server is running on port: " + PORT);
  });
}

export default app;
