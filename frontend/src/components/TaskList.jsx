import { useEffect, useState } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} refresh={loadTasks} />
      ))}
    </>
  );
}
