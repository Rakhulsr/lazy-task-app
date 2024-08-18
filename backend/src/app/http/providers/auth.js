import jwt from "jsonwebtoken";
import "dotenv/config";

const COOKIE_OPTIONS = {
  maxAge: 5 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

const generateCookie = async (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, COOKIE_OPTIONS);
};

export default generateCookie;
