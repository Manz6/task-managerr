import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon">✓</span>
            Task Manager
          </h1>
          <p className="app-subtitle">Organize your life, one task at a time</p>
        </div>
      </header>

      <main className="app-main">
        <div className="main-container">
          <section className="form-section">
            <div className="section-card">
              <h2 className="section-title">Create New Task</h2>
              <TaskForm refresh={handleRefresh} />
            </div>
          </section>

          <section className="tasks-section">
            <div className="section-card">
              <h2 className="section-title">Your Tasks</h2>
              <TaskList key={refreshKey} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
