import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

export const getTasks = () => API.get("/");
export const createTask = (task) => API.post("/", task);
export const updateTask = (id, data) =>
  API.patch(`/${id}`, data);
export const getTaskStats = () => API.get("/stats");
