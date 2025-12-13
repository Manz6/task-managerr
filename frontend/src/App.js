import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskStatistics from "./components/TaskStatistics";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const scrollToTasks = () => {
    document.getElementById("task-section")?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  return (
    <div className="app-container">
      {/* Homepage Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Task360</h1>
            <p className="hero-subtitle">
              Complete task management from every angle.
            </p>
            <p className="hero-description">
              Your all-in-one solution for managing tasks with a comprehensive view. 
              Track, organize, and complete everything in one seamless platform.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Easy task creation</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📅</span>
                <span>Due date tracking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔔</span>
                <span>Smart reminders</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <span>Progress insights</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={scrollToTasks}>
                Get Started
              </button>
              <button className="btn-secondary" onClick={scrollToTasks}>
                View Features
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </section>

      {/* Task Management Section */}
      <section id="task-section" className="task-section">
        <div className="section-header">
          <h2 className="section-title">Your Workspace</h2>
          <p className="section-description">
            Everything you need to stay organized and productive
          </p>
        </div>

        <div className="main-container">
          <div className="form-section">
            <div className="section-card">
              <h3 className="card-title">Create New Task</h3>
              <TaskForm refresh={handleRefresh} />
            </div>
            <div className="section-card stats-card">
              <TaskStatistics refreshKey={refreshKey} />
            </div>
          </div>

          <div className="tasks-section">
            <div className="section-card">
              <h3 className="card-title">Your Tasks</h3>
              <TaskList refreshKey={refreshKey} onTaskUpdate={handleRefresh} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
