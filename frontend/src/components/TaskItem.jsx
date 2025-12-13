import { updateTask } from "../services/api";

export default function TaskItem({ task, refresh }) {
  const now = new Date();
  const due = new Date(task.dueDate);

  let bgColor = "#e8e8e8";

  if (task.status !== "Done") {
    if (due < now) bgColor = "#ffcccc"; // overdue
    else if ((due - now) / (1000 * 60 * 60 * 24) <= 2)
      bgColor = "#fff3cd"; // soon due
  }

  const changeStatus = async (e) => {
    await updateTask(task._id, { status: e.target.value });
    refresh();
  };

  return (
    <div style={{ background: bgColor, padding: "10px", margin: "10px 0" }}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <p>Due: {task.dueDate?.slice(0, 10)}</p>

      <select value={task.status} onChange={changeStatus}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
    </div>
  );
}
