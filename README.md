# 📋 Complaint System API

> A robust, RESTful API backend for managing user complaints, designed with Node.js, Express, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 📖 Overview

The **Complaint System API** serves as the backend infrastructure for a complaint management platform. It facilitates secure user and admin authentication, complaint submission and tracking, and profile management. 

Key features include:
*   **Role-Based Authentication**: Secure login for Users and Administrators using JWT (JSON Web Tokens).
*   **Complaint Lifecycle**: Operations for submitting, updating (Admin only), and viewing complaints.
*   **Data Persistence**: robust data modeling using Mongoose schemas for structured MongoDB storage.
*   **Profile Management**: Endpoints to retrieve detailed profiles for specific user roles.

---

## 🏗️ Architecture

### Tech Stack
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (NoSQL)
*   **Authentication:** JWT (JSON Web Tokens)

### System Components
*   **Server:** RESTful API handling business logic and database interactions.
*   **Security:** Middleware-based authentication and Role-Based Access Control (RBAC).

### File Structure
```
ComplaintSystemApi/
├── config/
│   └── db.js                 # MongoDB Connection setup
├── controllers/
│   ├── complaintsOperations.js # Logic for submitting/updating complaints
│   ├── getInfo.js            # Logic for retrieving user/admin/employee info
│   └── loginController.js    # Logic for authentication
├── models/
│   ├── adminCredSchema.js    # Schema for Admin Credentials
│   ├── adminProfileSchema.js # Schema for Admin Profile details
│   ├── complaintsSchema.js   # Schema for Complaint tickets
│   ├── employeeSchema.js     # Schema for Technician/Employee details
│   ├── userCredSchema.js     # Schema for User Credentials
│   └── user_profileSchema.js # Schema for User Profile details
├── router/
│   ├── complaintsRouter.js   # Routes for complaint operations
│   ├── getInfoRouter.js      # Routes for information retrieval
│   └── loginRouter.js        # Routes for login
├── data/                     # Data seeding files
├── .env                      # Environment variables
├── server.js                 # Application entry point
└── package.json              # Project dependencies & scripts
```

## 🔌 API Documentation

All API responses are in JSON format.
**Base URL**: `http://localhost:8800` as it is yet to be deployed

### 🔒 Authentication
Authentication is handled via JWT. Upon successful login, you receive a `token`. This token must be included in the header of protected routes.

**Header Format**: `Authorization: Bearer <your_token>`

#### 1. User Login
*   **Endpoint:** `/login/user`
*   **Method:** `POST`
*   **Description:** Authenticates a standard user.
*   **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
*   **Success Response (200):**
    ```json
    {
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsIn...",
        "userId": "user_uuid_here"
    }
    ```
*   **Error Response (401):**
    ```json
    { "message": "Invalid email or password" }
    ```

#### 2. Admin Login
*   **Endpoint:** `/login/admin`
*   **Method:** `POST`
*   **Description:** Authenticates an administrator.
*   **Request Body:**
    ```json
    {
        "email": "admin@example.com",
        "password": "adminpassword"
    }
    ```
*   **Success Response (200):**
    ```json
    {
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsIn...",
        "userId": "admin_uuid_here"
    }
    ```

---

### 📝 Complaint Management

#### 3. Submit Complaint (User)
*   **Endpoint:** `/complaints/user/submit`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Description:** Allows a logged-in user to submit a new complaint.
*   **Request Body:**
    ```json
    {
        "userId": "user_uuid_from_login",
        "title": "Internet Down",
        "category": "Network",
        "description": "Unable to connect to Wi-Fi since morning."
    }
    ```
*   **Success Response (200):**
    ```json
    {
        "code": 200,
        "message": "Complaint submitted successfully",
        "complaint": {
            "complaintId": "C-2026-1005",
            "status": "pending",
            "createdAt": "2026-01-13T10:00:00.000Z",
            ...
        }
    }
    ```

#### 4. Update Complaint (Admin)
*   **Endpoint:** `/complaints/admin/update`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Description:** Allows an admin to update the status or details of a complaint.
*   **Request Body:**
    ```json
    {
        "id": "admin_uuid_from_login",
        "complaint": {
            "complaintId": "C-2026-1005",
            "status": "resolved",
            "technician": "John Doe"
        }
    }
    ```
*   **Success Response (200):**
    ```json
    {
        "code": 200,
        "message": "Complaint updated successfully",
        "complaint": { ...updated_object }
    }
    ```

---

### ℹ️ Information Retrieval

#### 5. Get User Info
*   **Endpoint:** `/getInfo/userInfo`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Request Body:**
    ```json
    { "id": "user_uuid" }
    ```
*   **Response:** Returns the user's profile details (Name, Phone, Joined Date, etc.).

#### 6. Get Admin Info
*   **Endpoint:** `/getInfo/adminInfo`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Request Body:**
    ```json
    { "id": "admin_uuid" }
    ```
*   **Response:** Returns the admin's profile details (Name, Department, ID).

#### 7. Get User Complaints
*   **Endpoint:** `/getInfo/user/complaints`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Description:** Fetches all complaints submitted by a specific user.
*   **Request Body:**
    ```json
    {
        "id": "user_uuid",
        "userType": "users"
    }
    ```
*   **Response:** JSON array of complaint objects.

#### 8. Get All Complaints (Admin)
*   **Endpoint:** `/getInfo/admin/complaints`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Description:** Fetches ALL complaints in the system.
*   **Request Body:**
    ```json
    { "id": "admin_uuid" }
    ```
*   **Response:** JSON array of all complaint objects.

#### 9. Get All Employees (Admin)
*   **Endpoint:** `/getInfo/admin/employees`
*   **Method:** `POST`
*   **Headers:** `Authorization: Bearer <token>`
*   **Description:** Fetches a list of all technicians/employees.
*   **Request Body:**
    ```json
    { "id": "admin_uuid" }
    ```
*   **Response:** JSON array of employee objects.

---

## 🗄️ Database Schemas

### Users (`user_profiles`)
*   `_id`: String (UUID)
*   `full_name`: String
*   `phone`: String
*   `access`: Array of Complaint IDs [String]

### Complaints (`complaints`)
*   `complaintId`: String (Unique, e.g., "C-2026-1001")
*   `userId`: String
*   `title`: String
*   `description`: String
*   `status`: Enum [`pending`, `in-progress`, `resolved`, `closed`]
*   `priority`: Enum [`low`, `medium`, `high`, `urgent`]
*   `technician`: String (Default: "unassigned")

---
### Employees (`employees`)
*   `_id`: String (UUID)
*   `full_name`: String
*   `email`: String
*   `role`: Enum [`admin`, `technician`]
*   `assigned_complaints`: Array of Complaint IDs [String]

---


