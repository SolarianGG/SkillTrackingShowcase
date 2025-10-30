# Skill Tracker - Personal Learning Management System

A web application that helps users track and manage their learning journey by organizing skills, setting goals, monitoring progress, and collecting learning resources.

## Features

- **User Authentication**: Register, login, and logout functionality
- **Skill Management**: Create, view, update, and delete skills
- **Category Organization**: Organize skills into custom categories
- **Progress Tracking**: Monitor skill development with progress indicators
- **Goal Setting**: Create and track learning goals for each skill
- **Resource Collection**: Add and manage learning resources (videos, articles, books, courses)
- **Proficiency Levels**: Track skill proficiency from beginner to expert

## Requirements

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/skill-tracker.git
   cd skill-tracker
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content
   ```
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. Access the application at `http://localhost:3000`

## Usage

1. Register a new account or login with existing credentials
2. Create categories to organize your skills
3. Add skills to your profile, assigning them to categories
4. Set learning goals for each skill
5. Track your progress as you develop each skill
6. Add learning resources to help you improve

## Showcase

https://www.youtube.com/watch?v=xLvMUTfqKs0

## API Endpoints

### Authentication
- `GET /login` - Render login page
- `POST /login` - Authenticate user
- `GET /register` - Render registration page
- `POST /register` - Create new user
- `GET /logout` - Log out current user

### Skills
- `GET /skills` - View all skills
- `POST /skills` - Create a new skill
- `GET /skills/:id` - View skill details
- `POST /skills/:id/update` - Update a skill
- `POST /skills/:id/delete` - Delete a skill
- `POST /skills/:id/resources` - Add a resource to a skill
- `POST /skills/:id/resources/:resourceId/delete` - Remove a resource
- `POST /skills/:id/goals` - Add a goal to a skill
- `POST /skills/:id/goals/:goalIndex/toggle` - Toggle goal completion

### Categories
- `GET /categories` - View all categories
- `POST /categories` - Create a new category
- `POST /categories/:id/update` - Update a category
- `POST /categories/:id/delete` - Delete a category

## Database Schema

### User
- `login` (String, required)
- `password` (String, required)
- `skills` (Array of references to Skill documents)
- `timestamps` (createdAt, updatedAt)

### Skill
- `name` (String, required)
- `description` (String)
- `proficiencyLevel` (String: beginner, intermediate, advanced, expert)
- `goals` (Array of objects with text and completed status)
- `progress` (Number, 0-100)
- `category` (Reference to Category)
- `resources` (Array of Resource objects)
- `user` (Reference to User)
- `timestamps` (createdAt, updatedAt)

### Resource (Embedded in Skill)
- `title` (String, required)
- `url` (String, required)
- `type` (String: video, article, book, course, other)
- `description` (String)

### Category
- `name` (String, required)
- `description` (String)
- `user` (Reference to User)
- `timestamps` (createdAt, updatedAt)

## Technologies Used

- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **EJS**: Templating engine
- **Express Session**: User session management
- **dotenv**: Environment variable management
- **Nodemon**: Development server with auto-reload