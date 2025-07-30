# 🛠️ Complaint Management Portal

A full-stack, role-based complaint resolution system built with **React**, **Node.js**, **Express**, and **MongoDB**, designed to streamline user complaints, admin assignment, and agent resolution — all in real time with proper authorization, authentication, and clean UI/UX.

---

## 🚀 Features

### 👥 Role-Based Access
- **User**: Submits complaints, views status, chats with assigned agents.
- **Agent**: Views assigned complaints, updates resolution status, chats with users.
- **Admin**: Manages users, agents, and complaints. Assigns complaints to agents.

### 🌐 Tech Stack
- **Frontend**: React.js (deployed on Vercel)
- **Backend**: Node.js + Express.js (deployed on Render)
- **Database**: MongoDB Atlas
- **Authentication**: JWT with secure login & signup
- **Authorization**: Role-based route access
- **CORS**: Properly configured for production frontend-backend interaction
- **UI/UX**: Clean dark-mode design with intuitive navigation and visual cues

---

## 📁 Project Structure

```bash
.
├── client/# React frontend (Vercel deployed)
    ├──src/
       ├──components/
          ├──user/
          ├──admin/
          ├──agent/
       ├──pages/
      ├──App.jsx          
├── server/               # Express backend (Render deployed)
│   ├── routes/
│   │   ├── auth.js
│   │   ├── complaint.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Complaint.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── .env
│   └── server.js          # Main backend server
```

---

## 🧪 API Endpoints
🔐 Auth
```bash
POST /api/auth/register: Register a new user (user/agent/admin)

POST /api/auth/login: Login and receive JWT token
```

---

🗂️ Complaints:
```bash
POST /api/complaint: Submit new complaint (user)

GET /api/complaint: Get all complaints (admin/agent/user based on role)

PUT /api/complaint/:id: Update complaint (agent/admin)

DELETE /api/complaint/:id: Delete complaint (admin)
```

👤 Admin
```bash
GET /api/users: View all users

GET /api/admin: Admin dashboard data

PUT /api/admin/assign/:id: Assign complaint to agent
```

---

## 🎨 UI Highlights
Dark theme across all dashboards
Complaint cards for agents
Color-coded status labels for users (Pending, In Progress, Resolved)
Responsive layout optimized for all screen sizes

---

## 🔒 Security & CORS
JWT tokens for secure route access
Passwords hashed using bcrypt

CORS configured for:
https://smart-bridge-internship.vercel.app (Frontend)
https://smartbridge-internship.onrender.com (Backend)

---

## 🧑‍💻 Getting Started (Local Dev)
Backend
```bash
cd server
npm install
node server.js
```

Frontend
```bash
cd client
npm install
npm start
```
