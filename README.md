# Task Manager Application

A modern, full-stack task management application built with **Node.js/Express** backend and **React** frontend. Manage your tasks efficiently with features like due dates, reminders, status tracking, and advanced filtering.

##  Project Overview

**Task Manager** is a web-based productivity tool that helps users organize and track their daily tasks. The application provides an intuitive interface for creating, updating, deleting, and filtering tasks with real-time updates.

### Key Features
- **Create Tasks** - Add new tasks with titles, descriptions, due dates, and reminders
- **Due Date Tracking** - Set and track task deadlines with visual indicators
- **Status Management** - Organize tasks by status (To Do, In Progress, Done)
- **Smart Reminders** - Set reminders for important tasks
- **Advanced Search** - Search tasks by title or description
- **Filtering & Sorting** - Filter by status, due date, and overdue status
- **Statistics Dashboard** - View task statistics and progress insights
- **Task Deletion** - Remove tasks with a single click
- **Real-time Updates** - Tasks update immediately without page refresh

##  Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB (NoSQL database)


**Frontend:**
- React 18
- Axios (HTTP client)
- CSS3 (Styling)

##  Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (running locally or a MongoDB Atlas connection string)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the backend directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/task-manager
   PORT=5000
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## How to Run

### Start the Backend

1. **From the backend directory:**
   ```bash
   npm start
   ```
   
   The server will start on `http://localhost:5000`

### Start the Frontend

1. **From the frontend directory:**
   ```bash
   npm start
   ```
   
   The app will open at `http://localhost:3000`

### Full Setup (Both Services)

Run these commands in separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

Both services should now be running and communicating with each other.

##  Project Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   └── taskController.js  # Task business logic
│   ├── models/
│   │   └── Task.js            # MongoDB Task schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   ├── tests/
│   │   ├── taskController.test.js
│   │   └── taskRoutes.test.js
│   ├── jest.config.js
│   ├── package.json
│   └── server.js              # Express server entry point
│
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── manifest.json
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.jsx       # Form to create new tasks
    │   │   ├── TaskList.jsx       # Task list display
    │   │   ├── TaskItem.jsx       # Individual task card
    │   │   ├── TaskSearch.jsx     # Search functionality
    │   │   ├── TaskFilters.jsx    # Filter controls
    │   │   └── TaskStatistics.jsx # Statistics dashboard
    │   ├── services/
    │   │   └── api.js             # API service layer
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

## Known Issues & Limitations

### Current Limitations
1. **No User Authentication** - All tasks are stored globally; no user-specific task separation
2. **No Offline Support** - Application requires constant internet connectivity
3. **Single Database Instance** - No support for multiple environments (dev, staging, production)
4. **No Task Attachments** - Cannot attach files to tasks
5. **No Recurring Tasks** - Cannot set up recurring or recurring task patterns

##  AI Tools Used

### GitHub Copilot and Cursor
**Usage:** Code generation, debugging, and implementation of features

#### Sample Prompts:

1. **Creating Delete Functionality:**
   ```
   "Add task deletion functionality to both backend and frontend. 
   Include a DELETE route in Express, a deleteTask controller function, 
   an API client method, and a delete button component with appropriate styling."
   ```

2. **Fixing Layout Issues:**
   ```
   "The delete button in the task card is misaligned due to variable spacing 
   from optional tags. Fix the CSS flexbox layout so all task cards have 
   consistent height and button alignment regardless of tags."
   ```

3. **Implementing Real-time Updates:**
   ```
   "After creating a task, the TaskList doesn't automatically refresh. 
   Fix this by making TaskList listen to a refreshKey prop and reload 
   tasks whenever it changes."
   ```

4. **Adding Task Filtering:**
   ```
   "Create a filter component that allows filtering tasks by status 
   (To Do, In Progress, Done) and due date status (Overdue, Due Soon, Upcoming). 
   Use React hooks for state management."
   ```

5. **Prompt assistance:**
   ```
   "Can you structure the requirments in simple terms on what is needed for the Problem Statement-task manager"

You are required to build a Task Management App."
   ```


**Last Updated:** December 13, 2025  
**Version:** 1.0.0
