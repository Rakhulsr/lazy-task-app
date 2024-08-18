import express from "express";
import {
  all,
  createTask,
  getOneTask,
  permanentDeleteTask,
  restoreTask,
  softDeleteTask,
  trashTasks,
  updateTask,
} from "../app/http/controller/task.controller.js";
import { authMe } from "../app/http/middleware/me.js";

const router = express.Router();

// dashboard
router.get("/", authMe, all);
router.get("/task/:id", authMe, getOneTask);
router.post("/create", authMe, createTask);
router.put("/update/:id", authMe, updateTask);

router.post("/delete/:id", authMe, softDeleteTask);

// trash
router.get("/trash", authMe, trashTasks);
router.delete("/trash/permanent-delete/:id", authMe, permanentDeleteTask);
router.put("/trash/restore/:id", authMe, restoreTask);

export default router;
