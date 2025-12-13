const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(task);
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
                dueDate: { $exists: true, $ne: null, $lt: now },
              },
            },
            { $count: "count" },
          ],
          soonDueTasks: [
            {
              $match: {
                status: { $ne: "Done" },
                dueDate: {
                  $exists: true,
                  $ne: null,
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