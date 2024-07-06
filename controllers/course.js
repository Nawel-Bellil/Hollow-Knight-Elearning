const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCourse(req, res) {
  const { title, description, content, adminId } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        content,
        admin: { connect: { id: adminId } },
      },
    });
    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCourses(req, res) {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCourseById(req, res) {
  const id = req.params.id;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
    });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateCourse(req, res) {
  const id = req.params.id;
  const { title, description, content } = req.body;

  try {
    const course = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        content,
      },
    });
    res.status(200).json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteCourse(req, res) {
  const id = req.params.id;

  try {
    await prisma.course.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
