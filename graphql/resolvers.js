// Import the required libraries
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for working with JSON Web Tokens (JWT)
const { PrismaClient } = require('@prisma/client'); // Prisma Client for database operations

// Initialize a new PrismaClient instance
const prisma = new PrismaClient();

// Define the GraphQL resolvers
const resolvers = {
  // Define the Query resolvers for fetching data
  Query: {
    // Fetch all users
    allUsers: async () => await prisma.user.findMany(),
    // Fetch all courses
    allCourses: async () => await prisma.course.findMany(),
    // Fetch all students
    allStudents: async () => await prisma.student.findMany(),
    // Fetch all admins
    allAdmins: async () => await prisma.admin.findMany(),
    // Fetch all sub-admins
    allSubAdmins: async () => await prisma.sub_Admin.findMany(),
    // Fetch all certificates
    allCertificates: async () => await prisma.certificate.findMany(),
    // Fetch all enrolled courses
    allEnrolledCourses: async () => await prisma.enrolledCourse.findMany(),
    // Fetch all forum posts
    allForumPosts: async () => await prisma.forumPost.findMany(),
    // Fetch all payment transactions
    allPayments: async () => await prisma.paymentTransaction.findMany(),
    // Fetch all quizzes
    allQuizzes: async () => await prisma.quizz.findMany(),
    // Fetch all course progress records
    allCourseProgress: async () => await prisma.courseProgress.findMany(),
  },
  // Define the Mutation resolvers for modifying data
  Mutation: {
    // Create a new user
    createUser: async (_, { email, first_name, last_name, password }) => {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create a new user in the database
      const user = await prisma.user.create({
        data: { email, first_name, last_name, password: hashedPassword },
      });
      return user;
    },
    // Create a new course
    createCourse: async (_, { title, description, content, adminId }, { user }) => {
      // Ensure the user is authenticated
      if (!user) throw new Error("Not authenticated");
      // Find the admin by ID
      const admin = await prisma.admin.findUnique({ where: { id: adminId } });
      // If admin is not found, throw an error
      if (!admin) throw new Error("Admin not found");
      // Create a new course in the database
      const course = await prisma.course.create({
        data: {
          title,
          description,
          content,
          admin: { connect: { id: adminId } },
        },
      });
      return course;
    },
    // Create a new student
    createStudent: async (_, { userId }) => {
      // Create a new student in the database
      const student = await prisma.student.create({
        data: { user: { connect: { id: userId } } },
      });
      return student;
    },
    // Create a new admin
    createAdmin: async (_, { userId, is_superadmin, dashboard_access }) => {
      // Create a new admin in the database
      const admin = await prisma.admin.create({
        data: { user: { connect: { id: userId } }, is_superadmin, dashboard_access },
      });
      return admin;
    },
    // Create a new sub-admin
    createSubAdmin: async (_, { userId, adminId, can_manage_users }) => {
      // Create a new sub-admin in the database
      const subAdmin = await prisma.sub_Admin.create({
        data: { user: { connect: { id: userId } }, admin: { connect: { id: adminId } }, can_manage_users },
      });
      return subAdmin;
    },
    // Create a new certificate
    createCertificate: async (_, { studentId, courseId, certificate }) => {
      // Create a new certificate in the database
      const cert = await prisma.certificate.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, certificate },
      });
      return cert;
    },
    // Enroll a student in a course
    enrollCourse: async (_, { studentId, courseId }) => {
      // Create a new enrollment record in the database
      const enrolledCourse = await prisma.enrolledCourse.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } } },
      });
      return enrolledCourse;
    },
    // Create a new forum post
    createForumPost: async (_, { studentId, courseId, content }) => {
      // Create a new forum post in the database
      const forumPost = await prisma.forumPost.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, content },
      });
      return forumPost;
    },
    // Create a new payment transaction
    createPayment: async (_, { studentId, courseId, amount }) => {
      // Create a new payment transaction in the database
      const payment = await prisma.paymentTransaction.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, amount },
      });
      return payment;
    },
    // Create a new quiz
    createQuiz: async (_, { courseId, solved }) => {
      // Create a new quiz in the database
      const quiz = await prisma.quizz.create({
        data: { course: { connect: { id: courseId } }, solved },
      });
      return quiz;
    },
    // Track the progress of a course
    trackCourseProgress: async (_, { studentId, courseId, progress }) => {
      // Create a new course progress record in the database
      const courseProgress = await prisma.courseProgress.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, progress },
      });
      return courseProgress;
    },
  },
};

// Export the resolvers to be used in the GraphQL server
module.exports = { resolvers };
