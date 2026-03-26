TaskMaster is a backend API for a productivity app. It handles user authentication, project management, and task management. The API enforces ownership-based authorization so that users can only access their own projects and tasks.

Setup Instructions:

Clone the repository.
Run npm install to install dependencies.
Create a .env file in the root folder with the following variables:
MONGO_URI=<your MongoDB connection string>
PORT=5000
JWT_SECRET=<your secret key>
Run node server.js to start the server. The server will run on the port specified in .env (default 5000).

API Endpoints:

User Authentication:

POST /api/users/register : Register a new user (requires username, email, password)
POST /api/users/login : Login a user and receive a JWT (requires email, password)

Project Endpoints (all require Authorization header with JWT):

POST /api/projects : Create a new project (requires name and description)
GET /api/projects : Get all projects for the logged-in user
GET /api/projects/:id : Get a single project by ID (only if owned by the user)
PUT /api/projects/:id : Update a project (only if owned by the user)
DELETE /api/projects/:id : Delete a project (only if owned by the user)

Task Endpoints (all require Authorization header with JWT):

POST /api/projects/:projectId/tasks : Create a task in a project (only if user owns the project)
GET /api/projects/:projectId/tasks : Get all tasks for a project (only if user owns the project)
PUT /api/tasks/:taskId : Update a task (only if user owns the parent project)
DELETE /api/tasks/:taskId : Delete a task (only if user owns the parent project)

Notes:

All passwords are securely hashed using bcrypt before storing.
JWT tokens are required for all project and task endpoints.
Ownership-based authorization ensures users cannot access or modify other users’ data.