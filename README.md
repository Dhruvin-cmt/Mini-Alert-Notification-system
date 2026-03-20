# Mini Alert Notification System

A modern web application designed for managing and displaying alert notifications, built as an internship task. This project features a React-based frontend and a Node.js/Express backend with MongoDB for data persistence.

## 🚀 Features

- **Alert Management**: View all messages, filter by read (seen) and unread states.
- **Categorization**: Dedicated sections for "All Messages", "Unread", and "Seen" alerts.
- **Interactive Actions**:
  - Mark individual alerts as read.
  - Mark all alerts as read at once.
  - Delete unwanted alerts.
- **User Authentication**: Secure registration and login functionality.
- **Responsive UI**: Built with React Bootstrap for a clean and responsive experience.

## 🛠️ Tech Stack

### Frontend
- **React (v19)**: Core UI framework.
- **React Router**: For client-side navigation.
- **React Bootstrap**: For styling and layout.
- **Axios**: For API communication.
- **Dayjs**: For formatting timestamps.
- **React Icons**: For visual elements.

### Backend
- **Node.js & Express**: Server-side runtime and framework.
- **MongoDB & Mongoose**: Database and ODM.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Bcrypt**: For password hashing.
- **CORS & Cookie-parser**: For handling cross-origin requests and cookies.

## 📦 Project Structure

```text
Mini-Alert-Notification-system/
├── backend/                # Express server code
│   ├── config/             # Environment configurations
│   ├── controller/         # Request handling logic
│   ├── database/           # DB connection setup
│   ├── models/             # Mongoose schemas
│   ├── router/             # API routes
│   └── server.js           # Server entry point
└── frontend/               # React application code
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Main application views
    │   └── App.jsx         # Root component
    └── package.json        # Frontend dependencies
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Mini-Alert-Notification-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/config/` with the following variables:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
JWT_SECRET_KEY=your_jwt_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

## 🚀 Running the Project

### Start the Backend
```bash
cd backend
npm start
```

### Start the Frontend
```bash
cd frontend
npm start
```
The app will be available at `http://localhost:3000`.

## 📡 API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register a new user.
- `POST /api/v1/user/login` - Login user and receive a token.

### Alerts
- `GET /api/v1/alerts` - Retrieve all alerts.
- `PATCH /api/v1/alerts/:id/read` - Mark a specific alert as read.
- `PATCH /api/v1/alerts/read-all` - Mark all alerts as read.
- `DELETE /api/v1/alerts/:id` - Delete a specific alert.

## 📄 License
This project is licensed under the ISC License.

