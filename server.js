import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env immediately
dotenv.config({ path: path.join(__dirname, ".env") });
console.log("🔑 GEMINI_API_KEY prefix:", process.env.GEMINI_API_KEY?.slice(0, 8)); // debug

// Import rest AFTER dotenv
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import chatRoutes from "./routes/chat.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/chat", chatRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TaskFlow Smart AI ChatBot Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
