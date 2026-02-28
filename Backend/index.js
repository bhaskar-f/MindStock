import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authrouter from "./routes/auth.routes.js";
import idearouter from "./routes/idea.routes.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

app.use(express.json());
app.use("/api/ideas", idearouter);
app.use("/api/auth", authrouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is running on port: " + PORT);
});
