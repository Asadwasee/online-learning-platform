#  LearnHub - E-Learning Platform

A full-stack MERN application for online learning with a secure Admin Dashboard and real-time backend integration.

---

##  Features
- **User Authentication:** Secure Login and Registration system.
- **Role-Based Access:** Admin panel is protected via specialized middleware (`ProtectedRoute`).
- **Dynamic Data:** Course listings and details are fetched from MongoDB.
- **Contact System:** Fully functional contact form with API integration and Toast notifications.
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop.

---

##  Tech Stack
- **Frontend:** React.js, Tailwind CSS, Lucide React (Icons).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB.
- **State Management:** Axios for API calls.

---

##  Setup Instructions

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Asadwasee/online-learning-platform.git
cd online-learning-platform
2. Backend Setup
Open a new terminal and enter the backend folder:

Bash
# cd backend
Install dependencies:

Bash
npm install
Create a .env file in the backend folder and add:

# Code 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

Bash
npm run dev
# 3. Frontend Setup
Open another terminal and enter the frontend folder:

Bash
cd frontend
Install dependencies:

Bash
npm install
Start the React development server:

Bash
npm run dev

### Admin Access
To access the Admin Panel, navigate to /admin.

# Note: Access is restricted. You must be logged in with an account that has the admin role assigned in the database.

# Contributors
# Asad Waseem (Team Lead )
# Umer (Developer)
# Fasiullah (Developer)
# Shoaib (Developer)
