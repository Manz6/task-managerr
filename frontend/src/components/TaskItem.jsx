import { useState } from "react";
import { updateTask, deleteTask } from "../services/api";

export default function TaskItem({ task, refresh }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const now = new Date();
  const due = task.dueDate ? new Date(task.dueDate) : null;

  const getDueDateStatus = () => {
    if (!due || task.status === "Done") return "normal";
    if (due < now) return "overdue";
    const daysUntilDue = (due - now) / (1000 * 60 * 60 * 24);
    if (daysUntilDue <= 2) return "soon";
    return "normal";
  };

  const dueDateStatus = getDueDateStatus();

  const changeStatus = async (e) => {
    setIsUpdating(true);
    try {
      await updateTask(task._id, { status: e.target.value });
      refresh();
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      await deleteTask(task._id);
      refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  return (
    <div className={`task-card task-${dueDateStatus} task-status-${task.status?.replace(" ", "-").toLowerCase()}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        {task.reminder && (
          <span className="reminder-badge" title="Reminder set">🔔</span>
        )}
      </div>
      
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <div className="task-meta">
          {due && (
            <div className={`due-date due-${dueDateStatus}`}>
              <span className="due-icon">📅</span>
              <span className="due-text">{formatDate(task.dueDate)}</span>
              {dueDateStatus === "overdue" && (
                <span className="overdue-label">Overdue</span>
              )}
              {dueDateStatus === "soon" && (
                <span className="soon-label">Due Soon</span>
              )}
            </div>
          )}
        </div>

        <select 
          className="status-select"
          value={task.status || "To Do"} 
          onChange={changeStatus}
          disabled={isUpdating}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={isUpdating}
          title="Delete task"
        >
          ×
        </button>
      </div>
    </div>
  );
}
