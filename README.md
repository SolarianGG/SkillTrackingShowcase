# Student Management System

A simple web application that interfaces with a MongoDB database to manage student information.

## Features

- Add new students with their details (Name, Student Number, Phone Number, Age)
- View all students in the database

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

- `GET /students` - View all students via a webpage
- `POST /new` - Add a new student to the database

## Database Schema

Each student document contains:
- Name (String)
- Student Number (String, unique)
- Phone Number (String)
- Age (Number)

## Technologies Used

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM for MongoDB
- EJS - Templating engine
- Bootstrap - Frontend styling