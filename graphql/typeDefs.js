const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allUsers: [User!]!
    allCourses: [Course!]!
    allStudents: [Student!]!
    allAdmins: [Admin!]!
    allSubAdmins: [Sub_Admin!]!
    allCertificates: [Certificate!]!
    allEnrolledCourses: [EnrolledCourse!]!
    allForumPosts: [ForumPost!]!
    allPayments: [PaymentTransaction!]!
    allQuizzes: [Quizz!]!
    allCourseProgress: [CourseProgress!]!
  }

  type Mutation {
    createUser(email: String!, first_name: String, last_name: String, password: String!): User
    createCourse(title: String!, description: String!, content: String!, adminId: Int!): Course
    createStudent(userId: Int!): Student
    createAdmin(userId: Int!, is_superadmin: Boolean!, dashboard_access: Boolean!): Admin
    createSubAdmin(userId: Int!, adminId: Int!, can_manage_users: Boolean!): Sub_Admin
    createCertificate(studentId: Int!, courseId: Int!, certificate: String!): Certificate
    enrollCourse(studentId: Int!, courseId: Int!): EnrolledCourse
    createForumPost(studentId: Int!, courseId: Int!, content: String!): ForumPost
    createPayment(studentId: Int!, courseId: Int!, amount: Int!): PaymentTransaction
    createQuiz(courseId: Int!, solved: Boolean!): Quizz
    trackCourseProgress(studentId: Int!, courseId: Int!, progress: Int!): CourseProgress
  }

  type User {
    id: Int!
    email: String!
    first_name: String
    last_name: String
    password: String!
    student: Student
    admin: Admin
    sub_admin: Sub_Admin
  }

  type Admin {
    id: Int!
    user: User!
    role: String!
    is_superadmin: Boolean!
    dashboard_access: Boolean!
    sub_admins: [Sub_Admin!]!
    courses: [Course!]!
  }

  type Sub_Admin {
    id: Int!
    user: User!
    role: String!
    admin: Admin!
    can_manage_users: Boolean!
  }

  type Student {
    id: Int!
    user: User!
    role: String!
    enrolled_courses: [EnrolledCourse!]!
    forum_posts: [ForumPost!]!
    track_progress: [CourseProgress!]!
    certificates: [Certificate!]!
    payment_transactions: [PaymentTransaction!]!
    createdAt: String!
    updatedAt: String!
  }

  type Course {
    id: Int!
    title: String!
    description: String!
    content: String!
    admin: Admin!
    enrolled_students: [EnrolledCourse!]!
    forum_posts: [ForumPost!]!
    course_progress: [CourseProgress!]!
    certificates: [Certificate!]!
    payment_transactions: [PaymentTransaction!]!
    quizz: Quizz
    quizz_solved: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Quizz {
    quizz_id: Int!
    course: Course!
    solved: Boolean!
  }

  type EnrolledCourse {
    id: Int!
    student: Student!
    course: Course!
    createdAt: String!
  }

  type CourseProgress {
    id: Int!
    course: Course!
    student: Student!
    progress: Int!
    updatedAt: String!
  }

  type ForumPost {
    id: Int!
    course: Course!
    student: Student!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type Certificate {
    id: Int!
    student: Student!
    course: Course!
    certificate: String!
    issuedAt: String!
  }

  type PaymentTransaction {
    id: Int!
    student: Student!
    course: Course!
    amount: Int!
    createdAt: String!
  }
    type Query {
  allPaymentTransactions: [PaymentTransaction!]!
  allUsers: [User!]!
  allAdmins: [Admin!]!
  allStudents: [Student!]!
  allCourses: [Course!]!
  allQuizzes: [Quizz!]!
  allEnrolledCourses: [EnrolledCourse!]!
  allCourseProgresses: [CourseProgress!]!
  allForumPosts: [ForumPost!]!
  allCertificates: [Certificate!]!
}

`;

module.exports = {typeDefs};
