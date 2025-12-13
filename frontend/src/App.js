import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <h2>Task Management App</h2>
      <TaskForm refresh={() => window.location.reload()} />
      <TaskList />
    </div>
  );
}

export default App;
