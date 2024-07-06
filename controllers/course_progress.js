const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateCourseProgress(req, res) {
  const { studentId, courseId, progress } = req.body;

  try {
    const courseProgress = await prisma.courseProgress.upsert({
      where: { studentId_courseId: { studentId: parseInt(studentId), courseId: parseInt(courseId) } },
      update: { progress },
      create: { studentId: parseInt(studentId), courseId: parseInt(courseId), progress },
    });

    res.json({ courseProgress });
  } catch (error) {
    console.error("Error updating course progress:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getCourseProgressByStudentId(req, res) {
  const { studentId } = req.params;

  try {
    const courseProgress = await prisma.courseProgress.findMany({
      where: { studentId: parseInt(studentId) },
      include: { course: true },
    });

    res.json({ courseProgress });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  updateCourseProgress,
  getCourseProgressByStudentId,
};
