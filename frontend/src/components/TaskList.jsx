import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";
import TaskFilters from "./TaskFilters";

export default function TaskList({ onStatsUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: undefined,
    dueDate: undefined,
  });

  const loadTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.dueDate) params.dueDate = filters.dueDate;

      const res = await getTasks(params);
      setTasks(res.data);
      
      // Notify parent to refresh stats
      if (onStatsUpdate) {
        onStatsUpdate();
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Group tasks by status
  const tasksByStatus = {
    "To Do": tasks.filter(t => t.status === "To Do"),
    "In Progress": tasks.filter(t => t.status === "In Progress"),
    "Done": tasks.filter(t => t.status === "Done"),
  };

  return (
    <div className="task-list-container">
      <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No tasks found</h3>
          <p>
            {filters.search || filters.status || filters.dueDate
              ? "Try adjusting your filters"
              : "Create your first task to get started!"}
          </p>
        </div>
      ) : (
        Object.entries(tasksByStatus).map(([status, statusTasks]) => 
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
        )
      )}
    </div>
  );
}
