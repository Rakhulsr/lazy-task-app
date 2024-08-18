import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import taskRoutes from "./src/routes/task.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.send("HIT THE API");
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/storage", express.static(path.join(__dirname, "src/storage")));

app.listen(PORT, (err) => {
  if (err) {
    console.log("error to listen in port");
  } else {
    console.log(`SERVER IS UP IN http://localhost:${PORT}`);
  }
});
