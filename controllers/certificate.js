const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function issueCertificate(req, res) {
  const { studentId, courseId, certificate } = req.body;

  try {
    const issuedCertificate = await prisma.certificate.create({
      data: {
        student: { connect: { userId: parseInt(studentId) } },
        course: { connect: { id: parseInt(courseId) } },
        certificate,
      },
    });

    res.status(201).json({ issuedCertificate });
  } catch (error) {
    console.error("Error issuing certificate:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAllCertificates(req, res) {
  try {
    const certificates = await prisma.certificate.findMany();

    res.json({ certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getCertificatesByStudentId(req, res) {
  const { studentId } = req.params;

  try {
    const certificates = await prisma.certificate.findMany({
      where: { studentId: parseInt(studentId) },
      include: { course: true },
    });

    res.json({ certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  issueCertificate,
  getAllCertificates,
  getCertificatesByStudentId,
};
