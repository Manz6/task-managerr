import { useEffect, useState, useRef } from "react";
import { getTaskStats } from "../services/api";

export default function TaskStatistics({ refreshKey = 0 }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const isInitialLoadRef = useRef(true);

  const loadStats = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      } else {
        setIsUpdating(true);
      }
      const res = await getTaskStats();
      setStats(res.data);
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
      setIsUpdating(false);
      isInitialLoadRef.current = false;
    }
  };

  useEffect(() => {
    loadStats(true);
    // Refresh stats every 30 seconds
    const interval = setInterval(() => loadStats(false), 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Refresh when refreshKey changes, but don't show loading state
    if (!isInitialLoadRef.current) {
      loadStats(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  if (isInitialLoadRef.current && loading) {
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
          <div className={`stat-value ${isUpdating ? 'updating' : ''}`}>{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card stat-completed">
          <div className={`stat-value ${isUpdating ? 'updating' : ''}`}>{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card stat-overdue">
          <div className={`stat-value ${isUpdating ? 'updating' : ''}`}>{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
        
        <div className="stat-card stat-soon">
          <div className={`stat-value ${isUpdating ? 'updating' : ''}`}>{stats.soonDue}</div>
          <div className="stat-label">Due Soon</div>
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
