import prisma from "../../../client/prisma.js";

export async function all(req, res) {
  try {
    const userId = req.user.id;
    const datas = await prisma.tasks.findMany({
      where: {
        UserId: userId,
      },
    });

    res.status(200).json(datas);
  } catch (error) {
    console.error("error in get all controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOneTask(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  if (!id) {
    return res.status(400).json({ error: "Task ID is required" });
  }

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        id: parseInt(id),
        UserId: userId,
      },
      select: {
        title: true,
        content: true,
        UserId: true,
        user: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("error in get one task controller", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createTask(req, res) {
  try {
    const { title, content, status } = req.body;
    const userId = req.user.id;

    const newTask = await prisma.tasks.create({
      data: {
        title,
        content,
        status,
        userId,
      },
    });

    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    console.error(`Error creating task: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function updateTask(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const taskId = req.params.id;

    const task = await prisma.tasks.findFirst({
      where: {
        id: parseInt(taskId),
        UserId: parseInt(userId),
      },
    });

    if (!task) {
      return res
        .status(403)
        .json({ error: "You don't have permission to edit this task" });
    }

    const updatedTask = await prisma.tasks.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        title,
        content,
      },
    });

    res.status(201).json({ message: "task updated", updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function softDeleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await prisma.tasks.findFirst({
      where: {
        id: parseInt(taskId),
        userId: parseInt(userId),
      },
    });

    if (!task) {
      return res
        .status(403)
        .json({ error: "You don't have permission to delete this task" });
    }

    await prisma.tasks.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        deleted_at: new Date(),
      },
    });

    res.json({ message: "Task moved to trash" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

//trash dashboard
export async function permanentDeleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await prisma.tasks.findFirst({
      where: {
        id: parseInt(taskId),
        userId: parseInt(userId),
        deleted_at: { not: null },
      },
    });

    if (!task) {
      return res.status(403).json({
        error: "You don't have permission to permanently delete this task",
      });
    }

    await prisma.tasks.delete({
      where: {
        id: parseInt(taskId),
      },
    });

    res.json({ message: "Task permanently deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function restoreTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await prisma.tasks.findFirst({
      where: {
        id: parseInt(taskId),
        userId: parseInt(userId),
        deleted_at: { not: null },
      },
    });

    if (!task) {
      return res
        .status(403)
        .json({ error: "You don't have permission to restore this task" });
    }

    await prisma.tasks.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        deleted_at: null,
      },
    });

    res.json({ message: "Task restored" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
