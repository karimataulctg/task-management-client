# Task Management Application

## Description
A Task Management Application that allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: To-Do, In Progress, and Done. Changes are saved instantly to the database to maintain persistence. The app is fully responsive and features a clean, minimalistic UI.

## Live Link
[]()

## Dependencies
### Frontend
- React
- Vite.js
- @dnd-kit/core
- @dnd-kit/sortable
- axios
- Firebase Authentication

### Backend
- Express.js
- MongoDB
- mongoose
- dotenv
- socket.io

## Installation

### Prerequisites
- Node.js
- npm or yarn
- MongoDB

### Frontend Setup
1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file with your Firebase configuration details.
3. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Install dependencies:
    ```bash
    npm install
    ```
2. Create a `.env` file with your MongoDB connection string and other environment variables.
3. Start the server:
    ```bash
    npm start
    ```

## Technologies Used
- Frontend: React, Vite.js, Tailwind CSS, @dnd-kit
- Backend: Express.js, MongoDB, mongoose, socket.io
- Authentication: Firebase Authentication

## Features
- User Authentication (Google Sign-In)
- Add, Edit, Delete, and Reorder Tasks
- Drag-and-Drop Interface
- Real-Time Updates using WebSockets
- Responsive Design for Desktop and Mobile
- Clean, Minimalistic UI
- Dark Mode Toggle (Optional)
- Task Due Dates with Color Indicators (Optional)
- Activity Log (Optional)


