import { useState } from "react";

export default function TaskFilters({ onFilterChange, filters }) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [statusFilter, setStatusFilter] = useState(filters.status || "");
  const [dueDateFilter, setDueDateFilter] = useState(filters.dueDate || "");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ ...filters, search: value });
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    onFilterChange({ ...filters, status: value || undefined });
  };

  const handleDueDateChange = (e) => {
    const value = e.target.value;
    setDueDateFilter(value);
    onFilterChange({ ...filters, dueDate: value || undefined });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setDueDateFilter("");
    onFilterChange({ search: "", status: undefined, dueDate: undefined });
  };

  const hasActiveFilters = statusFilter || dueDateFilter || searchTerm;

  return (
    <div className="task-filters">
      <div className="filters-header">
        <h3 className="filters-title">Search & Filter</h3>
        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All
          </button>
        )}
      </div>

      <div className="filters-grid">
        <div className="filter-group">
          <label htmlFor="search" className="filter-label">
            <span className="filter-icon">🔍</span>
            Search Tasks
          </label>
          <input
            id="search"
            type="text"
            className="filter-input"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status" className="filter-label">
            <span className="filter-icon">📊</span>
            Filter by Status
          </label>
          <select
            id="status"
            className="filter-select"
            value={statusFilter}
            onChange={handleStatusChange}
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="dueDate" className="filter-label">
            <span className="filter-icon">📅</span>
            Filter by Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            className="filter-input"
            value={dueDateFilter}
            onChange={handleDueDateChange}
          />
        </div>
      </div>
    </div>
  );
}

