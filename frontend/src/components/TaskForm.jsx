import { useState } from "react";
import { createTask } from "../services/api";

export default function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    reminder: false,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await createTask(task);
    refresh();
    setTask({ title: "", description: "", dueDate: "", reminder: false });
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="Title"
        value={task.title}
        required
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <input
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />

      <label>
        <input
          type="checkbox"
          checked={task.reminder}
          onChange={(e) =>
            setTask({ ...task, reminder: e.target.checked })
          }
        />
        Reminder
      </label>

      <button>Add Task</button>
    </form>
  );
}
