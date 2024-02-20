# KusiDay Social Media App

## Overview

KusiDay is a full-stack Social Media App designed to provide users with a seamless and engaging social experience. The application allows users to register, log in, create and manage posts, interact with other users through likes, dislikes, follows, and unfollows. It also features a real-time chat system, enabling users to connect with each other instantly.

## Project Structure

### Backend Server
The backend is powered by Node.js and Express.js for efficient routing. MongoDB is used as the database, and Mongoose is employed for effective database management. The server handles user authentication, post management, user interactions, and real-time communication through Socket.io.

### Frontend Client
The frontend is built using React.js to create visually appealing and responsive pages. The application includes registration, login, main, profile, and chat room pages. The Context API is utilized for efficient user state management, ensuring persistent user states across different pages.

### Real-time Communication
Socket.io is integrated into the project to establish a real-time communication system. This feature enables users to exchange messages seamlessly and stay connected in real-time.

## Features

### User Authentication
- Users can register, log in, and log out securely.
- Context API are used for authentication to ensure secure and authenticated access.

### Post Management
- Users can create, like, and dislike posts.
- Efficient post management is achieved through Express.js and MongoDB.

### User Interaction
- Users can follow/unfollow other users.
- Profile lookup and friends' friends access enhance user interactions.

### Real-time Chat
- Socket.io is employed to establish a real-time chat system.
- Users can exchange messages seamlessly, enhancing the overall user experience.

### Responsive Design
- React.js is utilized to craft aesthetically pleasing and responsive pages.
- The application is designed to provide a seamless experience across different devices.





## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/messenger-app.git

bash
Copy code
cd messenger-app
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd frontend
npm install
Database Setup
Create a MongoDB database and obtain the connection URL.

Create a .env file in the backend folder with the following content:

env
Copy code
MONGO_URL=your_mongodb_connection_url
Starting the Application
Start the backend server:

bash
Copy code
cd backend
npm start
The server will run on http://localhost:8080.

Start the frontend development server:

bash
Copy code
cd frontend
npm start
The React app will be available at http://localhost:3000.

Open your browser and go to http://localhost:3000 to use the application.

Usage
Register a new account or log in if you already have one.
Explore the application using the navigation bar.
Visit the messenger page to chat with other users in real-time.
View and edit your profile.


