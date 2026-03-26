const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/projects', require('./routes/api/projectRoutes'));
app.use('/api/tasks', require('./routes/api/taskRoutes')); // for update/delete tasks

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));