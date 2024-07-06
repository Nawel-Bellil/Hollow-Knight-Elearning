// controllers/userController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createAdmin(req, res) {
  const { email, password, first_name, last_name } = req.body;

  try {
    // Check if user already exists
    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    // create() method provided by Prisma's user model
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });

    const admin = await prisma.admin.create({
      data: {
        user: { connect: { id: user.id } },
        is_superadmin: true,
        dashboard_access: true,
      },
    });
    console.log(admin);

    // Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token, admin });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginAdmin(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Respond with token
    res.json({ token, user });

    // Retrieve all chapters
    // const chapters = await getAllChapters();
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({ error: "Error logging in user" });
  }
}

async function getAllAdmins(req, res) {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        user: true,
        courses: true,
        sub_admins: true,
        is_superadmin: true,
        dashboard_access: true,
      },
    });
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAdmin(req, res) {
  const id = req.user.id;
  console.log(id);
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        user: true,
        id: true,
        courses: true,
        sub_admins: true,
      },
    });
    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }
    return res.status(200).json({ admin });
  } catch (e) {
    console.error("Error fetching admin:", e);
    return res.status(500).json({ error: "Server Error" });
  }
}
async function deleteAdmin(req, res) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!user) {
      return res.status(404).json({ error: "admin not found" });
    }

    await prisma.admin.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    await prisma.admin.delete({
      where: {
        id: admin.id,
      },
    });

    return res.status(200).json({ message: "admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateAdmin(req, res) {
  try {
    const { id } = req.params; // admin ID
    const { password } = req.body; // Updated password

    // Find the admin by ID
    const admin = await prisma.admin.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ error: "admin not found" });
    }
    // Update password if provided
    if (!password) {
      return res.status(400).json({ error: "New password is required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.admin.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: hashedPassword,
      },
    });

    return res
      .status(200)
      .json({ message: "admin password updated successfully" });
  } catch (error) {
    console.error("Error updating admin password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  deleteAdmin,
  updateAdmin,
  getAdmin,
};
