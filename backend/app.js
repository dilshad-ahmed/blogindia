const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())

// import all routes
const blogsRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
app.use("/api/v1", blogsRoutes);
app.use("/api/v1", userRoutes);

// middleware for Errors
app.use(errorMiddleware);

module.exports = app;