import prisma from "../../../client/prisma.js";
import { sanitizeFilename } from "sanitize-filename";
import path from "path";

export async function updateUser(req, res) {
  const file = req.files?.profile;
  const userId = req.user?.id;
  const { username, fullname } = req.body;

  if (!userId || !username || !fullname) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const storagePath = "../../../../storage";
  const filePath = path.join(__dirname, storagePath);

  const updateData = {
    username,
    fullname,
  };

  if (file) {
    const sanitizedFilename = sanitizeFilename(file.name);
    const fileDestination = `${filePath}/${sanitizedFilename}`;
    await file.save(fileDestination);
    updateData.profile = `/storage/${sanitizedFilename}`;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    res.json({ message: "User profile updated successfully" }, updatedUser);
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
