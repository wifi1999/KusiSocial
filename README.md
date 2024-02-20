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
      git clone github.com/wifi1999/Kusiday_Deploy.git

2. Install the dependencies:  
   ```bash
      cd api
      npm install
   ```
   ```bash 
      cd cliet
      npm install
   ```
   ```bash
      cd socket
      npm install
   ```
   
3. Create Environmental Variables: 
```bash
   cd api 
   touch .env
   MONGO_URL=your_mongodb_connection_url # insert this line to the .env file
``` 
```bash
   cd client
   touch .env
   REACT_APP_PUBLIC_FOLDER=http://localhost:8080/images # insert this line to the .env file
```

4. Starting the Application: 
```bash
   cd api
   npm run dev
```
   The server will run on http://localhost:8080.

```bash
   cd socket
   npm run dev
```
   The server will run on http://localhost:8900.

```bash
   cd frontend
   npm start
```
   The Server will run on http://localhost:3000.

### Open your browser and go to http://localhost:3000 to use the application. Enjoy!




