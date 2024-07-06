const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createQuizz(req, res) {
  const { courseId, solved } = req.body;

  try {
    const quizz = await prisma.quizz.create({
      data: {
        course: { connect: { id: courseId } },
        solved,
      },
    });
    res.status(201).json(quizz);
  } catch (error) {
    console.error("Error creating quizz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getQuizzes(req, res) {
  try {
    const quizzes = await prisma.quizz.findMany();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getQuizzById(req, res) {
  const id = req.params.id;

  try {
    const quizz = await prisma.quizz.findUnique({
      where: { quizz_id: parseInt(id) },
    });
    if (!quizz) {
      return res.status(404).json({ error: "Quizz not found" });
    }
    res.status(200).json(quizz);
  } catch (error) {
    console.error("Error fetching quizz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateQuizz(req, res) {
  const id = req.params.id;
  const { solved } = req.body;

  try {
    const quizz = await prisma.quizz.update({
      where: { quizz_id: parseInt(id) },
      data: { solved },
    });
    res.status(200).json(quizz);
  } catch (error) {
    console.error("Error updating quizz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteQuizz(req, res) {
  const id = req.params.id;

  try {
    await prisma.quizz.delete({
      where: { quizz_id: parseInt(id) },
    });
    res.status(200).json({ message: "Quizz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quizz:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createQuizz,
  getQuizzes,
  getQuizzById,
  updateQuizz,
  deleteQuizz,
};
