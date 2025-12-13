const request = require("supertest");
const express = require("express");
const taskRoutes = require("../routes/taskRoutes");
const taskController = require("../controllers/taskController");

// Create a test app
const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

// Mock the controller functions
jest.mock("../controllers/taskController");

describe("Task Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/tasks", () => {
    it("should create a new task", async () => {
      const mockTask = {
        _id: "507f1f77bcf86cd799439011",
        title: "Test Task",
        description: "Test Description",
        status: "To Do",
      };

      taskController.createTask = jest.fn((req, res) => {
        res.status(201).json(mockTask);
      });

      const response = await request(app)
        .post("/api/tasks")
        .send({
          title: "Test Task",
          description: "Test Description",
        })
        .expect(201);

      expect(response.body).toHaveProperty("_id");
      expect(response.body.title).toBe("Test Task");
    });
  });

  describe("GET /api/tasks", () => {
    it("should retrieve all tasks", async () => {
      const mockTasks = [
        {
          _id: "507f1f77bcf86cd799439011",
          title: "Task 1",
          status: "To Do",
        },
        {
          _id: "507f1f77bcf86cd799439012",
          title: "Task 2",
          status: "In Progress",
        },
      ];

      taskController.getTasks = jest.fn((req, res) => {
        res.json(mockTasks);
      });

      const response = await request(app)
        .get("/api/tasks")
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe("GET /api/tasks/stats", () => {
    it("should retrieve task statistics", async () => {
      const mockStats = {
        total: 10,
        byStatus: {
          "To Do": 4,
          "In Progress": 3,
          Done: 3,
        },
        overdue: 2,
        soonDue: 1,
        completed: 3,
      };

      taskController.getTaskStats = jest.fn((req, res) => {
        res.json(mockStats);
      });

      const response = await request(app)
        .get("/api/tasks/stats")
        .expect(200);

      expect(response.body).toHaveProperty("total");
      expect(response.body).toHaveProperty("byStatus");
      expect(response.body).toHaveProperty("overdue");
      expect(response.body).toHaveProperty("soonDue");
      expect(response.body).toHaveProperty("completed");
    });
  });

  describe("PATCH /api/tasks/:id", () => {
    it("should update a task", async () => {
      const taskId = "507f1f77bcf86cd799439011";
      const mockUpdatedTask = {
        _id: taskId,
        title: "Updated Task",
        status: "In Progress",
      };

      taskController.updateTask = jest.fn((req, res) => {
        res.json(mockUpdatedTask);
      });

      const response = await request(app)
        .patch(`/api/tasks/${taskId}`)
        .send({ status: "In Progress" })
        .expect(200);

      expect(response.body._id).toBe(taskId);
      expect(response.body.status).toBe("In Progress");
    });
  });
});

