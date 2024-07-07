const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => await prisma.user.findMany(),
    user: async (_, args) => await prisma.user.findUnique({ where: { id: args.id } }),
    courses: async () => await prisma.course.findMany(),
    course: async (_, args) => await prisma.course.findUnique({ where: { id: args.id } }),
  },
  Mutation: {
    createUser: async (_, args) => {
      const { email, password, first_name, last_name } = args;
      return await prisma.user.create({
        data: { email, password, first_name, last_name },
      });
    },
    createCourse: async (_, args) => {
      const { title, description, content, adminId } = args;
      return await prisma.course.create({
        data: { title, description, content, admin: { connect: { id: adminId } } },
      });
    },
  },
};

module.exports = resolvers;
