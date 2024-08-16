import express from "express";
import cookieParser from "cookie-parser";

import taskRoutes from "./src/routes/task.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.get("/", async (req, res) => {
  res.send("hello cuy");
});
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(3000, (err) => {
  if (err) {
    console.log("error to listen in port");
  } else {
    console.log("server up in port: 3000");
  }
});
