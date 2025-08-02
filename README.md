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

---

## 👀 Screenshots:

1. Landing Page
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/3591c593-9303-43f0-afd7-f43ca5bead9c" />
2. SignUp
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/663bb98a-0b4b-4e88-bfb2-b258e567f87a" />
3. User Side
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/a2088d78-4cdf-4a3f-ae59-a644608a9728" />
4. Submit Complaint
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/79c2f084-08d1-472f-bddf-2dfde3dd3221" />
5. Agent Side
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/8e0a8be8-2e6e-4487-af03-7282e4cd84c2" />
6. Complaints status
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/46faf7d1-8841-4c0a-bd04-0ea0094b656a" />
7. Admin Side
   <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/212dafe1-7889-4b76-8be9-d93b169d14e2" />
8. All Access
    <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/dcce6f12-755a-4e66-96c5-fa1d30e0c6b7" />
9.Chat
    <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/e37a2bd3-534f-419a-8156-cecfc2aab03b" />
10. Complaint History
    <img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/0703aa17-c530-4750-ae30-dc2c834efca1" />


