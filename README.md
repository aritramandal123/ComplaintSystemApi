```markdown
# Complaint System API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

A robust backend API for managing complaints and support tickets, featuring JWT authentication and MongoDB integration. Built with Node.js and Express, this system provides essential endpoints for creating, managing, and resolving customer complaints.

## Key Features

🔒 **JWT Authentication** - Secure user authentication with JSON Web Tokens  
🗄️ **MongoDB Storage** - Persistent data storage with Mongoose ODM  
🔄 **CORS Support** - Cross-Origin Resource Sharing enabled  
⚙️ **Environment Configuration** - Easy setup via `.env` file  
📦 **Modular Architecture** - Clean separation of routes, controllers, and models  
📡 **RESTful Endpoints** - Standard-compliant API structure

## Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account or local MongoDB instance
- VS Code (recommended) or any code editor

## Installation

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/complaint-system-api.git
   cd complaint-system-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create `.env` file in root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/complaint_system
   JWT_SECRET=your_secure_secret_here
   CORS_ORIGIN=http://localhost:4200
   ```

## Usage

**Start Development Server**
```bash
npm run dev
```

**Start Production Server**
```bash
npm start
```

**Run Tests**
```bash
npm test
```

## API Endpoints

| Method | Endpoint           | Description                | Authentication |
|--------|--------------------|----------------------------|----------------|
| POST   | /api/auth/register | Register new user          | Public         |
| POST   | /api/auth/login    | User login                 | Public         |
| POST   | /api/complaints    | Create new complaint       | JWT Required   |
| GET    | /api/complaints    | Get all complaints         | JWT Required   |
| GET    | /api/complaints/:id| Get single complaint       | JWT Required   |
| PUT    | /api/complaints/:id| Update complaint           | JWT Required   |
| DELETE | /api/complaints/:id| Delete complaint           | Admin Only     |

## Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for signing JWTs
- `JWT_EXPIRES_IN`: Token expiration time (default: '1d')
- `CORS_ORIGIN`: Allowed origins (comma-separated)

### Project Structure
```
complaint-system-api/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # Mongoose models
├── routes/         # Express routes
├── middleware/     # Custom middleware
├── utils/          # Helper functions
├── .env.example    # Environment template
├── server.js       # Entry point
└── package.json
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
