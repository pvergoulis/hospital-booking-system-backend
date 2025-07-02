# 🏥 Hospital Management Backend

## 🇬🇧 English Description

This is the **backend** of a full-featured **Hospital Management System**, built with **Node.js**, **Express**, and **MongoDB**. It provides RESTful APIs for managing users, doctors, and appointments, with secure authentication and role-based access control.

---

## ✨ Features

- 🔐 **JWT Authentication** for secure login
- 🧑‍⚕️ **Role-based access**: `Patient`, `Doctor`, and `Admin`
- 📅 **Appointment booking** with real-time availability
- 🩺 **Doctors** can log in and manage their own appointments
- 🛠️ **CRUD operations** for users, doctors, and appointments
- 📧 Email support via **Nodemailer**
- 🧼 Clean and modular architecture

---

## 🛠 Tech Stack

| Technology | Purpose                          |
|------------|----------------------------------|
| **Node.js** | JavaScript runtime               |
| **Express** | Web framework for routing & APIs |
| **MongoDB** | NoSQL database                   |
| **Mongoose** | ODM for MongoDB                 |
| **JWT**     | Authentication & authorization   |
| **Bcrypt**  | Password hashing                 |
| **Nodemailer** | Email notifications           |
| **CORS**    | Cross-origin request handling    |

---



##  🚀 Getting Started

# 1. Install dependencies
    npm install

# 2. Set up environment variables
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password

# 3. Start the server
    npm run dev


## 🔐 Role-Based Access
 |__ Role-Based Access
    |__ Admin   → Full access to all routes
    |__ Doctor  → Can view and manage their own appointments
    |__ Patient → Can register, log in, and book appointments
