const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createForumPost(req, res) {
  const { studentId, courseId, content } = req.body;

  try {
    const forumPost = await prisma.forumPost.create({
      data: {
        student: { connect: { userId: parseInt(studentId) } },
        course: { connect: { id: parseInt(courseId) } },
        content,
      },
    });

    res.status(201).json({ forumPost });
  } catch (error) {
    console.error("Error creating forum post:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllForumPosts(req, res) {
  try {
    const forumPosts = await prisma.forumPost.findMany();

    res.json({ forumPosts });
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getForumPostsByCourseId(req, res) {
  const { courseId } = req.params;

  try {
    const forumPosts = await prisma.forumPost.findMany({
      where: { courseId: parseInt(courseId) },
      include: { student: true },
    });

    res.json({ forumPosts });
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createForumPost,
  getAllForumPosts,
  getForumPostsByCourseId,
};
