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





const PORT = process.env.PORT || 4000; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});