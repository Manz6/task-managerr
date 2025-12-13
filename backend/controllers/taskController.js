const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { search, status, dueDate } = req.query;
    let query = {};

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Due date filter
    if (dueDate) {
      const date = new Date(dueDate);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      query.dueDate = {
        $gte: date,
        $lt: nextDay,
      };
    }

    const tasks = await Task.find(query).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTaskStats = async (req, res) => {
  try {
    const now = new Date();
    
    const stats = await Task.aggregate([
      {
        $facet: {
          totalTasks: [{ $count: "count" }],
          byStatus: [
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ],
          overdueTasks: [
            {
              $match: {
                status: { $ne: "Done" },
                dueDate: { $lt: now },
              },
            },
            { $count: "count" },
          ],
          soonDueTasks: [
            {
              $match: {
                status: { $ne: "Done" },
                dueDate: {
                  $gte: now,
                  $lte: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
                },
              },
            },
            { $count: "count" },
          ],
          completedTasks: [
            {
              $match: {
                status: "Done",
              },
            },
            { $count: "count" },
          ],
        },
      },
    ]);

    const result = {
      total: stats[0].totalTasks[0]?.count || 0,
      byStatus: {
        "To Do": 0,
        "In Progress": 0,
        Done: 0,
      },
      overdue: stats[0].overdueTasks[0]?.count || 0,
      soonDue: stats[0].soonDueTasks[0]?.count || 0,
      completed: stats[0].completedTasks[0]?.count || 0,
    };

    // Map status counts
    stats[0].byStatus.forEach((item) => {
      result.byStatus[item._id] = item.count;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
