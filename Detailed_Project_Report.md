# Detailed Project Report (DPR)

**Project Name:** Complaint Management System  
**Version:** 1.0.0  
**Date:** January 2026  
**Status:** Completed  

---

## 1. Project Title and Abstract

### 1.1 Project Title
**Complaint Management System (CMS)**: A Web-Based Platform for Efficient Issue Resolution and Tracking.

### 1.2 Abstract
In large organizations, residential complexes, and educational institutions, maintenance and issue resolution are critical day-to-day operations. However, traditional methods of complaint lodging—such as paper logbooks, verbal communication to front-desk staff, or scattered emails—are fraught with inefficiencies. These methods often result in lost requests, lack of accountability, delayed responses, and an inability to track the status of reported issues.

The **Complaint Management System (CMS)** is a robust, web-based application designed to digitalize and automate this entire workflow. By providing a centralized platform, the system empowers users to report issues (such as electrical faults, plumbing leaks, or IT grievances) instantly from their devices. Simultaneously, it equips administrators with powerful tools to categorize, assign, and monitor these complaints through to resolution. The system leverages the modern **MERN Stack (MongoDB, Express.js, React/Next.js, Node.js)** to ensure high performance, scalability, and a seamless user experience. This project aims to reduce turnaround time for complaints, increase transparency between users and management, and generate valuable data for facility planning.

---

## 2. Problem Statement and Objectives

### 2.1 Problem Statement
The current manual or semi-digital systems used for complaint handling suffer from several critical drawbacks:

1.  **Lack of Centralization:** Complaints are received via multiple channels (phone, email, walk-ins), leading to fragmentation and potential loss of information.
2.  **No Real-Time Tracking:** Complainants are often left in the dark regarding the status of their request. They must repeatedly follow up, which causes frustration and wastes time.
3.  **Inefficient Assignment:** Administrators rely on memory or physical notes to assign tasks to technicians. This leads to load imbalances and forgotten assignments.
4.  **Absence of Analytics:** There is no easy way to analyze data to find recurring issues (e.g., "The second-floor AC breaks down every month") to make long-term repair decisions.
5.  **Accountability Issues:** With manual systems, it is difficult to determine who is responsible for delays or who resolved a specific task.

### 2.2 Project Objectives
The primary objective is to develop a fully functional web application that addresses the above problems. Specific goals include:

*   **To Automate the Complaint Lifecycle:** From creation to closure, every step should be digital and automated where possible.
*   **To Enhance Transparency:** Users should be able to view the status of their complaints (e.g., Pending, In-Progress, Resolved) in real-time.
*   **To Optimize Resource Allocation:** Provide Admins with a dashboard to view workload and assign technicians effectively.
*   **To Improve Accessibility:** Ensure the system is accessible via standard web browsers on both desktop and mobile devices.
*   **To Ensure Data Security:** Implement robust authentication and authorization to protect user data and administrative functions.

---

## 3. Feasibility Study

Before commencing development, a feasibility study was conducted to assess the viability of the project.

### 3.1 Technical Feasibility
The project uses the **MERN Stack**, which is open-source, widely supported, and highly scalable.
*   **Node.js & Express:** Capable of handling concurrent requests efficiently, suitable for I/O heavy operations like complaint logging.
*   **MongoDB:** Its flexible schema is ideal for storing varied complaint types that might require different descriptive fields in the future.
*   **React/Next.js:** Provides a component-based architecture for a responsive and dynamic user interface.
*   **Conclusion:** The project is technically feasible with the available technology and expertise.

### 3.2 Operational Feasibility
The system is designed with a focus on User Experience (UX). The interface is intuitive, requiring minimal training for end-users. Administrators will have a dedicated dashboard that simplifies complex tasks. The shift from manual to digital will reduce the operational burden on staff.
*   **Conclusion:** The system will streamline operations and is therefore operationally feasible.

### 3.3 Economic Feasibility
The development utilizes open-source technologies (MERN), meaning there are no licensing costs for the core stack. Hosting can be done on cloud platforms (like Vercel/Heroku/AWS) standard tiers initially. The cost savings from improved efficiency and reduced paperwork far outweigh the development and maintenance costs.
*   **Conclusion:** The project is economically viable.

---


## 4. System Architecture and Workflow

### 4.1 Architecture Patterns
The system follows the **Model-View-Controller (MVC)** architectural pattern (adapted for API-centric design) and **RESTful API** principles.

1.  **Client-Side (View):** The Next.js frontend acts as the View, rendering the User Interface and capturing user input. It sends HTTP requests to the backend.
2.  **Server-Side (Controller):** The Express.js controllers receive the requests, validate input, and determine the appropriate business logic to execute.
3.  **Database Layer (Model):** Mongoose schemas define the data structure. The controllers interact with these models to perform CRUD operations on the MongoDB database.

### 4.2 Data Flow
1.  **Complaint Submission:**
    *   User fills form on Frontend -> HTTP POST request sent to `/api/complaints`.
    *   Auth Middleware validates JWT token.
    *   `ComplaintController` validates body -> Creates new Document via `ComplaintModel`.
    *   Database confirms save -> API sends 201 Created response -> Frontend updates UI.

