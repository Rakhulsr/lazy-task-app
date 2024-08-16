import express from "express";
import {
  login,
  logout,
  me,
  signup,
} from "../app/http/controller/auth.controller.js";
import { authMe } from "../app/http/middleware/me.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

router.get("/me", authMe, me);

export default router;
