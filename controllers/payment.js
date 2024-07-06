const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createPaymentTransaction(req, res) {
  const { studentId, courseId, amount } = req.body;

  try {
    const paymentTransaction = await prisma.paymentTransaction.create({
      data: {
        student: { connect: { userId: parseInt(studentId) } },
        course: { connect: { id: parseInt(courseId) } },
        amount,
      },
    });

    res.status(201).json({ paymentTransaction });
  } catch (error) {
    console.error("Error creating payment transaction:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllPaymentTransactions(req, res) {
  try {
    const paymentTransactions = await prisma.paymentTransaction.findMany();

    res.json({ paymentTransactions });
  } catch (error) {
    console.error("Error fetching payment transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getPaymentTransactionsByStudentId(req, res) {
  const { studentId } = req.params;

  try {
    const paymentTransactions = await prisma.paymentTransaction.findMany({
      where: { studentId: parseInt(studentId) },
      include: { course: true },
    });

    res.json({ paymentTransactions });
  } catch (error) {
    console.error("Error fetching payment transactions:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createPaymentTransaction,
  getAllPaymentTransactions,
  getPaymentTransactionsByStudentId,
};
