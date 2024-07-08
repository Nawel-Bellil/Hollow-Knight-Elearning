const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    allUsers: async () => await prisma.user.findMany(),
    allCourses: async () => await prisma.course.findMany(),
    allStudents: async () => await prisma.student.findMany(),
    allAdmins: async () => await prisma.admin.findMany(),
    allSubAdmins: async () => await prisma.sub_Admin.findMany(),
    allCertificates: async () => await prisma.certificate.findMany(),
    allEnrolledCourses: async () => await prisma.enrolledCourse.findMany(),
    allForumPosts: async () => await prisma.forumPost.findMany(),
    allPayments: async () => await prisma.paymentTransaction.findMany(),
    allQuizzes: async () => await prisma.quizz.findMany(),
    allCourseProgress: async () => await prisma.courseProgress.findMany(),
  },
  Mutation: {
    createUser: async (_, { email, first_name, last_name, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, first_name, last_name, password: hashedPassword },
      });
      return user;
    },
    createCourse: async (_, { title, description, content, adminId }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const admin = await prisma.admin.findUnique({ where: { id: adminId } });
      if (!admin) throw new Error("Admin not found");
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
    createStudent: async (_, { userId }) => {
      const student = await prisma.student.create({
        data: { user: { connect: { id: userId } } },
      });
      return student;
    },
    createAdmin: async (_, { userId, is_superadmin, dashboard_access }) => {
      const admin = await prisma.admin.create({
        data: { user: { connect: { id: userId } }, is_superadmin, dashboard_access },
      });
      return admin;
    },
    createSubAdmin: async (_, { userId, adminId, can_manage_users }) => {
      const subAdmin = await prisma.sub_Admin.create({
        data: { user: { connect: { id: userId } }, admin: { connect: { id: adminId } }, can_manage_users },
      });
      return subAdmin;
    },
    createCertificate: async (_, { studentId, courseId, certificate }) => {
      const cert = await prisma.certificate.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, certificate },
      });
      return cert;
    },
    enrollCourse: async (_, { studentId, courseId }) => {
      const enrolledCourse = await prisma.enrolledCourse.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } } },
      });
      return enrolledCourse;
    },
    createForumPost: async (_, { studentId, courseId, content }) => {
      const forumPost = await prisma.forumPost.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, content },
      });
      return forumPost;
    },
    createPayment: async (_, { studentId, courseId, amount }) => {
      const payment = await prisma.paymentTransaction.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, amount },
      });
      return payment;
    },
    createQuiz: async (_, { courseId, solved }) => {
      const quiz = await prisma.quizz.create({
        data: { course: { connect: { id: courseId } }, solved },
      });
      return quiz;
    },
    trackCourseProgress: async (_, { studentId, courseId, progress }) => {
      const courseProgress = await prisma.courseProgress.create({
        data: { student: { connect: { id: studentId } }, course: { connect: { id: courseId } }, progress },
      });
      return courseProgress;
    },
  },
};

module.exports = {resolvers};
