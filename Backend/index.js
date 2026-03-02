import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authrouter from "./routes/auth.routes.js";
import idearouter from "./routes/idea.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(async (_req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return res.status(500).json({
      message: "Database connection is unavailable.",
    });
  }
});

app.get("/", (_req, res) => {
  res.send("api is running");
});

app.get("/api", (_req, res) => {
  res.send("api is running");
});

app.use("/api/ideas", idearouter);
app.use("/api/auth", authrouter);

if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => {
    console.log("server is running on port: " + PORT);
  });
}

export default app;
