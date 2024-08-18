import prisma from "../../../client/prisma.js";

export async function getProfile(req, res) {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        fullname: true,
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profileUrl = user.profile
      ? `http://localhost:5000/${user.profile.replace(
          "src\\storage\\",
          "storage/"
        )}`
      : null;
    res.json({
      username: user.username,
      fullname: user.fullname,
      profile: profileUrl,
    });
  } catch (error) {
    console.error(`Error getting user profile: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateUser(req, res) {
  const userId = req.user?.id;
  const { username, fullname } = req.body;

  if (!userId || !username || !fullname) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const profilePath = req.file ? req.file.path : null;

    let updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: {
        username: username,
        fullname: fullname,
        profile: profilePath,
      },
    });

    res.json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