2.  **Status Update:**
    *   Admin changes status on Dashboard -> HTTP PUT request sent to `/api/complaints/:id`.
    *   API updates document -> Frontend reflects change for both Admin and User.

---

## 5. Technologies Used

### 5.1 Frontend
*   **Next.js (v16.1.1):** Chosen for its hybrid rendering capabilities (Server-Side Rendering and Static Site Generation), which provides better performance and SEO compared to a standard CRA app. Its file-based routing simplifies navigation structure.
*   **React (v19):** The core library for building the component-based UI.
*   **Tailwind CSS (v4):** A utility-first CSS framework that speeds up development and ensures a consistent, responsive design without writing custom CSS files.
*   **Lucide React:** A lightweight icon library used to enhance visual cues in the UI.

### 5.2 Backend
*   **Node.js:** A JavaScript runtime built on Chrome's V8 engine. It allows us to use a single language (JavaScript) for both frontend and backend.
*   **Express.js (v5.2.1):** A minimal and flexible Node.js web application framework. It provides a robust set of features for web and mobile applications, specifically for building APIs.
*   **JSON Web Tokens (JWT):** Used for stateless authentication. It securely transmits information between parties as a JSON object, ensuring that the user is who they claim to be without storing session data on the server.
*   **Bcrypt:** (Implied) Used for hashing passwords before storing them in the database for security.

### 5.3 Database
*   **MongoDB:** A NoSQL database that stores data in JSON-like documents. Its dynamic schema allows for agile development and faster iteration.
*   **Mongoose (v9.1.3):** An ODM (Object Data Modeling) library for MongoDB and Node.js. It provides schema-based validation to ensure data integrity.

---

## 6. Module-wise Description

### 6.1 Authentication Module
*   **Purpose:** To secure the application and ensure only authorized personnel can access specific features.
*   **Components:**
    *   **Login Interface:** Input fields for Email and Password.
    *   **Registration (Optional):** For new users to sign up.
*   **Process:**
    1.  User submits credentials.
    2.  Backend compares hashed password.
    3.  If match, returns a JWT token.
    4.  Token is stored in cookies/local storage for subsequent requests.

### 6.2 User Module (Complainant)
*   **Purpose:** To allow general users to report and track issues.
*   **Key Features:**
    *   **Dashboard:** Displays a summary of 'My Complaints' with status indicators.
    *   **Lodge Complaint:** A detailed form accepting:
        *   **Title:** Brief summary.
        *   **Description:** Detailed explanation of the breakdown/issue.
        *   **Category:** Dropdown (Electrical, Plumbing, Civil, IT, etc.).
        *   **Priority:** Flag for urgency (Low, Medium, High).
    *   **History View:** A table or list view of all past complaints.

### 6.3 Admin Module
*   **Purpose:** To manage the overall system and resolution process.
*   **Key Features:**
    *   **Master Dashboard:** Metrics showing Total Complaints, Pending vs. Resolved, and High Priority items.
    *   **Complaint Management:**
        *   View full details of any complaint.
        *   **Status Update:** Change status from 'Pending' -> 'In-Progress' -> 'Resolved'.
        *   **Assign Technician:** Allocate a specific staff member to handling the request.
    *   **Filter & Search:** Find complaints by date, category, or status.

---

## 7. Database Design

The database schema is designed to be efficient and scalable.

### 7.1 Collection: `users`
| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier (Auto-generated). |
| `email` | String | User's email address (Unique). |
| `password` | String | Hashed password. |
| `name` | String | Full name of the user. |
| `role` | String | 'user' or 'admin'. |

### 7.2 Collection: `complaints`
| Field | Type | Options/Default | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | - | Unique system ID. |
| `complaintId` | String | Unique | A human-readable ID (e.g., CMP-1001). |
| `userId` | ObjectId | Ref: Users | Link to the user who created it. |
| `title` | String | - | Short title of the issue. |
| `description` | String | - | Full details of the issue. |
| `category` | String | - | Complaint type (Electrical, etc.). |
| `priority` | String | Low, Medium, High | Urgency level. |
| `status` | String | Pending, In-Progress, Resolved | Current state of processing. |
| `technician` | String | Default: 'Unassigned' | Name of assigned staff. |
| `createdAt` | Date | Date.now | Timestamp of creation. |
| `updatedAt` | Date | - | Timestamp of last update. |

---

## 8. API Documentation (Internal Specification)

The backend provides a set of RESTful endpoints.

### 8.1 Authentication Endpoints
*   **POST** `/login/user`
    *   **Description:** Authenticates a standard user.
    *   **Request Body:** `{ "email": "user@example.com", "password": "yourpassword" }`
    *   **Response:** `{ "message": "Login successful", "token": "...", "id": "..." }`

