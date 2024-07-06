// controllers/userController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createSubAdmin(req, res) {
  const { email, password, first_name, last_name, adminId } = req.body;

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

    // Create sub admin
    // create() method provided by Prisma's user model
    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });
    const subadmin = await prisma.sub_Admin.create({
      data: {
        user: { connect: { id: user.id } },
        adminId,
        can_manage_users: true,
      },
    });
    //console.log(subadmin);

    // Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token, subadmin });
  } catch (error) {
    console.error("Error during sub admin registration:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginSubAdmin(req, res) {
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
    const subadmins = await prisma.sub_Admin.findMany({
      select: {
        user: true,
        adminId: true,
        can_manage_users: true,
      },
    });
    res.json(subadmins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function getAdminById(req, res) {
  const id = req.params.id;
  try {
    const subadmin = await prisma.sub_Admin.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        user: true,
        id: true,
        adminId: true,
        can_manage_users: true,
      },
    });
    if (!subadmin) {
      return res.status(404).json({ error: "sub admin not found" });
    }
    return res.status(200).json({ subadmin });
  } catch (e) {
    console.error("Error fetching sub admin:", e);
    return res.status(500).json({ error: "Server Error" });
  }
}
async function getSubAdmin(req, res) {
  const id = req.user.id;
  console.log(id);
  try {
    const subadmin = await prisma.admin.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        user: true,
        id: true,
        adminId,
        can_manage_users: true,
      },
    });
    if (!subadmin) {
      return res.status(404).json({ error: "sub admin not found" });
    }
    return res.status(200).json({ subadmin });
  } catch (e) {
    console.error("Error fetching sub admin:", e);
    return res.status(500).json({ error: "Server Error" });
  }
}
async function deleteSubAdmin(req, res) {
  const id = parseInt(req.params.id);

  try {
    const subadmin = await prisma.sub_Admin.findUnique({
      where: {
        id,
      },
    });

    if (!subadmin) {
      return res.status(404).json({ error: "Sub admin not found" });
    }

    await prisma.sub_Admin.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Sub admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting sub admin:", error);
    res.status(500).json({ error: "Server error" });
  }
}

async function updateAdmin(req, res) {
  try {
    const { id } = req.params; // sub admin ID
    const { password } = req.body; // Updated password

    // Find the student by ID
    const subadmin = await prisma.sub_Admin.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    // Check if the student exists
    if (!subadmin) {
      return res.status(404).json({ error: " sub admin not found" });
    }
    // Update password if provided
    if (!password) {
      return res.status(400).json({ error: "New password is required" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.sub_Admin.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: hashedPassword,
      },
    });

    return res
      .status(200)
      .json({ message: " sub admin password updated successfully" });
  } catch (error) {
    console.error("Error updating sub admin password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createSubAdmin,
  loginSubAdmin,
  getAllAdmins,
  getAdminById,
  getSubAdmin,
  deleteSubAdmin,
  updateAdmin,
};
