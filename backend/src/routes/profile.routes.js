import express from "express";
import { authMe } from "../app/http/middleware/me.js";

import upload from "../app/http/middleware/multer.js";
import {
  getProfile,
  updateUser,
} from "../app/http/controller/user.controller.js";

const router = express.Router();

router.get("/", authMe, getProfile);
router.put("/update", authMe, upload.single("profile"), updateUser);

export default router;
