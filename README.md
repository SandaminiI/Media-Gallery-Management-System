# 📸 Media Gallery Management System

A full-stack **Media Gallery Management System** built using **React (Vite)**, **Node.js**, **Express**, and **MongoDB**.  
This system allows users to securely manage media files, communicate via a contact form, and provides admin-level moderation.

---

## 🚀 Features

### 🔐 Authentication
- Email & password authentication
- Google OAuth login
- JWT-based secure sessions
- Role-based access control (User / Admin)

### 🖼 Media Gallery
- Upload images (JPG / PNG, max 5MB)
- Add title, description, and tags
- Edit & delete own media
- Share / unshare media
- Search & filter by title and tags
- Fullscreen image preview with slider
- Multiple image selection
- Download selected images as ZIP

### 📩 Contact Form
- Guest and logged-in users can submit messages
- Logged-in users can:
  - View their own messages
  - Edit or delete their messages
- Admin can:
  - View all messages
  - Delete any message
- Messages are linked to users using `userId`

### 👤 Dashboard
- User profile overview
- Role display (User / Admin)
- Quick access to gallery and messages

---

## 🛠 Technology Stack

### Frontend
- React (Vite)
- React Router
- Bootstrap 5
- Axios
- Google OAuth

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer (file uploads)
- Google Auth Library

---

## 📁 Project Structure

```text
Media-Gallery-Management-System/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── uploads/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── main.jsx
│   └── vite.config.js
│
└── README.md
```
---

## ⚙️ Setup Instructions
### Clone Repository
```
git clone https://github.com/your-username/media-gallery-management-system.git
cd Media-Gallery-Management-System
```

### Backend Setup
```
cd backend
npm install
```

### Start backend:
```
npm run dev
```

### Frontend Setup
```
cd frontend
npm install
```

### Start frontend:
```
npm run dev
```
---

## 🤖 AI Usage Notes (Important)
### How AI Was Used

- Code scaffolding & refactoring suggestions
- API design guidance
- Error debugging & optimization tips
- UI/UX improvement ideas
- Security best-practice recommendations

### Developer Responsibility

All AI-assisted outputs were:
- Reviewed and understood
- Manually integrated
- Tested locally
- Modified where necessary
---

## 📜 License
This project is for educational & internship purposes.
