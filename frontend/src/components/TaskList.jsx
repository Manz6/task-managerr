import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  // Group tasks by status
  const tasksByStatus = {
    "To Do": tasks.filter(t => t.status === "To Do"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    "Done": tasks.filter(t => t.status === "Done"),
  };

  return (
    <div className="task-list-container">
      {Object.entries(tasksByStatus).map(([status, statusTasks]) => 
        statusTasks.length > 0 && (
          <div key={status} className="status-group">
            <h3 className="status-title">
              <span className={`status-badge status-${status.replace(" ", "-").toLowerCase()}`}>
                {status}
              </span>
              <span className="status-count">({statusTasks.length})</span>
            </h3>
            <div className="tasks-grid">
              {statusTasks.map((task) => (
                <TaskItem key={task._id} task={task} refresh={loadTasks} />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
