const express = require("express");
//const { Pool } = require("pg"); // Import the Pool object from the 'pg' module

const cors = require("cors");
//create instance of express app
const app = express();
//config middleware
require("dotenv").config();
app.use(express.json());
// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Import route files
const adminRoutes = require('./routes/adminRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const courseProgressRoutes = require('./routes/courseProgressRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrolledCoursesRoutes = require('./routes/enrolledCoursesRoutes');
const forumRoutes = require('./routes/forumRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const quizzRoutes = require('./routes/quizzRoutes');
const studentRoutes = require('./routes/studentRoutes');
const subAdminRoutes = require('./routes/subAdminRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/api/course-progress', courseProgressRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/enrolled-courses', enrolledCoursesRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/quizz', quizzRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/sub-admin', subAdminRoutes);
app.use('/api/user', userRoutes);



const PORT = process.env.PORT || 4000; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});