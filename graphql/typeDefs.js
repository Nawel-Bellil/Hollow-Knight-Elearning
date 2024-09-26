// Import the gql function from apollo-server-express
const { gql } = require('apollo-server-express');

// Define the GraphQL schema using the gql function
const typeDefs = gql`
  # Define the Query type for fetching data
  type Query {
    allUsers: [User!]!
    allCourses: [Course!]!
    allStudents: [Student!]!
    allAdmins: [Admin!]!
    allSubAdmins: [SubAdmin!]!
    allCertificates: [Certificate!]!
    allEnrolledCourses: [EnrolledCourse!]!
    allForumPosts: [ForumPost!]!
    allPayments: [PaymentTransaction!]!
    allQuizzes: [Quiz!]!
    allCourseProgress: [CourseProgress!]!
  }

  # Define the Mutation type for modifying data
  type Mutation {
    createUser(email: String!, firstName: String, lastName: String, password: String!): User
    createCourse(title: String!, description: String!, content: String!, adminId: Int!): Course
    createStudent(userId: Int!): Student
    createAdmin(userId: Int!, isSuperAdmin: Boolean!, dashboardAccess: Boolean!): Admin
    createSubAdmin(userId: Int!, adminId: Int!, canManageUsers: Boolean!): SubAdmin
    createCertificate(studentId: Int!, courseId: Int!, certificate: String!): Certificate
    enrollCourse(studentId: Int!, courseId: Int!): EnrolledCourse
    createForumPost(studentId: Int!, courseId: Int!, content: String!): ForumPost
    createPayment(studentId: Int!, courseId: Int!, amount: Int!): PaymentTransaction
    createQuiz(courseId: Int!, solved: Boolean!): Quiz
    trackCourseProgress(studentId: Int!, courseId: Int!, progress: Int!): CourseProgress
  }

  # Define the User type
  type User {
    id: Int!
    email: String!
    firstName: String
    lastName: String
    password: String! # Consider removing this in production
    student: Student
    admin: Admin
    subAdmin: SubAdmin
  }

  # Define the Admin type
  type Admin {
    id: Int!
    user: User!
    role: String!
    isSuperAdmin: Boolean!
    dashboardAccess: Boolean!
    subAdmins: [SubAdmin!]!
    courses: [Course!]!
  }

  # Define the SubAdmin type
  type SubAdmin {
    id: Int!
    user: User!
    role: String!
    admin: Admin!
    canManageUsers: Boolean!
  }

  # Define the Student type
  type Student {
    id: Int!
    user: User!
    role: String!
    enrolledCourses: [EnrolledCourse!]!
    forumPosts: [ForumPost!]!
    trackProgress: [CourseProgress!]!
    certificates: [Certificate!]!
    paymentTransactions: [PaymentTransaction!]!
    createdAt: String!
    updatedAt: String!
  }

  # Define the Course type
  type Course {
    id: Int!
    title: String!
    description: String!
    content: String!
    admin: Admin!
    enrolledStudents: [EnrolledCourse!]!
    forumPosts: [ForumPost!]!
    courseProgress: [CourseProgress!]!
    certificates: [Certificate!]!
    paymentTransactions: [PaymentTransaction!]!
    quiz: Quiz
    quizSolved: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  # Define the Quiz type
  type Quiz {
    quizId: Int!
    course: Course!
    solved: Boolean!
  }

  # Define the EnrolledCourse type
  type EnrolledCourse {
    id: Int!
    student: Student!
    course: Course!
    createdAt: String!
  }

  # Define the CourseProgress type
  type CourseProgress {
    id: Int!
    course: Course!
    student: Student!
    progress: Int!
    updatedAt: String!
  }

  # Define the ForumPost type
  type ForumPost {
    id: Int!
    course: Course!
    student: Student!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  # Define the Certificate type
  type Certificate {
    id: Int!
    student: Student!
    course: Course!
    certificate: String!
    issuedAt: String!
  }

  # Define the PaymentTransaction type
  type PaymentTransaction {
    id: Int!
    student: Student!
    course: Course!
    amount: Int!
    createdAt: String!
  }
`;

// Export the typeDefs to be used in the GraphQL server
module.exports = { typeDefs };
