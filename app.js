const express = require("express");
//const { Pool } = require("pg"); // Import the Pool object from the 'pg' module

const cors = require("cors");
//create instance of express app
const app = express();
//config middleware
require("dotenv").config();
app.use(express.json());
// Enable CORS for all
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./resolvers');
const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf8');
const schema = makeExecutableSchema({ typeDefs, resolvers });
// Import route files
const admin = require("./controllers/admin");
const certificate = require("./controllers/certificate");
const courseProgress = require("./controllerscourse_progress");
const course = require("./controllers/course");
const enrolledCourses = require("./controllers/enrolledcourses");
const forum = require("./controllers/forum");
const payment = require("./controllers/payment");
const quizz = require("./controllers/quizz");
const student = require("./controllers/student");
const subAdmin = require("./controllers/subAdmin");
const user = require("./controllers/user");

// Use
app.use("/api/admin", admin);
app.use("/api/certificate", certificate);
app.use("/api/course-progress", courseProgress);
app.use("/api/course", course);
app.use("/api/enrolled-courses", enrolledCourses);
app.use("/api/forum", forum);
app.use("/api/payment", payment);
app.use("/api/quizz", quizz);
app.use("/api/student", student);
app.use("/api/sub-admin", subAdmin);
app.use("/api/user", user);

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 4000; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
