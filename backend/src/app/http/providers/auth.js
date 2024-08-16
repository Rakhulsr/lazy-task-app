import jwt from "jsonwebtoken";
import "dotenv/config";

const generateCookie = async (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });

  res.cookie("jwt", token, {
    maxAge: 5 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: "development",
  });
};

export default generateCookie;
