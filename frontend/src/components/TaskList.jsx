import { useEffect, useState, useMemo } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";
import TaskSearch from "./TaskSearch";
import TaskFilters from "./TaskFilters";

export default function TaskList({ refreshKey, onTaskUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "All",
    dueDateFilter: "All",
  });

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

  const handleTaskUpdate = async () => {
    await loadTasks();
    if (onTaskUpdate) {
      onTaskUpdate();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (refreshKey > 0) {
      loadTasks();
    }
  }, [refreshKey]);

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title?.toLowerCase().includes(searchLower) ||
          task.description?.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filters.status !== "All") {
      filtered = filtered.filter((task) => task.status === filters.status);
    }

    // Apply due date filter
    if (filters.dueDateFilter !== "All") {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      filtered = filtered.filter((task) => {
        if (!task.dueDate) {
          return filters.dueDateFilter === "No Date";
        }

        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));

        switch (filters.dueDateFilter) {
          case "Overdue":
            return dueDate < now && task.status !== "Done";
          case "Due Soon":
            return daysUntilDue >= 0 && daysUntilDue <= 2 && task.status !== "Done";
          case "Upcoming":
            return dueDate > now && daysUntilDue > 2;
          case "No Date":
            return false;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [tasks, searchTerm, filters]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  const hasFilters = searchTerm.trim() || filters.status !== "All" || filters.dueDateFilter !== "All";

  // Group filtered tasks by status
  const tasksByStatus = {
    "To Do": filteredTasks.filter((t) => t.status === "To Do"),
    "In Progress": filteredTasks.filter((t) => t.status === "In Progress"),
    "Done": filteredTasks.filter((t) => t.status === "Done"),
  };

  return (
    <div className="task-list-wrapper">
      <TaskSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TaskFilters filters={filters} onFilterChange={setFilters} />

      {hasFilters && filteredTasks.length === 0 && tasks.length > 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No tasks match your filters</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No tasks yet</h3>
          <p>Create your first task to get started!</p>
        </div>
      ) : (
        <div className="task-list-container">
          {Object.entries(tasksByStatus).map(
            ([status, statusTasks]) =>
              statusTasks.length > 0 && (
                <div key={status} className="status-group">
                  <h3 className="status-title">
                    <span
                      className={`status-badge status-${status
                        .replace(" ", "-")
                        .toLowerCase()}`}
                    >
                      {status}
                    </span>
                    <span className="status-count">({statusTasks.length})</span>
                  </h3>
                  <div className="tasks-grid">
                    {statusTasks.map((task) => (
                      <TaskItem key={task._id} task={task} refresh={handleTaskUpdate} />
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}
