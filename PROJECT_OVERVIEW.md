```markdown
# Complaint System API - Technical Documentation

## 1. Project Overview
**Name**: complaint-system-api  
**Version**: 1.0.0  
**Description**: RESTful API for managing user complaints with JWT authentication and MongoDB persistence.  

### Tech Stack:
- **Runtime**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **Middleware**: CORS, dotenv, body-parser
- **Dependencies**:
  ```json
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongodb": "^5.7.0",
    "mongoose": "^7.6.5"
  }
  ```

---

## 2. Architecture
### MVC Pattern Implementation:
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Routes    │───▶ │ Controllers │───▶ │  Models     │
└─────────────┘     └─────────────┘     └─────────────┘
      │                   │                   │
      ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Middleware  │     │  Services   │     │ MongoDB     │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Data Flow:
1. Request → CORS Middleware
2. → JWT Authentication
3. → Route Handler
4. → Controller Logic
5. → Mongoose Model Operations
6. → Response

---

## 3. API Reference
### Authentication Header:
`Authorization: Bearer <JWT>`

### Core Endpoints:
| Method | Endpoint           | Description                     | Protected |
|--------|--------------------|---------------------------------|-----------|
| POST   | `/api/auth/login`  | Authenticate user               | No        |
| POST   | `/api/complaints`  | Create new complaint            | Yes       |
| GET    | `/api/complaints`  | List all complaints (Pagination)| Yes       |

### Request/Response Examples:
**Create Complaint**:
```http
POST /api/complaints
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Server Downtime",
  "description": "API server unresponsive",
  "category": "Infrastructure"
}
```

**Success Response**:
```json
{
  "_id": "65a1b2c3d4e5f67890123456",
  "status": "Open",
  "createdAt": "2023-12-15T10:30:00Z"
}
```

---

## 4. Configuration
### Environment Variables (`.env`):
```ini
PORT=3000
MONGODB_URI=mongodb://localhost:27017/complaints_db
JWT_SECRET=your_256bit_secret
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:4200
```

### Database Schema:
```javascript
// models/Complaint.js
const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Hardware', 'Software', 'Network', 'Infrastructure'],
    default: 'Software'
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
```

---

## 5. Error Handling
### HTTP Status Codes:
| Code | Scenario                          |
|------|-----------------------------------|
| 400  | Validation errors                 |
| 401  | Missing/invalid JWT               |
| 403  | Insufficient permissions          |
| 404  | Resource not found                |
| 500  | Server/internal database errors   |

### Error Response Structure:
```json
{
  "error": {
    "code": "AUTH_401",
    "message": "Invalid authentication token",
    "details": "Token expired at 2023-12-15T11:00:00Z"
  }
}
```

---

## 6. Performance Characteristics
### Optimizations:
- **Database Indexing**:
  ```javascript
  complaintSchema.index({ status: 1, createdAt: -1 });
  ```
- **JWT Stateless Auth**: Eliminates session storage overhead
- **Middleware Caching**: 
  - ETag for GET responses
  - `Cache-Control` headers for static assets

### Limitations:
- Monolithic architecture scales vertically only
- No built-in rate limiting
- MongoDB joins (`$lookup`) impact complex queries

---

## 7. Internal Workflows
### Complaint Lifecycle:
```mermaid
sequenceDiagram
  participant Client
  participant API
  participant MongoDB
  
  Client->>API: POST /complaints (JWT)
  API->>MongoDB: Create complaint doc
  MongoDB-->>API: Operation result
  API-->>Client: 201 Created
```

### Authentication Flow:
1. Client sends credentials → `/auth/login`
2. API verifies against DB → Issues JWT
3. Subsequent requests include JWT in header
4. Middleware validates signature → Attaches `req.user`

---

## 8. Technical Specifications
### Development Setup:
```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Run tests (example)
npm test
```

### Deployment:
```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Testing Strategy:
- **Unit**: Jest + Supertest (route handlers)
- **Integration**: MongoDB memory server
- **Security**: OWASP ZAP baseline scans

---

## 9. Code Examples
### JWT Middleware:
```javascript
// middleware/auth.js
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};
```

### Paginated Response:
```javascript
// controllers/complaints.js
const getComplaints = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const results = await Complaint.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  res.json({
    data: results,
    pagination: {
      page,
      limit,
      total: await Complaint.countDocuments()
    }
  });
};
```

---

## 10. Future Improvements
1. **WebSocket Integration**: Real-time status updates
2. **Redis Caching**: Frequent query results caching
3. **Rate Limiting**: Express-rate-limit middleware
4. **Microservices Architecture**: Split auth/complaints into separate services
```