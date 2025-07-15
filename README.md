# 🛠️ Build Together

Build Together is a **developer networking platform** inspired by Tinder, where developers can swipe to like/unlike other developers, send and accept connection requests, and build meaningful collaborations.

## 🚀 Features

- 🔐 **Authentication**  
  JWT-based secure login/signup

- 👥 **User Profiles**  
  View developer details, tech stack, bio, and more

- 🤝 **Swiping Mechanism**  
  Swipe right to like, left to pass

- 📩 **Connection Requests**  
  Send, accept, or reject requests

- 🧑‍🤝‍🧑 **Connection List**  
  View all your matched/connected developers

## 🧱 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios (for API calls)

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication

## 🗂️ Folder Structure

/client --> React frontend
/server --> Node.js/Express backend
/models --> Mongoose schemas
/routes --> API routes
/controllers --> Business logic
/middleware --> Auth, validation

## 📦 Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/your-username/build-together.git
cd build-together
```
### 2. Backend Setup
```
cd server
npm install
Create a .env file in /server:

PORT=PORT_NUMBER
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend:
npm start
```
### 3. Frontend Setup
```
cd client
npm install
npm start
```
## 🤝 Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.