import prisma from "../../../client/prisma.js";
import bcrypt from "bcryptjs";
import generateCookie from "../providers/auth.js";

export async function signup(req, res) {
  try {
    const { username, fullname, email, password } = req.body;

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password harus setidaknya 6 karakter" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        fullname,
        email,
        password: hashedPassword,
        profile: null,
      },
    });

    generateCookie(newUser.id, res);

    res
      .status(201)
      .json({ message: "Berhasil registrasi user", user: newUser });
  } catch (error) {
    console.error(`error message : ${error.message}`);
    res.status(500).json({ error: `Internal Server error` });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "invalid emails" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(401).json({ message: "wrong password" });

    generateCookie(user.id, res);

    res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error(`error message : ${error.message}`);
    res.status(500).json({ error: `Internal Server error` });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "log out" });
  } catch (error) {
    console.error(`error message : ${error.message}`);
    res.status(500).json({ error: `Internal Server error` });
  }
}

export async function me(req, res) {
  try {
    const authUser = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
    console.log("req.user:", authUser);
    if (!authUser) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.status(200).json(authUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
