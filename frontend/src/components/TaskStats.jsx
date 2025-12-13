import { useEffect, useState } from "react";
import { getTaskStats } from "../services/api";

export default function TaskStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await getTaskStats();
      setStats(res.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stats-loading">Loading statistics...</div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="stats-container">
      <h3 className="stats-title">Task Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card stat-overdue">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>

        <div className="stat-card stat-soon">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <div className="stat-value">{stats.soonDue}</div>
            <div className="stat-label">Due Soon</div>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      </div>

      <div className="stats-by-status">
        <h4 className="stats-subtitle">By Status</h4>
        <div className="status-stats">
          <div className="status-stat-item">
            <span className="status-stat-label">To Do:</span>
            <span className="status-stat-value">{stats.byStatus["To Do"] || 0}</span>
          </div>
          <div className="status-stat-item">
            <span className="status-stat-label">In Progress:</span>
            <span className="status-stat-value">{stats.byStatus["In Progress"] || 0}</span>
          </div>
          <div className="status-stat-item">
            <span className="status-stat-label">Done:</span>
            <span className="status-stat-value">{stats.byStatus["Done"] || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

