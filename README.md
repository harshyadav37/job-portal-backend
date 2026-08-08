# Job Portal Backend API

A scalable backend for a modern **Job Portal application** built with **Node.js, Express.js, and MongoDB**. It provides secure authentication, role-based authorization, job management, company management, and application tracking for **students/job seekers and recruiters**.

## Features

* JWT Authentication & Authorization
* Role-based access control (Student / Recruiter)
* User registration and login
* Recruiter company management
* Job posting, updating, and deletion
* Job search and filtering
* Apply to jobs
* Track job applications
* Protected API routes
* MongoDB database integration
* RESTful API architecture
* Error handling and validation
* Secure password hashing with bcrypt

## Tech Stack

| Technology    | Description           |
| ------------- | --------------------- |
| Node.js       | JavaScript runtime    |
| Express.js    | Web framework         |
| MongoDB       | NoSQL database        |
| Mongoose      | MongoDB ODM           |
| JWT           | Authentication        |
| bcrypt        | Password hashing      |
| Cookie Parser | Cookie handling       |
| CORS          | Cross-origin support  |
| dotenv        | Environment variables |

## Project Structure

```text
job-portal-backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── config/
├── .env
├── server.js
└── package.json
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user          |
| POST   | /api/auth/logout   | Logout user         |

### Companies

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | /api/company     | Create company          |
| GET    | /api/company     | Get recruiter companies |
| GET    | /api/company/:id | Get company by ID       |
| PUT    | /api/company/:id | Update company          |

### Jobs

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | /api/job     | Create a job    |
| GET    | /api/job     | Get all jobs    |
| GET    | /api/job/:id | Get job details |
| PUT    | /api/job/:id | Update job      |
| DELETE | /api/job/:id | Delete job      |

### Applications

| Method | Endpoint                      | Description               |
| ------ | ----------------------------- | ------------------------- |
| POST   | /api/application/apply/:jobId | Apply for a job           |
| GET    | /api/application              | Get applied jobs          |
| GET    | /api/application/:jobId       | Get applicants for a job  |
| PUT    | /api/application/status/:id   | Update application status |

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

## Installation

### Clone the repository

```bash
git clone https://github.com/your-username/job-portal-backend.git
cd job-portal-backend
```

### Install dependencies

```bash
npm install
```

### Run the server

```bash
npm run dev
```

The server will start at:

```text
http://localhost:8080
```

## Authentication

This project uses **JWT (JSON Web Token)** for authentication.

After login, the client receives a JWT token that must be included in protected requests:

```http
Authorization: Bearer <your_token>
```

## Security Features

* Password hashing with bcrypt
* JWT token authentication
* Protected middleware for private routes
* Role-based authorization
* CORS configuration
* Environment variable protection

## Sample Request

```http
POST /api/auth/login
```

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Future Improvements

* Resume upload with Cloudinary
* Email verification
* Password reset functionality
* Interview scheduling
* Notifications system
* Admin dashboard
* API documentation with Swagger

## Author

**Harsh Yadav**

* GitHub: https://github.com/your-username
* LinkedIn: https://linkedin.com/in/your-linkedin

## License

This project is licensed under the MIT License.