*   **POST** `/login/admin`
    *   **Description:** Authenticates an administrator.
    *   **Request Body:** `{ "email": "admin@example.com", "password": "yourpassword" }`
    *   **Response:** `{ "message": "Login successful", "token": "...", "id": "..." }`
    **POST** `/register/user`
    *   **Description:** Registers a new user.
    *   **Request Body:** `{ "name": "John", "email": "john@example.com","phone":"1234567890", "password": "..." }`
    *   **Response:** `{ "message": "User registered successfully", "token": "...", "id": "..." }`

### 8.2 Complaint & Info Endpoints (Non-Standard REST)
The system utilizes **POST** requests for most operations to securely pass identifiers in the body.

**Complaint Operations:**
*   **POST** `/complaints/user/submit`
    *   **Description:** Lodge a new complaint.
    *   **Request Body:** `{ "userId": "...", "title": "...", "description": "...", "category": "..." }`

*   **POST** `/complaints/admin/update`
    *   **Description:** Update status or assign technician.
    *   **Request Body:** `{ "id": "complaintId", "status": "...", "technician": "..." }`

**Data Retrieval:**
*   **POST** `/getInfo/user/complaints`
    *   **Description:** Fetch history for a specific user.
    *   **Request Body:** `{ "id": "userId", "userType": "user" }`

*   **POST** `/getInfo/admin/complaints`
    *   **Description:** Fetch all complaints for the admin dashboard.
    *   **Request Body:** `{ "id": "adminId" }`

*   **POST** `/getInfo/userInfo`
    *   **Description:** Fetch user profile details.
    *   **Request Body:** `{ "id": "userId" }`

---

## 9. User Interface Design and Component Hierarchy

The frontend is built using **Next.js 16** with a directory-based routing structure. Unlike traditional component-heavy architectures, this project utilizes **Monolithic Page Components** where the logic and UI for dashboards are encapsulated within the page files themselves to act as self-contained modules.

### 9.1 Key Modules (Page-Based Components)
*   **`app/page.js` (Root)**: Handles entry-level redirection. It checks for authentication cookies and directs users to either the Landing page or their respective Dashboards (Admin/User).
*   **`app/landing/page.js`**: The public landing page featuring dual-login portals ("Client Portal" vs "Administrator").
*   **`app/user/home/page.js` (UserDashboard)**: A comprehensive single-file module containing:
    *   **Sidebar**: Navigation for "New Ticket", "History", etc.
    *   **Header**: User profile and status counters.
    *   **Complaint Form**: A built-in validated form section for dispatching complaints.
    *   **Activity Log**: A table view of the user's complaint history.
    *   **Modal Overlay**: An internal simplified component for viewing detailed ticket info.
*   **`app/admin/home/page.js` (AdminDashboard)**: A complex dashboard module featuring:
    *   **Kanban Board**: Three-column layout (Pending, In-Progress, Resolved) implemented via internal `StatusColumn` functions.
    *   **Inspection Modal**: A detailed detailed popup for managing ticket status and assigning technicians.
    *   **Archive View**: A modal for viewing all historical complaints.
    *   **Employee Database**: A lookup modal for assigning staff.

### 9.2 Reusable Components
*   **`components/LoadingScreen.js`**: A shared loading spinner used globally during auth checks and data fetching.

### 9.3 State Management
*   **Local State (`useState`)**: Used extensively within the page modules to manage form inputs, modal visibility (`isModalOpen`), and data arrays (`complaints`, `employees`).
*   **Effect Hooks (`useEffect`)**: Handles data fetching (`fetchuserInfo`, `getComplaints`) and manual cookie-based authentication checks.
*   **Direct API Calls**: `fetch` is used directly within components rather than through a global store or service layer.

---

## 10. Conclusion and Future Scope

### 10.1 Conclusion
The development of the **Complaint Management System** represents a significant step forward in modernizing facility management operations. By effectively utilizing the MERN stack, the system offers a scalable, secure, and user-friendly solution that addresses the core inefficiencies of traditional manual processes. The separation of concerns between the client and server ensures that the application is maintainable and adaptable to future changes. The project successfully meets its primary objectives of automation, transparency, and accountability.

### 10.2 Future Scope
While the current version covers the essential features, the system is designed to be extensible. Future enhancements could include:
1.  **AI-Driven Insights:** Implementing Machine Learning models to predict asset failure based on complaint history frequency.
2.  **Mobile Application:** Developing a dedicated React Native app for field technicians to update status on-the-go with push notifications.
3.  **Chatbot Support:** Integrating an AI chatbot to answer common queries or guide users in categorizing their complaints.
4.  **Feedback Loop:** Adding a feature for users to rate the resolution quality, ensuring continuous improvement in service standards.
5.  **Multi-Tenancy:** Scaling the application to support multiple organizations or campuses within a single instance.

---

## 11. References

1.  **React Documentation:** https://react.dev
2.  **Next.js Documentation:** https://nextjs.org/docs
3.  **MongoDB Manual:** https://www.mongodb.com/docs
4.  **Express.js API Reference:** https://expressjs.com/en/4x/api.html
5.  **MDN Web Docs:** https://developer.mozilla.org
