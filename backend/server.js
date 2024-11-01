require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors({
    origin: [process.env.FORNENDPORT], // Correct the variable name
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
}));

// Increase the body parser limits
app.use(bodyParser.json({ limit: '100mb' })); // Adjust as needed
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false })); // Adjust as needed

app.use(cookieParser());

// Start server and connect to MongoDB
const PORT = process.env.PORT || 8000;
const Server = app.listen(PORT, () => {
  console.log(`Connected to Server and MongoDB database on port ${PORT}`);
});

// MongoDB connection
mongoose.connect(process.env.MoGO_URL) // Fix variable name (MoGO_URL to MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB...');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB...', err);
  });

// Routes
app.use('/grade/', require('./routes/grades/index'));
app.use('/course/', require('./routes/course/index'));
app.use('/student/', require('./routes/student/index'));
