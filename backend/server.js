const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
