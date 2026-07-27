# 🔐 JWT Authentication & Role-Based Access Control (RBAC)

A production-inspired authentication and authorization system built using **Node.js**, **Express.js**, **MongoDB**, and **JWT**.

This project demonstrates secure authentication, role-based authorization, ownership-based resource access, and backend security best practices commonly used in modern web applications.

---

# 🚀 Features

✅ User Registration

✅ Secure Login using JWT

✅ Password Hashing using bcrypt

✅ Authentication Middleware

✅ Role-Based Access Control (RBAC)

✅ Ownership-Based Authorization

✅ Protected Routes

✅ Global Error Handling

✅ MongoDB Integration

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

# 📁 Folder Structure

```
project/
│
├── controllers/
│
├── middleware/
│   ├── authenticate.js
│   ├── authorization.js
│   └── ownership.js
│
├── models/
│
├── routes/
│
├── config/
│
├── app.js
│
└── package.json
```

---

# 🔑 Authentication Flow

1. User registers with email and password.
2. Password is hashed using bcrypt.
3. User logs in.
4. Credentials are verified.
5. JWT Access Token is generated.
6. Client stores the token.
7. Token is sent in Authorization Header.
8. Authentication middleware verifies JWT.
9. User is fetched from MongoDB.
10. Request proceeds to authorization.

---

# 🔒 Authorization Flow

After authentication,

The system checks

- Is the user authenticated?
- Does the user have the required role?
- Is the user accessing only their own resource?

Only then is the request allowed.

---

# 👤 Role-Based Access Control

Supported Roles

- Admin
- Manager
- User

Example

```javascript
router.get(
    "/users",
    tokenCheck,
    authorize("admin", "manager"),
    controller.showUsers
)
```

---

# 👤 Ownership Authorization

Users can update only their own account.

Admins can modify any user.

Example

```
PUT /users/:id
DELETE /users/:id
```

Ownership Middleware

```
Admin
      │
      ▼
Allow

Else

Logged User ID == URL User ID ?

        │
   Yes ─┘

Allow

Else

403 Forbidden
```

---

# 🔐 Security Best Practices

✔ Passwords are never stored in plain text.

✔ Passwords are hashed using bcrypt.

✔ JWT payload contains only User ID.

✔ Latest user data is fetched from MongoDB on every request.

✔ Roles are never trusted from client input.

✔ Protected routes require Bearer Token.

✔ Proper HTTP Status Codes

- 200 OK
- 201 Created
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

---

# 📌 API Endpoints

## Authentication

POST /register

POST /login

---

## Users

GET /users

PUT /users/:id

DELETE /users/:id

---

# 🏗 Middleware Pipeline

Incoming Request

↓

Authentication

↓

JWT Verification

↓

Fetch User from Database

↓

Authorization (Role Check)

↓

Ownership Validation

↓

Controller

↓

MongoDB

↓

Response

---

# 💡 Future Improvements

- Refresh Tokens

- Redis Token Blacklist

- Email Verification

- OTP Authentication

- Docker

- Kubernetes

- API Gateway

- Rate Limiting

- Nginx Load Balancer

- RabbitMQ

- Apache Kafka

---

# 👨‍💻 Author

Santosh Kumar

FullStack Developer

MongoDB | Express.js | React.js | Node.js

Currently exploring System Design, and Distributed Systems.
