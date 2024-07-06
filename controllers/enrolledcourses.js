const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function enrollCourse(req, res) {
  const { studentId, courseId } = req.body;

  try {
    const enrolledCourse = await prisma.enrolledCourse.create({
      data: {
        student: { connect: { id: studentId } },
        course: { connect: { id: courseId } },
      },
    });
    res.status(201).json(enrolledCourse);
  } catch (error) {
    console.error("Error enrolling course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getEnrolledCourses(req, res) {
  try {
    const enrolledCourses = await prisma.enrolledCourse.findMany();
    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getEnrolledCourseById(req, res) {
  const id = req.params.id;

  try {
    const enrolledCourse = await prisma.enrolledCourse.findUnique({
      where: { id: parseInt(id) },
    });
    if (!enrolledCourse) {
      return res.status(404).json({ error: "Enrolled course not found" });
    }
    res.status(200).json(enrolledCourse);
  } catch (error) {
    console.error("Error fetching enrolled course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateEnrolledCourse(req, res) {
  const id = req.params.id;
  const { studentId, courseId } = req.body;

  try {
    const enrolledCourse = await prisma.enrolledCourse.update({
      where: { id: parseInt(id) },
      data: {
        student: { connect: { id: studentId } },
        course: { connect: { id: courseId } },
      },
    });
    res.status(200).json(enrolledCourse);
  } catch (error) {
    console.error("Error updating enrolled course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteEnrolledCourse(req, res) {
  const id = req.params.id;

  try {
    await prisma.enrolledCourse.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Enrolled course deleted successfully" });
  } catch (error) {
    console.error("Error deleting enrolled course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  enrollCourse,
  getEnrolledCourses,
  getEnrolledCourseById,
  updateEnrolledCourse,
  deleteEnrolledCourse,
};
