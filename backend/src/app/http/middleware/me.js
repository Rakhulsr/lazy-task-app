import jwt from "jsonwebtoken";
import prisma from "../../../client/prisma.js";

export const authMe = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error message in authMe: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
