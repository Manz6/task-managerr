import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    reminder: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createTask(task);
      refresh();
      setTask({ title: "", description: "", dueDate: "", reminder: false });
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="task-form" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Task Title</label>
        <input
          id="title"
          className="form-input"
          placeholder="Enter task title..."
          value={task.title}
          required
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          className="form-textarea"
          placeholder="Add a description (optional)..."
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate" className="form-label">Due Date</label>
        <input
          id="dueDate"
          type="date"
          className="form-input"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
      </div>

      <div className="form-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            className="checkbox-input"
            checked={task.reminder}
            onChange={(e) =>
              setTask({ ...task, reminder: e.target.checked })
            }
          />
          <span className="checkbox-custom"></span>
          <span className="checkbox-text">Set Reminder</span>
        </label>
      </div>

      <button 
        type="submit" 
        className="submit-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
