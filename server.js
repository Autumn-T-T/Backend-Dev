const express = require('express');
const connectDB = require('./config/db'); // create this for mongoose.connect
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/api/userRoutes'));
// app.use('/api/projects', require('./routes/api/projectRoutes'));
// app.use('/api/tasks', require('./routes/api/taskRoutes'));

const PORT = process.env.PORT || 5000;
connectDB(); 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));