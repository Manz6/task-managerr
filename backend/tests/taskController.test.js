const mongoose = require("mongoose");
const Task = require("../models/Task");
const {
  createTask,
  getTasks,
  updateTask,
  getTaskStats,
} = require("../controllers/taskController");

// Mock the Task model
jest.mock("../models/Task");

describe("Task Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    it("should create a new task successfully", async () => {
      const mockTask = {
        _id: "507f1f77bcf86cd799439011",
        title: "Test Task",
        description: "Test Description",
        dueDate: new Date("2024-12-31"),
        reminder: true,
        status: "To Do",
      };

      Task.create = jest.fn().mockResolvedValue(mockTask);
      req.body = {
        title: "Test Task",
        description: "Test Description",
        dueDate: new Date("2024-12-31"),
        reminder: true,
      };

      await createTask(req, res);

      expect(Task.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockTask);
    });

    it("should handle errors when creating a task", async () => {
      const error = new Error("Database error");
      Task.create = jest.fn().mockRejectedValue(error);

      req.body = {
        title: "Test Task",
      };

      await expect(createTask(req, res)).rejects.toThrow("Database error");
    });
  });

  describe("getTasks", () => {
    it("should retrieve all tasks sorted by due date", async () => {
      const mockTasks = [
        {
          _id: "507f1f77bcf86cd799439011",
          title: "Task 1",
          dueDate: new Date("2024-12-01"),
          status: "To Do",
        },
        {
          _id: "507f1f77bcf86cd799439012",
          title: "Task 2",
          dueDate: new Date("2024-12-02"),
          status: "In Progress",
        },
      ];

      Task.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockTasks),
      });

      await getTasks(req, res);

      expect(Task.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });

    it("should handle errors when retrieving tasks", async () => {
      const error = new Error("Database error");
      Task.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockRejectedValue(error),
      });

      await expect(getTasks(req, res)).rejects.toThrow("Database error");
    });
  });

  describe("updateTask", () => {
    it("should update a task successfully", async () => {
      const mockUpdatedTask = {
        _id: "507f1f77bcf86cd799439011",
        title: "Updated Task",
        status: "In Progress",
      };

      Task.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedTask);
      req.params.id = "507f1f77bcf86cd799439011";
      req.body = { status: "In Progress" };

      await updateTask(req, res);

      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        req.body,
        { new: true }
      );
      expect(res.json).toHaveBeenCalledWith(mockUpdatedTask);
    });

    it("should handle errors when updating a task", async () => {
      const error = new Error("Task not found");
      Task.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      req.params.id = "invalid-id";
      req.body = { status: "Done" };

      await expect(updateTask(req, res)).rejects.toThrow("Task not found");
    });
  });

  describe("getTaskStats", () => {
    it("should return task statistics using aggregation", async () => {
      const mockStats = [
        {
          totalTasks: [{ count: 10 }],
          byStatus: [
            { _id: "To Do", count: 4 },
            { _id: "In Progress", count: 3 },
            { _id: "Done", count: 3 },
          ],
          overdueTasks: [{ count: 2 }],
          soonDueTasks: [{ count: 1 }],
          completedTasks: [{ count: 3 }],
        },
      ];

      Task.aggregate = jest.fn().mockResolvedValue(mockStats);

      await getTaskStats(req, res);

      expect(Task.aggregate).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        total: 10,
        byStatus: {
          "To Do": 4,
          "In Progress": 3,
          Done: 3,
        },
        overdue: 2,
        soonDue: 1,
        completed: 3,
      });
    });

    it("should handle empty statistics", async () => {
      const mockStats = [
        {
          totalTasks: [],
          byStatus: [],
          overdueTasks: [],
          soonDueTasks: [],
          completedTasks: [],
        },
      ];

      Task.aggregate = jest.fn().mockResolvedValue(mockStats);

      await getTaskStats(req, res);

      expect(res.json).toHaveBeenCalledWith({
        total: 0,
        byStatus: {
          "To Do": 0,
          "In Progress": 0,
          Done: 0,
        },
        overdue: 0,
        soonDue: 0,
        completed: 0,
      });
    });

    it("should handle errors when getting statistics", async () => {
      const error = new Error("Aggregation error");
      Task.aggregate = jest.fn().mockRejectedValue(error);

      await getTaskStats(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Aggregation error" });
    });
  });
});

