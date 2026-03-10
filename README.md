# Mentora Backend API

A simplified backend for a **mentorship platform** where **parents, students, and mentors interact**.

This backend provides authentication, role-based permissions, lesson management, booking functionality, session tracking, and an **LLM-powered text summarization endpoint**.

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Google Gemini API (LLM)

---

# Project Structure

```
mentora-backend
│
├── src
│   ├── config
│   │   └── db.js
│   │
│   ├── controllers
│   │   ├── authController.js
│   │   ├── studentController.js
│   │   ├── lessonController.js
│   │   ├── bookingController.js
│   │   ├── sessionController.js
│   │   └── llmController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Lesson.js
│   │   ├── Booking.js
│   │   └── Session.js
│   │
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── sessionRoutes.js
│   │   └── llmRoutes.js
│   │
│   ├── services
│   │   └── llmService.js
│   │
│   └── server.js
│
├── package.json
├── README.md
└── .env
```

---

# Environment Variables

Create a `.env` file in the project root.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Example `.env.example` file:

```
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
```

---

# Installation

### 1 Clone the repository

```
git clone https://github.com/yourusername/mentora-backend.git
```

### 2 Navigate into the project

```
cd mentora-backend
```

### 3 Install dependencies

```
npm install
```

### 4 Start development server

```
npm run dev
```

Server will run at:

```
http://localhost:5000
```

---

# Authentication

## Signup

Endpoint

```
POST /auth/signup
```

Body

```
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "123456",
  "role": "parent"
}
```

Only **parent** and **mentor** roles are allowed.

---

## Login

Endpoint

```
POST /auth/login
```

Body

```
{
  "email": "john@test.com",
  "password": "123456"
}
```

Response

```
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@test.com",
    "role": "parent"
  }
}
```

---

## Get Current User

Endpoint

```
GET /me
```

Header

```
Authorization: Bearer TOKEN
```

Returns authenticated user data.

---

# Students (Parent Only)

Parents can create student accounts under their profile.

## Create Student

Endpoint

```
POST /students
```

Body

```
{
  "name": "Ali",
  "age": 12
}
```

Student will automatically be linked to the authenticated parent.

---

## Get Students

Endpoint

```
GET /students
```

Returns all students created by the parent.

---

# Lessons (Mentor Only)

Mentors can create lessons.

## Create Lesson

Endpoint

```
POST /lessons
```

Body

```
{
  "title": "Mathematics Basics",
  "description": "Introduction to basic algebra"
}
```

---

# Booking System

Parents can assign students to lessons.

## Create Booking

Endpoint

```
POST /bookings
```

Body

```
{
  "studentId": "STUDENT_ID",
  "lessonId": "LESSON_ID"
}
```

---

# Session System

Each lesson contains sessions.

## Create Session

Endpoint

```
POST /sessions
```

Body

```
{
  "lessonId": "LESSON_ID",
  "date": "2026-03-10",
  "topic": "Algebra",
  "summary": "Introduction to algebra concepts"
}
```

---

## Get Lesson Sessions

Endpoint

```
GET /lessons/:id/sessions
```

Returns all sessions for a specific lesson.

---

# LLM Text Summarization

The system includes an endpoint that summarizes long text using an LLM.

Endpoint

```
POST /llm/summarize
```

Request

```
{
  "text": "Large text content..."
}
```

Response

```
{
  "summary": "• Bullet summary\n• Bullet summary\n• Bullet summary",
  "model": "gemini"
}
```

Validation rules:

* Minimum length: **50 characters**
* Maximum length: **8000 characters**

Error handling:

* 400 if text missing
* 400 if text too short
* 413 if text too large
* 502 if LLM service fails

A fallback summary is returned if the LLM API fails.

---

# Security

* Passwords hashed using **bcrypt**
* Authentication via **JWT**
* Role-based access control
* API keys stored in environment variables
* Input validation on endpoints

---

# Assumptions

* Only **parents and mentors can sign up**
* **Students are created by parents**
* **Mentors create lessons**
* **Parents assign students to lessons**

---

# Possible Improvements

Future improvements could include:

* Pagination for large datasets
* Session attendance tracking
* Notifications system
* Real-time lesson updates
* Better LLM prompt tuning

---

# Author

Aflah Bin Azeez
MERN Stack Developer
